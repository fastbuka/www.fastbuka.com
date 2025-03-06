import React from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/Partials/use-cart";
import { useToast } from "@/hooks/Partials/use-toast";

interface Product {
  uuid: string;
  name: string;
  price: number;
  image: string;
  ratings: number;
  category: string;
  description: string;
  processing_time: string;
  food_uuid: string;
  vendor_uuid: string;
  quantity: number;
}

export function ProductsFeedSection({ item }: { item: Product }) {
  const { toast } = useToast();
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const productInCart = cart.find((cartItem) => cartItem.uuid === item.uuid);
  const quantity = productInCart ? productInCart.quantity : 0;

  function handleDecrease() {
    if (quantity === 1) {
      removeFromCart(item.uuid);
      toast({
        variant: "destructive",
        title: "Removed from cart",
        description: `${item.name} has been removed from the cart`,
      });
    }else{
      decreaseQuantity(item.uuid);
    }
  }

  function handleIncrease() {
    if (quantity === 0) {
      addToCart(item, 1);
      toast({
        variant: "success",
        title: "Added to cart",
        description: `${item.name} added to cart`,
      });
    }else{
      increaseQuantity(item.uuid);
    }
  }

  return (
    <div key={item.uuid}>
      <Card>
        <div className="bg-slate-100 relative h-56">
          <img
            className="h-full w-full object-cover"
            src={item.image || "/svg/placeholder.svg"}
            onError={(e) => {
              e.currentTarget.src = "/svg/placeholder.svg";
            }}
            alt={item.name}
          />
        </div>
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
          <Badge variant="secondary" className="mb-2">
            {/* {item.category} */}
          </Badge>
          <p className="font-bold mt-1">₦{item.price.toLocaleString()}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{item.ratings}</span>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 text-sm text-gray-600">
          <div className="flex flex-cols gap-2">
            <span>{item.processing_time} Min</span>
            <span>10KM</span>
          </div>
          <div className="p-4">
            <div className='flex items-center'>
              <button
                onClick={handleDecrease}
                className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600'
              >
                -
              </button>
              <span className='mx-3'>{quantity}</span>
              <button
                onClick={handleIncrease}
                className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600'
              >
                +
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}