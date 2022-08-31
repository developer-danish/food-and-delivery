import React, { useEffect } from 'react'
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';

function Shipping() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated()) {
            //For admin
            navigate('/signin');
          }
    }, [navigate]);
  return (
    <div>Shipping page</div>
  )
}

export default Shipping