import { useState, useEffect } from 'react';
import { PerfilProfessor, Habilidade } from '@/types/teacher';
import { useToast } from '@/context/ToastContext';
import { mapaDiasSemana } from '@/utils/mapaDiasSemana'
import {
  buscarInformacoesPessoais,
  buscarFormacoes,
  buscarExperiencias,
  buscarHabilidades,
  removerFormacao,
  removerExperiencia,
  salvarPerfilCompleto
} from '@/services/teacherApi';
import { uploadAvatar } from "@/lib/service/avatar/avatar.service";

import { listarAgenda } from "@/lib/service/agenda/agenda.service";
import { mapearAgendaParaPerfil } from "@/utils/mapAgenda";
import { salvarAgenda, removerAgenda } from "@/lib/service/agenda/agenda.service";
const initialPerfil: PerfilProfessor = {
  id: "1",
  nome: "",
  email: "",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  urlFoto: "",
  biografia: "",
  materias: [],
  valorHora: 45,
  experiencia: [],
  idiomas: [],
  disponibilidadeHorarios: [],
  tempoExperiencia: 0,
  formacao: [],
  certificacoes: [
    "Certificação em Ensino Online",
    "Especialização em Didática",
  ],
  telefone: "",
  localizacao: "",
};

export function useProfile() {
  const [perfil, setPerfil] = useState<PerfilProfessor>(initialPerfil);
  const [editando, setEditando] = useState(false);
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);''
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
    async function carregarInformacoesPessoais() {
      try {
        const info = await buscarInformacoesPessoais();
        if (info) {
          setPerfil((prev) => ({
            ...prev,
            ...info,
            tempoExperiencia: info.tempoExperiencia ?? 0,
          }));
        }
      } catch {
        showError("Erro ao buscar informações pessoais.");
      }
    }
    carregarInformacoesPessoais();
  }, [showError]);

  useEffect(() => {
    async function carregarFormacoes() {
      try {
        const formacoes = await buscarFormacoes();
        setPerfil((prev) => ({ ...prev, formacao: formacoes }));
      } catch {
        showError("Erro ao buscar formações acadêmicas.");
      }
    }
    carregarFormacoes();
  }, [showError]);

  useEffect(() => {
    async function carregarExperiencias() {
      try {
        const experiencias = await buscarExperiencias();
        setPerfil((prev) => ({ ...prev, experiencia: experiencias }));
      } catch {
        showError("Erro ao buscar experiências.");
      }
    }
    carregarExperiencias();
  }, [showError]);

  useEffect(() => {
    if (editando) {
      buscarHabilidades()
        .then((res) => setTodasHabilidades(res))
        .catch(() => showError("Erro ao buscar habilidades."));
    }
  }, [editando, showError]);



  const lidarComSalvarPerfil = async () => {
    setSalvandoPerfil(true);

    try {

      console.log("arquivoAvatar:", arquivoAvatar);
      // 🔥 Se o usuário selecionou nova foto → faz upload agora
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
        habilidades: perfil.materias,
      };

      await salvarPerfilCompleto(payloadPerfil);

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



  useEffect(() => {
    async function carregarAgenda() {
      try {
        const agendaBackend = await listarAgenda();
        const agendaPerfil = mapearAgendaParaPerfil(agendaBackend);
        setPerfil((prev) => ({
          ...prev,
          disponibilidadeHorarios: agendaPerfil,
        }));
      } catch {
        showError("Erro ao carregar agenda.");
      }
    }

    carregarAgenda();
  }, [showError]);


  // ---------- Remoções ----------
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

  const handleRemoverExperiencia = async (id: string, index: number) => {
    try {
      await removerExperiencia(id);
      const novas = perfil.experiencia.filter((_, i) => i !== index);
      setPerfil({ ...perfil, experiencia: novas });
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
