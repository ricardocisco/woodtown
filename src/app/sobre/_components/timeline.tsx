"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

const milestones = [
  {
    year: "2018",
    title: "Fundação",
    description:
      "Woodtown nasce com o sonho de conectar skatistas aos melhores produtos."
  },
  {
    year: "2019",
    title: "Primeira Loja",
    description: "Abertura da primeira loja física no centro de São Paulo."
  },
  {
    year: "2021",
    title: "E-commerce",
    description: "Lançamento da loja online para atender todo o Brasil."
  },
  {
    year: "2023",
    title: "Expansão",
    description:
      "Mais de 10.000 clientes atendidos e parcerias com marcas internacionais."
  }
];

export default function Timeline() {
  return (
    <section className="py-16 bg-secondary font-sans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Nossa Jornada</h2>
          <p className="text-zinc-400">
            Os principais marcos da nossa história
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-600"></div>
          <div className="sm:hidden absolute left-4 w-1 h-full bg-amber-600"></div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative flex flex-col sm:flex-row items-center mb-12 ${
                index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
              }`}
            >
              <div className="absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 left-4 w-4 h-4 bg-amber-600 rounded-full border-4 border-zinc-800 z-10"></div>

              <div
                className={`w-full sm:max-w-md ${
                  index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"
                }`}
              >
                <Card className="bg-zinc-700 border-zinc-600">
                  <CardContent className="p-6">
                    <Badge className="bg-amber-600 text-white mb-3">
                      {milestone.year}
                    </Badge>
                    <h3 className="text-white font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
