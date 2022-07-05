import React, { useEffect } from 'react'
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      //For admin
      navigate('/admin/dashboard');
    }
    else if (isAuthenticated() && isAuthenticated().role === 0) {
      //For user
      navigate('/user/dashboard');
    }
    else {
      navigate('/signin');
    }
  }, [navigate]);

  const showHeader = () => (
    <div className='bg-dark text-white py-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h1>
              <i className='fas fa-home'></i> Admin Dashboard
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  const showActionBtns = () => (
    <div className='bg-light'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 text-center py-3 my-1'>
            <Button data-bs-toggle='modal' data-bs-target='#addCategoryModal' size="large" variant="outlined">
              <i className='fas fa-plus'></i>  Add Category
            </Button>
          </div>

          <div className='col-md-4 text-center py-3 my-1'>
            <Button size="large" variant="outlined">
              <i className='fas fa-plus'></i> Add Food
            </Button>
          </div>

          <div className='col-md-4 text-center py-3 my-1'>
            <Button size="large" variant="outlined">View Orders</Button>
          </div>

        </div>
      </div>
    </div>
  );

  const showCategoryModal = () => (
    <div id='addCategoryModal' className='modal'>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <div className='modal-header bg-info text-white'>
            <h5 className='modal-title'>Add Category</h5>
            <Button size="large" variant="text" className='close' data-bs-dismiss='modal'>
              <span><i className='fas text-black fa-times'></i></span>
            </Button>
          </div>
          <div className='modal-body my-3'>
            <form>
              <label className='text-secondary'>Category</label>
              <input type='text' className='form-control' />
            </form>
          </div>
          <div className='modal-footer'> 
          <Button variant="text" className='close' color="secondary" data-bs-dismiss='modal'>
              Close
            </Button>
            <Button variant="text" >Add</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section>
      {showHeader()}
      {showActionBtns()}
      {showCategoryModal()}
    </section>
  )
}

export default AdminDashboard
