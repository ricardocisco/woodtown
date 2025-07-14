import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Truck, Shield, Headphones } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsHome from "../components/ProductsHome";

const categories = [
  {
    name: "Shapes",
    label: "Shapes",
    image:
      "https://images.tcdn.com.br/img/img_prod/811036/shape_de_skate_chronic_palhacos_3300_variacao_14410_1_569d8374a45f5be87fe4ff312708b25d.jpg"
  },
  {
    name: "Rolamentos",
    label: "Rolamentos",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIxvKCpK4cxPRHstdLNjl0VrzCz0TSp1Z3Sw&s"
  },
  {
    name: "Roupas",
    label: "Roupas",
    image:
      "https://80023.cdn.simplo7.net/static/80023/sku/roupas-camisetas-camiseta-oxi-skate-mini-logo-verde--p-1668619044458.jpg"
  },
  {
    name: "Acessórios",
    label: "Acessórios",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_765770-MLA84477737723_052025-O.webp"
  },
  {
    name: "Rodas",
    label: "Rodas",
    image:
      "data:image/jpeg;base64,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"
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
          src="https://www.skateboarding.com.br/images/sampledata/abre/banners_06.jpg"
          alt="Skate Hero"
          fill
          unoptimized
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/produtos?categoria=${category.name.toLowerCase()}`}
              >
                <Card className="bg-secondary hover:bg-zinc-600 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                    <div className="w-[100px] h-[100px] mb-4 relative">
                      <Image
                        src={category.image}
                        alt={category.label}
                        fill
                        className="rounded-lg object-cover"
                        unoptimized
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      {category.label}
                    </h3>
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

          <ProductsHome />
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
      <Footer />
    </div>
  );
}
