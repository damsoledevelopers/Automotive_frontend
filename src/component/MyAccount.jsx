import React from 'react'
import { useNavigate } from 'react-router-dom';

export const MyAccount = () => {
  const navigate = useNavigate();

    const handleMyAccount = (e) => {
      e.preventDefault();
      navigate('/myaccount'); 
    }

  return (
   <div>
      <h1>Document Page</h1>
      <button 
        onClick={handleMyAccount} 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  )
}
