const fs = require('fs');
let eventsContent = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', 'utf8');

const eventCardStart = eventsContent.indexOf('function EventCard({ event, index, isActive, isHovered, onHover, onLeave, expanded, onToggleExpand }) {');

if (eventCardStart !== -1) {
  const openBrace = eventsContent.indexOf('{', eventCardStart);
  const timelineViewStart = eventsContent.indexOf('function TimelineView({', eventCardStart);
  
  if (timelineViewStart !== -1) {
    const replacement = fs.readFileSync('new_event_card.txt', 'utf8');
    const newEventCard = 'function EventCard({ event, index, isActive, isHovered, onHover, onLeave, expanded, onToggleExpand }) {\n' + replacement;
    
    eventsContent = eventsContent.substring(0, eventCardStart) + newEventCard + eventsContent.substring(timelineViewStart);
    fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', eventsContent);
    console.log('EventsPage updated!');
  } else {
    console.log('TimelineView function not found');
  }
} else {
  console.log('EventCard function not found');
}
