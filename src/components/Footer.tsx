import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
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
              Sua loja especializada em produtos de skate. Qualidade e paixão em
              cada produto.
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
              <p>📧 jou@woodtown.es</p>
              <p>📱 986 125 535</p>
              <p>Avda. Camelias, 20 36211 Vigo (Pontevedra)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-700 mt-8 pt-8 text-center text-zinc-400">
          <p>&copy; 2024 Woodtown. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
