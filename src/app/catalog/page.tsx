'use client';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

import CartaoProfessor from '@/components/CartaoProfessor';
import { materias } from '@/model/mock/materia-mock';
import FiltroMateria from '@/components/FiltroMateria';
import { professores } from '@/model/mock/professor-mock';

export default function CatalogoProfessoresPage() {
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState('avaliacao');

  const materiasDisponiveis = useMemo(() => {
    if (categoriaSelecionada === 'Todas') {
      return materias.map(m => m.nome);
    }
    return materias.filter(m => m.categoria === categoriaSelecionada).map(m => m.nome);
  }, [categoriaSelecionada]);

  const professoresFiltrados = useMemo(() => {
    let filtrados = professores.filter(professor => {
      const correspondeABusca = professor.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                          professor.materias.some(materia => 
                            materia.toLowerCase().includes(termoBusca.toLowerCase())
                          );
      
      const correspondeMaterias = materiasSelecionadas.length === 0 ||
                            materiasSelecionadas.some(materia => 
                              professor.materias.includes(materia)
                            );
      
      return correspondeABusca && correspondeMaterias;
    });

    filtrados.sort((a, b) => {
      switch (ordenarPor) {
        case 'avaliacao':
          return b.avaliacao - a.avaliacao;
        case 'preco-baixo':
          return a.valorHora - b.valorHora;
        case 'preco-alto':
          return b.valorHora - a.valorHora;
        case 'avaliacoes':
          return b.numeroAvaliacoes - a.numeroAvaliacoes;
        default:
          return 0;
      }
    });

    return filtrados;
  }, [termoBusca, materiasSelecionadas, ordenarPor]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Encontre o Professor Perfeito</h1>
          <p className="text-gray-600">
            Navegue pelo nosso catálogo de professores especialistas e encontre a combinação perfeita para suas necessidades de aprendizado.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome ou matéria..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {mostrarFiltros && (
            <div className="lg:w-80">
              <FiltroMateria
                categoriaSelecionada={categoriaSelecionada}
                aoMudarCategoria={setCategoriaSelecionada}
                materiasSelecionadas={materiasSelecionadas}
                aoMudarMateria={setMateriasSelecionadas}
                materiasDisponiveis={materiasDisponiveis}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {professoresFiltrados.length} professor{professoresFiltrados.length !== 1 ? 'es' : ''} encontrado{professoresFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>

            {professoresFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum professor encontrado</h3>
                <p className="text-gray-600">
                  Tente ajustar seus critérios de busca ou filtros para encontrar mais professores.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {professoresFiltrados.map((professor) => (
                  <CartaoProfessor key={professor.id} professor={professor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}