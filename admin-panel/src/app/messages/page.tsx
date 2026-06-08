'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { Mail, Trash2, MailOpen } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', { credentials: 'include' });
      const data = await res.json();
      if (data.success) setMessages(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE', credentials: 'include' });
    if (selected?._id === id) setSelected(null);
    fetchMessages();
  };

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    if (!msg.isRead) {
      await fetch(`/api/contact/${msg._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isRead: true })
      });
      fetchMessages();
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Messages</h2>
          <p className="text-slate-500">
            {unreadCount > 0
              ? <span className="text-blue-600 font-semibold">{unreadCount} unread</span>
              : 'All messages read'} from your contact form
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Message List */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-slate-400 p-8">
                <Mail className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => openMessage(msg)}
                  className={`p-4 border-b border-slate-50 cursor-pointer transition-colors ${
                    selected?._id === msg._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-semibold text-sm truncate ${!msg.isRead ? 'text-slate-900' : 'text-slate-500'}`}>
                      {msg.name}
                    </span>
                    {!msg.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></span>}
                  </div>
                  <p className={`text-xs truncate ${!msg.isRead ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            {selected ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{selected.subject}</h3>
                    <div className="flex items-center space-x-3 text-sm text-slate-500">
                      <span className="font-medium text-slate-700">{selected.name}</span>
                      <span>•</span>
                      <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a>
                      <span>•</span>
                      <span>{new Date(selected.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">{selected.message}</p>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="mt-6 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors self-start"
                >
                  <Mail className="w-4 h-4 mr-2" /> Reply via Email
                </a>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <MailOpen className="w-16 h-16 mb-4" />
                <p className="text-lg font-medium">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
