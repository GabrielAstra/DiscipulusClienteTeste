"use client";

import { useState } from "react";
import { User, DollarSign } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { DadosCarteira } from "@/types/teacher";
import { ProfileHeader } from "./ProfileHeader";
import { AcademicEducation } from "./AcademicEducation";
import { ProfessionalExperience } from "./ProfessionalExperience";
import { SubjectsAndAvailability } from "./SubjectsAndAvailability";
import { WalletOverview } from "./WalletOverview";
import { TransactionHistory } from "./TransactionHistory";
import { WithdrawalModal } from "./WithdrawalModal";
import { ProfilePreviewModal } from "./ProfilePreviewModal";

export default function PainelProfessor() {
  const [abaAtiva, setAbaAtiva] = useState<"perfil" | "carteira">("perfil");
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
        data: "2024-01-10",
        status: "concluido",
      },
    ],
  });
  


  const lidarComSaque = (valor: number, metodo: string) => {
    console.log("Solicitação de saque:", { valor, metodo });
    alert("Solicitação de saque enviada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel do Professor
          </h1>
          <p className="text-gray-600">Gerencie seu perfil, aulas e ganhos</p>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setAbaAtiva("perfil")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === "perfil"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="w-5 h-5 inline mr-2" />
                Meu Perfil
              </button>
              <button
                onClick={() => setAbaAtiva("carteira")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === "carteira"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Carteira
              </button>
            </nav>
          </div>
        </div>

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
        />
      </div>
    </div>
  );
}