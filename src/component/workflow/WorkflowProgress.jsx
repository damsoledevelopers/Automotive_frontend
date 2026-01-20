import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaShoppingCart, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaCreditCard 
} from "react-icons/fa";

/**
 * Reusable Workflow Progress Component
 * Shows progress through: Cart → Address → Review → Pay
 * Used across all categories and products
 */
const WorkflowProgress = ({ currentStep = 'cart' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 'cart', label: 'Cart', icon: FaShoppingCart, path: '/cart' },
    { id: 'address', label: 'Address', icon: FaMapMarkerAlt, path: '/checkout/address' },
    { id: 'review', label: 'Review', icon: FaFileAlt, path: '/checkout/review' },
    { id: 'pay', label: 'Pay', icon: FaCreditCard, path: '/checkout/payment' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();
  const isStepActive = (stepIndex) => stepIndex <= currentStepIndex;
  const isStepCurrent = (stepIndex) => stepIndex === currentStepIndex;

  const handleStepClick = (step) => {
    // Only allow navigation to completed or current steps
    const stepIndex = steps.findIndex(s => s.id === step.id);
    if (stepIndex <= currentStepIndex) {
      navigate(step.path);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-2 md:mt-4 mb-2 bg-white border border-gray-200 p-2 sm:p-3 md:p-4 rounded-lg shadow-sm"
    >
      <div className="flex items-center justify-between sm:justify-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 overflow-x-auto pb-1 scrollbar-hide">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = isStepActive(index);
          const isCurrent = isStepCurrent(index);
          const isClickable = index <= currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <motion.button
                onClick={() => isClickable && handleStepClick(step)}
                className={`flex flex-col items-center flex-shrink-0 min-w-[45px] sm:min-w-[50px] md:min-w-[55px] ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                disabled={!isClickable}
              >
                <motion.div 
                  className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center mb-0.5 sm:mb-1 transition-all ${
                    isCurrent || isActive
                      ? 'bg-[#131c36] text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                >
                  <StepIcon className="text-xs sm:text-sm md:text-base" />
                </motion.div>
                <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                  isCurrent || isActive ? 'text-gray-900 font-semibold' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </motion.button>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className={`h-0.5 flex-1 sm:flex-none sm:w-6 md:w-8 lg:w-10 xl:w-12 rounded-full ${
                    isActive ? 'bg-[#131c36]' : 'bg-gray-300'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WorkflowProgress;

