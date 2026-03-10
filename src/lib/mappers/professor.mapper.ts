import { Professor } from "@/types/professor";

const AVATARES_MOCK = [
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
];

export function mapProfessorFromApi(apiProfessor: any, index: number): Professor {
    return {
        id: apiProfessor.professorId,
        nome: apiProfessor.nome,
        avatar: AVATARES_MOCK[index % AVATARES_MOCK.length],
        habilidades: (apiProfessor.habilidades?.$values ?? [])
            .map((h: any) => {
                // Tentar diferentes formatos possíveis
                return h.nomeHabilidade || h.nome || h.habilidade || (typeof h === 'string' ? h : '');
            })
            .filter((h: string) => h !== ''), // Remover strings vazias
        mediaAvaliacoes: apiProfessor.mediaAvaliacoes ?? 0,
        totalAvaliacoes: apiProfessor.totalAvaliacoes,
        valorHora: apiProfessor.precoHoraAula ?? 0,
        experiencia: `${apiProfessor.tempoExperiencia} anos`,
        biografia: apiProfessor.sobreMim ?? "Professor sem biografia cadastrada.",
        idiomas: apiProfessor.idiomas?.$values ?? [],
        disponibilidade: [],
        fotoPerfil: apiProfessor.fotoPerfil,
        verificado: true,
    };
}
