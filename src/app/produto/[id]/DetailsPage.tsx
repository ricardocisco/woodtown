"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/src/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  X,
  CheckCircle
} from "lucide-react";
import { Product } from "@/src/backend/model/schemaModel";
import useProduct from "@/src/hooks/useProduct";
import { useCartStore } from "../../store/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/src/components/ui/skeleton";

const relatedProducts = [
  {
    id: 2,
    name: "Rolamento ABEC 7",
    price: 45.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9
  },
  {
    id: 3,
    name: "Truck Profissional",
    price: 129.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7
  },
  {
    id: 4,
    name: "Rodas Street 52mm",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6
  }
];

export default function DetailsPage({ id }: { id: string }) {
  const { addToCart } = useCartStore();
  const { fetchProductById, loading, error } = useProduct();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      if (data) setProduct(data);
    };

    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="flex gap-8">
          <Skeleton className="h-64 w-1/2 rounded-lg" />
          <Skeleton className="h-64 w-1/2 rounded-lg" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleCart = () => {
    addToCart(product, quantity);
    toast(
      <div className="flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />

        <div className="flex-1">
          <p className="font-medium">Item adicionado ao carrinho!</p>
          <p className="text-sm mt-1">O produto foi incluído com sucesso.</p>
        </div>
      </div>,
      {
        action: {
          label: <X className="h-4 w-4" />,
          onClick: () => {}
        },
        position: "top-center"
      }
    );
    setQuantity(0);
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link href="/" className="hover:text-amber-400">
            Início
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-amber-400">
            Produtos
          </Link>
          <span>/</span>
          <Link
            href={`/produtos?categoria=${product.category.toLowerCase()}`}
            className="hover:text-amber-400"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                unoptimized
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* {product.imageUrl.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-amber-600"
                      : "border-zinc-600"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))} */}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-amber-400 text-sm font-medium mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="leading-relaxed">{product.description}</p>

            {/* Size Selection (if applicable) */}
            {/* {product.category === "SHAPES" && (
              <div>
                <label className="text-white font-medium mb-2 block">
                  Tamanho
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-32 bg-zinc-800 border-zinc-600 text-white">
                    <SelectValue placeholder="8.0" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 border-zinc-600">
                    <SelectItem value="7.75" className="text-white">
                      7.75
                    </SelectItem>
                    <SelectItem value="8.0" className="text-white">
                      8.0
                    </SelectItem>
                    <SelectItem value="8.25" className="text-white">
                      8.25
                    </SelectItem>
                    <SelectItem value="8.5" className="text-white">
                      8.5
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )} */}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="font-medium mb-2 block">Quantidade</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="border-amber-600 text-amber-400 hover:bg-amber-600"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="border-amber-600 text-amber-400 hover:bg-amber-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm ml-4">
                    {product.stock} em estoque
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
                  disabled={quantity <= 0}
                  onClick={() => {
                    handleCart();
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button size="lg" variant="outline" className="">
                  <Heart className="h-5 w-5 mr-2" />
                  Favoritar
                </Button>
                <Button size="lg" variant="outline" className="">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="font-medium">Frete Grátis</p>
                      <p className="text-sm">Acima de R$ 199</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="font-medium">Garantia</p>
                      <p className="text-sm">90 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="font-medium">Troca Fácil</p>
                      <p className="text-sm">30 dias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="bg-secondary">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-amber-600"
            >
              Descrição
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-amber-600"
            >
              Especificações
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-amber-600"
            >
              Avaliações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Sobre o Produto</h3>
                <p className="mb-4">{product.description}</p>
                <h4 className="font-medium mb-2">Características:</h4>
                <ul className="space-y-1">
                  {/* {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))} */}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-zinc-700"
                      >
                        <span className="text-zinc-400">{key}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    )
                  )} */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Avaliações dos Clientes</h3>
                <div className="text-center py-8">
                  <p className="">Avaliações em breve...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="bg-secondary hover:border-amber-600 transition-colors"
              >
                <CardContent className="p-4">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      R$ {relatedProduct.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
