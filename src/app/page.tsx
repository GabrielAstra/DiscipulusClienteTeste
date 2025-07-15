import { Metadata } from "next";
import { ArrowRight, BookOpen, CheckCircle, Search, Star, Users } from 'lucide-react';
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discipulus - Plataforma de Tutoria",
  icons: "../public/BrancoComFundoPreto.jpg"
};

export default function Home() {
  const recursos = [
    {
      icone: Users,
      titulo: 'Professores Especialistas',
      descricao: 'Conecte-se com professores verificados e experientes em todas as matérias'
    },
    {
      icone: BookOpen,
      titulo: 'Todas as Matérias',
      descricao: 'De exatas a humanas, encontre ajuda em qualquer matéria que precisar'
    },
    {
      icone: Star,
      titulo: 'Qualidade Garantida',
      descricao: 'Todos os professores são avaliados por estudantes como você'
    }
  ];

  const estatisticas = [
    { numero: '1000+', rotulo: 'Professores Especialistas' },
    { numero: '50+', rotulo: 'Matérias' },
    { numero: '10k+', rotulo: 'Estudantes Satisfeitos' },
    { numero: '4.9', rotulo: 'Avaliação Média' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Encontre o Professor
              <span className="text-indigo-600 block">Perfeito para Você</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Conecte-se com professores especialistas para experiências de aprendizado personalizadas. 
              Domine qualquer matéria com orientação individual de profissionais verificados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/catalog"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Encontrar Professores</span>
              </Link>
              <Link
                href="/register"
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Seja um Professor</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {estatisticas.map((estatistica, indice) => (
                <div key={indice} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                    {estatistica.numero}
                  </div>
                  <div className="text-gray-600 font-medium">{estatistica.rotulo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher o Discipulus?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tornamos o aprendizado acessível, eficaz e prazeroso para estudantes de todos os níveis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recursos.map((recurso, indice) => (
              <div key={indice} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <recurso.icone className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {recurso.titulo}
                </h3>
                <p className="text-gray-600">
                  {recurso.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Simples, seguro e garantido
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Encontre seu Professor
              </h3>
              <p className="text-gray-600">
                Navegue pelo nosso catálogo de professores verificados e encontre o ideal para suas necessidades.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pague com Segurança
              </h3>
              <p className="text-gray-600">
                Realize o pagamento de forma segura através da nossa plataforma protegida e confiável.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tenha sua Aula
              </h3>
              <p className="text-gray-600">
                Conecte-se com seu professor no horário agendado e aproveite sua aula personalizada.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Garantia Total
              </h3>
              <p className="text-gray-600">
                Sua satisfação é garantida. Caso não fique satisfeito, devolvemos seu dinheiro.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Segurança da Plataforma
              </h3>
              <p className="text-gray-600">
                Sua tranquilidade é nossa prioridade
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professores Verificados</h4>
                <p className="text-sm text-gray-600">
                  Todos os professores passam por verificação rigorosa de identidade e qualificações.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Pagamento Seguro</h4>
                <p className="text-sm text-gray-600">
                  Transações protegidas com criptografia de ponta e sistemas de pagamento confiáveis.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Suporte 24/7</h4>
                <p className="text-sm text-gray-600">
                  Nossa equipe está sempre disponível para ajudar você em qualquer situação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Começar a Aprender?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Junte-se a milhares de estudantes que melhoraram suas notas e confiança com o Discipulus.
          </p>
          <Link
            href="/catalog"
            className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2"
          >
            <span>Comece Agora</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
