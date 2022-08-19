import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteProduct } from './../redux/actions/productActions';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
    const dispatch = useDispatch();
    return (
        <div className="card m-4" style={{ width: "18rem" }}>
            <img src={`/uploads/${product.fileName}`} style={{ width: "100%", height: "270px" }} className="card-img-top" alt="load failed" />
            <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <hr />
                <h6 className='mb-3'>
                    <span className='text-secondary mr-2'>
                        {
                            product.productPrice.toLocaleString('en-US', {
                                style: "currency",
                                currency: "USD"
                            })
                        }
                    </span>
                </h6>
                <p>
                    {
                        product.productDesc.length > 25
                            ? product.productDesc.substring(0, 25) + "..." : product.productDesc.substring(0, 25)
                    }
                </p>
                <div className='text-center d-flex justify-content-end'>
                    <Link to={`/admin/edit/product/${product._id}`} type='button' className='btn btn-secondary btn-sm mx-2'>
                        <i className='far fa-edit pr-1'></i> Edit
                    </Link>
                    <button type='button' className='btn btn-danger btn-sm' onClick={() => dispatch(deleteProduct(product._id))}>
                        <i className='far fa-trash-alt pr-1'></i> Delete
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Card;
