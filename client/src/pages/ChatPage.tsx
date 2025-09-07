// client/src/pages/ChatPage.tsx

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, type User } from '../api/users';
import { getMessages, sendMessage, type Message } from '../api/messages'; // We'll create this API file
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

const ChatPage = () => {
    const { user: currentUser, socket } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch all users to display in the sidebar
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                toast.error("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Fetch message history when a user is selected
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return;
            try {
                const data = await getMessages(selectedUser._id);
                setMessages(data);
            } catch (error) {
                toast.error("Failed to fetch messages.");
            }
        };
        fetchMessages();
    }, [selectedUser]);

    // Listen for incoming real-time messages
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });
        return () => { socket?.off("newMessage"); };
    }, [socket, selectedUser]);

    // Scroll to the bottom of the chat window
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;
        try {
            // Send message via API to save it to DB
            await sendMessage(selectedUser._id, newMessage);

            // Send message via socket for real-time update
            socket?.emit("sendMessage", {
                receiverId: selectedUser._id,
                message: newMessage,
            });

            // Add our own message to the chat window immediately
            setMessages([...messages, {
                _id: Date.now().toString(), // Temporary ID
                senderId: currentUser!.id,
                receiverId: selectedUser._id,
                message: newMessage,
                createdAt: new Date().toISOString()
            }]);

            setNewMessage('');
        } catch (error) {
            toast.error("Failed to send message.");
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="container mx-auto p-4 h-[calc(100vh-80px)]">
            <div className="flex h-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                {/* User List Sidebar */}
                <div className="w-1/3 border-r border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-white">Contacts</h2>
                    </div>
                    <ul className="overflow-y-auto">
                        {users.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 cursor-pointer hover:bg-gray-700 ${selectedUser?._id === user._id ? 'bg-cyan-600' : ''}`}
                            >
                                <p className="text-white">{user.username}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat Window */}
                <div className="w-2/3 flex flex-col">
                    {selectedUser ? (
                        <>
                            <div className="p-4 border-b border-gray-700">
                                <h2 className="text-xl font-bold text-white">{selectedUser.username}</h2>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto">
                                {messages.map((msg) => (
                                    <div key={msg._id} className={`flex mb-4 ${msg.senderId === currentUser!.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`rounded-lg p-3 max-w-lg ${msg.senderId === currentUser!.id ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex gap-2">
                                <Input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                />
                                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">Send</Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">Select a user to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;