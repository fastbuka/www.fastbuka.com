import React, { useState } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/Partials/use-cart";

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
  const { cart, addToCart } = useCart();
  const [message, setMessage] = useState("");

  function submitToCart(product: Product) {
    addToCart(product);
    setMessage(`${product.name} added to cart!`);
  }

  const productInCart = cart.find((cartItem) => cartItem.uuid === item.uuid);
  const quantity = productInCart ? productInCart.quantity : 0;

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
            <Button onClick={() => submitToCart(item)} className="relative">
              <span>Add to cart</span>
              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {quantity}
                </span>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
