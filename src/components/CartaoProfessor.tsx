import React from "react";
import {
  Star,
  CheckCircle,
  Globe,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import { Professor } from "@/types/professor";
import Link from "next/link";

interface PropriedadesCartaoProfessor {
  professor: Professor;
}

export default function CartaoProfessor({
  professor,
}: PropriedadesCartaoProfessor) {
  const habilidades = professor.detalhesHabilidades?.$values?.map(h => h.nomeHabilidade) || professor.habilidades || [];
  const idiomas = professor.idiomas || (professor.idioma ? [professor.idioma] : []);
  
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
    
      <div className="relative h-64 overflow-hidden">
        <img
          src={professor.fotoPerfil || "/avatar.png"}
          alt={professor.nome}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/avatar.png";
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-700">Online</span>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-[#6562ff] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white">
          <CheckCircle className="h-3.5 w-3.5" />
          Verificado
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-white drop-shadow-lg">
            {professor.nome}
          </h3>
          <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5" />
              {professor.tempoExperiencia} anos
            </span>
            {idiomas.length > 0 && (
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {idiomas.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(professor.mediaAvaliacoes)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {professor.mediaAvaliacoes}
            </span>
            <span className="text-xs text-gray-500">
              ({professor.totalAvaliacoes})
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="h-3.5 w-3.5" />
            32 alunos
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {habilidades.slice(0, 3).map((habilidade, i) => (
            <span
              key={i}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
            >
              {habilidade}
            </span>
          ))}
          {habilidades.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              +{habilidades.length - 3}
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
          {professor.biografia}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">A partir de</p>
            <p className="text-2xl font-bold text-gray-900">
              R${professor.valorHora}
              <span className="text-sm font-normal text-gray-500">/aula</span>
            </p>
          </div>
          <Link
            href={`/teacher/${professor.id}`}
            className="flex items-center gap-2 rounded-xl bg-[#6562ff] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Ver Perfil
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
