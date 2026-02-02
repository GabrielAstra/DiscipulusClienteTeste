

interface ApiList<T> {
    $id: string;
    $values: T[];
}
export interface PerfilProfessor {
    $id: string;
    usuarioID: string;
    nome: string;
    sobrenome: string;
    biografia: string;
    sobreMim: string;
    localizacao: string;
    idioma: string;
    email: string;
    celular: string | null;
    tipo: number;
    status: number;
    horaAula: number;
    username: string;
    urlFoto: string;
    avaliacao: ApiList<Avaliacao>;
    disponibilidade: ApiList<string>;
    experiencias: ApiList<Experiencia>;
    habilidades: ApiList<Habilidade>;
    formacoes: ApiList<Formacao>;
    tempoExperiencia: number;

}


export interface Experiencia {
    $id: string;
    id: string;
    usuarioId: string | null;
    titulo: string;
    instituicao: string;
    inicio: string;
    fim: string;
    descricao: string;
}

export interface Formacao {
    $id: string;
    id: string;
    usuarioId: string;
    titulo: string;
    instituicao: string;
    dtInicio: string;
    dtConclusao: string;
}

export interface Avaliacao {
    $id: string;
    avaliacaoId: number;
    nota: number;
    comentario: string;
}

export interface Habilidade {
    habilidadeID: string;
    nomeHabilidade: string;
}


export async function listarProfessor(id: string) {
    const res = await fetch(`/api/teacher?id=${id}`);
    if (!res.ok) throw new Error("Erro ao buscar professor");
    return res.json();
}



