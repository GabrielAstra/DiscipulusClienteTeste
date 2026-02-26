"use client"

import Link from "next/link";
import { Shrikhand, Plus_Jakarta_Sans } from 'next/font/google';
import {
  ArrowLeft,
  Shield,
  FileText,
  Users,
  CreditCard,
  BookOpen,
  CheckCircle
} from '@phosphor-icons/react';import { useState } from "react";

const plusJakarta = Plus_Jakarta_Sans({
  weight: '800',
  subsets:['latin'],
  display: 'swap'

})
const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const secoes = [
  {
    id: "aceitacao",
    icone: FileText,
    titulo: "1. Qualidade de Ensino",
    cor: "indigo",
    itens: [
      "Prepare materiais didáticos claros e organizados para cada aula",
      "Adapte a metodologia ao nível e necessidades do aluno",
      "Forneça exercícios práticos e exemplos relevantes",
      "Acompanhe o progresso do aluno e ajuste o plano de estudos"
    ]
  },
  {
    id: "cadastro",
    icone: Users,
    titulo: "2. Profissionalismo",
    cor: "purple",
    itens: [
      "Seja pontual e respeite os horários agendados",
      "Comunique-se de forma clara e respeitosa",
      "Mantenha sigilo sobre informações pessoais dos alunos",
      "Cancele ou remarque aulas com pelo menos 24h de antecedência"
    ]
  },
  {
    id: "servicos",
    icone: BookOpen,
    titulo: "3. Conduta e Respeito",
    cor: "blue",
    itens: [
      "Trate todos os alunos com igualdade e respeito",
      "Não discrimine por gênero, raça, orientação ou religião",
      "Mantenha uma postura ética em todas as interações",
      "Reporte qualquer comportamento inadequado à plataforma"
    ]
  },
  {
    id: "pagamentos",
    icone: CreditCard,
    titulo: "4. Qualificações",
    cor: "green",
    itens: [
       "Mantenha suas credenciais e diplomas atualizados",
      "Lecione apenas matérias nas quais tenha domínio comprovado",
      "Busque atualização contínua na sua área de ensino",
      "Participe dos treinamentos oferecidos pela plataforma"
    ]
  },
  {
    id: "conduta",
    icone: Shield,
    titulo: "5. Proibições",
    cor: "orange",
    itens: [
        "Não compartilhe conteúdo protegido por direitos autorais",
      "Não solicite pagamentos fora da plataforma",
      "Não compartilhe dados de contato pessoal nas primeiras aulas",
      "Não faça promessas de resultados garantidos em provas"
    ]
  },
  {
    id: "privacidade",
    icone: Shield,
    titulo: "6. Compromisso com o Aluno",
    cor: "indigo",
    itens: [
       "Priorize o aprendizado e desenvolvimento do estudante",
      "Ofereça feedback construtivo e encorajador",
      "Esteja disponível para tirar dúvidas entre as aulas",
      "Celebre as conquistas e progressos do aluno"
    ]
  }
  
];

export default function TermosDeUso() {
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(null);

  const corMap: Record<string, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    orange: "from-orange-500 to-amber-600",
    red: "from-red-500 to-rose-600",
  };

  const bgCorMap: Record<string, string> = {
    indigo: "bg-indigo-50 border-indigo-200",
    purple: "bg-purple-50 border-purple-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    orange: "bg-orange-50 border-orange-200",
    red: "bg-red-50 border-red-200",
  };

  const textCorMap: Record<string, string> = {
    indigo: "text-indigo-700",
    purple: "text-purple-700",
    blue: "text-blue-700",
    green: "text-green-700",
    orange: "text-orange-700",
    red: "text-red-700",
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header Hero */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para o início
          </Link>

         

          <h1 className={`${shrikhand.className} text-5xl md:text-6xl text-white mb-6 leading-tight`}>
            Diretrizes
          </h1>

          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl leading-relaxed">
            Leia atentamente as diretrizes que regem a plataforma Discipulus.
          </p>

          
        </div>
      </section>

      {/* Navegação Rápida */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {secoes.map((secao) => (
              <a
                key={secao.id}
                href={`#${secao.id}`}
                className="flex-shrink-0 px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 font-medium whitespace-nowrap"
              >
                {secao.titulo.split(". ")[1]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Aviso de Leitura */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 flex gap-4">
            <div className="flex-shrink-0">
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Leitura Recomendada</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Este documento contém informações importantes sobre as diretrizes ao usar o Discipulus.
                Recomendamos a leitura completa antes de criar sua conta ou realizar qualquer transação na plataforma.
              </p>
            </div>
          </div>

          {/* Seções dos Termos */}
          <div className="space-y-8">
            {secoes.map((secao, index) => {
              const Icone = secao.icone;
              const gradiente = corMap[secao.cor] || corMap.indigo;
              const bgCor = bgCorMap[secao.cor] || bgCorMap.indigo;
              const textCor = textCorMap[secao.cor] || textCorMap.indigo;

              return (
                <div
                  key={secao.id}
                  id={secao.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Header da Seção */}
                  <button
                    onClick={() => setSecaoAtiva(secaoAtiva === secao.id ? null : secao.id)}
                    className="w-full text-left p-8 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradiente} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icone className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {secao.titulo}
                      </h2>
                    </div>
                  </button>

                  {/* Conteúdo - Expandível */}
                  <div className={`transition-all duration-500 overflow-hidden ${secaoAtiva === secao.id || true ? 'max-h-none' : 'max-h-0'}`}>
                    <div className={`mx-8 mb-8 rounded-2xl ${bgCor} border p-6`}>
                    <ul className="space-y-3">
  {secao.itens.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer simples */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Discipulus</h3>
              <p className="text-gray-400 mb-6">
                A plataforma que conecta estudantes aos melhores professores do Brasil.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Para Estudantes</h4>
              <ul className="space-y-3">
                <li><Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">Encontrar Professores</Link></li>
                <li><Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link href="/subjects" className="text-gray-400 hover:text-white transition-colors">Matérias</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Para Professores</h4>
              <ul className="space-y-3">
                <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors">Cadastre-se</Link></li>
                <li><Link href="/teacher-resources" className="text-gray-400 hover:text-white transition-colors">Recursos</Link></li>
                <li><Link href="/teacher-guidelines" className="text-gray-400 hover:text-white transition-colors">Diretrizes</Link></li>
                <li><Link href="/earnings" className="text-gray-400 hover:text-white transition-colors">Ganhos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Suporte</h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 Discipulus. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}