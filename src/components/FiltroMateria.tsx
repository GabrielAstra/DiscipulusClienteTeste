import { categorias } from '@/model/mock/materia-mock';
import React from 'react';

interface PropriedadesFiltroMateria {
  categoriaSelecionada: string;
  aoMudarCategoria: (categoria: string) => void;
  materiasSelecionadas: string[];
  aoMudarMateria: (materias: string[]) => void;
  materiasDisponiveis: string[];
}

export default function FiltroMateria({
  categoriaSelecionada,
  aoMudarCategoria,
  materiasSelecionadas,
  aoMudarMateria,
  materiasDisponiveis
}: PropriedadesFiltroMateria) {
  const alternarMateria = (materia: string) => {
    if (materiasSelecionadas.includes(materia)) {
      aoMudarMateria(materiasSelecionadas.filter(m => m !== materia));
    } else {
      aoMudarMateria([...materiasSelecionadas, materia]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Matéria</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => aoMudarCategoria(categoria)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  categoriaSelecionada === categoria
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Matérias
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {materiasDisponiveis.map((materia) => (
              <label key={materia} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={materiasSelecionadas.includes(materia)}
                  onChange={() => alternarMateria(materia)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{materia}</span>
              </label>
            ))}
          </div>
        </div>
        
        {materiasSelecionadas.length > 0 && (
          <button
            onClick={() => aoMudarMateria([])}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}