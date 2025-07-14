"use client";

import React from "react";
import useProduct from "../hooks/useProduct";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";

export default function ProductsHome() {
  const { products, loading } = useProduct();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className=" hover:border-amber-600 transition-colors"
        >
          <CardContent className="p-4">
            <div className="relative mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={300}
                unoptimized
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <p className="text-zinc-400 text-sm">{product.category}</p>
              <h3 className="text-white font-semibold">{product.name}</h3>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-lg">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
