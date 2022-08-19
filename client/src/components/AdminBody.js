import React from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';

const AdminBody = () => {
    const { products } = useSelector(state => state.products);
    return (
        <div className='container'>
            <div className='row'>
                <div className='d-flex flex-wrap justify-content-center'>
                    {
                      products && products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminBody;
