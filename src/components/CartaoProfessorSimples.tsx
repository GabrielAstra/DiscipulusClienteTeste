import React from "react";
import { Star } from "lucide-react";
import { Professor } from "@/types/professor";
import Link from "next/link";

interface PropriedadesCartaoProfessor {
  professor: Professor;
}

export default function CartaoProfessorSimples({
  professor,
}: PropriedadesCartaoProfessor) {
  const habilidades = professor.detalhesHabilidades?.$values?.map(h => h.nomeHabilidade) || professor.habilidades || [];
  const totalCursos = habilidades.length;
  
  return (
    <Link href={`/teacher/${professor.id}`}>
      <div className="group relative w-full overflow-hidden rounded-3xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Imagem do Professor */}
        <div className="relative h-[450px] overflow-hidden">
          <img
            src={professor.fotoPerfil || "/avatar.png"}
            alt={professor.nome}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/avatar.png";
            }}
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Conteúdo sobre a imagem */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Nome e verificação */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-2xl drop-shadow-lg">
                {professor.nome}
              </h3>
              <i className="uis uis-check-circle text-[#6562ff] text-2xl"></i>
            </div>
            
            {/* Profissão e experiência */}
            <p className="text-white/90 text-sm mb-4">
              {habilidades[0] || "Professor"} | {professor.tempoExperiencia}+ anos de experiência
            </p>
            
            {/* Cursos e avaliação */}
            <div className="flex items-center gap-3">
              <div className="bg-[#6562ff] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {totalCursos} Courses
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold text-sm">
                  {professor.mediaAvaliacoes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
