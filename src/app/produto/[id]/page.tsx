"use client";

import { useState } from "react";
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
  RotateCcw
} from "lucide-react";
import Navbar from "@/src/components/Navbar";

// Simulando dados do produto (em produção viria de uma API)
const product = {
  id: 1,
  name: "Shape Street Pro",
  price: 189.9,
  originalPrice: 229.9,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500"
  ],
  category: "Shapes",
  rating: 4.8,
  reviewCount: 124,
  isNew: true,
  inStock: true,
  stockQuantity: 15,
  description:
    "Shape profissional para street skating, confeccionado em madeira maple canadense de alta qualidade. Ideal para manobras técnicas e uso intenso.",
  specifications: {
    Tamanho: '8.0"',
    Material: "Maple Canadense 7 camadas",
    Concave: "Medium",
    Comprimento: '31.5"',
    Largura: '8.0"',
    Wheelbase: '14.25"'
  },
  features: [
    "Madeira maple canadense premium",
    "7 camadas para máxima resistência",
    "Concave médio para melhor controle",
    "Griptape incluso",
    "Ideal para street e park"
  ]
};

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

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-zinc-400 mb-8">
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
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                  Novo
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
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
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-amber-400 text-sm font-medium mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-600"
                      }`}
                    />
                  ))}
                  <span className="text-zinc-400 ml-2">
                    ({product.reviewCount} avaliações)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-zinc-500 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-green-600 text-white">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection (if applicable) */}
            {product.category === "Shapes" && (
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
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-white font-medium mb-2 block">
                  Quantidade
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-white font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockQuantity}
                    className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-zinc-400 text-sm ml-4">
                    {product.stockQuantity} em estoque
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Favoritar
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium">Frete Grátis</p>
                      <p className="text-zinc-400 text-sm">Acima de R$ 199</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium">Garantia</p>
                      <p className="text-zinc-400 text-sm">90 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium">Troca Fácil</p>
                      <p className="text-zinc-400 text-sm">30 dias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-amber-600 text-white"
            >
              Descrição
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-amber-600 text-white"
            >
              Especificações
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-amber-600 text-white"
            >
              Avaliações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">
                  Sobre o Produto
                </h3>
                <p className="text-zinc-300 mb-4">{product.description}</p>
                <h4 className="text-white font-medium mb-2">
                  Características:
                </h4>
                <ul className="text-zinc-300 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">
                  Especificações Técnicas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-zinc-700"
                      >
                        <span className="text-zinc-400">{key}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">
                  Avaliações dos Clientes
                </h3>
                <div className="text-center py-8">
                  <p className="text-zinc-400">Avaliações em breve...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="bg-zinc-800 border-zinc-700 hover:border-amber-600 transition-colors"
              >
                <CardContent className="p-4">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white font-semibold mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">
                      R$ {relatedProduct.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-zinc-400 text-sm">
                        {relatedProduct.rating}
                      </span>
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
