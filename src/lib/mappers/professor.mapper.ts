import { Professor } from "@/types/professor";

function toNum(value: unknown, fallback = 0): number {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value !== "") {
        const n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    }
    return fallback;
}

export function mapProfessorFromApi(apiProfessor: Record<string, unknown>): Professor {
    const habilidades = ((apiProfessor.habilidades as { $values?: unknown[] })?.$values ?? [])
        .map((h: unknown) => {
            if (typeof h === 'string') return h.trim();
            const obj = h as Record<string, string>;
            return obj.nomeHabilidade || obj.nome || obj.habilidade || '';
        })
        .filter((h: string) => h !== '');

    const idiomas = ((apiProfessor.idiomas as { $values?: unknown[] })?.$values ?? [])
        .map((i: unknown) => (typeof i === "string" ? i.trim() : String(i ?? "")))
        .filter((i: string) => i !== "");

    // Adiciona timestamp na URL da foto para evitar cache
    const fotoPerfil = apiProfessor.fotoPerfil 
        ? `${apiProfessor.fotoPerfil}${(apiProfessor.fotoPerfil as string).includes('?') ? '&' : '?'}t=${Date.now()}`
        : '/avatar.png';

    return {
        id: String(apiProfessor.professorId ?? ""),
        nome: String(apiProfessor.nome ?? ""),
        usuarioID: String(apiProfessor.usuarioId ?? ""),
        horaAula: toNum(apiProfessor.horaAula),
        tempoExperiencia: toNum(apiProfessor.tempoExperiencia),
        localizacao:
            apiProfessor.localizacao == null ? undefined : String(apiProfessor.localizacao),
        biografia: String(apiProfessor.sobreMim ?? "Professor sem biografia cadastrada."),
        idioma: idiomas[0] || "",
        idiomas,
        habilidades,
        mediaAvaliacoes: toNum(apiProfessor.mediaAvaliacoes),
        urlFoto: fotoPerfil,
        fotoPerfil: fotoPerfil,
        valorHora: toNum(apiProfessor.precoHoraAula),
        totalAvaliacoes: toNum(apiProfessor.totalAvaliacoes),
    };
}
