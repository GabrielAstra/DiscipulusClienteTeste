export interface IniciarCheckoutPayload {
    professorId: string;
    agendaId: string;
    horarioId: string;
    diaMesAgendamento: string;
    observacao: string;
}

export async function iniciarCheckout(dados: IniciarCheckoutPayload) {
    const res = await fetch("/api/agendamento/iniciar-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    if (!res.ok) {
        const erro = await res.json().catch(() => ({}));
        throw new Error(erro?.message || "Erro ao iniciar checkout");
    }

    return res.json();
}
