export async function obterCheckout(tokenPublico: string) {
    const res = await fetch(`/api/agendamento/checkout/${tokenPublico}`);

    if (!res.ok) {
        const erro = await res.json().catch(() => ({}));
        throw new Error(erro?.message || "Checkout não encontrado");
    }

    return res.json();
}
