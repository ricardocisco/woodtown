import type React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import FormContact from "./_components/formContact";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Mapa from "@/src/components/Map";

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    details: [
      "Rua Augusta, 1234",
      "Consolação, São Paulo - SP",
      "CEP: 01305-100"
    ]
  },
  {
    icon: Phone,
    title: "Telefone",
    details: ["(11) 99999-9999", "(11) 3333-4444", "WhatsApp disponível"]
  },
  {
    icon: Mail,
    title: "E-mail",
    details: [
      "contato@woodtown.com.br",
      "vendas@woodtown.com.br",
      "suporte@woodtown.com.br"
    ]
  },
  {
    icon: Clock,
    title: "Horário de Funcionamento",
    details: [
      "Segunda a Sexta: 9h às 18h",
      "Sábado: 9h às 17h",
      "Domingo: 10h às 16h"
    ]
  }
];

const faqItems = [
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia de 3 a 10 dias úteis, dependendo da sua localização. Oferecemos frete grátis para compras acima de R$ 199."
  },
  {
    question: "Posso trocar ou devolver um produto?",
    answer:
      "Sim! Você tem até 30 dias para trocar ou devolver qualquer produto, desde que esteja em perfeitas condições."
  },
  {
    question: "Vocês têm loja física?",
    answer:
      "Sim, nossa loja física fica na Rua Augusta, 1234, no centro de São Paulo. Venha nos visitar!"
  },
  {
    question: "Como posso acompanhar meu pedido?",
    answer:
      "Após a confirmação do pagamento, você receberá um código de rastreamento por e-mail para acompanhar sua entrega."
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  mb-4">Entre em Contato</h1>
          <p className=" text-lg max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está
            aqui para te ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <FormContact />

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className=" font-semibold mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Media */}
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <h3 className=" font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <Button
                    size="icon"
                    className="border-zinc-600  hover:bg-pink-600 hover:border-pink-600 bg-transparent"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="border-zinc-600  hover:bg-blue-600 hover:border-blue-600 bg-transparent"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="border-zinc-600  hover:bg-red-600 hover:border-red-600 bg-transparent"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm mt-3">
                  Siga-nos para ficar por dentro das novidades e promoções!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold  text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-secondary ">
                <CardContent className="p-6">
                  <h3 className=" font-semibold mb-3">{item.question}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <Card className="bg-secondary mb-16">
          <CardHeader>
            <CardTitle className="">Nossa Localização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg flex items-center justify-center">
              <Mapa />
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-zinc-400 mb-6">
            Nossa equipe está sempre pronta para ajudar você a encontrar o
            produto perfeito!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 px-8"
              >
                Ver Produtos
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent px-8"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
