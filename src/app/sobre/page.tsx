import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Users, Award, Heart, Target, Badge } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Timeline from "./_components/timeline";

const teamMembers = [
  {
    name: "Carlos Silva",
    role: "Fundador & CEO",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Skatista há 15 anos, apaixonado por conectar a comunidade skate com os melhores produtos."
  },
  {
    name: "Ana Costa",
    role: "Gerente de Produtos",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Especialista em equipamentos de skate, sempre em busca das últimas tendências e inovações."
  },
  {
    name: "Pedro Santos",
    role: "Atendimento ao Cliente",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Skatista local, conhece cada produto da loja e está sempre pronto para ajudar."
  }
];

const values = [
  {
    icon: Heart,
    title: "Paixão pelo Skate",
    description:
      "Vivemos e respiramos skate. Cada produto é escolhido com amor pela modalidade."
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description:
      "Trabalhamos apenas com as melhores marcas e produtos de alta qualidade."
  },
  {
    icon: Users,
    title: "Comunidade",
    description:
      "Apoiamos a cena local e ajudamos a fortalecer a comunidade skatista."
  },
  {
    icon: Target,
    title: "Foco no Cliente",
    description:
      "Sua satisfação é nossa prioridade. Atendimento personalizado sempre."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r">
        <div className="absolute inset-0 bg-black/50"></div>
        <Image
          src="https://www.skateboarding.com.br/images/sampledata/abre/banners_06.jpg"
          alt="Skate Culture"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sobre a <span className="text-amber-400">Woodtown</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              Nascemos da paixão pelo skate e do desejo de conectar skatistas
              aos melhores produtos. Desde 2018, somos mais que uma loja - somos
              parte da comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  A Woodtown nasceu em 2018 quando Carlos Silva, skatista há
                  mais de 15 anos, percebeu a dificuldade de encontrar produtos
                  de qualidade para skate em um só lugar. Com a paixão pela
                  modalidade e o sonho de facilitar a vida dos skatistas,
                  decidiu criar algo especial.
                </p>
                <p>
                  O nome "Woodtown" representa nossa conexão com a essência do
                  skate: a madeira (wood) que forma os shapes e a comunidade
                  (town) que se forma ao redor das pistas. Começamos pequenos,
                  mas com grandes sonhos.
                </p>
                <p>
                  Hoje, atendemos milhares de skatistas em todo o Brasil, sempre
                  mantendo nossos valores de qualidade, autenticidade e amor
                  pelo skate. Cada produto é cuidadosamente selecionado por quem
                  realmente entende da modalidade.
                </p>
              </div>
            </div>
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <Image
                src="https://bluscus.es/wp-content/uploads/2015/08/Welcome-to-the-Ria-Woodtown-Joana.jpg"
                alt="História da Woodtown"
                fill
                unoptimized
                className="rounded-lg shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Nossos Valores
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Estes são os princípios que guiam cada decisão que tomamos na
              Woodtown
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-zinc-800 border-zinc-700 text-center"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Nossa Equipe */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nossa Equipe</h2>
            <p className="text-zinc-400">
              Conheça as pessoas por trás da Woodtown
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-zinc-800 border-zinc-700 text-center"
              >
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-white font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 text-sm mb-3">{member.role}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">10K+</div>
              <div className="text-zinc-400">Clientes Atendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-zinc-400">Produtos Diferentes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">50+</div>
              <div className="text-zinc-400">Marcas Parceiras</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">5</div>
              <div className="text-zinc-400">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade Woodtown e descubra os melhores produtos de
            skate. Sua paixão pelo skate merece o melhor equipamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8"
              >
                Ver Produtos
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent px-8"
              >
                Entre em Contato
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
