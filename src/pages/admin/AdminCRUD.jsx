import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaEdit, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import { Button, Spinner } from '../../components/common';

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/i;
const AUDIO_EXTENSIONS = /\.(mp3|wav|ogg|m4a|aac|flac)$/i;
const PDF_EXTENSIONS = /\.pdf(?:$|\?)/i;
const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|bmp|svg|avif)(?:$|\?)/i;

function getPreviewMeta(src, file) {
  if (file?.type?.startsWith('video/')) return { kind: 'video', src };
  if (file?.type?.startsWith('audio/')) return { kind: 'audio', src };
  if (file?.type === 'application/pdf') return { kind: 'pdf', src };
  if (file?.type?.startsWith('image/')) return { kind: 'image', src };

  if (!src) return { kind: null, src: '' };

  if (typeof src === 'string') {
    if (src.startsWith('data:video/') || VIDEO_EXTENSIONS.test(src)) return { kind: 'video', src };
    if (src.startsWith('data:audio/') || AUDIO_EXTENSIONS.test(src)) return { kind: 'audio', src };
    if (src.startsWith('data:application/pdf') || PDF_EXTENSIONS.test(src)) return { kind: 'pdf', src };
    if (src.startsWith('data:image/') || IMAGE_EXTENSIONS.test(src)) {
      return { kind: 'image', src };
    }
    return { kind: 'file', src };
  }

  return { kind: 'file', src: '' };
}

// Generic admin table with create/edit/delete
export default function AdminCRUD({
  title,
  icon = '',
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  columns,
  formFields,
  defaultValues = {},
  searchKey = 'title',
  preparePayload,
  hideCreate = false,
  transformFormChange,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(defaultValues);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    fetchFn()
      .then((res) => setItems(res.data.data || res.data || []))
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setForm(defaultValues);
    setModal('create');
  };

  const openEdit = (item) => {
    const dateValues = formFields
      .filter((field) => field.type === 'date' && item[field.name])
      .reduce((acc, field) => {
        acc[field.name] = String(item[field.name]).slice(0, 10);
        return acc;
      }, {});

    const arrayValues = formFields
      .filter((field) => field.isArray && Array.isArray(item[field.name]))
      .reduce((acc, field) => {
        acc[field.name] = item[field.name].join(', ');
        return acc;
      }, {});

    setForm({
      ...defaultValues,
      ...item,
      ...dateValues,
      ...arrayValues,
      instructorName: item.instructor?.name || item.instructorName || '',
      imageFile: null,
      imageFilePreview: '',
      imageFiles: [],
      imageFilesPreview: [],
    });
    setModal(item);
  };

  const closeModal = () => {
    setModal(null);
    setForm(defaultValues);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const selectedFiles = Array.from(files || []);

      if (e.target.multiple) {
        setForm((prev) => ({
          ...prev,
          [name]: selectedFiles,
          [`${name}Preview`]: selectedFiles.map((file) => URL.createObjectURL(file)),
        }));
        return;
      }

      const file = selectedFiles[0] || null;
      setForm((prev) => ({
        ...prev,
        [name]: file,
        [`${name}Preview`]: file ? URL.createObjectURL(file) : '',
      }));
      return;
    }

    const nextValue = type === 'checkbox' ? checked : value;
    setForm((prev) => {
      const nextForm = { ...prev, [name]: nextValue };
      return transformFormChange ? transformFormChange(nextForm, { name, value: nextValue, type, checked, files }, prev) : nextForm;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = preparePayload ? await preparePayload(form, modal) : form;

      if (modal === 'create') {
        await createFn(payload);
        toast.success('Created successfully');
      } else {
        await updateFn(modal._id, payload);
        toast.success('Updated successfully');
      }

      load();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setDeleting(id);
    try {
      await deleteFn(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = items.filter(
    (item) => !search || String(item[searchKey] || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-800 sm:text-3xl">{icon} {title}</h1>
          <p className="mt-1 text-sm text-gray-400">{items.length} total records</p>
        </div>
        {!hideCreate && (
          <Button onClick={openCreate} variant="primary" className="justify-center sm:w-auto">
            <FaPlus size={12} /> Add New
          </Button>
        )}
      </div>

      <div className="relative mb-6 max-w-full sm:max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 outline-none focus:border-saffron-400"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="md" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <div className="mb-3 text-5xl">{icon}</div>
            <p>No {title.toLowerCase()} found</p>
          </div>
        ) : (
          <div className="responsive-table">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="transition-colors hover:bg-gray-50"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-gray-700">
                        {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '—').slice(0, 60)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="rounded-lg bg-blue-50 p-1.5 text-blue-500 transition-colors hover:bg-blue-100"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deleting === item._id}
                          className="rounded-lg bg-red-50 p-1.5 text-red-500 transition-colors hover:bg-red-100 disabled:opacity-50"
                        >
                          {deleting === item._id ? <Spinner size="sm" /> : <FaTrash size={12} />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-6">
                <h2 className="pr-4 font-serif text-lg font-bold text-gray-800 sm:text-xl">
                  {modal === 'create' ? `Create ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {formFields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
                      {(() => {
                        const isDisabled = typeof field.disabled === 'function' ? field.disabled(form, modal) : field.disabled;
                        const isReadOnly = typeof field.readOnly === 'function' ? field.readOnly(form, modal) : field.readOnly;
                        const helperText = typeof field.helperText === 'function' ? field.helperText(form, modal) : field.helperText;
                        return (
                          <>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        {field.label} {field.required && <span className="text-red-500 font-bold">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          rows={3}
                          required={field.required}
                          disabled={isDisabled}
                          readOnly={isReadOnly}
                          placeholder={field.placeholder || field.label}
                          className={`w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400 ${isDisabled || isReadOnly ? 'bg-gray-50' : ''}`}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          disabled={isDisabled}
                            className={`w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400 ${isDisabled ? 'bg-gray-50' : ''}`}
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value ?? opt} value={opt.value ?? opt}>
                              {opt.label ?? opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            name={field.name}
                            checked={!!form[field.name]}
                            onChange={handleChange}
                            disabled={isDisabled}
                            className="rounded"
                          />
                          {field.checkLabel || field.label}
                        </label>
                      ) : field.type === 'file' ? (
                        <div className="space-y-3">
                          <div className="flex gap-2 items-center w-full">
                            <input
                              key={form[field.name] ? 'has-file' : 'no-file'}
                              type="file"
                              name={field.name}
                              accept={typeof field.accept === 'function' ? field.accept(form) : (field.accept || 'image/*')}
                              multiple={!!field.multiple}
                              onChange={handleChange}
                              disabled={isDisabled}
                              required={field.required && !form[field.urlKey]}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400 file:mr-3 file:rounded-lg file:border-0 file:bg-saffron-50 file:px-3 file:py-2 file:text-saffron-700"
                            />
                            {form[field.name] && (
                              <button
                                type="button"
                                onClick={() => handleChange({ target: { name: field.name, type: 'file', files: [], multiple: !!field.multiple } })}
                                className="flex-shrink-0 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg p-2.5 transition-colors"
                                title="Remove selected file"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                          {Array.isArray(form[field.previewKey]) ? (
                            form[field.previewKey].length > 0 && (
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {form[field.previewKey].map((src, index) => (
                                  <img
                                    key={`${field.name}-${index}`}
                                    src={src}
                                    alt={`${field.label} ${index + 1}`}
                                    className="h-24 w-full rounded-2xl border border-gray-100 object-cover"
                                  />
                                ))}
                              </div>
                            )
                          ) : (
                            (() => {
                              const previewSrc = form[field.previewKey] || form[field.urlKey];
                              if (!previewSrc) return null;

                              const preview = getPreviewMeta(previewSrc, form[field.name]);

                              if (preview.kind === 'video') {
                                return (
                                  <video
                                    src={preview.src}
                                    controls
                                    className="h-32 w-full rounded-2xl border border-gray-100 object-cover"
                                  />
                                );
                              }

                              if (preview.kind === 'audio') {
                                return (
                                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="mb-2 text-sm font-medium text-gray-600">{field.label}</p>
                                    <audio src={preview.src} controls className="w-full" />
                                  </div>
                                );
                              }

                              if (preview.kind === 'pdf') {
                                return (
                                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="text-sm font-medium text-gray-600">PDF selected</p>
                                    <a
                                      href={preview.src}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="mt-2 inline-flex text-sm font-semibold text-saffron-700 hover:underline"
                                    >
                                      Open PDF
                                    </a>
                                  </div>
                                );
                              }

                              if (preview.kind === 'image') {
                                return (
                                  <img
                                    src={preview.src}
                                    alt={field.label}
                                    className="h-32 w-full rounded-2xl border border-gray-100 object-cover"
                                  />
                                );
                              }

                              return (
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                  <p className="text-sm font-medium text-gray-600">File selected</p>
                                  <a
                                    href={preview.src}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-2 inline-flex text-sm font-semibold text-saffron-700 hover:underline"
                                  >
                                    Open file
                                  </a>
                                </div>
                              );
                            })()
                          )}
                          {field.galleryKey && Array.isArray(form[field.galleryKey]) && form[field.galleryKey].length > 0 && (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {form[field.galleryKey].map((src, index) => (
                                <img
                                  key={`${field.galleryKey}-${index}`}
                                  src={src}
                                  alt={`${field.label} saved ${index + 1}`}
                                  className="h-24 w-full rounded-2xl border border-gray-100 object-cover"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder || field.label}
                          required={field.required}
                          disabled={isDisabled}
                          readOnly={isReadOnly}
                           className={`w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400 ${isDisabled || isReadOnly ? 'bg-gray-50' : ''}`}
                        />
                      )}
                      {helperText ? <p className="mt-1 text-xs text-gray-500">{helperText}</p> : null}
                          </>
                        );
                      })()}
                    </div>
                  ))}
                </div>

                 <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                   <Button type="submit" loading={saving} className="flex-1">Save</Button>
                   <Button type="button" variant="ghost" onClick={closeModal} className="justify-center sm:w-auto">Cancel</Button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
