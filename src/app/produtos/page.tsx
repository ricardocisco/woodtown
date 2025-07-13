"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  ShoppingCart,
  Star,
  Search,
  Filter,
  CheckCircle,
  X
} from "lucide-react";
import useProduct from "@/src/hooks/useProduct";
import Navbar from "@/src/components/Navbar";
import { useCartStore } from "../store/cartStore";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "Shape Street Pro",
    price: 189.9,
    originalPrice: 229.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shapes",
    rating: 4.8,
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: "Rolamento ABEC 7",
    price: 45.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Rolamentos",
    rating: 4.9,
    inStock: true
  },
  {
    id: 3,
    name: "Camiseta Woodtown",
    price: 79.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Roupas",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "Tênis Skate Classic",
    price: 299.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Calçados",
    rating: 4.6,
    inStock: false
  },
  {
    id: 5,
    name: "Shape Cruiser Wood",
    price: 159.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shapes",
    rating: 4.5,
    inStock: true
  },
  {
    id: 6,
    name: "Boné Woodtown",
    price: 49.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Acessórios",
    rating: 4.3,
    inStock: true
  }
];

const categories = [
  "Todos",
  "SHAPES",
  "ROLAMENTOS",
  "ROUPAS",
  "CALCADOS",
  "ACESSORIOS"
];
const priceRanges = [
  { label: "Até R$ 50", min: 0, max: 50 },
  { label: "R$ 50 - R$ 100", min: 50, max: 100 },
  { label: "R$ 100 - R$ 200", min: 100, max: 200 },
  { label: "Acima de R$ 200", min: 200, max: Number.POSITIVE_INFINITY }
];

export default function ProductsPage() {
  const { products, loading } = useProduct();
  const { addCart } = useCartStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesStock = !showOnlyInStock || product.stock;

    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const priceRange = priceRanges.find((r) => r.label === range);
        return (
          priceRange &&
          product.price >= priceRange.min &&
          product.price <= priceRange.max
        );
      });

    return matchesSearch && matchesCategory && matchesStock && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="h-5 w-5 text-amber-400" />
                  <h2 className=" font-semibold">Filtros</h2>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className=" text-sm font-medium mb-2 block">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                    <Input
                      placeholder="Nome do produto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className=" text-sm font-medium mb-2 block">
                    Categoria
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className=""
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <label className=" text-sm font-medium mb-2 block">
                    Preço
                  </label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div
                        key={range.label}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={range.label}
                          checked={selectedPriceRanges.includes(range.label)}
                          onCheckedChange={(checked) =>
                            handlePriceRangeChange(
                              range.label,
                              checked as boolean
                            )
                          }
                        />
                        <label htmlFor={range.label} className="text-sm">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={showOnlyInStock}
                      onCheckedChange={(checked) =>
                        setShowOnlyInStock(checked === true)
                      }
                    />
                    <label htmlFor="inStock" className="text-sm">
                      Apenas em estoque
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold ">
                Produtos ({sortedProducts.length})
              </h1>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="name" className="">
                    Nome A-Z
                  </SelectItem>
                  <SelectItem value="price-low" className="">
                    Menor Preço
                  </SelectItem>
                  <SelectItem value="price-high" className="">
                    Maior Preço
                  </SelectItem>
                  <SelectItem value="rating" className="">
                    Melhor Avaliado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-secondary hover:border-amber-600 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Link href={`/produto/${product.id}`}>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={300}
                          height={300}
                          unoptimized
                          className="w-full h-48 object-cover rounded-lg cursor-pointer"
                        />
                      </Link>
                      {!product.stock && (
                        <Badge className="absolute top-2 right-2 bg-red-600 ">
                          Esgotado
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm">{product.category}</p>
                      <Link href={`/produto/${product.id}`}>
                        <h3 className=" font-semibold hover:text-amber-400 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className=" font-bold text-lg">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                          disabled={!product.stock}
                          onClick={() => {
                            addCart(product),
                              toast(
                                <div className="flex items-start gap-3">
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                                  <div className="flex-1">
                                    <p className="font-medium ">
                                      Item adicionado ao carrinho!
                                    </p>
                                    <p className="text-sm mt-1">
                                      O produto foi incluído com sucesso.
                                    </p>
                                  </div>
                                </div>,
                                {
                                  style: {
                                    margin: 2
                                  },
                                  action: {
                                    label: <X className="h-4 w-4 " />,
                                    onClick: () => {}
                                  },
                                  position: "top-center"
                                }
                              );
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
