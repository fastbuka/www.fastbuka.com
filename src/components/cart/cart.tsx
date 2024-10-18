import { ArrowLeft, ShoppingCart } from 'lucide-react'
import React, { useContext, Fragment } from 'react'
import { DummyCart } from './cartUtils'
import { Context } from '@/hooks/AppContext'


export default function Cart() {

    const { cart, setCart, checkout, setCheckout, orderSuccess, setOrderSuccess } = useContext(Context)!;

    const Checkout = async () => {
            setCart(false);
            setCheckout(true);
            setOrderSuccess(false);
    
    }

  return (
        <Fragment>
            <div className='my-4'>
                <h1 className='font-bold text-2xl'>Cart</h1>
                <div className=' flex'>
                <div className='w-8/12 mx-10'>
                    {DummyCart.map((cart: any, index: any) => (
                        <div key={index} className=' flex justify-between'>
                            <div className='flex items-center my-2'>
                                <img src='https://via.placeholder.com/150' alt='Product' className='mr-4' />
                                <div>
                                    <p className='font-bold text-2xl'>{cart.name}</p>
                                    <p className='text-sm opacity-70 text-center mb-4'>{cart.category}</p>
                                    <p className='text-sm opacity-50'>{cart.extras}</p>
                                    <p className='font-bold text-xl'>{cart.price}</p>
                                </div>
                            </div>
                            <div className='flex items-end m-4'>
                                <div className='shadow rounded-full flex w-[8rem] justify-between p-2 px-4 font-bold text-2xl cursor-pointer'>
                                <p>-</p>
                                <p>1</p>
                                <p>+</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-3/12 font-semibold'>
                    <h2 className='font-bold text-xl mb-10'>Subtotal</h2>
                    <div className='w-full flex justify-between my-2'>
                        <p>Summary</p>
                        <p>N8000.20</p>
                    </div>
                    <div className='w-full flex justify-between my-2'>
                        <p>Item Count</p>
                        <p>3</p>
                    </div>
                    <div className='w-full flex justify-between my-2'>
                        <p>Amount to pay</p>
                        <p>N8000.20</p>
                    </div>
                    <button className='w-full bg-green-900 rounded-full text-white p-4 mt-8' onClick={Checkout}>Checkout</button>
                </div>
                </div>
            </div>
        </Fragment>
  )
}
