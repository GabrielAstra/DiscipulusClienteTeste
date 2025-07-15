export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  papel: "estudante" | "professor";
}
