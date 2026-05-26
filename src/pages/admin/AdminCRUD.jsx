import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';
import { Spinner, Button } from '../../components/common';

// Generic admin table with create/edit/delete
export default function AdminCRUD({
  title,
  icon = '📋',
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  columns,        // [{ key, label, render? }]
  formFields,     // [{ name, label, type, options?, required? }]
  defaultValues = {},
  searchKey = 'title',
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'create' | item (for edit)
  const [form, setForm] = useState(defaultValues);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    fetchFn()
      .then(res => setItems(res.data.data || res.data || []))
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => { setForm(defaultValues); setModal('create'); };
  const openEdit = item => { setForm(item); setModal(item); };
  const closeModal = () => { setModal(null); setForm(defaultValues); };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'create') {
        await createFn(form);
        toast.success('Created successfully');
      } else {
        await updateFn(modal._id, form);
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

  const handleDelete = async id => {
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

  const filtered = items.filter(item =>
    !search || String(item[searchKey] || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">{icon} {title}</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} total records</p>
        </div>
        <Button onClick={openCreate} variant="primary">
          <FaPlus size={12} /> Add New
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
        <input
          type="text" placeholder={`Search ${title.toLowerCase()}...`} value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-saffron-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="md" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">{icon}</div>
            <p>No {title.toLowerCase()} found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {columns.map(col => (
                    <th key={col.key} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(item => (
                  <motion.tr key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-gray-700">
                        {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '—').slice(0, 60)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)}
                          className="p-1.5 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} disabled={deleting === item._id}
                          className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
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

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-serif text-xl font-bold text-gray-800">
                  {modal === 'create' ? `Create ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
                </h2>
                <button onClick={closeModal} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
                  <FaTimes size={14} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {formFields.map(field => (
                    <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea name={field.name} value={form[field.name] || ''} onChange={handleChange} rows={3}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-saffron-400 resize-none"
                          required={field.required}
                        />
                      ) : field.type === 'select' ? (
                        <select name={field.name} value={form[field.name] || ''} onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-saffron-400"
                        >
                          <option value="">Select...</option>
                          {field.options?.map(opt => (
                            <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input type="checkbox" name={field.name} checked={!!form[field.name]} onChange={handleChange} className="rounded" />
                          {field.checkLabel || field.label}
                        </label>
                      ) : (
                        <input type={field.type || 'text'} name={field.name} value={form[field.name] || ''} onChange={handleChange}
                          placeholder={field.placeholder || field.label}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-saffron-400"
                          required={field.required}
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
