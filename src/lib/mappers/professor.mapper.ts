import { Professor } from "@/types/professor";

export function mapProfessorFromApi(apiProfessor: Record<string, unknown>): Professor {
    const habilidades = ((apiProfessor.habilidades as { $values?: unknown[] })?.$values ?? [])
        .map((h: unknown) => {
            if (typeof h === 'string') return h.trim();
            const obj = h as Record<string, string>;
            return obj.nomeHabilidade || obj.nome || obj.habilidade || '';
        })
        .filter((h: string) => h !== '');

    const idiomas = ((apiProfessor.idiomas as { $values?: unknown[] })?.$values ?? [])
        .map((i: unknown) => typeof i === 'string' ? i.trim() : i)
        .filter((i: unknown) => i !== '');

    // Adiciona timestamp na URL da foto para evitar cache
    const fotoPerfil = apiProfessor.fotoPerfil 
        ? `${apiProfessor.fotoPerfil}${(apiProfessor.fotoPerfil as string).includes('?') ? '&' : '?'}t=${Date.now()}`
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
