"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import CartaoProfessor from "@/components/CartaoProfessor";
import { habilidades as habilidadesCatalogo } from "@/types/mock/materia-mock";
import FiltroMateria from "@/components/FiltroMateria";
import { Professor } from "@/types/professor";
import { listarProfessores } from "@/lib/service/catalog/catalog.service";
import { mapProfessorFromApi } from "@/lib/mappers/professor.mapper";

export default function CatalogoProfessoresPage() {
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<string[]>(
    []
  );
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState("avaliacao");
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const [paginacao, setPaginacao] = useState(12);

  // Reset to page 1 when search term or page size changes
  useEffect(() => {
    setPagina(1);
  }, [termoBusca, paginacao]);

  useEffect(() => {
    async function carregarProfessores() {
      try {
        const response = await listarProfessores({
          filtros: termoBusca || undefined,
          pagina,
          paginacao: paginacao,
          busca: !!termoBusca,
        });

        // Log para debug da estrutura da resposta
        console.log("API response:", JSON.stringify(response, null, 2));

        const itens = response.data?.itens?.$values || response.data?.itens || [];
        
        const professoresMapeados = itens.map(mapProfessorFromApi);
        setProfessores(professoresMapeados);

        const tp = response.data?.totalPaginas ?? response.totalPaginas ?? 1;
        const ti = response.data?.totalItens ?? response.totalItens ?? professoresMapeados.length;
        setTotalPaginas(tp);
        setTotalItens(ti);
      } catch (error) {
        console.error("Erro ao carregar professores", error);
      }
    }

    carregarProfessores();
  }, [termoBusca, pagina, paginacao]);


  const habilidadesDisponiveis = useMemo(() => {
    if (categoriaSelecionada === "Todas") {
      return habilidadesCatalogo.map((h) => h.nome);
    }
    return habilidadesCatalogo
      .filter((h) => h.categoria === categoriaSelecionada)
      .map((h) => h.nome);
  }, [categoriaSelecionada]);

  const professoresFiltrados = useMemo(() => {
    const filtrados = professores.filter((professor) => {
      const correspondeABusca =
        professor.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        professor.habilidades.some((habilidade) =>
          habilidade.toLowerCase().includes(termoBusca.toLowerCase())
        );

      const correspondeHabilidades =
        habilidadesSelecionadas.length === 0 ||
        habilidadesSelecionadas.some((habilidade) =>
          professor.habilidades.includes(habilidade)
        );

      return correspondeABusca && correspondeHabilidades;
    });

    filtrados.sort((a, b) => {
      switch (ordenarPor) {
        case "avaliacao":
          return b.totalAvaliacoes - a.totalAvaliacoes;
        case "preco-baixo":
          return a.valorHora - b.valorHora;
        case "preco-alto":
          return b.valorHora - a.valorHora;
        case "avaliacoes":
          return b.mediaAvaliacoes - a.mediaAvaliacoes;
        default:
          return 0;
      }
    });

    return filtrados;
  }, [professores, termoBusca, habilidadesSelecionadas, ordenarPor]);

  return (
    <div className="min-h-screen bg-[#eef0f4] relative">
      <div
        className="fixed inset-0 z-0"
      
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Encontre o Professor Perfeito
          </h1>
          <p className="text-gray-600">
            Navegue pelo nosso catálogo de professores especialistas e encontre
            a combinação perfeita para suas necessidades de aprendizado.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome ou matéria..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-3 border-0 rounded-2xl focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filtros</span>
              </button>

              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="avaliacao">Melhor Avaliados</option>
                <option value="preco-baixo">Preço: Menor para Maior</option>
                <option value="preco-alto">Preço: Maior para Menor</option>
                <option value="avaliacoes">Mais Avaliações</option>
              </select>

              <select
                value={paginacao}
                onChange={(e) => setPaginacao(Number(e.target.value))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value={10}>10 por página</option>
                <option value={12}>12 por página</option>
                <option value={30}>30 por página</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {mostrarFiltros && (
            <div className="lg:w-80">
              <FiltroMateria
                categoriaSelecionada={categoriaSelecionada}
                aoMudarCategoria={setCategoriaSelecionada}
                habilidadesSelecionadas={habilidadesSelecionadas}
                aoMudarHabilidades={setHabilidadesSelecionadas}
                habilidadesDisponiveis={habilidadesDisponiveis}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {totalItens > 0 ? totalItens : professoresFiltrados.length} professor
                {(totalItens > 0 ? totalItens : professoresFiltrados.length) !== 1 ? "es" : ""} encontrado
                {(totalItens > 0 ? totalItens : professoresFiltrados.length) !== 1 ? "s" : ""}
              </p>
            </div>

            {professoresFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum professor encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar seus critérios de busca ou filtros para
                  encontrar mais professores.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {professoresFiltrados.map((professor) => (
                    <CartaoProfessor key={professor.id} professor={professor} />
                  ))}
                </div>

                {totalPaginas >= 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPagina((p) => Math.max(1, p - 1))}
                      disabled={pagina === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Anterior
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPaginas ||
                          Math.abs(p - pagina) <= 1
                      )
                      .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                          acc.push("...");
                        }
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === "..." ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                            ...
                          </span>
                        ) : (
                          <button
                            key={item}
                            onClick={() => setPagina(item as number)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                              pagina === item
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )}

                    <button
                      onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                      disabled={pagina === totalPaginas}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Próximo
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
