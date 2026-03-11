import { Professor } from "@/types/professor";

const AVATARES_MOCK = [
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
];

export function mapProfessorFromApi(apiProfessor: any, index: number): Professor {
    // Habilidades agora vêm como strings diretas: ["C#", "HTML", "Portugues"]
    const habilidades = (apiProfessor.habilidades?.$values ?? [])
        .map((h: any) => {
            // Se for string, usar diretamente
            if (typeof h === 'string') {
                return h.trim();
            }
            // Fallback para formato antigo (objeto)
            return h.nomeHabilidade || h.nome || h.habilidade || '';
        })
        .filter((h: string) => h !== '');

    // Idiomas agora vêm como strings diretas: ["Norueguês", "Finlandês"]
    const idiomas = (apiProfessor.idiomas?.$values ?? [])
        .map((i: any) => typeof i === 'string' ? i.trim() : i)
        .filter((i: string) => i !== '');

    return {
        id: apiProfessor.professorId,
        nome: apiProfessor.nome,
        avatar: AVATARES_MOCK[index % AVATARES_MOCK.length],
        habilidades,
        mediaAvaliacoes: apiProfessor.mediaAvaliacoes ?? 0,
        totalAvaliacoes: apiProfessor.totalAvaliacoes,
        valorHora: apiProfessor.precoHoraAula ?? 0,
        experiencia: `${apiProfessor.tempoExperiencia} anos`,
        biografia: apiProfessor.sobreMim ?? "Professor sem biografia cadastrada.",
        idiomas,
        disponibilidade: [],
        fotoPerfil: apiProfessor.fotoPerfil,
        verificado: true,
    };
}
