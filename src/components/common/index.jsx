import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

// Primary Button
export const Button = ({ children, variant = 'primary', size = 'md', className = '', loading = false, ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-saffron-500 text-white hover:bg-saffron-600 shadow-saffron hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-earth-700 text-white hover:bg-earth-800 hover:-translate-y-0.5',
    outline: 'border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50',
    ghost: 'text-earth-700 hover:bg-earth-100',
    white: 'bg-white text-earth-800 hover:bg-saffron-50 shadow-warm',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading} {...props}>
      {loading && <FaSpinner className="animate-spin" />}
      {children}
    </button>
  );
};

// Link Button
export const LinkButton = ({ children, to, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200';
  const variants = {
    primary: 'bg-saffron-500 text-white hover:bg-saffron-600 shadow-saffron hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-earth-700 text-white hover:bg-earth-800',
    outline: 'border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50',
    ghost: 'text-earth-700 hover:bg-earth-100',
    white: 'bg-white text-earth-800 hover:bg-saffron-50 shadow-warm',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Link>
  );
};

// Section Title
export const SectionTitle = ({ subtitle, title, description, center = false, light = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    {subtitle && (
      <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${light ? 'text-saffron-300' : 'text-saffron-500'}`}> {subtitle} </p>
    )}
    <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${light ? 'text-white' : 'text-earth-800'}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-lg leading-relaxed max-w-3xl ${center ? 'mx-auto' : ''} ${light ? 'text-earth-200' : 'text-earth-500'}`}>
        {description}
      </p>
    )}
  </div>
);

// Card
export const Card = ({ children, className = '', hover = true }) => (
  <div className={`bg-white rounded-2xl shadow-warm overflow-hidden ${hover ? 'card-hover' : ''} ${className}`}>
    {children}
  </div>
);

// Loading Spinner
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-2 border-saffron-200 border-t-saffron-500 rounded-full animate-spin ${className}`} />
  );
};

// Loading Page
export const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-64 py-20">
    <div className="text-center">
      <Spinner size="lg" className="mx-auto mb-4" />
      <p className="text-earth-500">Loading...</p>
    </div>
  </div>
);

// Error Message
export const ErrorMsg = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
    {message || 'Something went wrong. Please try again.'}
  </div>
);

// Form Input
export const FormInput = ({ label, error, className = '', required, ...props }) => (
  <div className={className}>
    {label && (
      <label className="block text-sm font-medium text-earth-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 font-bold ml-1">*</span>}
      </label>
    )}
    <input
      required={required}
      className={`w-full px-4 py-3 bg-white border rounded-xl text-earth-800 placeholder-earth-300 outline-none transition-colors
        ${error ? 'border-red-400 focus:border-red-500' : 'border-earth-200 focus:border-saffron-400'}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Form Textarea
export const FormTextarea = ({ label, error, className = '', rows = 4, required, ...props }) => (
  <div className={className}>
    {label && (
      <label className="block text-sm font-medium text-earth-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 font-bold ml-1">*</span>}
      </label>
    )}
    <textarea
      rows={rows}
      required={required}
      className={`w-full px-4 py-3 bg-white border rounded-xl text-earth-800 placeholder-earth-300 outline-none transition-colors resize-none
        ${error ? 'border-red-400 focus:border-red-500' : 'border-earth-200 focus:border-saffron-400'}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Form Select
export const FormSelect = ({ label, error, className = '', children, required, ...props }) => (
  <div className={className}>
    {label && (
      <label className="block text-sm font-medium text-earth-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 font-bold ml-1">*</span>}
      </label>
    )}
    <select
      required={required}
      className={`w-full px-4 py-3 bg-white border rounded-xl text-earth-800 outline-none transition-colors
        ${error ? 'border-red-400 focus:border-red-500' : 'border-earth-200 focus:border-saffron-400'}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Badge
export const Badge = ({ children, color = 'saffron' }) => {
  const colors = {
    saffron: 'bg-saffron-100 text-saffron-700',
    earth: 'bg-earth-100 text-earth-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// Lotus Divider
export const LotusDivider = ({ text = '❈' }) => (
  <div className="lotus-divider my-8">
    <span className="text-saffron-400 text-xl">{text}</span>
  </div>
);

// Page Header
export const PageHeader = ({ title, subtitle, breadcrumb, bg = 'parchment' }) => (
  <div className={`pt-28 pb-16 ${bg === 'dark' ? 'bg-earth-900 text-white' : 'bg-parchment'} mandala-bg`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {breadcrumb && (
        <nav className="text-sm text-earth-400 mb-4">
          {breadcrumb.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">›</span>}
              {item.path ? <Link to={item.path} className="hover:text-saffron-500">{item.label}</Link> : item.label}
            </span>
          ))}
        </nav>
      )}
      {subtitle && <p className="text-saffron-500 text-sm font-semibold tracking-widest uppercase mb-3"> {subtitle} </p>}
      <h1 className={`font-serif text-4xl md:text-5xl font-bold ${bg === 'dark' ? 'text-white' : 'text-earth-800'}`}>{title}</h1>
    </div>
  </div>
);

// Empty State
export const EmptyState = ({ icon = '🤷', title, description }) => (
  <div className="text-center py-16">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="font-serif text-xl text-earth-700 mb-2">{title}</h3>
    {description && <p className="text-earth-400">{description}</p>}
  </div>
);
