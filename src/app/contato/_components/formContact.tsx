"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import React, { useState } from "react";

export default function FormContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="lg:col-span-2">
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className=" flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-amber-400" />
            Envie sua Mensagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 " />
              </div>
              <h3 className=" font-semibold mb-2">Mensagem Enviada!</h3>
              <p className="">Obrigado pelo contato. Responderemos em breve!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="">
                    Nome *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className=" "
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className=" "
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className=" "
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="">
                    Assunto *
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleInputChange("subject", value)
                    }
                  >
                    <SelectTrigger className=" ">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="duvida-produto" className="">
                        Dúvida sobre Produto
                      </SelectItem>
                      <SelectItem value="pedido" className="">
                        Acompanhar Pedido
                      </SelectItem>
                      <SelectItem value="troca-devolucao" className="">
                        Troca/Devolução
                      </SelectItem>
                      <SelectItem value="sugestao" className="">
                        Sugestão
                      </SelectItem>
                      <SelectItem value="reclamacao" className="">
                        Reclamação
                      </SelectItem>
                      <SelectItem value="outros" className="">
                        Outros
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="">
                  Mensagem *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="  h-32"
                  placeholder="Descreva sua dúvida ou mensagem..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 "
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
