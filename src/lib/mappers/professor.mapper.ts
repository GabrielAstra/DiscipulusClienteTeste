import { Professor } from "@/types/professor";

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

    // Adiciona timestamp na URL da foto para evitar cache
    const fotoPerfil = apiProfessor.fotoPerfil 
        ? `${apiProfessor.fotoPerfil}${apiProfessor.fotoPerfil.includes('?') ? '&' : '?'}t=${Date.now()}`
        : '/avatar.png';

    return {
        id: apiProfessor.professorId,
        nome: apiProfessor.nome,
        usuarioID: apiProfessor.usuarioId || '',
        horaAula: apiProfessor.horaAula || 0,
        tempoExperiencia: apiProfessor.tempoExperiencia ?? 0,
        localizacao: apiProfessor.localizacao,
        biografia: apiProfessor.sobreMim ?? "Professor sem biografia cadastrada.",
        idioma: idiomas[0] || '',
        idiomas,
        habilidades,
        mediaAvaliacoes: apiProfessor.mediaAvaliacoes ?? 0,
        urlFoto: fotoPerfil,
        fotoPerfil: fotoPerfil,
        valorHora: apiProfessor.precoHoraAula ?? 0,
        totalAvaliacoes: apiProfessor.totalAvaliacoes ?? 0,
    };
}
