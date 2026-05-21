/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { getEvents } from './api/eventsApi';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventMap from './components/EventMap';

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          📍 Events App
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel */}
          <div className="flex flex-col gap-6">
            <EventForm onEventCreated={fetchEvents} />
            <EventList
              events={events}
              onSelect={(event) => setSelectedEvent(event)}
              onDeleted={fetchEvents}
            />
          </div>

          {/* Map panel */}
          <div className="lg:col-span-2">
            <EventMap events={events} selected={selectedEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}