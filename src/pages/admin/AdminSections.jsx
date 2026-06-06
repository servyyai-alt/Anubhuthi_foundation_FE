import React, { useEffect, useState } from 'react';
import { FaBookOpen, FaCalendarAlt, FaMountain, FaBriefcase, FaHandsHelping, FaDonate, FaQuoteLeft, FaEnvelope, FaPhotoVideo, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import AdminCRUD from './AdminCRUD';

import {
  careersAPI,
  contactAPI,
  donationsAPI,
  eventsAPI,
  mediaAPI,
  programsAPI,
  retreatsAPI,
  testimonialsAPI,
  volunteersAPI,
} from '../../services/api';

import { Badge, Spinner } from '../../components/common';

/* =========================
   PROGRAMS
========================= */

export function AdminPrograms() {
  const prepareProgramPayload = async (form) => {
    const payload = { ...form };

    if (payload.imageFile instanceof File) {
      const uploadRes = await programsAPI.uploadImage(payload.imageFile);
      payload.image = uploadRes.data?.data?.url || '';
    }

    payload.instructor = {
      ...(typeof payload.instructor === 'object' && payload.instructor ? payload.instructor : {}),
      name: payload.instructorName || payload.instructor?.name || '',
    };

    delete payload.imageFile;
    delete payload.imageFilePreview;
    delete payload.instructorName;

    return payload;
  };

  return (
    <AdminCRUD
      title="Programs"
      // icon={<FaBookOpen />}
      fetchFn={programsAPI.getAllAdmin}
      createFn={programsAPI.create}
      updateFn={programsAPI.update}
      deleteFn={programsAPI.delete}
      searchKey="title"
      preparePayload={prepareProgramPayload}
      columns={[
        { key: 'title', label: 'Title' },
        {
          key: 'category',
          label: 'Category',
          render: (v) => <Badge color="saffron">{v}</Badge>,
        },
        { key: 'duration', label: 'Duration' },
        {
          key: 'price',
          label: 'Price',
          render: (v, item) => (item.isFree ? 'Free' : `₹${v}`),
        },
        {
          key: 'isFeatured',
          label: 'Featured',
          render: (v) => (v ? 'Yes' : 'No'),
        },
        {
          key: 'isActive',
          label: 'Status',
          render: (v) => (
            <Badge color={v ? 'green' : 'red'}>
              {v ? 'Active' : 'Inactive'}
            </Badge>
          ),
        },
      ]}
      defaultValues={{
        title: '',
        category: 'meditation',
        description: '',
        duration: '',
        level: 'all',
        price: 0,
        image: '',
        imageFile: null,
        imageFilePreview: '',
        instructorName: '',
        isFree: false,
        isFeatured: false,
        isActive: true,
      }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: [
            'meditation',
            'yoga',
            'healing',
            'training',
            'certification',
            'workshop',
            'retreat',
          ],
        },
        {
          name: 'level',
          label: 'Level',
          type: 'select',
          options: ['beginner', 'intermediate', 'advanced', 'all'],
        },
        {
          name: 'duration',
          label: 'Duration',
          placeholder: 'e.g. 3 Days, 6 Weeks',
        },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        {
          name: 'imageFile',
          label: 'Program Image',
          type: 'file',
          fullWidth: true,
          urlKey: 'image',
          previewKey: 'imageFilePreview',
        },
        {
          name: 'shortDescription',
          label: 'Short Description',
          type: 'textarea',
          fullWidth: true,
        },
        {
          name: 'description',
          label: 'Full Description',
          type: 'textarea',
          fullWidth: true,
        },
        { name: 'instructorName', label: 'Instructor Name' },
        { name: 'location', label: 'Location' },
        {
          name: 'isFree',
          label: 'Free Program',
          type: 'checkbox',
          checkLabel: 'This program is free',
        },
        {
          name: 'isFeatured',
          label: 'Featured',
          type: 'checkbox',
          checkLabel: 'Show as featured',
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          checkLabel: 'Published & visible',
        },
      ]}
    />
  );
}

/* =========================
   EVENTS
========================= */

export function AdminEvents() {
  const syncEventPricing = (nextForm, change) => {
    if (change.name === 'isFree' && change.value) {
      return { ...nextForm, price: 0 };
    }

    if (change.name === 'price') {
      const numericPrice = Number(change.value);
      if (!Number.isNaN(numericPrice) && numericPrice > 0) {
        return { ...nextForm, isFree: false };
      }
    }

    return nextForm;
  };

  return (
    <AdminCRUD
      title="Events"
      // icon={<FaCalendarAlt />}
      fetchFn={eventsAPI.getAllAdmin}
      createFn={eventsAPI.create}
      updateFn={eventsAPI.update}
      deleteFn={eventsAPI.delete}
      searchKey="title"
      transformFormChange={syncEventPricing}
      preparePayload={(form) => ({
        ...form,
        price: form.isFree ? 0 : Number(form.price) || 0,
        isFree: form.isFree || !(Number(form.price) > 0),
      })}
      columns={[
        { key: 'title', label: 'Title' },
        {
          key: 'type',
          label: 'Type',
          render: (v) => <Badge color="blue">{v}</Badge>,
        },
        {
          key: 'startDate',
          label: 'Date',
          render: (v) =>
            v ? format(new Date(v), 'dd MMM yyyy') : '—',
        },
        {
          key: 'isFree',
          label: 'Price',
          render: (v, item) => (v ? 'Free' : `₹${item.price}`),
        },
        {
          key: 'isActive',
          label: 'Status',
          render: (v) => (
            <Badge color={v ? 'green' : 'red'}>
              {v ? 'Active' : 'Draft'}
            </Badge>
          ),
        },
      ]}
      defaultValues={{
        title: '',
        type: 'workshop',
        description: '',
        startDate: '',
        time: '',
        location: '',
        isFree: true,
        price: 0,
        isActive: true,
      }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: [
            'satsang',
            'workshop',
            'seminar',
            'retreat',
            'ceremony',
            'online',
            'other',
          ],
        },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        {
          name: 'time',
          label: 'Time',
          placeholder: 'e.g. 7:00 AM – 9:00 AM',
        },
        { name: 'location', label: 'Location' },
        { name: 'image', label: 'Image URL', fullWidth: true },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'maxParticipants', label: 'Max Participants', type: 'number' },
        {
          name: 'shortDescription',
          label: 'Short Description',
          type: 'textarea',
          fullWidth: true,
        },
        {
          name: 'isFree',
          label: 'Free',
          type: 'checkbox',
          checkLabel: 'Free event',
        },
        {
          name: 'isOnline',
          label: 'Online',
          type: 'checkbox',
          checkLabel: 'Online event',
        },
        {
          name: 'isFeatured',
          label: 'Featured',
          type: 'checkbox',
          checkLabel: 'Show as featured',
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          checkLabel: 'Published & visible',
        },
      ]}
    />
  );
}

/* =========================
   RETREATS
========================= */

export function AdminRetreats() {
  return (
    <AdminCRUD
      title="Retreats"
      // icon={<FaMountain />}
      fetchFn={retreatsAPI.getAllAdmin}
      createFn={retreatsAPI.create}
      updateFn={retreatsAPI.update}
      deleteFn={retreatsAPI.delete}
      searchKey="title"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'location', label: 'Location' },
        { key: 'duration', label: 'Duration' },
        {
          key: 'price',
          label: 'Price',
          render: (v) => (v ? `₹${Number(v).toLocaleString()}` : 'TBD'),
        },
        {
          key: 'difficulty',
          label: 'Level',
          render: (v) => <Badge color="earth">{v}</Badge>,
        },
        {
          key: 'isActive',
          label: 'Status',
          render: (v) => (
            <Badge color={v ? 'green' : 'red'}>
              {v ? 'Active' : 'Draft'}
            </Badge>
          ),
        },
      ]}
      defaultValues={{
        title: '',
        location: '',
        region: 'himalaya',
        description: '',
        duration: '',
        price: 0,
        difficulty: 'moderate',
        maxParticipants: 20,
        isActive: true,
      }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'location', label: 'Location', required: true },
        {
          name: 'region',
          label: 'Region',
          type: 'select',
          options: [
            'himalaya',
            'rishikesh',
            'kedarnath',
            'gangotri',
            'badrinath',
            'other',
          ],
        },
        {
          name: 'duration',
          label: 'Duration',
          placeholder: 'e.g. 7 Days',
        },
        { name: 'image', label: 'Image URL', fullWidth: true },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'maxParticipants', label: 'Max Participants', type: 'number' },
        {
          name: 'difficulty',
          label: 'Difficulty',
          type: 'select',
          options: ['easy', 'moderate', 'challenging'],
        },
        {
          name: 'shortDescription',
          label: 'Short Description',
          type: 'textarea',
          fullWidth: true,
        },
        {
          name: 'description',
          label: 'Full Description',
          type: 'textarea',
          fullWidth: true,
        },
        {
          name: 'isFeatured',
          label: 'Featured',
          type: 'checkbox',
          checkLabel: 'Show as featured',
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          checkLabel: 'Published & visible',
        },
      ]}
    />
  );
}

/* =========================
   CAREERS
========================= */

export function AdminCareers() {
  const [activeTab, setActiveTab] = useState('openings');

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-2">
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-6">Careers</h1>
        <div className="flex border-b border-gray-200 gap-6">
          <button
            className={`pb-3 font-medium transition-colors ${activeTab === 'openings' ? 'border-b-2 border-saffron-600 text-saffron-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('openings')}
          >
            Job Openings
          </button>
          <button
            className={`pb-3 font-medium transition-colors ${activeTab === 'applications' ? 'border-b-2 border-saffron-600 text-saffron-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
        </div>
      </div>
      <div>
        {activeTab === 'openings' ? (
          <div className="-mt-4">
            <AdminCRUD
              title="Job Openings"
              fetchFn={careersAPI.getAllAdmin}
              createFn={careersAPI.create}
              updateFn={careersAPI.update}
              deleteFn={careersAPI.delete}
              searchKey="title"
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'department', label: 'Department' },
                {
                  key: 'type',
                  label: 'Type',
                  render: (v) => <Badge color="saffron">{v}</Badge>,
                },
                { key: 'location', label: 'Location' },
                { key: 'isRemote', label: 'Remote', render: (v) => (v ? 'Yes' : 'No') },
                {
                  key: 'isActive',
                  label: 'Status',
                  render: (v) => (
                    <Badge color={v ? 'green' : 'red'}>
                      {v ? 'Open' : 'Closed'}
                    </Badge>
                  ),
                },
              ]}
              defaultValues={{
                title: '',
                department: '',
                type: 'full-time',
                location: 'Rishikesh',
                description: '',
                responsibilities: '',
                requirements: '',
                benefits: '',
                isRemote: false,
                isActive: true,
              }}
              preparePayload={(form) => {
                const payload = { ...form };
                ['responsibilities', 'requirements', 'benefits'].forEach(field => {
                  if (typeof payload[field] === 'string') {
                    payload[field] = payload[field].split(',').map(s => s.trim()).filter(Boolean);
                  }
                });
                return payload;
              }}
              formFields={[
                { name: 'title', label: 'Job Title', required: true },
                { name: 'department', label: 'Department' },
                {
                  name: 'type',
                  label: 'Employment Type',
                  type: 'select',
                  options: ['full-time', 'part-time', 'contract', 'internship', 'volunteer'],
                },
                { name: 'location', label: 'Location' },
                { name: 'salary', label: 'Salary / Stipend' },
                { name: 'applicationDeadline', label: 'Application Deadline', type: 'date' },
                { name: 'description', label: 'Job Description', type: 'textarea', fullWidth: true },
                { name: 'responsibilities', label: 'Responsibilities', type: 'textarea', fullWidth: true, isArray: true, placeholder: 'Develop features, write tests' },
                { name: 'requirements', label: 'Requirements', type: 'textarea', fullWidth: true, isArray: true, placeholder: '3+ years experience, React knowledge' },
                { name: 'benefits', label: 'Benefits', type: 'textarea', fullWidth: true, isArray: true, placeholder: 'Health insurance, Paid time off' },
                { name: 'isRemote', label: 'Remote', type: 'checkbox', checkLabel: 'Remote work allowed' },
                { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & accepting applications' },
              ]}
            />
          </div>
        ) : (
          <AdminApplications />
        )}
      </div>
    </div>
  );
}

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAppId, setExpandedAppId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    careersAPI.getAllApplications()
      .then(res => setApplications(res.data.data || []))
      .catch(() => toast.error("Failed to fetch applications"))
      .finally(() => setLoading(false));
  }, []);

  const filteredApplications = applications.filter((app) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return [
      app.name,
      app.email,
      app.phone,
      app.career?.title,
      app.linkedIn,
      app.portfolio,
      app.notes,
      app.experience,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  return (
    <div className="p-8">
      <div className="relative mb-6 max-w-full sm:max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 outline-none focus:border-saffron-400"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "Email", "Phone", "Job Title", "Resume", "Cover Letter", "Date", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApplications.length > 0 ? filteredApplications.map(app => (
                  <React.Fragment key={app._id}>
                    <tr className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedAppId === app._id ? 'bg-saffron-50/20' : ''}`} onClick={() => setExpandedAppId(expandedAppId === app._id ? null : app._id)}>
                      <td className="px-4 py-3 font-medium text-gray-800">{app.name}</td>
                      <td className="px-4 py-3 text-gray-500">{app.email}</td>
                      <td className="px-4 py-3 text-gray-500">{app.phone}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{app.career?.title || 'General Application'}</td>
                      <td className="px-4 py-3">
                        {app.resumeUrl ? (
                          <a href={app.resumeUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-saffron-600 hover:underline font-semibold">View Resume</a>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {app.coverLetter ? (
                          <a href={app.coverLetter} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-saffron-600 hover:underline font-semibold">View Cover Letter</a>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-400">{app.createdAt ? format(new Date(app.createdAt), 'dd MMM yy') : '—'}</td>
                      <td className="px-4 py-3">
                        <button className="text-saffron-600 hover:text-saffron-700 font-semibold text-xs uppercase tracking-wider">
                          {expandedAppId === app._id ? 'Hide' : 'Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedAppId === app._id && (
                      <tr className="bg-gray-50/40">
                        <td colSpan="8" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-gray-700">
                            <div>
                              <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">LinkedIn Profile</p>
                              {app.linkedIn ? (
                                <a href={app.linkedIn} target="_blank" rel="noreferrer" className="text-saffron-600 hover:underline break-all">{app.linkedIn}</a>
                              ) : (
                                <span className="text-gray-400">Not provided</span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Portfolio URL</p>
                              {app.portfolio ? (
                                <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-saffron-600 hover:underline break-all">{app.portfolio}</a>
                              ) : (
                                <span className="text-gray-400">Not provided</span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Years of Experience</p>
                              <span className="text-gray-800 font-medium">{app.experience || 'Not specified'}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Applied Date & Time</p>
                              <span className="text-gray-800 font-medium">{app.createdAt ? format(new Date(app.createdAt), 'dd MMM yyyy, hh:mm a') : '—'}</span>
                            </div>
                            <div className="md:col-span-2">
                              <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Cover Letter Message / Notes</p>
                              <div className="p-3 bg-white border border-gray-100 rounded-xl whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-xs md:text-sm shadow-inner">
                                {app.notes || <span className="text-gray-400 italic">No notes provided by candidate</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )) : (
                  <tr><td colSpan="8" className="py-10 text-center text-gray-400">No applications found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   VOLUNTEERS
========================= */

export function AdminVolunteers() {
  const statusColors = {
    pending: 'earth',
    reviewing: 'blue',
    accepted: 'green',
    rejected: 'red',
  };

  const prepareVolunteerPayload = (form) => {
    const payload = {
      ...form,
      skills: typeof form.skills === 'string'
        ? form.skills.split(',').map((skill) => skill.trim()).filter(Boolean)
        : form.skills,
      areas: typeof form.areas === 'string'
        ? form.areas.split(',').map((area) => area.trim()).filter(Boolean)
        : form.areas,
    };

    if (payload.age === '') delete payload.age;

    return payload;
  };

  return (
    <AdminCRUD
      title="Volunteers"
      // icon={<FaHandsHelping />}
      fetchFn={() => volunteersAPI.getAll()}
      createFn={volunteersAPI.create}
      updateFn={volunteersAPI.update}
      deleteFn={volunteersAPI.delete}
      searchKey="name"
      preparePayload={prepareVolunteerPayload}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type', render: (v) => <Badge color="saffron">{v}</Badge> },
        { key: 'city', label: 'City' },
        { key: 'availability', label: 'Availability' },
        { key: 'createdAt', label: 'Applied', render: (v) => (v ? format(new Date(v), 'dd MMM yy') : '—') },
      ]}
      defaultValues={{
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        city: '',
        country: 'India',
        education: '',
        occupation: '',
        skills: '',
        availability: '',
        experience: '',
        motivation: '',
        areas: '',
        type: 'volunteer',
        notes: '',
      }}
      formFields={[
        { name: 'name', label: 'Name', disabled: true },
        { name: 'email', label: 'Email', type: 'email', disabled: true },
        { name: 'phone', label: 'Phone', disabled: true },
        { name: 'dob', label: 'Date of Birth', type: 'date', disabled: true },
        { name: 'gender', label: 'Gender', disabled: true },
        { name: 'city', label: 'City', disabled: true },
        { name: 'country', label: 'Country', disabled: true },
        { name: 'education', label: 'Education', disabled: true },
        { name: 'occupation', label: 'Occupation', disabled: true },
        { name: 'type', label: 'Type', type: 'select', options: ['volunteer', 'intern'], disabled: true },
        {
          name: 'availability',
          label: 'Availability',
          type: 'select',
          options: [
            { value: 'full-time', label: 'Full-time (40 hrs/week)' },
            { value: 'part-time', label: 'Part-time (15-20 hrs/week)' },
            { value: 'weekends', label: 'Weekends only' },
            { value: 'remote', label: 'Remote / Online only' },
            { value: 'flexible', label: 'Flexible' },
          ],
          disabled: true,
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'textarea',
          fullWidth: true,
          isArray: true,
          disabled: true,
        },
        {
          name: 'areas',
          label: 'Areas of Interest',
          type: 'textarea',
          fullWidth: true,
          isArray: true,
          disabled: true,
        },
        { name: 'experience', label: 'Experience', type: 'textarea', fullWidth: true, disabled: true },
        { name: 'motivation', label: 'Motivation', type: 'textarea', fullWidth: true, disabled: true },
        { name: 'notes', label: 'Internal Notes', type: 'textarea', fullWidth: true },
      ]}
    />
  );
}

/* =========================
   DONATIONS
========================= */

export function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [expandedDonationId, setExpandedDonationId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    donationsAPI
      .getAll()
      .then((res) => {
        const fetchedDonations = res.data.data || [];
        setDonations(fetchedDonations);
        const completedSum = fetchedDonations
          .filter(d => d.status === 'completed')
          .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
        setTotal(completedSum);
      })
      .catch(() => {
        toast.error("Failed to load donations");
      })
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: "earth",
    completed: "green",
    failed: "red",
    refunded: "blue",
  };

  const filteredDonations = donations.filter((donation) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return [
      donation.isAnonymous ? 'anonymous' : donation.donorName,
      donation.email,
      donation.purpose,
      donation.status,
      donation.country,
      donation.phone,
      donation.paymentId,
      donation.orderId,
      donation.offeringType,
      donation.donationCategory,
      donation.message,
      donation.amount,
    ]
      .filter((value) => value !== undefined && value !== null)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800 flex items-center gap-3">
          Donations
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Total raised:{" "}
          <span className="font-bold text-saffron-600">
            ₹{total.toLocaleString()}
          </span>
        </p>
      </div>

      <div className="relative mb-6 max-w-full sm:max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
        <input
          type="text"
          placeholder="Search donations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 outline-none focus:border-saffron-400"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    "Donor",
                    "Email",
                    "Amount",
                    "Purpose",
                    "Status",
                    "Date",
                    "Actions"
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((d) => (
                    <React.Fragment key={d._id}>
                      <tr className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedDonationId === d._id ? 'bg-saffron-50/20' : ''}`} onClick={() => setExpandedDonationId(expandedDonationId === d._id ? null : d._id)}>
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {d.isAnonymous ? "Anonymous" : d.donorName}
                        </td>

                        <td className="px-4 py-3 text-gray-500">
                          {d.email}
                        </td>

                        <td className="px-4 py-3 font-bold text-saffron-600">
                          ₹{d.amount?.toLocaleString()}
                        </td>

                        <td className="px-4 py-3 capitalize text-gray-500">
                          {d.purpose?.replace(/-/g, " ")}
                        </td>

                        <td className="px-4 py-3">
                          <Badge color={statusColors[d.status] || "earth"}>
                            {d.status}
                          </Badge>
                        </td>

                        <td className="px-4 py-3 text-gray-400">
                          {d.createdAt
                            ? format(new Date(d.createdAt), "dd MMM yy")
                            : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-saffron-600 hover:text-saffron-700 font-semibold text-xs uppercase tracking-wider">
                            {expandedDonationId === d._id ? 'Hide' : 'Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedDonationId === d._id && (
                        <tr className="bg-gray-50/40">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-gray-700">
                              <div>
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Offering Type</p>
                                <span className="text-gray-800 font-medium">{d.offeringType || 'One Time'}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Donation Category</p>
                                <span className="text-gray-800 font-medium">{d.donationCategory || d.purpose || '—'}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Country</p>
                                <span className="text-gray-800 font-medium">{d.country || '—'}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Phone Number</p>
                                <span className="text-gray-800 font-medium">{d.phone || '—'}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Payment ID</p>
                                <span className="text-gray-855 text-gray-500 font-mono break-all">{d.paymentId || '—'}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Order ID</p>
                                <span className="text-gray-855 text-gray-500 font-mono break-all">{d.orderId || '—'}</span>
                              </div>
                              <div className="md:col-span-3">
                                <p className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mb-1">Message / Notes</p>
                                <div className="p-3 bg-white border border-gray-100 rounded-xl whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-xs md:text-sm shadow-inner">
                                  {d.message || <span className="text-gray-400 italic">No notes provided with this offering</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-10 text-center">
                      <div className="text-gray-400 font-medium">
                        No donation records available yet
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   TESTIMONIALS
========================= */

export function AdminTestimonials() {
  const [activeTab, setActiveTab] = useState('user');
  const getUserSubmittedTestimonials = async () => {
    const res = await testimonialsAPI.getAllAdmin();
    res.data.data = (res.data.data || []).filter((t) => t.isUserSubmitted === true);
    return res;
  };

  const getAdminCreatedTestimonials = async () => {
    const res = await testimonialsAPI.getAllAdmin();
    res.data.data = (res.data.data || []).filter((t) => t.isUserSubmitted === false);
    return res;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-2">
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-6">Testimonials</h1>
        <div className="flex border-b border-gray-200 gap-6">
          <button
            className={`pb-3 font-medium transition-colors ${activeTab === 'user' ? 'border-b-2 border-saffron-600 text-saffron-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('user')}
          >
            User Submitted
          </button>
          <button
            className={`pb-3 font-medium transition-colors ${activeTab === 'admin' ? 'border-b-2 border-saffron-600 text-saffron-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Created
          </button>
        </div>
      </div>
      <div>
        {activeTab === 'admin' ? (
          <div className="-mt-4">
            <AdminCRUD
              title="Admin Testimonials"
              fetchFn={getAdminCreatedTestimonials}
              createFn={testimonialsAPI.createAdmin}
              updateFn={testimonialsAPI.update}
              deleteFn={testimonialsAPI.delete}
              searchKey="name"
              preparePayload={(form) => ({ ...form, isUserSubmitted: false })}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'designation', label: 'Designation' },
                { key: 'program', label: 'Program' },
                { key: 'rating', label: 'Rating', render: (v) => '★'.repeat(v || 5) },
                { key: 'isApproved', label: 'Approved', render: (v) => <Badge color={v ? 'green' : 'red'}>{v ? 'Yes' : 'No'}</Badge> },
                { key: 'isFeatured', label: 'Featured', render: (v) => (v ? 'Yes' : 'No') },
              ]}
              defaultValues={{ name: '', designation: '', content: '', rating: 5, isApproved: true, isFeatured: false }}
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
          </div>
        ) : (
          <div className="-mt-4">
            <AdminCRUD
              title="User Testimonials"
              hideCreate={true}
              fetchFn={getUserSubmittedTestimonials}
              createFn={() => {}}
              updateFn={testimonialsAPI.update}
              deleteFn={testimonialsAPI.delete}
              searchKey="name"
              preparePayload={(form) => ({ ...form, isUserSubmitted: true })}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'program', label: 'Program' },
                { key: 'rating', label: 'Rating', render: (v) => '★'.repeat(v || 5) },
                { key: 'isApproved', label: 'Status', render: (v) => <Badge color={v ? 'green' : 'red'}>{v ? 'Approved' : 'Pending'}</Badge> },
                { key: 'isFeatured', label: 'Featured', render: (v) => (v ? 'Yes' : 'No') },
              ]}
              defaultValues={{ name: '', designation: '', content: '', rating: 5, isApproved: false, isFeatured: false }}
              formFields={[
                { name: 'name', label: 'Name', readOnly: true },
                { name: 'designation', label: 'Designation', readOnly: true },
                { name: 'location', label: 'Location', readOnly: true },
                { name: 'program', label: 'Program Attended', readOnly: true },
                { name: 'rating', label: 'Rating', type: 'select', options: ['1', '2', '3', '4', '5'], disabled: true },
                { name: 'content', label: 'Testimonial', type: 'textarea', fullWidth: true, readOnly: true },
                { name: 'isApproved', label: 'Approved', type: 'checkbox', checkLabel: 'Approve & publish' },
                { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   CONTACTS
========================= */

export function AdminContacts() {
  return (
    <AdminCRUD
      title="Contact Messages"
      // icon={<FaEnvelope />}
      fetchFn={contactAPI.getAll}
      createFn={() => Promise.resolve()}
      updateFn={contactAPI.update}
      deleteFn={contactAPI.delete}
      hideCreate={true}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type', render: (v) => <Badge color="earth">{v}</Badge> },
        { key: 'subject', label: 'Subject' },
        { key: 'createdAt', label: 'Date', render: (v) => (v ? format(new Date(v), 'dd MMM yy') : '—') },
      ]}
      defaultValues={{ name: '', email: '', phone: '', subject: '', message: '', reply: '' }}
      formFields={[
        { name: 'name', label: 'Name', readOnly: true },
        { name: 'email', label: 'Email', readOnly: true },
        { name: 'phone', label: 'Phone', readOnly: true },
        { name: 'subject', label: 'Subject', readOnly: true, fullWidth: true },
        { name: 'message', label: 'Message', type: 'textarea', fullWidth: true, readOnly: true },
      ]}
    />
  );
}

/* =========================
   MEDIA
========================= */

export function AdminMedia() {
  const prepareMediaPayload = async (form) => {
    const payload = { ...form };

    if (payload.imageFile instanceof File) {
      const uploadRes = await mediaAPI.uploadImage(payload.imageFile);
      payload.thumbnail = uploadRes.data?.data?.url || '';
    }

    if (payload.imageFiles?.length) {
      const uploadRes = await mediaAPI.uploadImages(payload.imageFiles);
      const uploadedUrls = (uploadRes.data?.data || []).map((item) => item.url).filter(Boolean);
      payload.gallery = uploadedUrls;

      if (!payload.thumbnail && uploadedUrls.length > 0) {
        payload.thumbnail = uploadedUrls[0];
      }
    }

    delete payload.imageFile;
      delete payload.imageFilePreview;
      delete payload.imageFiles;
      delete payload.imageFilesPreview;

    return payload;
  };

  return (
    <AdminCRUD
      title="Media"
      // icon={<FaPhotoVideo />}
      fetchFn={mediaAPI.getAllAdmin}
      createFn={mediaAPI.create}
      updateFn={mediaAPI.update}
      deleteFn={mediaAPI.delete}
      searchKey="title"
      preparePayload={prepareMediaPayload}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: (v) => <Badge color="blue">{v}</Badge> },
        { key: 'category', label: 'Category' },
        { key: 'isFeatured', label: 'Featured', render: (v) => (v ? 'Yes' : 'No') },
        { key: 'isActive', label: 'Status', render: (v) => <Badge color={v ? 'green' : 'red'}>{v ? 'Active' : 'Hidden'}</Badge> },
      ]}
      defaultValues={{ title: '', type: 'video', description: '', thumbnail: '', gallery: [], imageFile: null, imageFilePreview: '', imageFiles: [], imageFilesPreview: [], category: '', isFeatured: false, isActive: true }}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'type', label: 'Type', type: 'select', options: ['video', 'article', 'podcast', 'gallery', 'document'] },
        { name: 'category', label: 'Category' },
        { name: 'url', label: 'Resource / Video URL', fullWidth: true },
        { name: 'embedCode', label: 'Embed Code', type: 'textarea', fullWidth: true },
        { name: 'imageFile', label: 'Image Upload', type: 'file', fullWidth: true, urlKey: 'thumbnail', previewKey: 'imageFilePreview' },
        { name: 'imageFiles', label: 'Gallery Images', type: 'file', fullWidth: true, multiple: true, previewKey: 'imageFilesPreview', galleryKey: 'gallery' },
        { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & visible' },
      ]}
    />
  );
}
