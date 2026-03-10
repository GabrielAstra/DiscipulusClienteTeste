import { useState, useEffect } from 'react';
import { PerfilProfessor, Habilidade } from '@/types/teacher';
import { useToast } from '@/context/ToastContext';
import { mapaDiasSemana } from '@/utils/mapaDiasSemana'
import {
  obterPerfilCompleto,
  buscarHabilidades,
  removerFormacao,
  removerExperiencia,
  salvarPerfilCompleto
} from '@/services/teacherApi';
import { uploadAvatar } from "@/lib/service/avatar/avatar.service";
import { salvarAgenda } from "@/lib/service/agenda/agenda.service";
const initialPerfil: PerfilProfessor = {
  id: "1",
  nome: "",
  email: "",
  avatar: "/avatar.png",
  urlFoto: "",
  biografia: "",
  habilidades: [],
  valorHora: 0,
  experiencia: [],
  idiomas: [],
  disponibilidadeHorarios: [],
  tempoExperiencia: 0,
  formacao: [],
  telefone: "",
  localizacao: "",
};

export function useProfile() {
  const [perfil, setPerfil] = useState<PerfilProfessor>(initialPerfil);
  const [editando, setEditando] = useState(false);
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [todasHabilidades, setTodasHabilidades] = useState<Habilidade[]>([]);
  const { showError, showSuccess } = useToast();
  const [arquivoAvatar, setArquivoAvatar] = useState<File | null>(null);
  const handleSelecionarAvatar = (file: File) => {
    setArquivoAvatar(file);

    // preview local
    const preview = URL.createObjectURL(file);
    setPerfil((prev) => ({
      ...prev,
      urlFoto: preview,
    }));
  };
  useEffect(() => {
    async function carregarPerfil() {
      try {
        const perfilCompleto = await obterPerfilCompleto();
        if (perfilCompleto) {
          setPerfil(perfilCompleto);
        }
      } catch {
        showError("Erro ao carregar perfil.");
      }
    }
    carregarPerfil();
  }, [showError]);

  // Carrega todas as habilidades uma única vez para usar tanto na edição
  // quanto na visualização (exibir nomes das habilidades ao invés dos IDs).
  useEffect(() => {
    buscarHabilidades()
      .then((res) => setTodasHabilidades(res))
      .catch(() => showError("Erro ao buscar habilidades."));
  }, [showError]);



  const lidarComSalvarPerfil = async () => {
    setSalvandoPerfil(true);

    try {

      console.log("arquivoAvatar:", arquivoAvatar);
      if (arquivoAvatar) {

        setUploadingPhoto(true);
        await uploadAvatar(arquivoAvatar);
        setUploadingPhoto(false);
        setArquivoAvatar(null);

        // força recarregar avatar real do backend
        setPerfil((prev) => ({
          ...prev,
          urlFoto: `/api/avatar?t=${Date.now()}`
        }));
      }

      if (perfil.disponibilidadeHorarios.length > 0) {
        const agendaPayload = perfil.disponibilidadeHorarios.map(dia => ({
          diaSemana: mapaDiasSemana[dia.dia],
          horarios: dia.horarios.map(h => ({
            id: h.id,
            horaInicial: h.HoraInicial,
            horaFinal: h.HoraFinal,
            agendaDisponivelEnum: 1
          }))
        }));

        await salvarAgenda(agendaPayload);
      }

      const payloadPerfil = {
        perfil: {
          nome: perfil.nome,
          sobrenome: "",
          biografia: perfil.biografia,
          sobreMim: perfil.biografia,
          status: 1,
          precoHoraAula: perfil.valorHora,
          idiomas: perfil.idiomas.join(", "),
          localizacao: perfil.localizacao,
          tempoExperiencia: perfil.tempoExperiencia ?? null,
        },
        formacoes: perfil.formacao,
        experiencias: perfil.experiencia,
        habilidades: perfil.habilidades,
      };

      await salvarPerfilCompleto(payloadPerfil);

      const perfilAtualizado = await obterPerfilCompleto();
      if (perfilAtualizado) {
        setPerfil(perfilAtualizado);
      }

      setHorariosRemovidos([]);
      setEditando(false);

      showSuccess("Perfil salvo com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar perfil + agenda", error);
      showError("Erro inesperado ao salvar perfil.");
    } finally {
      setSalvandoPerfil(false);
      setUploadingPhoto(false);
    }
  };



  const handleRemoverFormacao = async (id: string, index: number) => {
    try {
      await removerFormacao(id);
      const novas = perfil.formacao.filter((_, i) => i !== index);
      setPerfil({ ...perfil, formacao: novas });
      showSuccess("Formação removida com sucesso!");
    } catch {
      showError("Erro ao remover formação.");
    }
  };

  const handleRemoverExperiencia = async (id?: string) => {
    try {
      if (id) {
        await removerExperiencia(id);
      }

      setPerfil(prev => ({
        ...prev,
        experiencia: prev.experiencia.filter(exp => exp.id !== id)
      }));

      showSuccess("Experiência removida com sucesso!");
    } catch {
      showError("Erro ao remover experiência.");
    }
  };

  const [horariosRemovidos, setHorariosRemovidos] = useState<string[]>([]);
  const avatarUrl = perfil.urlFoto || perfil.avatar;
  return {
    perfil,
    setPerfil,
    editando,
    setEditando,
    salvandoPerfil,
    uploadingPhoto,
    avatarUrl,
    todasHabilidades,
    handleSelecionarAvatar,
    lidarComSalvarPerfil,
    handleRemoverFormacao,
    handleRemoverExperiencia,
    horariosRemovidos,
    setHorariosRemovidos
  };
}
