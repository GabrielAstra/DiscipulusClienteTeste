"use client";

import { useState, useEffect } from "react";
import { User, DollarSign, CalendarDays } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { DadosCarteira } from "@/types/teacher";
import { ProfileHeader } from "@/components/teacher/ProfileHeader";
import { AcademicEducation } from "@/components/teacher/AcademicEducation";
import { ProfessionalExperience } from "@/components/teacher/ProfessionalExperience";
import { SubjectsAndAvailability } from "@/components/teacher/SubjectsAndAvailability";
import { WalletOverview } from "@/components/teacher/WalletOverview";
import { TransactionHistory } from "@/components/teacher/TransactionHistory";
import { WithdrawalModal } from "@/components/teacher/WithdrawalModal";
import { ProfilePreviewModal } from "@/components/teacher/ProfilePreviewModal";
import AgendaTab from "@/components/teacher/ClassSchedule";
import { aulasMock } from "@/data/mockAulasAgendadas";
import Onboarding, { OnboardingStep } from "@/components/Onboarding";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useUsuario } from "@/context/UsuarioContext";
import { useRouter } from "next/navigation";

const onboardingSteps: OnboardingStep[] = [
  {
    target: "[data-onboarding='profile-header']",
    title: "Bem-vindo ao seu Painel!",
    content: "Este é o seu painel de professor. Aqui você pode gerenciar seu perfil, aulas e ganhos. Vamos fazer um tour rápido!",
    placement: "bottom",
  },
  {
    target: "[data-onboarding='profile-photo']",
    title: "Foto de Perfil",
    content: "Adicione uma foto profissional. Uma boa foto aumenta a confiança dos alunos e melhora suas chances de conseguir mais aulas.",
    placement: "right",
  },
  {
    target: "[data-onboarding='profile-info']",
    title: "Informações Pessoais",
    content: "Preencha suas informações pessoais, biografia e localização. Quanto mais completo seu perfil, mais visível você fica na plataforma.",
    placement: "bottom",
  },
  {
    target: "[data-onboarding='academic']",
    title: "Formação Acadêmica",
    content: "Adicione sua formação acadêmica. Isso mostra sua qualificação e experiência aos alunos.",
    placement: "top",
  },
  {
    target: "[data-onboarding='experience']",
    title: "Experiência Profissional",
    content: "Descreva sua experiência profissional. Compartilhe onde você trabalhou e o que ensinou.",
    placement: "top",
  },
  {
    target: "[data-onboarding='subjects']",
    title: "Matérias e Disponibilidade",
    content: "Selecione as matérias que você ensina e configure sua disponibilidade de horários. Isso permite que os alunos agendem aulas com você.",
    placement: "top",
  },
  {
    target: "[data-onboarding='tabs']",
    title: "Navegação",
    content: "Use estas abas para navegar entre seu perfil, carteira (onde você vê seus ganhos) e agenda (suas aulas agendadas).",
    placement: "bottom",
  },
  {
    target: "[data-onboarding='save-button']",
    title: "Salvar Perfil",
    content: "Não esqueça de salvar suas alterações! Após preencher tudo, clique em 'Salvar Perfil' para que seu perfil seja aprovado e exibido na plataforma.",
    placement: "left",
  },
];


export default function PainelProfessor() {
  const { usuario, loading: loadingUser } = useUsuario();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && usuario) {
      if (usuario.papel !== "Professor") {
        router.push("/unauthorized");
      }
    }
  }, [usuario, loadingUser, router]);
  const [abaAtiva, setAbaAtiva] = useState<"perfil" | "carteira" | "agenda">("perfil");
  const [mostrarModalSaque, setMostrarModalSaque] = useState(false);
  const [mostrarModalPreview, setMostrarModalPreview] = useState(false);

  const {
    perfil,
    setPerfil,
    editando,
    setEditando,
    salvandoPerfil,
    uploadingPhoto,
    todasHabilidades,
    lidarComSalvarPerfil,
    handleSelecionarAvatar,
    handleRemoverFormacao,
    handleRemoverExperiencia,
    avatarUrl,
  } = useProfile();
  
  const { showOnboarding, completeOnboarding, skipOnboarding } = useOnboarding(perfil);

  const [dadosCarteira] = useState<DadosCarteira>({
    saldo: 1250.5,
    ganhosTotal: 8750.0,
    pagamentosPendentes: 320.0,
    ganhosMensais: 2100.0,
    transacoes: [
      {
        id: "1",
        tipo: "ganho",
        valor: 45.0,
        descricao: "Aula de Matemática - João Silva",
        data: "2024-01-15",
        status: "concluido",
      },
      {
        id: "2",
        tipo: "ganho",
        valor: 90.0,
        descricao: "Aula de Física - Maria Santos",
        data: "2024-01-14",
        status: "concluido",
      },
      {
        id: "3",
        tipo: "saque",
        valor: -500.0,
        descricao: "Saque via PIX",
        data: "2025-01-10",
        status: "concluido",
      },
    ],
  });



  const lidarComSaque = (valor: number, metodo: string) => {
    console.log("Solicitação de saque:", { valor, metodo });
    alert("Solicitação de saque enviada com sucesso!");
  };
  const [horariosRemovidos, setHorariosRemovidos] = useState<string[]>([]);

  // Mostrar loading enquanto verifica autenticação
  if (loadingUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Não renderizar nada se não for professor (será redirecionado)
  if (!usuario || usuario.papel !== "Professor") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#eef0f4] ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8" data-onboarding="profile-header">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel do Professor
          </h1>
          <p className="text-gray-600">Gerencie seu perfil, aulas e ganhos</p>
        </div>

        <div className="mb-8" data-onboarding="tabs">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setAbaAtiva("perfil")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${abaAtiva === "perfil"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                <User className="w-5 h-5 inline mr-2" />
                Meu Perfil
              </button>
              <button
                onClick={() => setAbaAtiva("carteira")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${abaAtiva === "carteira"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Carteira
              </button>
              <button
                onClick={() => setAbaAtiva("agenda")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${abaAtiva === "agenda"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                <CalendarDays className="w-5 h-5 inline mr-2" />
                Agenda
              </button>
            </nav>
          </div>
        </div>
        {abaAtiva === "agenda" && (
          <div className="space-y-8">
            <AgendaTab aulas={aulasMock} />
          </div>
        )}
        {abaAtiva === "perfil" && (
          <div className="space-y-8">
            <ProfileHeader
              perfil={perfil}
              setPerfil={setPerfil}
              editando={editando}
              setEditando={setEditando}
              salvandoPerfil={salvandoPerfil}
              uploadingPhoto={uploadingPhoto}
              todasHabilidades={todasHabilidades}
              onSalvar={lidarComSalvarPerfil}
              onFileUpload={handleSelecionarAvatar}
              avatarUrl={avatarUrl}
              onShowPreview={() => setMostrarModalPreview(true)}
            />

            <AcademicEducation
              perfil={perfil}
              setPerfil={setPerfil}
              editando={editando}
              onRemoverFormacao={handleRemoverFormacao}
            />

            <ProfessionalExperience
              perfil={perfil}
              setPerfil={setPerfil}
              editando={editando}
              onRemoverExperiencia={handleRemoverExperiencia}
            />

            <SubjectsAndAvailability
              perfil={perfil}
              setPerfil={setPerfil}
              editando={editando}
              todasHabilidades={todasHabilidades}
              setHorariosRemovidos={setHorariosRemovidos}
            />
          </div>
        )}

        {abaAtiva === "carteira" && (
          <div className="space-y-8">
            <WalletOverview
              dadosCarteira={dadosCarteira}
              onSolicitarSaque={() => setMostrarModalSaque(true)}
            />

            <TransactionHistory dadosCarteira={dadosCarteira} />
          </div>
        )}

        <WithdrawalModal
          mostrarModal={mostrarModalSaque}
          onClose={() => setMostrarModalSaque(false)}
          dadosCarteira={dadosCarteira}
          onConfirmarSaque={lidarComSaque}
        />

        <ProfilePreviewModal
          mostrarModal={mostrarModalPreview}
          onClose={() => setMostrarModalPreview(false)}
          perfil={perfil}
          todasHabilidades={todasHabilidades}
        />
        
        <Onboarding
          steps={onboardingSteps}
          show={showOnboarding}
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
      </div>
    </div>
  );
}