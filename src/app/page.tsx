import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ShoppingCart, Star, Truck, Shield, Headphones } from "lucide-react";
import Navbar from "../components/Navbar";

const featuredProducts = [
  {
    id: 1,
    name: "Shape Street Pro",
    price: 189.9,
    originalPrice: 229.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shapes",
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: "Rolamento ABEC 7",
    price: 45.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Rolamentos",
    rating: 4.9
  },
  {
    id: 3,
    name: "Camiseta Woodtown",
    price: 79.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Roupas",
    rating: 4.7
  },
  {
    id: 4,
    name: "Tênis Skate Classic",
    price: 299.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "Calçados",
    rating: 4.6
  }
];

const categories = [
  { name: "Shapes", image: "/placeholder.svg?height=200&width=200", count: 45 },
  {
    name: "Rolamentos",
    image: "/placeholder.svg?height=200&width=200",
    count: 23
  },
  { name: "Roupas", image: "/placeholder.svg?height=200&width=200", count: 67 },
  {
    name: "Acessórios",
    image: "/placeholder.svg?height=200&width=200",
    count: 34
  }
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-black/40"></div>
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Skate Hero"
          fill
          className="object-cover"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sua paixão pelo <span className="text-amber-400">skate</span>{" "}
              começa aqui
            </h1>
            <p className="text-xl mb-8">
              Os melhores produtos para skatistas de todos os níveis. Shapes,
              rolamentos, roupas e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 px-8"
              >
                Ver Produtos
              </Button>
              <Button size="lg" variant={"secondary"} className="">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Categorias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/produtos?categoria=${category.name.toLowerCase()}`}
              >
                <Card className="bg-zinc-700 border-zinc-600 hover:bg-zinc-600 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="mx-auto mb-4 rounded-lg"
                    />
                    <h3 className="text-white font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {category.count} produtos
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
            <Link href="/produtos">
              <Button
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
              >
                Ver Todos
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-zinc-800 border-zinc-700 hover:border-amber-600 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-amber-600 text-white">
                        Novo
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-zinc-400 text-sm">{product.category}</p>
                    <h3 className="text-white font-semibold">{product.name}</h3>

                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-zinc-400 text-sm">
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold text-lg">
                          R$ {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-zinc-500 text-sm line-through ml-2">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Frete Grátis</h3>
              <p className="">Em compras acima de R$ 199</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="">Seus dados protegidos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className=" font-semibold mb-2">Suporte 24/7</h3>
              <p className="">Atendimento sempre disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className=" font-bold">W</span>
                </div>
                <span className="text-xl font-bold ">Woodtown</span>
              </div>
              <p className="text-zinc-400">
                Sua loja especializada em produtos de skate. Qualidade e paixão
                em cada produto.
              </p>
            </div>

            <div>
              <h4 className=" font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link
                    href="/produtos?categoria=shapes"
                    className="hover:text-amber-400"
                  >
                    Shapes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/produtos?categoria=rolamentos"
                    className="hover:text-amber-400"
                  >
                    Rolamentos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/produtos?categoria=roupas"
                    className="hover:text-amber-400"
                  >
                    Roupas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/produtos?categoria=acessorios"
                    className="hover:text-amber-400"
                  >
                    Acessórios
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className=" font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link href="/contato" className="hover:text-amber-400">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="hover:text-amber-400">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/trocas" className="hover:text-amber-400">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-amber-400">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className=" font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-zinc-400">
                <p>📧 contato@woodtown.com.br</p>
                <p>📱 (11) 99999-9999</p>
                <p>📍 São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-700 mt-8 pt-8 text-center text-zinc-400">
            <p>&copy; 2024 Woodtown. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
