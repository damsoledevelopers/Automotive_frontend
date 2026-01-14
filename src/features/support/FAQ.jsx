import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaPlus,
  FaMinus,
  FaPhone,
  FaWhatsapp
} from 'react-icons/fa';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqs, setOpenFaqs] = useState({});

  // Toggle FAQ accordion
  const toggleFaq = (faqId) => {
    setOpenFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  // FAQ data
  const faqData = {
    buying: [
      {
        id: 1,
        question: 'How do I place an order on Sparelo?',
        answer: 'To place an order: 1. Search for the auto part you need using part number or vehicle details 2. Add items to your cart 3. Proceed to checkout 4. Select shipping method 5. Complete payment 6. Receive order confirmation via email and SMS'
      },
      {
        id: 2,
        question: 'What payment methods are accepted?',
        answer: 'We accept: Credit Cards, Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), Digital Wallets, and Cash on Delivery (available for orders below ₹50,000)'
      },
      {
        id: 3,
        question: 'Is it safe to use my credit card on Sparelo?',
        answer: 'Yes, absolutely. We use 256-bit SSL encryption and are PCI-DSS compliant. Your payment information is securely processed through certified payment gateways.'
      },
      {
        id: 4,
        question: 'Can I modify or cancel my order after placement?',
        answer: 'You can cancel your order within 30 minutes of placement from your account. After 30 minutes, please contact our customer support team for assistance.'
      },
      {
        id: 5,
        question: 'Do you offer bulk discounts for workshops?',
        answer: 'Yes, we offer special pricing for registered workshops and garages. Please contact our business team for bulk order discounts and special arrangements.'
      }
    ],
    shipping: [
      {
        id: 6,
        question: 'How can I track my order?',
        answer: 'You can track your order through: 1. Your Sparelo account dashboard 2. Tracking link in your order confirmation email 3. SMS updates 4. Contact our customer support with your order number'
      },
      {
        id: 7,
        question: 'What are the shipping charges?',
        answer: 'Shipping charges vary based on: Order value (Free shipping on orders above ₹999), Delivery location, Package weight and size, Shipping speed (Standard/Express)'
      },
      {
        id: 8,
        question: 'How long does delivery take?',
        answer: 'Standard delivery: 3-7 business days. Express delivery: 1-3 business days (additional charges apply). Same-day delivery available in select metro cities.'
      },
      {
        id: 9,
        question: 'Do you ship to my location?',
        answer: 'We ship across India including tier 2 and tier 3 cities. Enter your PIN code during checkout to check serviceability in your area.'
      },
      {
        id: 10,
        question: 'What if I\'m not available during delivery?',
        answer: 'Our delivery partner will attempt delivery 3 times. After that, the package will be returned to our warehouse. You can reschedule delivery through your tracking link.'
      }
    ],
    returns: [
      {
        id: 11,
        question: 'What is your return policy?',
        answer: '30-day return policy for most items. The item must be unused, in original packaging with all tags and invoices. Electrical and special order items may have different return policies.'
      },
      {
        id: 12,
        question: 'How do I initiate a return?',
        answer: '1. Go to "My Orders" in your account 2. Select the item to return 3. Choose return reason 4. Generate return label 5. Schedule pickup or drop at nearest service center'
      },
      {
        id: 13,
        question: 'How long does refund processing take?',
        answer: 'Refunds are processed within 5-7 business days after we receive and verify the returned item. The time to reflect in your account depends on your bank/payment method.'
      },
      {
        id: 14,
        question: 'What if I receive a wrong or damaged item?',
        answer: 'Contact us within 48 hours of delivery with photos of the product and packaging. We will arrange free pickup and provide replacement/refund immediately.'
      },
      {
        id: 15,
        question: 'Are there any non-returnable items?',
        answer: 'Yes, the following are non-returnable: Opened electrical items, Custom ordered parts, Items marked as "non-returnable" on product page, Software and digital products'
      }
    ],
    account: [
      {
        id: 16,
        question: 'How do I create a Sparelo account?',
        answer: 'Click "Sign Up" and provide your email or mobile number. Verify through OTP and complete your profile. You can also sign up using your Google or Facebook account.'
      },
      {
        id: 17,
        question: 'I forgot my password. How to reset?',
        answer: 'Click "Forgot Password" on login page. Enter your registered email/mobile to receive reset instructions. Follow the link to create a new password.'
      },
      {
        id: 18,
        question: 'How do I update my address and contact details?',
        answer: 'Go to "My Account" > "Profile Settings" to update your personal information, addresses, and communication preferences.'
      },
      {
        id: 19,
        question: 'How do I check my order history?',
        answer: 'Login to your account and go to "My Orders" section. Here you can view all your past and current orders with detailed information.'
      },
      {
        id: 20,
        question: 'Is my personal information secure?',
        answer: 'Yes, we follow strict data protection policies and never share your personal information with third parties without your explicit consent.'
      }
    ]
  };

  // Get all FAQs
  const allFaqs = Object.values(faqData).flat();

  // Filter FAQs based on search
  const filteredFaqs = activeCategory === 'all' 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeCategory]?.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

  // FAQ Accordion Component
  const FAQAccordion = ({ faq }) => {
    const isOpen = openFaqs[faq.id];

    return (
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleFaq(faq.id)}
          className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-200 transition-colors"
        >
          <div className="flex-shrink-0">
            {isOpen ? (
              <FaMinus className="text-blue-500 text-lg" />
            ) : (
              <FaPlus className="text-blue-500 text-lg" />
            )}
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-800 flex-1">
            {faq.question}
          </h3>
        </button>
        
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 pb-4 pl-12">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">
            <span className="text-gray-800">We Have </span>
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Answers
            </span>
          </h1>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Category Filter */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setActiveCategory('buying')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'buying'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buying
            </button>
            <button
              onClick={() => setActiveCategory('shipping')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'shipping'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Shipping
            </button>
            <button
              onClick={() => setActiveCategory('returns')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'returns'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Returns
            </button>
            <button
              onClick={() => setActiveCategory('account')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'account'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Account
            </button>
          </div>
        )}

        {/* FAQ List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <FAQAccordion key={faq.id} faq={faq} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No results found</p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-blue-500 hover:text-blue-600"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-row gap-4 justify-center">
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaPhone />
                Call 
              </a>
              <a 
                href="https://wa.me/919876543210"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp />
                WhatsApp 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
