export interface DisponibilidadeHorario {
  id: string;
  idAgenda: string;
  horaInicial: string;
  horaFinal: string;
  agendaDisponivelEnum: number;
}

export interface Professor {
  id: string;
  nome: string;
  usuarioID: string;
  horaAula: number;
  tempoExperiencia: number;
  localizacao?: string;
  biografia: string;
  idioma: string;
  materias: string[];
  mediaAvaliacoes: number;
  valorHora: number;
  totalAvaliacoes: number;
  habilidades?: {
    $values: {
      habilidadeID: string;
      nomeHabilidade: string;
    }[];
  };

  formacoes?: {
    $values: {
      id?: string;
      titulo: string;
      instituicao: string;
      dtInicio: string;
      dtConclusao: string;
    }[];
  };

  experiencias?: {
    $values: {
      titulo: string;
      instituicao: string;
      inicio: string;
      fim: string;
      descricao: string;
    }[];
  };

  avaliacao?: {
    $values: {
      avaliacaoId: string;
      nota: number;
      comentario: string;
    }[];
  };

  disponibilidade?: {
    $values: string[];
  };

  disponibilidadeHorario?: {
    $values: DisponibilidadeHorario[];
  };
}
