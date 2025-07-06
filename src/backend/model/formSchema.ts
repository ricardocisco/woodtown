import z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "o nome do produto precisa ter pelo menos 5 letras" }),
  price: z.number().min(1, { message: "o preço precisa ser maior que 0" }),
  stock: z.number().min(1, { message: "a quantidade precisa ser maior que 0" }),
  category: z.enum(["Shapes", "Rolamentos", "Roupas", "Acessorios"], {
    errorMap: () => ({ message: "Selecione uma categoria válida" })
  }),
  description: z
    .string()
    .min(5, { message: "a descricão precisa ter pelo menos 5 letras" })
    .max(500, { message: "a descricão precisa ter menos de 500 letras" }),
  imageUrl: z
    .string()
    .min(5, { message: "a url da imagem precisa ter pelo menos 5 letras" })
});

export type formData = z.infer<typeof formSchema>;
