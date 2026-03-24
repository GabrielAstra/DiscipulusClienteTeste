"use client";

import { Check, ArrowLeft, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { obterCheckout } from "@/lib/service/checkout/checkout.service";

interface DadosCheckout {
  checkoutSessaoId: string;
  tokenPublico: string;
  nomeProfessor: string;
  fotoProfessor: string;
  dataAula: string;
  horarioInicial: string;
  horarioFinal: string;
  valor: number;
}

export default function PaginaCheckout() {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const [dados, setDados] = useState<DadosCheckout | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<"credito" | "pix">("credito");
  const [processando, setProcessando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoPromo, setCodigoPromo] = useState(false);

  useEffect(() => {
    async function buscarCheckout() {
      try {
        const json = await obterCheckout(token);
        if (!json.success) {
          setErro(json.message || "Checkout não encontrado.");
          return;
        }
        setDados(json.data);
      } catch (err: unknown) {
        const error = err as { message?: string };
        setErro(error.message || "Erro ao carregar checkout.");
      } finally {
        setCarregando(false);
      }
    }
    if (token) buscarCheckout();
  }, [token]);

  const lidarComPagamento = async () => {
    setProcessando(true);
    setTimeout(() => {
      setProcessando(false);
      setSucesso(true);
      setTimeout(() => router.push("/"), 2500);
    }, 2000);
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (erro || !dados) {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">{erro || "Checkout inválido."}</p>
          <button onClick={() => router.push("/")} className="text-blue-600 underline text-sm">
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  const dataFormatada = new Date(dados.dataAula).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const taxaPlataforma = parseFloat((dados.valor * 0.05).toFixed(2));
  const total = parseFloat((dados.valor + taxaPlataforma).toFixed(2));

  return (
    <div className="min-h-screen bg-[#eef0f4] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Painel esquerdo — detalhes de pagamento */}
          <div className="flex-1 p-8 lg:p-10">
            <h1 className="text-xl font-bold text-gray-900 mb-8">Detalhes do pagamento</h1>

            {/* Seletor de método */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setMetodoPagamento("credito")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  metodoPagamento === "credito"
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Cartão de crédito
              </button>
              <button
                onClick={() => setMetodoPagamento("pix")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  metodoPagamento === "pix"
                    ? "border-green-600 text-green-600 bg-green-50"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <span className="w-4 h-4 bg-green-500 rounded text-white text-[9px] font-bold flex items-center justify-center">P</span>
                PIX
              </button>
            </div>

            {metodoPagamento === "credito" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Número do cartão
                  </label>
                  <input
                    type="text"
                    placeholder="x x x x   x x x x   x x x x   x x x x"
                    maxLength={19}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="mm / aa"
                      maxLength={5}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="x x x"
                      maxLength={3}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Nome no cartão
                  </label>
                  <input
                    type="text"
                    placeholder="Nome como está no cartão"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 gap-4">
                <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                  <span className="text-5xl">📱</span>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Escaneie o QR Code com o app do seu banco para pagar via PIX
                </p>
              </div>
            )}

            {/* Código promo */}
            <label className="flex items-center gap-2 mt-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={codigoPromo}
                onChange={(e) => setCodigoPromo(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-600"
              />
              <span className="text-sm text-gray-600">Tenho um código promocional</span>
            </label>
            {codigoPromo && (
              <input
                type="text"
                placeholder="Digite o código"
                className="mt-3 w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            )}

            {/* Resumo de valores */}
            <div className="mt-6 space-y-2 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>R$ {dados.valor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxa da plataforma</span>
                <span>R$ {taxaPlataforma.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={lidarComPagamento}
              disabled={processando}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {processando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Processando...
                </>
              ) : (
                "Realizar pagamento"
              )}
            </button>
          </div>

          {/* Painel direito — resumo da aula */}
          <div className="lg:w-80 bg-gray-900 text-white flex flex-col">
            <div className="p-8 lg:p-10 flex-1 flex flex-col">
              {/* Ícone decorativo */}
              <div className="flex gap-1.5 mb-8">
                <div className="w-5 h-5 rounded-full bg-blue-500" />
                <div className="w-3 h-3 rounded-full bg-white self-end mb-0.5" />
              </div>

              <h2 className="text-xl font-bold leading-snug mb-8">
                Agende sua aula e comece a evoluir hoje
              </h2>

              {/* Card do professor */}
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-4 mb-8">
                <img
                  src={dados.fotoProfessor}
                  alt={dados.nomeProfessor}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                />
                <div>
                  <p className="font-semibold text-white text-sm">{dados.nomeProfessor}</p>
                  <p className="text-white/60 text-xs mt-0.5">R$ {dados.valor.toFixed(2)} / aula</p>
                </div>
              </div>

              {/* Detalhes da aula */}
              <ul className="space-y-3 flex-1">
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span className="capitalize">{dataFormatada}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Horário: {dados.horarioInicial} – {dados.horarioFinal}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  Pagamento 100% seguro e protegido
                </li>
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  Confirmação imediata por e-mail
                </li>
              </ul>
            </div>

            {/* Toast de sucesso */}
            {sucesso && (
              <div className="m-6 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xl animate-fade-in">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-800 font-semibold text-sm">Pagamento realizado com sucesso!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
