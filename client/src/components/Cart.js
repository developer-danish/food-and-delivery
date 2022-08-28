import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
    const {cart} = useSelector(state => state.cart);
  return (
    <div>
        {
            cart && cart.map(c => (
                <div>{JSON.stringify(c)}</div>
            ))
        }
    </div>
    
  )
}

export default Cart