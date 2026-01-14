import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGift,
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaCar,
  FaMotorcycle,
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaTimes,
  FaInfoCircle,
  FaShareAlt,
  FaHistory,
  FaStar
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LuckyDraw = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDraw, setSelectedDraw] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [ticketsCount, setTicketsCount] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock data for upcoming draws
  const upcomingDraws = [
    {
      id: 1,
      title: 'Car Lucky Draw',
      category: 'Cars',
      prize: 'Hyundai i10',
      prizeValue: 500000,
      drawDate: '2024-02-15',
      drawTime: '18:00',
      participants: 1250,
      maxParticipants: 5000,
      ticketPrice: 100,
      description: 'Win a brand new Hyundai i10! Purchase tickets to enter the draw.',
      icon: FaCar,
      color: 'blue',
      status: 'active'
    },
    {
      id: 2,
      title: 'Bike Lucky Draw',
      category: 'Bikes',
      prize: 'Honda Activa',
      prizeValue: 75000,
      drawDate: '2024-02-20',
      drawTime: '19:00',
      participants: 890,
      maxParticipants: 3000,
      ticketPrice: 50,
      description: 'Win a Honda Activa! Get your tickets now.',
      icon: FaMotorcycle,
      color: 'sky',
      status: 'active'
    },
    {
      id: 3,
      title: 'Premium Car Draw',
      category: 'Cars',
      prize: 'Maruti Swift',
      prizeValue: 650000,
      drawDate: '2024-02-25',
      drawTime: '20:00',
      participants: 2100,
      maxParticipants: 10000,
      ticketPrice: 200,
      description: 'Premium lucky draw for Maruti Swift. Limited tickets available!',
      icon: FaCar,
      color: 'cyan',
      status: 'active'
    }
  ];

  // Mock data for previous draws
  const previousDraws = [
    {
      id: 1,
      title: 'Car Lucky Draw',
      category: 'Cars',
      prize: 'Hyundai i10',
      drawDate: '2024-01-15',
      winner: 'Rajesh Kumar',
      winnerLocation: 'Delhi',
      participants: 2500,
      totalTickets: 5000
    },
    {
      id: 2,
      title: 'Bike Lucky Draw',
      category: 'Bikes',
      prize: 'Hero Splendor',
      drawDate: '2024-01-10',
      winner: 'Priya Sharma',
      winnerLocation: 'Mumbai',
      participants: 1780,
      totalTickets: 3560
    }
  ];

  // User's tickets
  const userTickets = [
    { id: 1, drawId: 1, drawTitle: 'Car Lucky Draw', ticketNumber: 'LD-2024-001-1234', purchaseDate: '2024-02-01', status: 'active' },
    { id: 2, drawId: 1, drawTitle: 'Car Lucky Draw', ticketNumber: 'LD-2024-001-1235', purchaseDate: '2024-02-01', status: 'active' },
    { id: 3, drawId: 2, drawTitle: 'Bike Lucky Draw', ticketNumber: 'LD-2024-002-0567', purchaseDate: '2024-02-05', status: 'active' }
  ];

  const handleParticipate = (draw) => {
    setSelectedDraw(draw);
    setIsParticipating(true);
  };

  const handlePurchaseTickets = () => {
    // Simulate ticket purchase
    setTimeout(() => {
      setIsParticipating(false);
      setShowSuccessModal(true);
      setSelectedDraw(null);
      setTicketsCount(1);
    }, 1500);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-gray-700',
        bgLight: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        gradient: 'from-gray-800 to-gray-900'
      },
      sky: {
        bg: 'bg-gray-700',
        bgLight: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        gradient: 'from-gray-800 to-gray-900'
      },
      cyan: {
        bg: 'bg-gray-700',
        bgLight: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        gradient: 'from-gray-800 to-gray-900'
      }
    };
    return colors[color] || colors.blue;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const calculateDaysRemaining = (drawDate) => {
    const today = new Date();
    const draw = new Date(drawDate);
    const diffTime = draw - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-5"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gray-300 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <FaGift className="text-2xl sm:text-3xl md:text-4xl text-gray-700 relative z-10" />
            </motion.div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
              Lucky Draw
            </h1>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Win amazing prizes! Participate in our exciting lucky draws for cars and bikes.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 justify-center">
          {[
            { id: 'upcoming', label: 'Upcoming Draws', icon: FaCalendarAlt },
            { id: 'mytickets', label: 'My Tickets', icon: FaTicketAlt },
            { id: 'winners', label: 'Winners', icon: FaTrophy },
            { id: 'history', label: 'History', icon: FaHistory }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Upcoming Draws Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {upcomingDraws.map((draw) => {
                const colors = getColorClasses(draw.color);
                const daysRemaining = calculateDaysRemaining(draw.drawDate);
                const progress = (draw.participants / draw.maxParticipants) * 100;

                return (
                  <motion.div
                    key={draw.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all relative group`}
                  >
                    {/* Header */}
                    <div className={`bg-gray-900 p-3 sm:p-4 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <draw.icon className="text-xl sm:text-2xl text-white drop-shadow-lg" />
                        <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                          {draw.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-0.5 relative z-10 text-white">{draw.title}</h3>
                      <p className="text-xs sm:text-sm text-white/90 relative z-10">{draw.prize}</p>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <div className="mb-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-600">Prize Value</span>
                          <span className={`text-sm sm:text-base font-bold ${colors.text} flex items-center gap-0.5`}>
                            <FaRupeeSign className="text-[10px] sm:text-xs" />
                            {draw.prizeValue.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-600">Draw Date</span>
                          <span className="text-[10px] sm:text-xs font-semibold text-gray-800">
                            {formatDate(draw.drawDate)} at {draw.drawTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-600">Days Remaining</span>
                          <span className={`text-xs sm:text-sm font-bold ${colors.text} flex items-center gap-1`}>
                            <FaClock className="text-[10px]" />
                            {daysRemaining} days
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] sm:text-xs text-gray-600">Participants</span>
                          <span className="text-[10px] sm:text-xs font-semibold text-gray-800">
                            {draw.participants.toLocaleString()} / {draw.maxParticipants.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full rounded-full bg-gray-900"
                          />
                        </div>
                      </div>

                      {/* Ticket Price */}
                      <div className={`${colors.bgLight} rounded-lg p-2 sm:p-3 mb-3 border ${colors.border}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-600">Ticket Price</span>
                          <span className={`text-base sm:text-lg md:text-xl font-bold ${colors.text} flex items-center gap-0.5`}>
                            <FaRupeeSign className="text-xs" />
                            {draw.ticketPrice}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleParticipate(draw)}
                        className="w-full bg-gray-900 text-white py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <FaTicketAlt className="text-xs sm:text-sm" />
                        Buy Tickets
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* My Tickets Tab */}
          {activeTab === 'mytickets' && (
            <motion.div
              key="mytickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-5"
            >
              {userTickets.length > 0 ? (
                <>
                  <div className="bg-gray-900 border border-gray-200 rounded-lg p-3 sm:p-4 text-white mb-3 sm:mb-4 relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-300 mb-0.5">Total Tickets</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">{userTickets.length}</p>
                      </div>
                      <FaTicketAlt className="text-3xl sm:text-4xl text-gray-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {userTickets.map((ticket) => {
                      const draw = upcomingDraws.find(d => d.id === ticket.drawId);
                      const colors = draw ? getColorClasses(draw.color) : getColorClasses('blue');

                      return (
                        <motion.div
                          key={ticket.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg hover:border-gray-400 transition-all group"
                        >
                          <div className="flex items-start justify-between mb-2.5">
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">{ticket.drawTitle}</h4>
                              <p className="text-[10px] sm:text-xs text-gray-600">Ticket #{ticket.ticketNumber}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 border border-gray-200">
                              {ticket.status}
                            </span>
                          </div>
                          <div className="space-y-1.5 mb-3">
                            <div className="flex items-center justify-between text-[10px] sm:text-xs">
                              <span className="text-gray-600">Purchase Date:</span>
                              <span className="font-medium text-gray-800">{formatDate(ticket.purchaseDate)}</span>
                            </div>
                            {draw && (
                              <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                <span className="text-gray-600">Draw Date:</span>
                                <span className="font-medium text-gray-800">{formatDate(draw.drawDate)}</span>
                              </div>
                            )}
                          </div>
                          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 sm:py-2 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-400">
                            <FaShareAlt className="text-xs" />
                            Share Ticket
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FaTicketAlt className="text-4xl sm:text-5xl text-gray-300 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-1.5">No Tickets Yet</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">Purchase tickets from upcoming draws to participate!</p>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className="bg-gray-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-800 transition-colors"
                  >
                    View Upcoming Draws
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Winners Tab */}
          {activeTab === 'winners' && (
            <motion.div
              key="winners"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-5"
            >
              {previousDraws.map((draw) => (
                <motion.div
                  key={draw.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg hover:border-gray-400 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                    <div className="bg-gray-900 rounded-full p-2.5 sm:p-3">
                      <FaTrophy className="text-xl sm:text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{draw.title}</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          Completed
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                          <FaGift className="text-gray-600 text-xs" />
                          <span className="font-medium text-gray-800">Prize: {draw.prize}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                          <FaTrophy className="text-gray-600 text-xs" />
                          <span className="font-medium text-gray-800">Winner: {draw.winner}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <FaCalendarAlt className="text-[10px]" />
                          <span>Draw Date: {formatDate(draw.drawDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <FaUsers className="text-[10px]" />
                          <span>{draw.participants.toLocaleString()} participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-5"
            >
              {previousDraws.map((draw) => (
                <motion.div
                  key={draw.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg hover:border-gray-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{draw.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {formatDate(draw.drawDate)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-600 text-[10px] sm:text-xs mb-0.5">Prize</p>
                      <p className="font-medium text-gray-800">{draw.prize}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-[10px] sm:text-xs mb-0.5">Participants</p>
                      <p className="font-medium text-gray-800">{draw.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-[10px] sm:text-xs mb-0.5">Total Tickets</p>
                      <p className="font-medium text-gray-800">{draw.totalTickets.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Participation Modal */}
        <AnimatePresence>
          {isParticipating && selectedDraw && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setIsParticipating(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Purchase Tickets</h3>
                  <button
                    onClick={() => setIsParticipating(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <div className="mb-3">
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 text-white mb-3 relative overflow-hidden">
                    <h4 className="text-base sm:text-lg font-semibold mb-1 relative z-10">{selectedDraw.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-300 relative z-10">{selectedDraw.prize}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Number of Tickets
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTicketsCount(Math.max(1, ticketsCount - 1))}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-semibold text-gray-700 transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={ticketsCount}
                          onChange={(e) => setTicketsCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                          className="flex-1 text-center text-base sm:text-lg font-semibold border border-gray-300 rounded-lg py-1.5 focus:border-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                        <button
                          onClick={() => setTicketsCount(Math.min(10, ticketsCount + 1))}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-semibold text-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-sm text-gray-600">Ticket Price</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          ₹{selectedDraw.ticketPrice} × {ticketsCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-gray-200">
                        <span className="text-sm sm:text-base font-semibold text-gray-900">Total Amount</span>
                        <span className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-0.5">
                          <FaRupeeSign className="text-sm" />
                          {(selectedDraw.ticketPrice * ticketsCount).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePurchaseTickets}
                  className="w-full bg-gray-900 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <FaTicketAlt className="text-xs sm:text-sm" />
                  Purchase Tickets
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 sm:p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-200"
                >
                  <FaCheckCircle className="text-2xl sm:text-3xl text-gray-700" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5">Tickets Purchased!</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Your tickets have been successfully purchased. Good luck!
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setActiveTab('mytickets');
                  }}
                  className="w-full bg-gray-900 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors active:scale-95"
                >
                  View My Tickets
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LuckyDraw;

