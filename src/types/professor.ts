interface DisponibilidadeHorario {
  id: string;
  idAgenda: string;
  horaInicial: string;
  horaFinal: string;
  agendaDisponivelEnum: number;
}

export interface Professor {
  id: string;
  nome: string;
  avatar: string;
  materias: string[];
  mediaAvaliacoes: number;
  totalAvaliacoes: number;
  valorHora: number;
  experiencia: string;
  biografia: string;
  idiomas: string[];
  verificado: boolean;

  disponibilidade: {
    $values: string[];
  };

  disponibilidadeHorario: {
    $values: DisponibilidadeHorario[];
  };
}
