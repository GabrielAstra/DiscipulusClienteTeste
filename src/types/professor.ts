export interface DisponibilidadeHorario {
  id: string;
  idAgenda: string | null;
  horaInicial: string;
  horaFinal: string;
  agendaDisponivelEnum: number;
}

export interface DisponibilidadeDia {
  agendaId: string;
  diaSemana: number;
  horarios: {
    $values: DisponibilidadeHorario[];
  };
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
  idiomas?: string[];
  habilidades: string[];
  mediaAvaliacoes: number;
  urlFoto: string;
  fotoPerfil: string;
  valorHora: number;
  totalAvaliacoes: number;
  detalhesHabilidades?: {
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
    $values: DisponibilidadeDia[];
  };

  disponibilidadeHorario?: {
    $values: DisponibilidadeHorario[];
  };
}
