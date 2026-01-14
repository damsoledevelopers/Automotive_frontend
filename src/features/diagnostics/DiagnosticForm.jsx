import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaSpinner } from 'react-icons/fa';

const commonProblems = [
  { id: 1, category: 'Engine', issues: ['Engine not starting', 'Unusual engine noise', 'Poor fuel economy', 'Check engine light on'] },
  { id: 2, category: 'Brakes', issues: ['Squeaking brakes', 'Soft brake pedal', 'Car pulling when braking', 'Vibration when braking'] },
  { id: 3, category: 'Transmission', issues: ['Delayed gear shifting', 'Transmission slipping', 'Grinding noise', 'Burning smell'] },
  { id: 4, category: 'Electrical', issues: ['Battery not charging', 'Electrical components not working', 'Dim lights', 'Starting problems'] },
  { id: 5, category: 'Suspension', issues: ['Rough ride', 'Car bouncing', 'Uneven tire wear', 'Steering wheel vibration'] },
];

const DiagnosticForm = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssues((prev) => {
      const exists = prev.includes(issue);
      if (exists) {
        return prev.filter((i) => i !== issue);
      }
      return [...prev, issue];
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setChatMessages((prev) => [
      ...prev,
      { type: 'user', content: description },
      { 
        type: 'system',
        content: 'Based on your description, here are some potential issues and recommended actions:',
        recommendations: [
          'Schedule a diagnostic inspection',
          'Check engine codes',
          'Inspect brake system',
        ]
      }
    ]);
    
    setLoading(false);
    setStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Car Problem Diagnostic</h2>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <motion.div
              key={s}
              className={`w-1/4 h-2 rounded-full mx-1 ${
                s <= step ? 'bg-red-500' : 'bg-gray-200'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: s * 0.1 }}
            />
          ))}
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Select Problem Category</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonProblems.map(({ category, id }) => (
                <motion.button
                  key={id}
                  onClick={() => handleCategorySelect(category)}
                  className="p-4 border rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Select Specific Issues</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {commonProblems
                .find((p) => p.category === selectedCategory)
                ?.issues.map((issue, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleIssueSelect(issue)}
                    className={`p-4 border rounded-lg transition-colors ${
                      selectedIssues.includes(issue)
                        ? 'border-red-500 bg-red-50'
                        : 'hover:border-red-500 hover:bg-red-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {issue}
                  </motion.button>
                ))}
            </div>
            <div className="mt-6">
              <motion.button
                onClick={() => setStep(3)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe the Problem
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-red-500 focus:border-red-500"
                rows={4}
                placeholder="Please provide additional details about the problem..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-red-500 hover:text-red-400">
                      <span>Upload files</span>
                      <input
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <motion.button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <FaSpinner className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  'Submit'
                )}
              </motion.button>
            </div>
          </motion.form>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-red-50 ml-auto'
                      : 'bg-gray-50'
                  } max-w-[80%]`}
                >
                  <p>{message.content}</p>
                  {message.recommendations && (
                    <ul className="mt-2 space-y-1">
                      {message.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {rec}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => window.location.reload()}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start New Diagnostic
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticForm;