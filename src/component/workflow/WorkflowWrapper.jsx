import React from "react";
import { useLocation, useParams } from "react-router-dom";
import WorkflowProgress from "./WorkflowProgress";

/**
 * Reusable Workflow Wrapper Component
 * Wraps checkout/workflow pages with common progress bar
 * Accepts category and product data from location state or params
 * Used for all categories and products
 */
const WorkflowWrapper = ({ children, currentStep = 'cart' }) => {
  const location = useLocation();
  const params = useParams();

  // Extract category and product data from location state or params
  const categoryData = location.state?.category || params.category;
  const productData = location.state?.product || location.state?.products;

  // Store workflow context for child components
  React.useEffect(() => {
    if (categoryData) {
      sessionStorage.setItem('workflowCategory', JSON.stringify(categoryData));
    }
    if (productData) {
      sessionStorage.setItem('workflowProduct', JSON.stringify(productData));
    }
  }, [categoryData, productData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Common Workflow Progress Bar */}
        <WorkflowProgress currentStep={currentStep} />
        
        {/* Child Content (Cart, Address, Review, Payment) */}
        {children}
      </div>
    </div>
  );
};

export default WorkflowWrapper;

