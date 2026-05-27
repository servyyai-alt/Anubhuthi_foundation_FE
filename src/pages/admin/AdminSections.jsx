import React, { useEffect, useState } from 'react';
import { FaBookOpen, FaCalendarAlt, FaMountain, FaBriefcase, FaHandsHelping, FaDonate, FaQuoteLeft, FaEnvelope, FaPhotoVideo } from 'react-icons/fa';
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

    delete payload.imageFile;
    delete payload.imageFilePreview;

    return payload;
  };

  return (
    <AdminCRUD
      title="Programs"
      // icon={<FaBookOpen />}
      fetchFn={programsAPI.getAll}
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
        { name: 'instructor', label: 'Instructor Name' },
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
  return (
    <AdminCRUD
      title="Events"
      // icon={<FaCalendarAlt />}
      fetchFn={eventsAPI.getAll}
      createFn={eventsAPI.create}
      updateFn={eventsAPI.update}
      deleteFn={eventsAPI.delete}
      searchKey="title"
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
      fetchFn={retreatsAPI.getAll}
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
  return (
    <AdminCRUD
      title="Careers"
      // icon={<FaBriefcase />}
      fetchFn={careersAPI.getAll}
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
        isRemote: false,
        isActive: true,
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
        { name: 'isRemote', label: 'Remote', type: 'checkbox', checkLabel: 'Remote work allowed' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & accepting applications' },
      ]}
    />
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

  return (
    <AdminCRUD
      title="Volunteers"
      // icon={<FaHandsHelping />}
      fetchFn={() => volunteersAPI.getAll()}
      createFn={() => Promise.resolve()}
      updateFn={volunteersAPI.update}
      deleteFn={volunteersAPI.delete}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type', render: (v) => <Badge color="saffron">{v}</Badge> },
        { key: 'city', label: 'City' },
        { key: 'availability', label: 'Availability' },
        { key: 'status', label: 'Status', render: (v) => <Badge color={statusColors[v] || 'earth'}>{v}</Badge> },
        { key: 'createdAt', label: 'Applied', render: (v) => (v ? format(new Date(v), 'dd MMM yy') : 'â€”') },
      ]}
      defaultValues={{ status: 'pending', notes: '' }}
      formFields={[
        { name: 'status', label: 'Status', type: 'select', options: ['pending', 'reviewing', 'accepted', 'rejected'] },
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

  useEffect(() => {
    donationsAPI
      .getAll()
      .then((res) => {
        setDonations(res.data.data || []);
        setTotal(res.data.totalAmount || 0);
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    "Donor",
                    "Email",
                    "Amount",
                    "Purpose",
                    "Status",
                    "Date",
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
                {donations.length > 0 ? (
                  donations.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-50">
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-10 text-center">
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
  return (
    <AdminCRUD
      title="Testimonials"
      // icon={<FaQuoteLeft />}
      fetchFn={testimonialsAPI.getAllAdmin}
      createFn={testimonialsAPI.create}
      updateFn={testimonialsAPI.update}
      deleteFn={testimonialsAPI.delete}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'designation', label: 'Designation' },
        { key: 'program', label: 'Program' },
        { key: 'rating', label: 'Rating', render: (v) => 'â­'.repeat(v || 5) },
        { key: 'isApproved', label: 'Approved', render: (v) => <Badge color={v ? 'green' : 'red'}>{v ? 'Yes' : 'Pending'}</Badge> },
        { key: 'isFeatured', label: 'Featured', render: (v) => (v ? 'Yes' : 'No') },
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

/* =========================
   CONTACTS
========================= */

export function AdminContacts() {
  const statusColors = { new: 'saffron', read: 'blue', replied: 'green', closed: 'earth' };

  return (
    <AdminCRUD
      title="Contact Messages"
      // icon={<FaEnvelope />}
      fetchFn={contactAPI.getAll}
      createFn={() => Promise.resolve()}
      updateFn={contactAPI.update}
      deleteFn={contactAPI.delete}
      searchKey="name"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type', render: (v) => <Badge color="earth">{v}</Badge> },
        { key: 'subject', label: 'Subject' },
        { key: 'status', label: 'Status', render: (v) => <Badge color={statusColors[v] || 'earth'}>{v}</Badge> },
        { key: 'createdAt', label: 'Date', render: (v) => (v ? format(new Date(v), 'dd MMM yy') : 'â€”') },
      ]}
      defaultValues={{ status: 'new', reply: '' }}
      formFields={[
        { name: 'status', label: 'Status', type: 'select', options: ['new', 'read', 'replied', 'closed'] },
        { name: 'reply', label: 'Internal Reply Notes', type: 'textarea', fullWidth: true },
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
    delete payload.url;

    return payload;
  };

  return (
    <AdminCRUD
      title="Media"
      // icon={<FaPhotoVideo />}
      fetchFn={() => mediaAPI.getAll()}
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
        { name: 'imageFile', label: 'Image Upload', type: 'file', fullWidth: true, urlKey: 'thumbnail', previewKey: 'imageFilePreview' },
        { name: 'imageFiles', label: 'Gallery Images', type: 'file', fullWidth: true, multiple: true, previewKey: 'imageFilesPreview', galleryKey: 'gallery' },
        { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox', checkLabel: 'Show as featured' },
        { name: 'isActive', label: 'Active', type: 'checkbox', checkLabel: 'Published & visible' },
      ]}
    />
  );
}
