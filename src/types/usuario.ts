export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  papel: "Aluno" | "Professor";
  role: string;
}
