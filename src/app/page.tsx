"use client"

import { Metadata } from "next";
import { ArrowRight, BookOpen, CheckCircle, Search, Star, Users, Clock, Shield, Award, ChevronDown, MessageCircle, Zap, Target } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";
import { Shrikhand } from 'next/font/google';
import WaveDivider from "@/components/WaveDivider";

const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
export default function Home() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

 

  const testimonials = [
    {
      nome: "Ana Silva",
      curso: "Engenharia",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      texto: "O Discipulus mudou completamente minha experiência acadêmica. Consegui tirar 9.5 em Cálculo com a ajuda do Professor João!",
      nota: 5
    },
    {
      nome: "Carlos Mendes",
      curso: "Medicina",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      texto: "Professores incríveis e metodologia que realmente funciona. Recomendo para todos que querem melhorar suas notas.",
      nota: 5
    },
    {
      nome: "Maria Santos",
      curso: "Direito",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      texto: "A plataforma é intuitiva e os professores são extremamente qualificados. Consegui aprovação no vestibular!",
      nota: 5
    }
  ];

  const faq = [
    {
      pergunta: "Como funciona o processo de agendamento?",
      resposta: "Você escolhe o professor, seleciona data e horário disponíveis, realiza o pagamento e recebe confirmação com link da aula."
    },
    {
      pergunta: "Posso cancelar ou remarcar uma aula?",
      resposta: "Sim! Você pode cancelar ou remarcar até 24h antes da aula sem custo adicional."
    },
    {
      pergunta: "Como são selecionados os professores?",
      resposta: "Todos passam por verificação de diplomas, experiência comprovada e avaliação pedagógica rigorosa."
    },
    {
      pergunta: "Existe garantia de satisfação?",
      resposta: "Oferecemos garantia de 100% de satisfação. Se não ficar satisfeito, devolvemos seu dinheiro."
    }
  ];


  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-32 overflow-hidden">
        <WaveDivider color="#ffff" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
              <div className="lg:w-1/2 text-left">
                
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-full px-6 py-2 mb-8 shadow-lg">
                  <Star className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-indigo-700">
                    Plataforma #1 de Tutoria no Brasil
                  </span>
                </div>

                <h1 className={`${shrikhand.className} text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight`}>
                  Encontre o Professor
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent block">
                    Perfeito para Você
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                  Conecte-se com professores especialistas para experiências de aprendizado personalizadas.
                  Domine qualquer matéria com orientação individual de profissionais verificados.
                </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">

                  <Link
                    href="/catalog"
                    className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Encontrar Professores</span>
                  </Link>

                  <Link
                    href="/register"
                    className="group border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-3 backdrop-blur-sm bg-white/80 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Seja um Professor</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

              </div>
            

            </div>

            {/* LADO DIREITO (IMAGEM) */}
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/alunoNovo.png"
                alt="Estudante aprendendo online"
                className="w-full max-w-lg"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Título */}
            <div className="text-center mb-20">
              <h2 className={`${shrikhand.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6`}>
                Por que Escolher o{" "}
                <span className="text-indigo-600">Discipulus?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tornamos o aprendizado acessível, eficaz e prazeroso para estudantes de todos os níveis.
              </p>
            </div>

            {/* CARDS PRINCIPAIS */}
            <div className="grid md:grid-cols-3 gap-10 mb-16">
                {[
                  {
                    img: "/especialistasProfs.png",
                    titulo: "Professores Especialistas",
                    descricao: "Conecte-se com professores verificados e experientes em todas as matérias"
                  },
                  {
                    img: "/materias.png",
                    titulo: "Todas as Matérias",
                    descricao: "De exatas a humanas, encontre ajuda em qualquer matéria que precisar"
                  },
                  {
                    img: "/qualidade.png",
                    titulo: "Qualidade Garantida",
                    descricao: "Todos os professores são avaliados por estudantes como você"
                  }
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-indigo-200 
                              shadow-[0_8px_20px_rgba(99,102,241,0.12)] 
                              p-8 text-center 
                              hover:shadow-[0_12px_28px_rgba(99,102,241,0.20)] 
                              transition-all duration-300"
                  >
                    <img
                      src={card.img}
                      alt={card.titulo}
                      className="w-32 h-32 md:w-50 md:h-50 mx-auto mb-6 object-contain scale-125"
                    />

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {card.titulo}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.descricao}
                    </p>
                  </div>

                ))}
              </div>

              {/* CARDS MENORES */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                img: "/flexivelAula.png",
                icone: Clock,
                titulo: "Horários Flexíveis",
                descricao: "Agende suas aulas quando for mais conveniente para você"
              },
              {
                img: "/pagamentoVerificado.png",
                icone: Shield,
                titulo: "100% Seguro",
                descricao: "Pagamentos protegidos e dados criptografados"
              },
              {
                img: "/premiados.png",
                icone: Award,
                titulo: "Professores Premiados",
                descricao: "Educadores reconhecidos e com excelência comprovada"
              },
              {
                img: "/resultados.png",
                icone: Zap,
                titulo: "Resultados Rápidos",
                descricao: "Veja melhorias em suas notas já nas primeiras aulas"
              }
            ].map((card, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl border-2 border-indigo-300 
                          shadow-[0_10px_25px_rgba(99,102,241,0.18)] 
                          p-6 pt-14 transition-all duration-300 
                          hover:shadow-[0_15px_35px_rgba(99,102,241,0.28)]"
              >
                <img
                  src={card.img}
                  alt={card.titulo}
                  className="w-40 h-40 mx-auto absolute -top-16 left-1/2 -translate-x-1/2 object-contain"
                />

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <card.icone className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-semibold text-gray-900">
                      {card.titulo}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 relative">
        <WaveDivider flip color="#ffffff" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`${shrikhand.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6 `}>
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
                <div className={`w-16 h-16 ${passo.numero === 4 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-indigo-600 to-purple-600'} text-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
                {  imagem:"pagamentoSeguro.png",titulo: "Pagamento Seguro", descricao: "Transações protegidas com criptografia de ponta e sistemas de pagamento confiáveis.", cor: "blue" },
                {  imagem: "/suporte24h.png",titulo: "Suporte 24/7", descricao: "Nossa equipe está sempre disponível para ajudar você em qualquer situação.", cor: "purple" }
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
        {/* <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 320"
            className="relative block w-full h-24"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,160L80,144C160,128,320,96,480,112C640,128,800,192,960,192C1120,192,1280,128,1360,96L1440,64V320H0Z"
            />
          </svg>
        </div> */}
        <WaveDivider color="#ffffff" />

      </section>
      

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`${shrikhand.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6`}>
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
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
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
            <h2 className={`${shrikhand.className} text-4xl md:text-5xl font-bold text-gray-900 mb-6`}>
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nossa plataforma
            </p>
          </div>

          <div className="space-y-4">
            {faq.map((item, indice) => (
              <div key={indice} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => setFaqAberto(faqAberto === indice ? null : indice)}
                  className="w-full text-left p-6 flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{item.pergunta}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${faqAberto === indice ? 'rotate-180' : ''}`} />
                </button>
                {faqAberto === indice && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{item.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 relative overflow-hidden">
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

      {/* Footer */}
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