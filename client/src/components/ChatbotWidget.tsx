// client/src/components/ChatbotWidget.tsx

import { useState } from 'react';
import { getBotReply } from '../api/chatbot';
import toast from 'react-hot-toast';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await getBotReply(input);
      const botMessage: Message = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error('AI is offline. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-600 focus:outline-none"
      >
        Chat
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 h-96 bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-gray-700">
      <div className="flex justify-between items-center p-3 bg-gray-700 rounded-t-lg">
        <h3 className="font-bold text-white">CampusConnect Bot</h3>
        <button onClick={() => setIsOpen(false)} className="text-white">&times;</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-400">Bot is typing...</p>}
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
        />
      </form>
    </div>
  );
};

export default ChatbotWidget;