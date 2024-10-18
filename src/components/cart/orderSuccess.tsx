import { ArrowLeft, Check, CircleCheck, ShoppingCart } from 'lucide-react'
import React, { Fragment } from 'react'
import { DummyCart } from './cartUtils'

export default function orderSuccess() {
  return (
        <Fragment>
           <section className='w-full my-6 text-center flex justify-center'>
            <div className='w-3/12'>
                <div className='w-full flex justify-center'>
                    <Check className='bg-green-900 rounded-full text-center text-white mb-2' size={120}/>
                </div>
                    <h2 className='text-green-900 text-center text-2xl font-bold '>Order Placed</h2>
                    <p>Your order was placed successfully. Tap &quot;Delivery Status&quot; to track your order.</p>
                    <button className='bg-green-900 font-bold rounded-full p-4 text-white mt-2'>Delivery Status</button>
            </div>
           </section>
        </Fragment>
  )
}
