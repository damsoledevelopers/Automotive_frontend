import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaWrench, FaCar, FaDollarSign, FaClock, FaQuestionCircle } from 'react-icons/fa';

const ChatbotSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your automotive assistant. How can I help you with your vehicle today?',
      options: ['Book a service', 'Check service prices', 'Track my booking', 'Car problems', 'General questions']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Comprehensive knowledge base
  const knowledgeBase = {
    // Service related
    services: {
      'oil change': {
        content: 'Oil change service typically costs ₹800-₹1,500 depending on oil type. Recommended every 5,000-7,500 km or 6 months.',
        options: ['Book oil change', 'Check other services', 'Maintenance schedule']
      },
      'brake service': {
        content: 'Brake service includes pad replacement (₹1,500-₹4,000) and disc machining (₹800-₹2,000). Recommended when you hear squeaking or feel vibration.',
        options: ['Book brake service', 'Check brake prices', 'Emergency brake help']
      },
      'tire rotation': {
        content: 'Tire rotation costs ₹300-₹800. Recommended every 10,000 km to ensure even tire wear and better performance.',
        options: ['Book tire rotation', 'Tire prices', 'Wheel alignment']
      },
      'ac service': {
        content: 'AC service includes gas refill (₹1,200-₹2,500) and cleaning (₹800-₹1,500). Recommended annually or when cooling reduces.',
        options: ['Book AC service', 'AC problem diagnosis', 'Check prices']
      },
      'battery replacement': {
        content: 'Battery replacement costs ₹3,000-₹8,000 depending on brand and capacity. Typical lifespan: 2-4 years.',
        options: ['Book battery service', 'Battery prices', 'Jump start service']
      }
    },

    // Problems and diagnostics
    problems: {
      'engine not starting': {
        content: 'Could be battery (check lights), starter motor, or fuel system issue. Try jump start first. Emergency service available.',
        options: ['Emergency help', 'Battery check', 'Tow service']
      },
      'strange noise': {
        content: 'Describe the noise: Squealing (belts), grinding (brakes), knocking (engine), or rattling (suspension)?',
        options: ['Describe noise', 'Book inspection', 'Emergency help']
      },
      'overheating': {
        content: 'Immediately turn off AC and turn on heater. Check coolant level when cool. Do not drive if severely overheating.',
        options: ['Emergency help', 'Coolant service', 'Tow service']
      },
      'check engine light': {
        content: 'Could be various issues from loose gas cap to serious engine problems. Get diagnostic scan for exact code.',
        options: ['Book diagnostic', 'Check prices', 'Emergency help']
      },
      'brake problems': {
        content: 'Soft pedal (air in lines), pulling (stuck caliper), noise (worn pads). Get immediate inspection for safety.',
        options: ['Brake inspection', 'Emergency service', 'Check prices']
      }
    },

    // Pricing information
    pricing: {
      'service costs': {
        content: 'Basic service: ₹1,500-₹3,000 | Comprehensive: ₹3,000-₹6,000 | Major service: ₹5,000-₹10,000+',
        options: ['Book service', 'Compare packages', 'Special offers']
      },
      'parts prices': {
        content: 'Oil filter: ₹200-₹500 | Air filter: ₹300-₹800 | Brake pads: ₹1,500-₹4,000 | Battery: ₹3,000-₹8,000',
        options: ['Buy parts', 'Installation service', 'Check availability']
      },
      'labor charges': {
        content: 'Basic labor: ₹300-₹800/hour | Specialist: ₹500-₹1,200/hour | Emergency: ₹800-₹2,000/hour',
        options: ['Book service', 'Compare mechanics', 'Membership benefits']
      }
    },

    // General information
    general: {
      'opening hours': {
        content: 'We\'re open 24/7 for emergency services. Regular services: 8 AM - 8 PM. Support available 24/7.',
        options: ['Book now', 'Emergency contact', 'Location finder']
      },
      'contact support': {
        content: 'Call: 1800-123-4567 | WhatsApp: +91-9876543210 | Email: support@sparelo.com',
        options: ['Call now', 'WhatsApp chat', 'Email support']
      },
      'warranty': {
        content: 'Services: 30-90 days warranty | Parts: 6 months-2 years | Labor: 90 days warranty',
        options: ['Claim warranty', 'Terms & conditions', 'Contact support']
      },
      'membership benefits': {
        content: 'Premium: 20% discount, free pickup/drop | Gold: 15% discount | Basic: 10% discount on services',
        options: ['Join now', 'Compare plans', 'Benefits details']
      }
    },

    // Booking and tracking
    booking: {
      'how to book': {
        content: 'You can book through: 1) This chat 2) Mobile app 3) Website 4) Phone call. Instant confirmation provided.',
        options: ['Book now', 'Download app', 'Visit website']
      },
      'track booking': {
        content: 'Provide your booking ID or phone number. You can track real-time status with mechanic details.',
        options: ['Track now', 'Booking history', 'Contact mechanic']
      },
      'cancel booking': {
        content: 'Free cancellation up to 2 hours before service. 50% charge within 2 hours. Emergency: non-refundable.',
        options: ['Cancel booking', 'Reschedule', 'Contact support']
      },
      'reschedule': {
        content: 'You can reschedule up to 2 hours before appointment at no charge through app, website, or this chat.',
        options: ['Reschedule now', 'Check availability', 'Contact support']
      }
    },

    // Emergency services
    emergency: {
      'breakdown': {
        content: 'Emergency roadside assistance available 24/7. Average response time: 30 minutes. Services: jump start, tire change, fuel delivery, towing.',
        options: ['Request help now', 'Track assistance', 'Contact directly']
      },
      'accident': {
        content: 'First, ensure safety. Call police if needed. We provide: tow service, insurance support, repair coordination.',
        options: ['Emergency tow', 'Insurance help', 'Repair booking']
      },
      'lockout': {
        content: 'Lockout service available 24/7. Technician will reach within 45 minutes. ID verification required.',
        options: ['Unlock service', 'Track technician', 'Contact support']
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to find the best matching response
  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for exact matches in knowledge base categories
    for (const [, items] of Object.entries(knowledgeBase)) {
      for (const [key, response] of Object.entries(items)) {
        if (input.includes(key)) {
          return response;
        }
      }
    }

    // Check for partial matches and synonyms
    const partialMatches = {
      // Service related
      'oil': 'oil change',
      'lubricant': 'oil change',
      'engine oil': 'oil change',
      'brake': 'brake service',
      'pad': 'brake service',
      'disc': 'brake service',
      'tire': 'tire rotation',
      'tyre': 'tire rotation',
      'wheel': 'tire rotation',
      'ac': 'ac service',
      'air conditioning': 'ac service',
      'cooling': 'ac service',
      'battery': 'battery replacement',
      
      // Problems
      'start': 'engine not starting',
      'noise': 'strange noise',
      'sound': 'strange noise',
      'hot': 'overheating',
      'temperature': 'overheating',
      'engine light': 'check engine light',
      'warning light': 'check engine light',
      
      // Pricing
      'cost': 'service costs',
      'price': 'service costs',
      'charge': 'service costs',
      'expensive': 'service costs',
      'cheap': 'service costs',
      'labor': 'labor charges',
      
      // General
      'time': 'opening hours',
      'hour': 'opening hours',
      'open': 'opening hours',
      'close': 'opening hours',
      'phone': 'contact support',
      'call': 'contact support',
      'email': 'contact support',
      'warranty': 'warranty',
      'guarantee': 'warranty',
      'member': 'membership benefits',
      'subscription': 'membership benefits',
      
      // Booking
      'appointment': 'how to book',
      'schedule': 'how to book',
      'reserve': 'how to book',
      'status': 'track booking',
      'where': 'track booking',
      'cancel': 'cancel booking',
      'reschedule': 'reschedule',
      
      // Emergency
      'breakdown': 'breakdown',
      'stuck': 'breakdown',
      'stranded': 'breakdown',
      'accident': 'accident',
      'crash': 'accident',
      'collision': 'accident',
      'lock': 'lockout',
      'key': 'lockout',
      'locked': 'lockout'
    };

    for (const [keyword, match] of Object.entries(partialMatches)) {
      if (input.includes(keyword)) {
        for (const [, items] of Object.entries(knowledgeBase)) {
          if (items[match]) {
            return items[match];
          }
        }
      }
    }

    // Default response for unknown queries
    return {
      content: "I understand you're asking about: '" + userInput + "'. While I specialize in automotive services, let me connect you with our human support team for detailed assistance.",
      options: ['Talk to human support', 'Book a service', 'Check prices', 'Emergency help']
    };
  };

  const handleSendMessage = async (content) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      let botResponse;

      // Check for predefined quick responses
      switch (content.toLowerCase()) {
        case 'book a service':
          botResponse = {
            type: 'bot',
            content: 'What type of service would you like to book?',
            options: ['Regular maintenance', 'Repair work', 'Diagnostic check', 'AC service', 'Battery replacement', 'Other']
          };
          break;
        case 'check service prices':
          botResponse = {
            type: 'bot',
            content: 'Which service pricing would you like to check?',
            options: ['Oil change', 'Brake service', 'AC service', 'Battery', 'Full service', 'All prices']
          };
          break;
        case 'track my booking':
          botResponse = {
            type: 'bot',
            content: 'Please provide your booking ID or registered phone number to track your service.',
            options: ['I have booking ID', 'Use phone number', 'Check all bookings']
          };
          break;
        case 'car problems':
          botResponse = {
            type: 'bot',
            content: 'What problem are you experiencing with your vehicle?',
            options: ['Engine issues', 'Brake problems', 'Electrical issues', 'Strange noises', 'Warning lights', 'Other']
          };
          break;
        case 'general questions':
          botResponse = {
            type: 'bot',
            content: 'What would you like to know?',
            options: ['Opening hours', 'Contact info', 'Warranty', 'Membership', 'Service areas', 'Other']
          };
          break;
        default:
          // Use the knowledge base for other queries
          botResponse = findBestResponse(content);
          botResponse.type = 'bot';
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Quick action buttons for common queries
  const quickActions = [
    { icon: FaWrench, label: 'Service Booking', query: 'Book a service' },
    { icon: FaDollarSign, label: 'Price Check', query: 'Check service prices' },
    { icon: FaCar, label: 'Car Problems', query: 'Car problems' },
    { icon: FaClock, label: 'Track Service', query: 'Track my booking' },
    { icon: FaQuestionCircle, label: 'Help', query: 'General questions' }
  ];

  return (
    <>
      {/* Chat Toggle Button - Right side, moved up from bottom navigation, centered horizontally */}
      
      <motion.button
        className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-6 md:right-8 bg-gradient-to-r from-blue-800 to-blue-900 text-white p-2.5 sm:p-3 md:p-3.5 rounded-full shadow-2xl z-50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat support"
      >
        <FaRobot className="text-lg sm:text-xl md:text-2xl" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-6 md:right-8 w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[500px] sm:h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FaRobot className="text-2xl" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-bold">Auto Assistant</h3>
                  <p className="text-xs opacity-90">Online • 24/7 Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 p-3 border-b">
              <p className="text-xs text-gray-600 mb-2 font-medium">Quick Actions:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(action.query)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium whitespace-nowrap hover:border-red-300 hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <action.icon className="text-red-500" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-[calc(100%-12rem)] overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${message.type === 'user'
                          ? 'bg-gradient-to-r from-red-500 to-red-800 text-white rounded-br-none'
                          : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.type === 'user' ? (
                          <FaUser className="text-sm" />
                        ) : (
                          <FaRobot className="text-sm" />
                        )}
                        <span className="text-sm font-semibold">
                          {message.type === 'user' ? 'You' : 'Auto Assistant'}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.options && message.options.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => handleSendMessage(option)}
                              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${message.type === 'user'
                                  ? 'bg-white text-red-600 hover:bg-gray-100'
                                  : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex items-center gap-2">
                        <FaRobot className="text-red-500" />
                        <span className="text-sm font-semibold">Auto Assistant</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <motion.span
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about services, prices, problems..."
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim()}
                >
                  <FaPaperPlane />
                </motion.button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-2">
                Ask about services, pricing, car problems, or emergency help
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotSupport;