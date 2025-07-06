"use client";

import { useEffect, useState } from "react";
import { Product } from "../backend/model/schemaModel";
import { formData } from "../backend/model/formSchema";

interface ApiError {
  message: string;
  status: number;
}

export default function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/product", {
        method: "GET"
      });
      if (!response.ok) {
        let message = "Erro ao buscar o anúncio";

        switch (response.status) {
          case 400:
            message = "Solicitação inválida, Verifique os parâmetros";
          case 404:
            message = "Recurso não encontrado. Verifique o URL.";
            break;
          case 500:
            message = "Erro interno do servidor. Tente novamente mais tarde.";
            break;
          default:
            message = `Erro inesperado: ${response.status}`;
        }

        throw { message, status: response.status };
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/services/product/${id}`, {
        method: "DELETE"
      });
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      fetchProducts();
    }
  };

  const createProduct = async (data: Partial<formData>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Erro ao criar o anuncio");
      const dataSet = await response.json();
      setProducts([...products, dataSet]);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      await fetchProducts();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    createProduct,
    deleteProduct,
    error,
    loading
  };
}
