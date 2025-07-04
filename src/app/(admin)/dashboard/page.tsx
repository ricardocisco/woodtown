"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/src/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Eye
} from "lucide-react";

// Dados simulados
const products = [
  {
    id: 1,
    name: "Shape Street Pro",
    category: "Shapes",
    price: 189.9,
    stock: 15,
    status: "Ativo",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    name: "Rolamento ABEC 7",
    category: "Rolamentos",
    price: 45.9,
    stock: 32,
    status: "Ativo",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 3,
    name: "Camiseta Woodtown",
    category: "Roupas",
    price: 79.9,
    stock: 0,
    status: "Esgotado",
    image: "/placeholder.svg?height=100&width=100"
  }
];

const orders = [
  {
    id: "#001",
    customer: "João Silva",
    date: "2024-01-15",
    total: 235.8,
    status: "Entregue",
    items: 3
  },
  {
    id: "#002",
    customer: "Maria Santos",
    date: "2024-01-14",
    total: 189.9,
    status: "Enviado",
    items: 1
  },
  {
    id: "#003",
    customer: "Pedro Costa",
    date: "2024-01-13",
    total: 125.8,
    status: "Processando",
    items: 2
  }
];

const stats = [
  {
    title: "Total de Produtos",
    value: "156",
    icon: Package,
    color: "text-blue-400"
  },
  {
    title: "Pedidos Hoje",
    value: "23",
    icon: ShoppingCart,
    color: "text-green-400"
  },
  {
    title: "Clientes Ativos",
    value: "1,234",
    icon: Users,
    color: "text-purple-400"
  },
  {
    title: "Receita Mensal",
    value: "R$ 45,678",
    icon: DollarSign,
    color: "text-amber-400"
  }
];

export default function AdminPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: ""
  });

  const handleAddProduct = () => {
    // Aqui você adicionaria a lógica para salvar o produto
    console.log("Novo produto:", newProduct);
    setIsAddProductOpen(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-600";
      case "Esgotado":
        return "bg-red-600";
      case "Entregue":
        return "bg-green-600";
      case "Enviado":
        return "bg-blue-600";
      case "Processando":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Woodtown</span>
                <span className="text-amber-400 ml-2 text-sm">Admin</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
              >
                Ver Loja
              </Button>
              <Button
                variant="outline"
                className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-zinc-400">Gerencie sua loja Woodtown</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-amber-600"
            >
              Produtos
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-amber-600"
            >
              Pedidos
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="data-[state=active]:bg-amber-600"
            >
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Gerenciar Produtos
                  </CardTitle>
                  <Dialog
                    open={isAddProductOpen}
                    onOpenChange={setIsAddProductOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Produto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Produto</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Nome do Produto</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  name: e.target.value
                                })
                              }
                              className="bg-zinc-700 border-zinc-600"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Categoria</Label>
                            <Select
                              value={newProduct.category}
                              onValueChange={(value) =>
                                setNewProduct({
                                  ...newProduct,
                                  category: value
                                })
                              }
                            >
                              <SelectTrigger className="bg-zinc-700 border-zinc-600">
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-700 border-zinc-600">
                                <SelectItem value="shapes">Shapes</SelectItem>
                                <SelectItem value="rolamentos">
                                  Rolamentos
                                </SelectItem>
                                <SelectItem value="roupas">Roupas</SelectItem>
                                <SelectItem value="acessorios">
                                  Acessórios
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="price">Preço (R$)</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={newProduct.price}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  price: e.target.value
                                })
                              }
                              className="bg-zinc-700 border-zinc-600"
                            />
                          </div>
                          <div>
                            <Label htmlFor="stock">Estoque</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={newProduct.stock}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  stock: e.target.value
                                })
                              }
                              className="bg-zinc-700 border-zinc-600"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                              id="description"
                              value={newProduct.description}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  description: e.target.value
                                })
                              }
                              className="bg-zinc-700 border-zinc-600 h-32"
                            />
                          </div>
                          <div>
                            <Label htmlFor="image">URL da Imagem</Label>
                            <Input
                              id="image"
                              value={newProduct.image}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  image: e.target.value
                                })
                              }
                              className="bg-zinc-700 border-zinc-600"
                            />
                          </div>
                          <div className="flex space-x-2 pt-4">
                            <Button
                              onClick={handleAddProduct}
                              className="bg-amber-600 hover:bg-amber-700 flex-1"
                            >
                              Salvar Produto
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddProductOpen(false)}
                              className="border-zinc-600"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700">
                      <TableHead className="text-zinc-300">Produto</TableHead>
                      <TableHead className="text-zinc-300">Categoria</TableHead>
                      <TableHead className="text-zinc-300">Preço</TableHead>
                      <TableHead className="text-zinc-300">Estoque</TableHead>
                      <TableHead className="text-zinc-300">Status</TableHead>
                      <TableHead className="text-zinc-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="border-zinc-700">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-lg"
                            />
                            <span className="text-white font-medium">
                              {product.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-white font-medium">
                          R$ {product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Gerenciar Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700">
                      <TableHead className="text-zinc-300">Pedido</TableHead>
                      <TableHead className="text-zinc-300">Cliente</TableHead>
                      <TableHead className="text-zinc-300">Data</TableHead>
                      <TableHead className="text-zinc-300">Items</TableHead>
                      <TableHead className="text-zinc-300">Total</TableHead>
                      <TableHead className="text-zinc-300">Status</TableHead>
                      <TableHead className="text-zinc-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="border-zinc-700">
                        <TableCell className="text-white font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {order.customer}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {order.date}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {order.items}
                        </TableCell>
                        <TableCell className="text-white font-medium">
                          R$ {order.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Gerenciar Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 text-lg">
                    Funcionalidade de clientes em desenvolvimento
                  </p>
                  <p className="text-zinc-500 text-sm mt-2">
                    Em breve você poderá gerenciar todos os clientes da sua loja
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
