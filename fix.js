const fs = require('fs');

// 1. StaticPages.jsx
let staticContent = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/StaticPages.jsx', 'utf8');
staticContent = staticContent.replace(
  /<p className="text-gray-400 text-sm italic font-light">\s*\(Subject to updates\)\s*<\/p>/g,
  ''
);
fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/StaticPages.jsx', staticContent);

// 2. ProgramsPage.jsx
let progContent = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/ProgramsPage.jsx', 'utf8');
progContent = progContent.replace(/h-\[300px\]/g, 'h-full min-h-[420px]');
progContent = progContent.replace(/h-32/g, 'h-56 shrink-0');
fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/ProgramsPage.jsx', progContent);

// 3. HomeSections.jsx
let homeContent = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/components/sections/HomeSections.jsx', 'utf8');
homeContent = homeContent.replace(
  /h-\[360px\]/g,
  'h-full min-h-[420px]'
);
homeContent = homeContent.replace(
  /<div className="h-40 bg-gradient-to-br/g,
  '<div className="h-56 shrink-0 bg-gradient-to-br'
);
homeContent = homeContent.replace(
  /<div className="h-40 bg-earth-100\/30/g,
  '<div className="h-56 shrink-0 bg-earth-100\/30'
);
fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/components/sections/HomeSections.jsx', homeContent);

// 4. EventsPage.jsx
let eventsContent = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', 'utf8');
eventsContent = eventsContent.replace(
  /className="relative h-32 w-full overflow-hidden bg-white sm:h-36"/g,
  'className="relative h-48 w-full overflow-hidden bg-white sm:h-56 shrink-0"'
);
eventsContent = eventsContent.replace(
  /object-contain object-center/g,
  'object-cover object-center'
);
fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', eventsContent);

// 5. ContactPage.jsx
let contactContent = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/ContactPage.jsx', 'utf8');
contactContent = contactContent.replace(
  /import contactFounderPortrait from '\.\.\/assets\/contact_founder_portrait\.png';/g,
  "import contactFounderPortrait from '../assets/hero-section.png';"
);
contactContent = contactContent.replace(
  /FaPhone,/g,
  'FaPhoneAlt as FaPhone,'
);
fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/ContactPage.jsx', contactContent);

console.log('All changes applied!');
