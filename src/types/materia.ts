/** Habilidade no catálogo (filtro), com categoria e ícone. Na UI exibida como "Matéria". */
export interface HabilidadeCatalogo {
  id: string;
  nome: string;
  categoria: string;
  icone: string;
}

/** @deprecated Use HabilidadeCatalogo */
export type Materia = HabilidadeCatalogo;
