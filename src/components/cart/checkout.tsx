import { ArrowLeft, CircleCheck, ShoppingCart } from 'lucide-react'
import React, { useContext, Fragment } from 'react'
import { DummyCart } from './cartUtils'
import { Context } from '@/hooks/AppContext'

export default function Checkout() {
    const { cart, setCart, checkout, setCheckout, orderSuccess, setOrderSuccess } = useContext(Context)!;
    
    const checkoutCart = () => {
            setCart(false);
            setCheckout(false);
            setOrderSuccess(true);
    }
  return (
        <Fragment>
            <div className='my-4 flex gap-x-24'>
                <div className='w-7/12'>
                <h1 className='font-bold text-2xl mb-4 '>Checkout</h1>
                <div>
                <h2 className='font-semibold text-xl my-4'>Delivery Information</h2>
                   <form>
                    <div className='my-2'>
                        <label htmlFor='name'><input type='checkbox' /> Home Address</label>
                        <input type='text' className='w-full p-3 border rounded-lg my-2'/>
                    </div>
                    <div className='my-2'>
                        <label htmlFor='name'><input type='checkbox' /> Office Address</label>
                        <input type='text' className='w-full p-3 border rounded-lg my-2'/>
                    </div>
                   </form>
                   </div>
                   <div>
                <h2 className='font-semibold text-xl my-4'>Gift a friend</h2>
                   <form>
                    <div className='my-2'>
                        <label htmlFor='name'>Address</label>
                        <input type='text' className='w-full p-3 border rounded-lg my-2'/>
                    </div>
                    <div className='my-2'>
                        <label htmlFor='name'>Phone</label>
                        <div className='flex gap-x-2 items-center'>
                        <select className='border rounded-lg p-3'>
                            <option>+233</option>
                            <option>+234</option>
                        </select>
                        <input type='phone' className='w-full p-3 border rounded-lg my-2'/>
                        </div>
                        <div className='my-4'>
                        <label htmlFor='name'>Note on order (optional)</label>
                        <textarea className='w-full h-50 p-3 border rounded-lg my-2'/>
                    </div>
                    </div>
                   </form>
                   </div>
                
                </div>
                <div className='w-5/12 font-semibold'>
                    <section className='w-full'>
                        <div className='w-full my-2'>
                            <div className='w-full bg-blue-200 text-center font-bold text-xl flex justify-between p-4'>
                                <h3 className=''>Products</h3>
                                <h3 className=''>Subtotal</h3>
                            </div>
                        </div>
                        <ul className='w-full border rounded-lg my-4'>
                            {DummyCart.map((item: any, index: any) => (
                                    <li key={index} className='w-full flex my-4'>
                                        <div className='w-full '>
                                            <div className='w-full'>
                                                <p className='p-2'>{item.name}</p>
                                                <div className='w-full text-sm text-gray-100 opacity-50 bg-blue-100 p-2'>
                                                    <p className=''>Extras</p>
                                                    <p>{item.extras}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <td className='p-2 flex justify-end w-full'>
                                            {item.price}
                                        </td>
                                    </li>
                            ))}
                        </ul>
                    </section>
                    <section className='border rounded-lg my-4'>
                            <ul className='p-2'>
                                {DummyCart.map((item: any) => (
                                    <li key={item} className='flex justify-between my-4 font-bold' >
                                        <p className='text-sm'>Subtotal</p>
                                        <p className='text-sm'>{item.price}</p>
                                    </li>
                                ))}
                            </ul>
                    </section>
                    <section className='my-4 p-2'>
                        <div className=' p-2 w-10/12'>
                            <div className='flex'>
                                <input type='checkbox'  />
                                <p className='mx-2'>Pay with Bank Transfer</p>
                            </div>
                            <div className='text-sm mx-6'>
                                <i className='opacity-50'>Enjoy faster order confirmation by paying using bank transfer</i>
                                <div className='flex my-2 gap-x-2'>
                                <CircleCheck size={20} className='text-green-500' />
                                <p>Secured by <span className='font-bold'>Paystack</span></p>
                                </div>
                            </div>
                        </div>

                        <div className=' p-2 '>
                            <div className='flex items-center justify-between'>
                                <div className='flex'>
                                    <input type='checkbox'  />
                                    <p className='mx-2'>Pay with Wallet</p>
                                </div>
                                <p className='text-sm font-light'>Bal: NGN 2,300</p>
                            </div>
                            <div className='flex items-center justify-between'>
                            <div className='flex my-2 gap-x-2 mx-6'>
                                <CircleCheck size={20} className='text-green-500' />
                                <p>Secured by <span className='font-bold'>Paystack</span></p>
                            </div>
                            <div>
                                <button className='bg-green-900 text-white text-sm font-light rounded-full p-2'>Fund wallet</button>
                            </div>
                            </div>
                        </div>
                        <div className='text-sm font-light mt-10 p-2'>
                            <p>Your personal data will be used to process your order, support your experience throughout this website as described in our <span className='text-green-900 font-bold cursor-pointer'>privacy policy</span>. By clicking &quot;place order&quot; I agree to FastBuka <span className='text-green-900 font-bold cursor-pointer'>Terms and Conditions</span></p>
                        </div>
                    </section>
                    <button className='w-full bg-green-900 rounded-full text-white p-4 mt-2' onClick={checkoutCart}>Checkout</button>
                </div>
            </div>
        </Fragment>
  )
}
