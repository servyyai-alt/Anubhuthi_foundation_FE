import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaEdit, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import { Button, Spinner } from '../../components/common';

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
    setForm({
      ...defaultValues,
      ...item,
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

    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">{icon} {title}</h1>
          <p className="mt-1 text-sm text-gray-400">{items.length} total records</p>
        </div>
        <Button onClick={openCreate} variant="primary">
          <FaPlus size={12} /> Add New
        </Button>
      </div>

      <div className="relative mb-6 max-w-sm">
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
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
                        {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? 'â€”').slice(0, 60)}
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
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h2 className="font-serif text-xl font-bold text-gray-800">
                  {modal === 'create' ? `Create ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {formFields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          rows={3}
                          required={field.required}
                          className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400"
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
                            className="rounded"
                          />
                          {field.checkLabel || field.label}
                        </label>
                      ) : field.type === 'file' ? (
                        <div className="space-y-3">
                          <input
                            type="file"
                            name={field.name}
                            accept={field.accept || 'image/*'}
                            multiple={!!field.multiple}
                            onChange={handleChange}
                            required={field.required && !form[field.urlKey]}
                            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400 file:mr-3 file:rounded-lg file:border-0 file:bg-saffron-50 file:px-3 file:py-2 file:text-saffron-700"
                          />
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
                            (form[field.previewKey] || form[field.urlKey]) && (
                              <img
                                src={form[field.previewKey] || form[field.urlKey]}
                                alt={field.label}
                                className="h-32 w-full rounded-2xl border border-gray-100 object-cover"
                              />
                            )
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
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-saffron-400"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" loading={saving} className="flex-1">Save</Button>
                  <Button type="button" variant="ghost" onClick={closeModal}>Cancel</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
