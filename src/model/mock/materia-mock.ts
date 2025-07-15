import { Materia } from "@/model/materia";

export const materias: Materia[] = [
  { id: "1", nome: "Matemática", categoria: "Exatas", icone: "Calculator" },
  { id: "2", nome: "Física", categoria: "Exatas", icone: "Atom" },
  { id: "3", nome: "Química", categoria: "Exatas", icone: "TestTube" },
  { id: "4", nome: "Biologia", categoria: "Exatas", icone: "Microscope" },
  {
    id: "5",
    nome: "Ciência da Computação",
    categoria: "Exatas",
    icone: "Monitor",
  },
  { id: "6", nome: "Programação", categoria: "Exatas", icone: "Code" },
  { id: "7", nome: "Literatura", categoria: "Humanas", icone: "BookOpen" },
  { id: "8", nome: "Redação", categoria: "Humanas", icone: "PenTool" },
  { id: "9", nome: "História", categoria: "Humanas", icone: "Clock" },
  { id: "10", nome: "Geografia", categoria: "Humanas", icone: "Globe" },
  { id: "11", nome: "Economia", categoria: "Negócios", icone: "TrendingUp" },
  {
    id: "12",
    nome: "Administração",
    categoria: "Negócios",
    icone: "Briefcase",
  },
];

export const categorias = ["Todas", "Exatas", "Humanas", "Negócios"];
