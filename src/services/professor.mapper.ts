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
        avatar: AVATARES_MOCK[index % AVATARES_MOCK.length], // mock
        materias: apiProfessor.habilidades?.$values ?? [],
        avaliacao: apiProfessor.mediaAvaliacoes ?? 0,
        numeroAvaliacoes: 0, // mock
        valorHora: apiProfessor.precoHoraAula ?? 0,
        experiencia: `${apiProfessor.tempoExperiencia} anos`,
        biografia: apiProfessor.sobreMim ?? "Professor sem biografia cadastrada.",
        idiomas: apiProfessor.idiomas?.$values ?? [], // mock
        disponibilidade: [], // mock
        verificado: true, // mock
    };
}
