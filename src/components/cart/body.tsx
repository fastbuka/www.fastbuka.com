'use client'

import { ArrowLeft, ShoppingCart } from 'lucide-react'
import React, { useContext, Fragment } from 'react'
import Cart from '@/components/cart/cart'
import Checkout from '@/components/cart/checkout'
import OrderSuccess from '@/components/cart/orderSuccess'
import { Context } from '@/hooks/AppContext'

export default function Body() {
  const { cart, setCart, checkout, setCheckout, orderSuccess, setOrderSuccess } = useContext(Context)!;

  const handleClick = (type: string) => {
    switch (type) {
      case 'cart':
        setCart(true);
        setCheckout(false);
        setOrderSuccess(false);
        break;
      case 'checkout':
        setCart(false);
        setCheckout(true);
        setOrderSuccess(false);
        break;
      case 'orderSuccess':
        setCart(false);
        setCheckout(false);
        setOrderSuccess(true);
        break;
      default:
        setCart(true);
        setCheckout(false);
        setOrderSuccess(false);
    }
  }

  return (
    <div className='py-6 px-24 text-black'>
      <section className='w-full flex items-center justify-between'>
        <div>
          <p>LOGO</p>
        </div>
        <div className='flex'>
          <p className=''><ShoppingCart /></p>
          <p className='rounded-full ml-4'>Image</p>
        </div>
      </section>
      <section className='mt-40'>
        <div className='flex items-center cursor-pointer' onClick={() => handleClick('cart')}>
          <ArrowLeft />
          <p>Back to Menu</p>
        </div>
        <Fragment>
          {cart && <Cart />}
          {checkout && <Checkout />}
          {orderSuccess && <OrderSuccess />}
        </Fragment>
      </section>
    </div>
  )
}
