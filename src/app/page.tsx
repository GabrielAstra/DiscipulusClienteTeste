"use client"

import { 
  ArrowRight, 
  Star, 
  Users, 
  Clock, 
  Award, 
  ChevronDown, 
  MessageCircle, 
  Target, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  GraduationCap,
  Music,
  Piano,
  FileText,
  MessageSquare,
  Globe,
  Flame,
  Calculator,
  Atom,
  FlaskConical
} from 'lucide-react';
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Plus_Jakarta_Sans } from 'next/font/google';
import WaveDivider from "@/components/WaveDivider";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonials } from "@/data/testimonials";
import { faq } from "@/data/faq";
import Footer from "@/components/Footer";
import CartaoProfessorSimples from "@/components/CartaoProfessorSimples";


const plusJakartaSpans = Plus_Jakarta_Sans({
  weight: '300',
  subsets: ['latin'],
  display: 'swap'

})
const plusJakarta = Plus_Jakarta_Sans({
  weight: '800',
  subsets: ['latin'],
  display: 'swap'

})


export default function Home() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);
  const [materiaSelecionada, setMateriaSelecionada] = useState<string>("Todas");
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const materias = [
    { nome: "Todas", icone: BookOpen },
    { nome: "Espanhol", icone: Globe },
    { nome: "Violão", icone: Music },
    { nome: "Piano", icone: Piano },
    { nome: "Português", icone: FileText },
    { nome: "Inglês - Conversação", icone: MessageSquare },
    { nome: "Alemão", icone: GraduationCap },
    { nome: "Dança", icone: Flame },
    { nome: "Matemática", icone: Calculator },
    { nome: "Física", icone: Atom },
    { nome: "Química", icone: FlaskConical },
  ];

  const professoresMock = [
    {
      id: "1",
      nome: "Maria Silva",
      usuarioID: "user-1",
      horaAula: 60,
      fotoPerfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      urlFoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      biografia: "Professora de Espanhol com experiência em conversação e preparação para certificações internacionais.",
      tempoExperiencia: 8,
      idioma: "Português",
      idiomas: ["Português", "Espanhol", "Inglês"],
      mediaAvaliacoes: 4.9,
      totalAvaliacoes: 127,
      valorHora: 85,
      habilidades: ["Espanhol", "Conversação", "DELE"],
    },
    {
      id: "2",
      nome: "João Santos",
      usuarioID: "user-2",
      horaAula: 60,
      fotoPerfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      urlFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      biografia: "Músico profissional especializado em violão clássico e popular. Método personalizado para cada aluno.",
      tempoExperiencia: 12,
      idioma: "Português",
      idiomas: ["Português"],
      mediaAvaliacoes: 5.0,
      totalAvaliacoes: 89,
      valorHora: 95,
      habilidades: ["Violão", "Música", "Teoria Musical"],
    },
    {
      id: "3",
      nome: "Ana Costa",
      usuarioID: "user-3",
      horaAula: 60,
      fotoPerfil: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      urlFoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      biografia: "Pianista formada pelo conservatório com foco em técnica clássica e preparação para apresentações.",
      tempoExperiencia: 10,
      idioma: "Português",
      idiomas: ["Português", "Italiano"],
      mediaAvaliacoes: 4.8,
      totalAvaliacoes: 156,
      valorHora: 110,
      habilidades: ["Piano", "Música Clássica", "Teoria"],
    },
    {
      id: "4",
      nome: "Carlos Mendes",
      usuarioID: "user-4",
      horaAula: 60,
      fotoPerfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      urlFoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      biografia: "Professor de Matemática com didática inovadora. Especialista em preparação para vestibulares e ENEM.",
      tempoExperiencia: 15,
      idioma: "Português",
      idiomas: ["Português"],
      mediaAvaliacoes: 4.9,
      totalAvaliacoes: 203,
      valorHora: 75,
      habilidades: ["Matemática", "ENEM", "Vestibular"],
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden" >
      <section className="relative bg-white pb-32 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50" style={{ paddingTop: "40px" }}>
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `rgba(101, 98, 255, ${Math.min(scrollY / 500, 0.15)})`,
            backdropFilter: `blur(${Math.min(scrollY / 50, 8)}px)`,
            opacity: scrollY > 0 ? 1 : 0
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            <div className="lg:w-1/2 text-left">
              <h1 className={`${plusJakarta.className} text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight`}>
                A Plataforma Moderna de
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent block mt-2">
                  Educação Online
                </span>
              </h1>

              <p className={`${plusJakartaSpans.className} text-lg md:text-xl text-gray-600 mb-10 leading-relaxed`}>
                Conecte-se com professores especialistas. Aprenda, colabore e alcance seus objetivos educacionais.
              </p>

              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#6562ff] hover:from-indigo-700 hover:to-purple-700 text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Começar Agora
              </Link>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-1">
                <div className="bg-white rounded-[36px] p-4">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                    alt="Estudantes colaborando"
                    className="w-full h-auto rounded-[32px] object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#6562ff] rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">20k+</p>
                    <p className="text-sm text-gray-600">Estudantes</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#6562ff] rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Professores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-background rounded-t-[2.5rem] -mt-6 relative z-30 px-8 lg:px-16 py-16'>
        <div className='text-center mb-12'>
          <h1 className={`${plusJakarta.className} text-5xl font-bold mb-3`}>
            Cursos mais populares
          </h1>
          <span className="text-gray-600">Reunimos os melhores profissionais do setor para lhe proporcionar habilidades práticas e atualizadas.</span>
        </div>

        <div className="relative mb-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-full shadow-lg py-4 px-16 relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth items-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {materias.map((materia) => {
                const IconComponent = materia.icone;
                return (
                  <button
                    key={materia.nome}
                    onClick={() => setMateriaSelecionada(materia.nome)}
                    className={`flex flex-col items-center justify-center min-w-[100px] py-2 transition-all duration-300 ${
                      materiaSelecionada === materia.nome
                        ? 'opacity-100'
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-2 transition-all ${
                      materiaSelecionada === materia.nome
                        ? 'bg-gray-100'
                        : 'bg-transparent'
                    }`}>
                      <IconComponent size={28} className="text-indigo-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center whitespace-nowrap">
                      {materia.nome}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {professoresMock.map((professor) => (
            <CartaoProfessorSimples key={professor.id} professor={professor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r bg-[#6562ff] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Ver Todos os Professores
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      <section className="bg-background rounded-t-[2.5rem] -mt-6 relative z-30 px-8 lg:px-16 py-16">
        <div className='text-center'>
          <h1 className={`$plusJakarta.className text-3xl font-bold mb-10  `}>
            Por que escolher o Discipulus ?
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map(({ icon, title, description, highlighted }) => (
            <div
              key={title}
              className={`rounded-2xl p-8 transition-all ${highlighted
                ? "bg-lime text-accent-foreground shadow-lg shadow-lime/20 efeito-vidro-roxo"
                : "bg-background text-foreground"
                }`}
            >
              <div >
                <Image
                  src={icon}
                  alt={title}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              <h3 className="font-heading font-bold text-lg mb-3 ">
                {title}
              </h3>

              <p
                className={`text-sm leading-relaxed ${highlighted
                  ? "text-accent-foreground/80"
                  : "text-muted-foreground"
                  }`}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 relative">
        <WaveDivider flip color="#ffffff" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6 `}>
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Simples, seguro e garantido
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { numero: 1, titulo: "Encontre seu Professor", descricao: "Navegue pelo nosso catálogo de professores verificados e encontre o ideal para suas necessidades." },
              { numero: 2, titulo: "Pague com Segurança", descricao: "Realize o pagamento de forma segura através da nossa plataforma protegida e confiável." },
              { numero: 3, titulo: "Tenha sua Aula", descricao: "Conecte-se com seu professor no horário agendado e aproveite sua aula personalizada." },
              { numero: 4, titulo: "Garantia Total", descricao: "Sua satisfação é garantida. Caso não fique satisfeito, devolvemos seu dinheiro." }
            ].map((passo, indice) => (
              <div key={indice} className="text-center group">
                <div className={`w-16 h-16 ${passo.numero === 4 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-[#6562ff]'} text-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {passo.numero === 4 ? '✓' : passo.numero}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {passo.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {passo.descricao}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Segurança da Plataforma
              </h3>
              <p className="text-gray-600 text-lg">
                Sua tranquilidade é nossa prioridade
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  imagem: "/verificado.png",
                  titulo: "Professores Verificados",
                  descricao: "Todos os professores passam por verificação rigorosa de identidade e qualificações.",
                  cor: "green"
                },
                { imagem: "pagamentoSeguro.png", titulo: "Pagamento Seguro", descricao: "Transações protegidas com criptografia de ponta e sistemas de pagamento confiáveis.", cor: "blue" },
                { imagem: "/suporte24h.png", titulo: "Suporte 24/7", descricao: "Nossa equipe está sempre disponível para ajudar você em qualquer situação.", cor: "purple" }
              ].map((item, indice) => (
                <div key={indice} className="text-center group">
                  <div className={`flex items-center justify-center mx-auto mb-6  `}>
                    {item.imagem ? (
                      <img src={item.imagem} alt={item.titulo} className="w-50 h-50" />
                    ) : (
                      <div className={`w-20 h-10`} />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.titulo}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
        <WaveDivider color="#ffffff" />

      </section>


      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6`}>
              O que Nossos Estudantes Dizem
            </h2>
            <p className="text-xl text-gray-600">
              Histórias reais de sucesso acadêmico
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, indice) => (
              <div key={indice} className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.nome}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-indigo-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.nome}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.curso}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.nota)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-blue-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.texto}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6`}>
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nossa plataforma
            </p>
          </div>

          <div className="space-y-3">
            {faq.map((item, indice) => (
              <div key={indice} className="bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setFaqAberto(faqAberto === indice ? null : indice)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      faqAberto === indice 
                        ? 'bg-gray-900 text-white rotate-0' 
                        : 'bg-white text-gray-900'
                    }`}>
                      {faqAberto === indice ? (
                        <span className="text-xl font-light leading-none">×</span>
                      ) : (
                        <span className="text-xl font-light leading-none">+</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pt-0.5">{item.pergunta}</h3>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  faqAberto === indice ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pl-[4.5rem]">
                    <p className="text-gray-600 leading-relaxed">{item.resposta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 bg-[#6562ff] from-gray-50 to-indigo-50 relative">
        <WaveDivider color="rgb(16, 24, 40)" />
        <WaveDivider flip color="#ffff" />


        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Pronto para Começar
            <span className="block">a Aprender?</span>
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto">
            Junte-se a milhares de estudantes que melhoraram suas notas e confiança com o Discipulus.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/catalog"
              className="group bg-white text-indigo-600 hover:bg-gray-50 px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>Comece Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="group border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ver Demo</span>
            </Link>
          </div>

          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Target className="w-12 h-12 text-white mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Resultados Garantidos</h4>
                <p className="text-indigo-100 text-sm">Melhore suas notas ou seu dinheiro de volta</p>
              </div>
              <div>
                <Clock className="w-12 h-12 text-white mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Suporte Imediato</h4>
                <p className="text-indigo-100 text-sm">Tire dúvidas em tempo real com nossos especialistas</p>
              </div>
              <div>
                <Award className="w-12 h-12 text-white mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Certificado de Qualidade</h4>
                <p className="text-indigo-100 text-sm">Plataforma certificada pelos melhores educadores</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}