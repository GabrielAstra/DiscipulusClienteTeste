import { diasSemana } from "@/constants/teacher";
import {
  PerfilProfessor,
  FormacaoDTO,
  ExperienciaDTO,
  DisponibilidadeDia,
  HorarioDisponivel,
} from "@/types/teacher";

interface ObterProfessorHorario {
  id?: string;
  horaInicial: string;
  horaFinal: string;
}

interface ObterProfessorDia {
  diaSemana: number;
  horarios?: { $values?: ObterProfessorHorario[] };
}

interface ObterProfessorDisponibilidade {
  $values?: ObterProfessorDia[];
}

interface ObterProfessorFormacao {
  id: string;
  titulo: string;
  instituicao: string;
  dtInicio: string;
  dtConclusao: string;
}

interface ObterProfessorExperiencia {
  id: string;
  titulo: string;
  instituicao: string;
  inicio: string;
  fim: string;
  descricao: string;
}

interface ObterProfessorHabilidade {
  habilidadeID: string;
  nomeHabilidade: string;
}

export interface ObterProfessorResponse {
  usuarioID: string;
  nome: string;
  sobrenome?: string;
  biografia: string;
  sobreMim?: string;
  email: string;
  celular: string | null;
  localizacao: string;
  disponibilidade?: ObterProfessorDisponibilidade;
  idioma?: string;
  horaAula: number;
  tempoExperiencia: number;
  urlFoto: string | null;
  experiencias?: { $values?: ObterProfessorExperiencia[] };
  habilidades?: { $values?: ObterProfessorHabilidade[] };
  formacoes?: { $values?: ObterProfessorFormacao[] };
  onBoarding?: boolean;
}

function mapearDisponibilidadeParaPerfil(
  disponibilidade: ObterProfessorDisponibilidade | undefined
): DisponibilidadeDia[] {
  const values = disponibilidade?.$values ?? [];
  if (values.length === 0) return [];

  const porDia = new Map<number, HorarioDisponivel[]>();
  const seenIds = new Set<string>();

  for (const item of values) {
    const diaSemana = item.diaSemana;
    const horarios = item.horarios?.$values ?? [];

    for (const h of horarios) {
      const id = h.id ?? `${h.horaInicial}-${h.horaFinal}`;
      if (seenIds.has(id)) continue;
      seenIds.add(id);

      const horario: HorarioDisponivel = {
        id: h.id,
        HoraInicial: h.horaInicial?.substring(0, 5) ?? h.horaInicial,
        HoraFinal: h.horaFinal?.substring(0, 5) ?? h.horaFinal,
      };

      const existentes = porDia.get(diaSemana) ?? [];
      existentes.push(horario);
      porDia.set(diaSemana, existentes);
    }
  }

  return Array.from(porDia.entries())
    .sort(([a], [b]) => a - b)
    .map(([diaSemana, horarios]) => ({
      dia: diasSemana[diaSemana] ?? "",
      horarios,
    }))
    .filter((d) => d.dia);
}

export function mapearObterProfessorParaPerfil(
  api: ObterProfessorResponse
): PerfilProfessor {
  const idiomasArray = api.idioma
    ? api.idioma
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  const formacoes: FormacaoDTO[] = (api.formacoes?.$values ?? []).map(
    (f) => ({
      id: f.id,
      titulo: f.titulo,
      instituicao: f.instituicao,
      dtInicio: f.dtInicio,
      dtConclusao: f.dtConclusao,
    })
  );

  const experiencias: ExperienciaDTO[] = (api.experiencias?.$values ?? []).map(
    (e) => ({
      id: e.id,
      titulo: e.titulo,
      instituicao: e.instituicao,
      inicio: e.inicio,
      fim: e.fim,
      descricao: e.descricao ?? "",
    })
  );

  const habilidades: string[] = (api.habilidades?.$values ?? []).map(
    (h) => h.habilidadeID
  );

  const disponibilidadeHorarios = mapearDisponibilidadeParaPerfil(
    api.disponibilidade
  );

  // Adiciona timestamp na URL da foto para evitar cache
  const urlFotoComTimestamp = api.urlFoto 
    ? `${api.urlFoto}${api.urlFoto.includes('?') ? '&' : '?'}t=${Date.now()}`
    : undefined;

  return {
    id: api.usuarioID ?? "",
    nome: api.nome ?? "",
    email: api.email ?? "",
    avatar: urlFotoComTimestamp ?? "/avatar.png",
    urlFoto: urlFotoComTimestamp,
    biografia: api.biografia ?? "",
    habilidades,
    valorHora: api.horaAula ?? 0,
    experiencia: experiencias,
    idiomas: idiomasArray,
    disponibilidadeHorarios,
    tempoExperiencia: api.tempoExperiencia ?? 0,
    formacao: formacoes,
    telefone: api.celular ?? "",
    localizacao: api.localizacao ?? "",
    onBoarding: api.onBoarding ?? false,
  };
}
