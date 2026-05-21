//EventsList
export default function EventList({ events, onSelect }) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-400 text-sm">
        No events yet. Create one!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Events</h2>
      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {event.description}
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  📍 {event.lat}, {event.lng}
                </p>
              </div>
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => onSelect(event)}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  View
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
