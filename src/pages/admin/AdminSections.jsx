import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import AdminCRUD from './AdminCRUD';
import { programsAPI, eventsAPI, retreatsAPI, careersAPI, volunteersAPI, donationsAPI, testimonialsAPI, contactAPI, mediaAPI } from '../../services/api';
import { Badge, Button, Spinner } from '../../components/common';

// ── PROGRAMS ──────────────────────────────────────────────────────────────────
export function AdminPrograms() {
  return (
    <AdminCRUD
      title="Programs"
      icon="📿"
      fetchFn={programsAPI.getAll}
      createFn={programsAPI.create}
      updateFn={programsAPI.update}
      deleteFn={programsAPI.delete}
      searchKey="title"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category', render: v => <Badge color="saffron">{v}</Badge> },
        { key: 'duration', label: 'Duration' },
        { key: 'price', label: 'Price', render: (v, item) => item.isFree ? 'Free' : `₹${v}` },
        { key: 'isFeatured', label: 'Featured', render: v => v ? '⭐' : '—' },
        { key: 'isActive', label: 'Status', render: v => <Badge color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Badge> },
      ]}
      defaultValues={{ title: '', category: 'meditation', description: '', duration: '', level: 'all', price: 0, isFree: false, isFeatured: false, isActive: true }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'category', label: 'Category', type: 'select', options: ['meditation', 'yoga', 'healing', 'training', 'certification', 'workshop', 'retreat'] },
        { name: 'level', label: 'Level', type: 'select', options: ['beginner', 'intermediate', 'advanced', 'all'] },
        { name: 'duration', label: 'Duration', placeholder: 'e.g. 3 Days, 6 Weeks' },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'shortDescription', label: 'Short Description', type: 'textarea', fullWidth: true },
        { name: 'description', label: 'Full Description', type: 'textarea', fullWidth: true },
        { name: 'instructor', label: 'Instructor Name' },
        { name: 'location', label: 'Location' },
        { name: 'isFree', label: 'Free Program', type: 'checkbox', checkLabel: 'This program is free' },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & visible' },
      ]}
    />
  );
}

// ── EVENTS ────────────────────────────────────────────────────────────────────
export function AdminEvents() {
  return (
    <AdminCRUD
      title="Events"
      icon="📅"
      fetchFn={eventsAPI.getAll}
      createFn={eventsAPI.create}
      updateFn={eventsAPI.update}
      deleteFn={eventsAPI.delete}
      searchKey="title"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: v => <Badge color="blue">{v}</Badge> },
        { key: 'startDate', label: 'Date', render: v => v ? format(new Date(v), 'dd MMM yyyy') : '—' },
        { key: 'isFree', label: 'Price', render: (v, item) => v ? 'Free' : `₹${item.price}` },
        { key: 'isActive', label: 'Status', render: v => <Badge color={v ? 'green' : 'red'}>{v ? 'Active' : 'Draft'}</Badge> },
      ]}
      defaultValues={{ title: '', type: 'workshop', description: '', startDate: '', time: '', location: '', isFree: true, price: 0, isActive: true }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'type', label: 'Type', type: 'select', options: ['satsang', 'workshop', 'seminar', 'retreat', 'ceremony', 'online', 'other'] },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'time', label: 'Time', placeholder: 'e.g. 7:00 AM – 9:00 AM' },
        { name: 'location', label: 'Location' },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'maxParticipants', label: 'Max Participants', type: 'number' },
        { name: 'shortDescription', label: 'Short Description', type: 'textarea', fullWidth: true },
        { name: 'isFree', label: 'Free', type: 'checkbox', checkLabel: 'Free event' },
        { name: 'isOnline', label: 'Online', type: 'checkbox', checkLabel: 'Online event' },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & visible' },
      ]}
    />
  );
}

// ── RETREATS ──────────────────────────────────────────────────────────────────
export function AdminRetreats() {
  return (
    <AdminCRUD
      title="Retreats"
      icon="🏔️"
      fetchFn={retreatsAPI.getAll}
      createFn={retreatsAPI.create}
      updateFn={retreatsAPI.update}
      deleteFn={retreatsAPI.delete}
      searchKey="title"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'location', label: 'Location' },
        { key: 'duration', label: 'Duration' },
        { key: 'price', label: 'Price', render: v => v ? `₹${Number(v).toLocaleString()}` : '—' },
        { key: 'difficulty', label: 'Level', render: v => <Badge color="earth">{v}</Badge> },
        { key: 'isActive', label: 'Status', render: v => <Badge color={v ? 'green' : 'red'}>{v ? 'Active' : 'Draft'}</Badge> },
      ]}
      defaultValues={{ title: '', location: '', region: 'himalaya', description: '', duration: '', price: 0, difficulty: 'moderate', maxParticipants: 20, isActive: true }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'location', label: 'Location', required: true },
        { name: 'region', label: 'Region', type: 'select', options: ['himalaya', 'rishikesh', 'kedarnath', 'gangotri', 'badrinath', 'other'] },
        { name: 'duration', label: 'Duration', placeholder: 'e.g. 7 Days' },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'maxParticipants', label: 'Max Participants', type: 'number' },
        { name: 'difficulty', label: 'Difficulty', type: 'select', options: ['easy', 'moderate', 'challenging'] },
        { name: 'shortDescription', label: 'Short Description', type: 'textarea', fullWidth: true },
        { name: 'description', label: 'Full Description', type: 'textarea', fullWidth: true },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & visible' },
      ]}
    />
  );
}

// ── CAREERS ───────────────────────────────────────────────────────────────────
export function AdminCareers() {
  return (
    <AdminCRUD
      title="Careers"
      icon="💼"
      fetchFn={careersAPI.getAll}
      createFn={careersAPI.create}
      updateFn={careersAPI.update}
      deleteFn={careersAPI.delete}
      searchKey="title"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'department', label: 'Department' },
        { key: 'type', label: 'Type', render: v => <Badge color="saffron">{v}</Badge> },
        { key: 'location', label: 'Location' },
        { key: 'isRemote', label: 'Remote', render: v => v ? '✓' : '—' },
        { key: 'isActive', label: 'Status', render: v => <Badge color={v ? 'green' : 'red'}>{v ? 'Open' : 'Closed'}</Badge> },
      ]}
      defaultValues={{ title: '', department: '', type: 'full-time', location: 'Rishikesh', description: '', isRemote: false, isActive: true }}
      formFields={[
        { name: 'title', label: 'Job Title', required: true },
        { name: 'department', label: 'Department' },
        { name: 'type', label: 'Employment Type', type: 'select', options: ['full-time', 'part-time', 'contract', 'internship', 'volunteer'] },
        { name: 'location', label: 'Location' },
        { name: 'salary', label: 'Salary / Stipend' },
        { name: 'applicationDeadline', label: 'Application Deadline', type: 'date' },
        { name: 'description', label: 'Job Description', type: 'textarea', fullWidth: true },
        { name: 'isRemote', label: 'Remote', type: 'checkbox', checkLabel: 'Remote work allowed' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & accepting applications' },
      ]}
    />
  );
}

// ── VOLUNTEERS ────────────────────────────────────────────────────────────────
export function AdminVolunteers() {
  const statusColors = { pending: 'earth', reviewing: 'blue', accepted: 'green', rejected: 'red' };
  return (
    <AdminCRUD
      title="Volunteers"
      icon="🤝"
      fetchFn={() => volunteersAPI.getAll()}
      createFn={() => Promise.resolve()}
      updateFn={volunteersAPI.update}
      deleteFn={volunteersAPI.delete}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type', render: v => <Badge color="saffron">{v}</Badge> },
        { key: 'city', label: 'City' },
        { key: 'availability', label: 'Availability' },
        { key: 'status', label: 'Status', render: v => <Badge color={statusColors[v] || 'earth'}>{v}</Badge> },
        { key: 'createdAt', label: 'Applied', render: v => v ? format(new Date(v), 'dd MMM yy') : '—' },
      ]}
      defaultValues={{ status: 'pending', notes: '' }}
      formFields={[
        { name: 'status', label: 'Status', type: 'select', options: ['pending', 'reviewing', 'accepted', 'rejected'] },
        { name: 'notes', label: 'Internal Notes', type: 'textarea', fullWidth: true },
      ]}
    />
  );
}

// ── DONATIONS ─────────────────────────────────────────────────────────────────
export function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    donationsAPI.getAll()
      .then(res => { setDonations(res.data.data || []); setTotal(res.data.totalAmount || 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusColors = { pending: 'earth', completed: 'green', failed: 'red', refunded: 'blue' };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">❤️ Donations</h1>
        <p className="text-gray-400 text-sm mt-1">Total raised: <span className="font-bold text-saffron-600">₹{total.toLocaleString()}</span></p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Donor', 'Email', 'Amount', 'Purpose', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {donations.map(d => (
                  <tr key={d._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{d.isAnonymous ? 'Anonymous' : d.donorName}</td>
                    <td className="px-4 py-3 text-gray-500">{d.email}</td>
                    <td className="px-4 py-3 font-bold text-saffron-600">₹{d.amount?.toLocaleString()}</td>
                    <td className="px-4 py-3 capitalize text-gray-500">{d.purpose?.replace(/-/g, ' ')}</td>
                    <td className="px-4 py-3"><Badge color={statusColors[d.status] || 'earth'}>{d.status}</Badge></td>
                    <td className="px-4 py-3 text-gray-400">{d.createdAt ? format(new Date(d.createdAt), 'dd MMM yy') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
export function AdminTestimonials() {
  return (
    <AdminCRUD
      title="Testimonials"
      icon="💬"
      fetchFn={testimonialsAPI.getAllAdmin}
      createFn={testimonialsAPI.create}
      updateFn={testimonialsAPI.update}
      deleteFn={testimonialsAPI.delete}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'designation', label: 'Designation' },
        { key: 'program', label: 'Program' },
        { key: 'rating', label: 'Rating', render: v => '⭐'.repeat(v || 5) },
        { key: 'isApproved', label: 'Approved', render: v => <Badge color={v ? 'green' : 'red'}>{v ? 'Yes' : 'Pending'}</Badge> },
        { key: 'isFeatured', label: 'Featured', render: v => v ? '⭐' : '—' },
      ]}
      defaultValues={{ name: '', designation: '', content: '', rating: 5, isApproved: false, isFeatured: false }}
      formFields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'designation', label: 'Designation' },
        { name: 'location', label: 'Location' },
        { name: 'program', label: 'Program Attended' },
        { name: 'rating', label: 'Rating', type: 'select', options: ['1', '2', '3', '4', '5'] },
        { name: 'content', label: 'Testimonial', type: 'textarea', fullWidth: true, required: true },
        { name: 'isApproved', label: 'Approved', type: 'checkbox', checkLabel: 'Approve & publish' },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
      ]}
    />
  );
}

// ── CONTACTS ──────────────────────────────────────────────────────────────────
export function AdminContacts() {
  const statusColors = { new: 'saffron', read: 'blue', replied: 'green', closed: 'earth' };
  return (
    <AdminCRUD
      title="Contact Messages"
      icon="✉️"
      fetchFn={contactAPI.getAll}
      createFn={() => Promise.resolve()}
      updateFn={contactAPI.update}
      deleteFn={contactAPI.delete}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type', render: v => <Badge color="earth">{v}</Badge> },
        { key: 'subject', label: 'Subject' },
        { key: 'status', label: 'Status', render: v => <Badge color={statusColors[v] || 'earth'}>{v}</Badge> },
        { key: 'createdAt', label: 'Date', render: v => v ? format(new Date(v), 'dd MMM yy') : '—' },
      ]}
      defaultValues={{ status: 'new', reply: '' }}
      formFields={[
        { name: 'status', label: 'Status', type: 'select', options: ['new', 'read', 'replied', 'closed'] },
        { name: 'reply', label: 'Internal Reply Notes', type: 'textarea', fullWidth: true },
      ]}
    />
  );
}

// ── MEDIA ─────────────────────────────────────────────────────────────────────
export function AdminMedia() {
  return (
    <AdminCRUD
      title="Media"
      icon="🎬"
      fetchFn={() => mediaAPI.getAll()}
      createFn={mediaAPI.create}
      updateFn={mediaAPI.update}
      deleteFn={mediaAPI.delete}
      searchKey="title"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: v => <Badge color="blue">{v}</Badge> },
        { key: 'category', label: 'Category' },
        { key: 'isFeatured', label: 'Featured', render: v => v ? '⭐' : '—' },
        { key: 'isActive', label: 'Status', render: v => <Badge color={v ? 'green' : 'red'}>{v ? 'Active' : 'Hidden'}</Badge> },
      ]}
      defaultValues={{ title: '', type: 'video', description: '', url: '', category: '', isFeatured: false, isActive: true }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'type', label: 'Type', type: 'select', options: ['video', 'article', 'podcast', 'gallery', 'document'] },
        { name: 'category', label: 'Category' },
        { name: 'url', label: 'URL / Embed URL', fullWidth: true },
        { name: 'thumbnail', label: 'Thumbnail URL', fullWidth: true },
        { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & visible' },
      ]}
    />
  );
}
