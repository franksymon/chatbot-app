import { useState } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { Plus, MessageSquare } from 'lucide-react';

function App() {
  const [currentSessionId, setCurrentSessionId] = useState('default');
  const [sessions] = useState([
    { id: 'default', name: 'Sesión General' },
    { id: 'paciente_001', name: 'Paciente 001' },
    { id: 'paciente_002', name: 'Paciente 002' },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Medea Mind
          </h2>
          <button className="w-full px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center justify-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Nueva Sesión
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sesiones</h3>
          <div className="space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setCurrentSessionId(session.id)}
                className={`w-full px-3 py-2 text-left rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  currentSessionId === session.id
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                {session.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p className="mb-1">Chatbot para Psicólogos</p>
            <p>Versión 1.0.0</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        <ChatContainer sessionId={currentSessionId} />
      </div>
    </div>
  );
}

export default App;
