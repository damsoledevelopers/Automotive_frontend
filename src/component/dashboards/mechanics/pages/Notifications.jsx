import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTrash, FaCheck } from 'react-icons/fa';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'job_update',
            title: 'Customer Approved Parts',
            message: 'Customer for Job #88219 has approved all parts. You can now start ordering.',
            time: '10 minutes ago',
            read: false,
            severity: 'success'
        },
        {
            id: 2,
            type: 'appointment',
            title: 'New Appointment Request',
            message: 'A new service appointment has been requested for a Honda Civic on Jan 18th.',
            time: '1 hour ago',
            read: false,
            severity: 'info'
        },
        {
            id: 3,
            type: 'parts',
            title: 'Parts Delay Alert',
            message: 'Brake pads for Job #22104 are delayed by the supplier.',
            time: '3 hours ago',
            read: true,
            severity: 'warning'
        },
        {
            id: 4,
            type: 'payment',
            title: 'Payment Received',
            message: 'Payment for Job #21901 has been confirmed via UPI.',
            time: '5 hours ago',
            read: true,
            severity: 'success'
        }
    ]);

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (severity) => {
        switch (severity) {
            case 'success': return <FaCheckCircle className="text-green-500" />;
            case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
            case 'info': return <FaInfoCircle className="text-blue-500" />;
            default: return <FaBell className="text-gray-500" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {notifications.filter(n => !n.read).length} New
                    </span>
                </div>
                <button
                    onClick={markAllRead}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                    <FaCheck /> Mark all as read
                </button>
            </div>

            <div className="space-y-3">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 border rounded-xl shadow-sm transition-all hover:shadow-md flex items-start justify-between gap-4 ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'
                                }`}
                        >
                            <div className="flex gap-4">
                                <div className="mt-1 text-xl">
                                    {getIcon(notification.severity)}
                                </div>
                                <div>
                                    <h4 className={`font-bold ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                                        {notification.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase mt-2 block tracking-wider">
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {!notification.read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                        title="Mark as read"
                                    >
                                        <FaCheck size={14} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white border rounded-xl border-dashed">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBell className="text-gray-400 text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Notifications</h3>
                        <p className="text-gray-500 text-sm mt-1">You're all caught up! Check back later for updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
