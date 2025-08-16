export function aplicarMascaraTelefone(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, "");

    let telefoneFormatado = "+";

    if (apenasNumeros.length > 0) {
        telefoneFormatado += apenasNumeros.slice(0, 2);
    }

    if (apenasNumeros.length >= 3) {
        telefoneFormatado += " " + apenasNumeros.slice(2, 4);
    }

    if (apenasNumeros.length >= 5) {
        telefoneFormatado += " " + apenasNumeros.slice(4, 9);
    }

    if (apenasNumeros.length >= 10) {
        telefoneFormatado += "-" + apenasNumeros.slice(9, 13);
    }

    return telefoneFormatado.trim();
}

export const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
};

export const formatarData = (dataString: string): string => {
    return new Date(dataString).toLocaleDateString("pt-BR");
};

export const formatarDataInput = (dataString: string): string => {
    return new Date(dataString).toISOString().split("T")[0];
};

export const formatarDataPreview = (dataString: string): string => {
    return new Date(dataString).toLocaleDateString("pt-BR", {
        month: 'short',
        year: 'numeric'
    });
};

export const calcularDuracao = (inicio: string, fim: string): string => {
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    const diffAnos = dataFim.getFullYear() - dataInicio.getFullYear();
    const diffMeses = dataFim.getMonth() - dataInicio.getMonth();

    const totalMeses = diffAnos * 12 + diffMeses;
    const anos = Math.floor(totalMeses / 12);
    const meses = totalMeses % 12;

    if (anos > 0 && meses > 0) {
        return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    } else if (anos > 0) {
        return `${anos} ano${anos > 1 ? 's' : ''}`;
    } else {
        return `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    }
};