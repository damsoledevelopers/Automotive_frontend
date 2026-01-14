import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Footer from '../Footer';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    department: 'all',
    location: 'all',
    type: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Developer',
      department: 'Technology',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '5+ years',
      description: 'We are looking for an experienced software developer to join our technology team. You will be responsible for developing and maintaining our e-commerce platform, working with modern technologies like React, Node.js, and cloud infrastructure.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '5+ years of experience in full-stack development',
        'Proficiency in React, Node.js, and database technologies',
        'Experience with cloud platforms (AWS/Azure)',
        'Strong problem-solving and communication skills'
      ],
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Customer Support Executive',
      department: 'Customer Service',
      location: 'Delhi',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Join our customer support team to help customers with their queries and issues. You will be the first point of contact for our customers, ensuring they receive excellent service.',
      requirements: [
        'Excellent communication skills in English and Hindi',
        '1-3 years of customer service experience',
        'Ability to handle multiple customer inquiries',
        'Basic computer skills',
        'Customer-focused attitude'
      ],
      postedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Lead our marketing initiatives and help grow our brand presence. You will develop and execute marketing strategies, manage campaigns, and analyze performance metrics.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '4+ years of marketing experience',
        'Experience with digital marketing channels',
        'Strong analytical and creative skills',
        'Experience in e-commerce preferred'
      ],
      postedDate: '2024-01-18'
    },
    {
      id: 4,
      title: 'Operations Manager',
      department: 'Operations',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '6+ years',
      description: 'Manage day-to-day operations and ensure smooth business processes. You will oversee logistics, inventory management, and coordinate with various departments.',
      requirements: [
        'Bachelor\'s degree in Operations or related field',
        '6+ years of operations management experience',
        'Strong leadership and organizational skills',
        'Experience in logistics and supply chain',
        'Problem-solving and decision-making abilities'
      ],
      postedDate: '2024-01-22'
    },
    {
      id: 5,
      title: 'Frontend Developer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'We are looking for a skilled frontend developer to create engaging user interfaces for our platform. You will work with React, TypeScript, and modern UI frameworks.',
      requirements: [
        '2-4 years of frontend development experience',
        'Proficiency in React and TypeScript',
        'Experience with CSS frameworks and responsive design',
        'Understanding of UX/UI principles',
        'Portfolio of previous work'
      ],
      postedDate: '2024-01-25'
    },
    {
      id: 6,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Analyze business data to provide insights and support decision-making. You will work with large datasets, create reports, and help optimize business processes.',
      requirements: [
        'Bachelor\'s degree in Statistics, Mathematics, or related field',
        '3+ years of data analysis experience',
        'Proficiency in SQL, Python, and data visualization tools',
        'Strong analytical and problem-solving skills',
        'Experience with business intelligence tools'
      ],
      postedDate: '2024-01-23'
    }
  ];

  const departments = ['all', ...new Set(jobOpenings.map(job => job.department))];
  const locations = ['all', ...new Set(jobOpenings.map(job => job.location))];
  const types = ['all', ...new Set(jobOpenings.map(job => job.type))];

  const filteredJobs = jobOpenings.filter(job => {
    return (
      (filters.department === 'all' || job.department === filters.department) &&
      (filters.location === 'all' || job.location === filters.location) &&
      (filters.type === 'all' || job.type === filters.type)
    );
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative border-b border-gray-200 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&auto=format&q=80')`,
          minHeight: '400px'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex items-center justify-center min-h-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Careers at Sparelo
            </h1>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              Join our team and help shape the future of automotive spare parts retail in India.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">Filters</span>
            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Current Openings ({filteredJobs.length})
            </h2>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                <button
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="w-full p-5 sm:p-6 text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <FaBriefcase className="text-gray-400" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaClock className="text-gray-400" />
                          {job.type}
                        </span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {selectedJob === job.id ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {selectedJob === job.id && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-200 bg-gray-50">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <button className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Competitive Salary', desc: 'Attractive compensation packages' },
              { title: 'Flexible Work', desc: 'Work-life balance and remote options' },
              { title: 'Career Growth', desc: 'Opportunities for professional development' },
              { title: 'Great Culture', desc: 'Collaborative and inclusive environment' }
            ].map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Application Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply', desc: 'Submit your application online' },
              { step: '2', title: 'Review', desc: 'Our team reviews your profile' },
              { step: '3', title: 'Interview', desc: 'Technical and HR interviews' },
              { step: '4', title: 'Offer', desc: 'Receive and accept offer' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 text-sm sm:text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;

