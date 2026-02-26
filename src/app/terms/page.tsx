"use client"

import Link from "next/link";
import { Shrikhand } from 'next/font/google';
import {
  ArrowLeft,
  Shield,
  FileText,
  Users,
  CreditCard,
  BookOpen,
  EnvelopeIcon,
  WarningIcon,
  CaretRightIcon

} from '@phosphor-icons/react'; import { useState } from "react";

const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const secoes = [
  {
    id: "aceitacao",
    icone: FileText,
    titulo: "1. Aceitação dos Termos",
    cor: "indigo",
    conteudo: [
      "Ao acessar ou utilizar a plataforma Discipulus, você concorda em estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos serviços.",
      "Estes termos se aplicam a todos os usuários da plataforma, incluindo estudantes, professores e visitantes. Reservamo-nos o direito de atualizar estes termos a qualquer momento, com notificação prévia por e-mail ou aviso na plataforma.",
      "O uso continuado dos nossos serviços após qualquer modificação constitui sua aceitação dos novos termos. Recomendamos que você revise esta página periodicamente para se manter informado sobre eventuais mudanças."
    ]
  },
  {
    id: "cadastro",
    icone: Users,
    titulo: "2. Cadastro e Conta",
    cor: "purple",
    conteudo: [
      "Para utilizar os serviços do Discipulus, você deve criar uma conta fornecendo informações precisas, completas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de acesso.",
      "Você deve ter pelo menos 13 anos de idade para criar uma conta. Usuários menores de 18 anos devem ter o consentimento de um responsável legal para utilizar nossos serviços pagos.",
      "É proibido criar múltiplas contas, usar contas de terceiros sem autorização, ou fornecer informações falsas durante o cadastro. O Discipulus reserva-se o direito de suspender ou encerrar contas que violem estas políticas.",
      "Você é responsável por todas as atividades realizadas em sua conta e deve nos notificar imediatamente em caso de uso não autorizado ou suspeita de comprometimento de segurança."
    ]
  },
  {
    id: "servicos",
    icone: BookOpen,
    titulo: "3. Serviços Oferecidos",
    cor: "blue",
    conteudo: [
      "O Discipulus é uma plataforma que conecta estudantes a professores particulares para aulas online. Atuamos como intermediários e não somos responsáveis pelo conteúdo das aulas ou pela relação direta entre alunos e professores.",
      "Os professores cadastrados na plataforma são profissionais independentes e não funcionários do Discipulus. Cada professor define sua metodologia, materiais e abordagem pedagógica dentro das diretrizes da plataforma.",
      "Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto dos nossos serviços a qualquer momento, com ou sem aviso prévio, sem responsabilidade para com você ou terceiros.",
      "O Discipulus se compromete a manter a plataforma disponível 24 horas por dia, 7 dias por semana, exceto em casos de manutenção programada ou circunstâncias fora do nosso controle."
    ]
  },
  {
    id: "pagamentos",
    icone: CreditCard,
    titulo: "4. Pagamentos e Reembolsos",
    cor: "green",
    conteudo: [
      "Os pagamentos pela plataforma são processados de forma segura por meio de parceiros certificados. Aceitamos os principais cartões de crédito, débito, PIX e boleto bancário.",
      "Os valores cobrados pelos professores são definidos por eles mesmos e estão claramente indicados em seus perfis. O Discipulus retém uma comissão sobre cada transação como taxa pelo uso da plataforma.",
      "Nossa política de reembolso garante 100% do valor pago em casos de insatisfação com a aula, desde que a solicitação seja feita em até 7 dias após a realização da aula e o motivo seja devidamente justificado.",
      "Cancelamentos feitos com mais de 24 horas de antecedência são reembolsados integralmente. Cancelamentos com menos de 24 horas podem estar sujeitos a uma taxa de cancelamento conforme a política do professor."
    ]
  },
  {
    id: "conduta",
    icone: Shield,
    titulo: "5. Conduta do Usuário",
    cor: "orange",
    conteudo: [
      "Você concorda em utilizar a plataforma de forma ética e respeitosa. É proibido assediar, ameaçar, difamar ou discriminar outros usuários com base em raça, gênero, religião, orientação sexual, deficiência ou qualquer outra característica.",
      "É proibido compartilhar conteúdo inapropriado, ilegal, ofensivo ou que viole direitos autorais de terceiros. Também é vedado usar a plataforma para fins comerciais não autorizados ou para enviar comunicações não solicitadas (spam).",
      "Professores devem manter conduta profissional durante as aulas e respeitar os limites estabelecidos pela plataforma. Qualquer comportamento inadequado deve ser reportado imediatamente à nossa equipe de suporte.",
      "O Discipulus se reserva o direito de remover qualquer conteúdo e suspender ou encerrar contas de usuários que violem estas diretrizes, sem aviso prévio e sem direito a reembolso."
    ]
  },
  {
    id: "privacidade",
    icone: Shield,
    titulo: "6. Privacidade e Dados",
    cor: "indigo",
    conteudo: [
      "Seus dados pessoais são tratados de acordo com nossa Política de Privacidade, disponível nesta plataforma. Coletamos apenas as informações necessárias para fornecer nossos serviços e melhorar sua experiência.",
      "As aulas podem ser gravadas mediante consentimento de ambas as partes para fins educacionais e de controle de qualidade. As gravações são armazenadas com segurança e podem ser acessadas pelos participantes da aula.",
      "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros sem seu consentimento, exceto quando exigido por lei ou necessário para prestação do serviço contratado.",
      "Em conformidade com a LGPD (Lei Geral de Proteção de Dados), você tem o direito de acessar, corrigir, exportar e solicitar a exclusão dos seus dados pessoais a qualquer momento, entrando em contato com nossa equipe."
    ]
  },
  {
    id: "responsabilidade",
    icone: WarningIcon,
    titulo: "7. Limitação de Responsabilidade",
    cor: "red",
    conteudo: [
      "O Discipulus não garante resultados acadêmicos específicos. Os resultados obtidos pelos estudantes dependem de múltiplos fatores, incluindo dedicação pessoal, frequência das aulas e qualidade da interação com o professor.",
      "Nossa responsabilidade é limitada ao valor pago pelos serviços na transação específica em questão. Não nos responsabilizamos por danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso da plataforma.",
      "Não somos responsáveis por falhas técnicas, interrupções de internet ou problemas de conectividade que possam afetar a qualidade das aulas. Recomendamos que ambas as partes testem sua conexão antes de cada sessão.",
      "Em casos de disputas entre estudantes e professores, o Discipulus pode atuar como mediador, mas não possui responsabilidade legal sobre o resultado de tais disputas."
    ]
  },
  {
    id: "contato",
    icone: EnvelopeIcon,
    titulo: "8. Contato e Suporte",
    cor: "purple",
    conteudo: [
      "Para dúvidas, reclamações ou sugestões sobre estes Termos de Uso, entre em contato com nossa equipe pelo e-mail: suporte@discipulus.com.br ou pela Central de Ajuda disponível na plataforma.",
      "Nosso time de suporte está disponível de segunda a sexta-feira, das 8h às 18h, e aos sábados, das 9h às 14h (horário de Brasília). Para situações urgentes, oferecemos suporte por chat em tempo real.",
      "Para questões jurídicas ou notificações formais, o endereço para correspondência é: Discipulus Tecnologia Educacional Ltda., São Paulo - SP, Brasil.",
      "Estes Termos de Uso são regidos pelas leis brasileiras e qualquer disputa será resolvida no foro da Comarca de São Paulo, Estado de São Paulo, Brasil."
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

          <div className="flex items-center gap-4 mb-6">
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Documento Legal</span>
          </div>

          <h1 className={`${shrikhand.className} text-5xl md:text-6xl text-white mb-6 leading-tight`}>
            Termos de Uso
          </h1>

          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl leading-relaxed">
            Leia atentamente as condições que regem o uso da plataforma Discipulus.
            Ao utilizar nossos serviços, você concorda com estes termos.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white text-sm">
              📅 Última atualização: Janeiro de 2025
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white text-sm">
              ⚖️ Regido pela legislação brasileira
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white text-sm">
              🔒 Conforme LGPD
            </div>
          </div>
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
              <WarningIcon className="w-6 h-6 text-amber-500 mt-0.5" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Leitura Recomendada</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Este documento contém informações importantes sobre seus direitos e responsabilidades ao usar o Discipulus.
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
                    <CaretRightIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${secaoAtiva === secao.id ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Conteúdo - Expandível */}
                  <div className={`transition-all duration-500 overflow-hidden ${secaoAtiva === secao.id || true ? 'max-h-none' : 'max-h-0'}`}>
                    <div className={`mx-8 mb-8 rounded-2xl ${bgCor} border p-6`}>
                      <div className="space-y-4">
                        {secao.conteudo.map((paragrafo, i) => (
                          <p key={i} className="text-gray-700 leading-relaxed text-[15px]">
                            {paragrafo}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumo dos Pontos Principais */}
          <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 border border-indigo-100">
            <h3 className={`${shrikhand.className} text-3xl text-gray-900 mb-8 text-center`}>
              Resumo dos Pontos Principais
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { emoji: "✅", titulo: "O que você pode fazer", itens: ["Criar uma conta e agendar aulas", "Avaliar professores após as aulas", "Solicitar reembolso em até 7 dias", "Cancelar aulas com 24h de antecedência"] },
                { emoji: "❌", titulo: "O que não é permitido", itens: ["Criar múltiplas contas falsas", "Compartilhar conteúdo protegido", "Assediar outros usuários", "Usar a plataforma para fins ilegais"] }
              ].map((bloco, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-white">
                  <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">{bloco.emoji}</span>
                    {bloco.titulo}
                  </h4>
                  <ul className="space-y-3">
                    {bloco.itens.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-700 text-sm">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${i === 0 ? 'bg-green-500' : 'bg-red-400'}`}></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Aceite e CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                Ao criar uma conta ou usar nossos serviços, você confirma que leu, entendeu e concorda
                com todos os termos e condições descritos neste documento.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/catalog"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  Encontrar Professores
                  <CaretRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/privacy"
                  className="border-2 border-indigo-200 text-indigo-600 hover:border-indigo-400 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Política de Privacidade
                </Link>
              </div>
            </div>
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