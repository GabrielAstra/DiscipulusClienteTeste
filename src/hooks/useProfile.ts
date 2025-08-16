import { useState, useEffect } from 'react';
import { PerfilProfessor, FormacaoDTO, ExperienciaDTO, Habilidade } from '@/types/teacher';
import { useToast } from '@/context/ToastContext';
import {
  buscarInformacoesPessoais,
  buscarFormacoes,
  buscarExperiencias,
  buscarHabilidades,
  removerFormacao,
  removerExperiencia,
  salvarPerfilCompleto
} from '@/services/teacherApi';

const initialPerfil: PerfilProfessor = {
  id: "1",
  nome: "",
  email: "",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  biografia: "",
  materias: [],
  valorHora: 45,
  experiencia: [],
  idiomas: [],
  disponibilidade: [],
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
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [todasHabilidades, setTodasHabilidades] = useState<Habilidade[]>([]);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    async function carregarInformacoesPessoais() {
      try {
        const info = await buscarInformacoesPessoais();
        if (info) {
          setPerfil((prev) => ({ ...prev, ...info }));
        }
      } catch (error) {
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
      } catch (error) {
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
      } catch (error) {
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
      const payload = {
        perfil: {
          nome: perfil.nome || "",
          sobrenome: "", 
          biografia: perfil.biografia || "",
          sobreMim: perfil.biografia || "", 
          status: 1, 
          precoHoraAula: perfil.valorHora || 0,
          fotoPerfil: "", 
          idiomas: perfil.idiomas.join(", "), 
          localizacao: perfil.localizacao || "",
        },
        formacoes: perfil.formacao.map(formacao => ({
          id: formacao.id || null,
          titulo: formacao.titulo || "",
          instituicao: formacao.instituicao || "",
          dtInicio: formacao.dtInicio || new Date().toISOString(),
          dtConclusao: formacao.dtConclusao || new Date().toISOString(),
        })),
        experiencias: perfil.experiencia.map(exp => ({
          id: exp.id || null,
          titulo: exp.titulo || "",
          instituicao: exp.instituicao || "",
          inicio: exp.inicio || new Date().toISOString(),
          fim: exp.fim || new Date().toISOString(),
          descricao: exp.descricao || "",
        })),
        habilidades: perfil.materias || [], 
      };

      await salvarPerfilCompleto(payload);
      showSuccess("Perfil salvo com sucesso!");
      setEditando(false);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Erro inesperado ao salvar perfil.");
    } finally {
      setSalvandoPerfil(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploadingPhoto(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setPerfil(prevPerfil => ({
        ...prevPerfil,
        avatar: previewUrl
      }));

      showSuccess('Foto atualizada com sucesso!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showError('Erro ao fazer upload da foto.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemoverFormacao = async (id: string, index: number) => {
    try {
      await removerFormacao(id);
      const novasFormacoes = perfil.formacao.filter((_, i) => i !== index);
      setPerfil({ ...perfil, formacao: novasFormacoes });
      showSuccess("Formação removida com sucesso!");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Erro ao remover formação.");
    }
  };

  const handleRemoverExperiencia = async (id: string, index: number) => {
    try {
      await removerExperiencia(id);
      const novasExperiencias = perfil.experiencia.filter((_, i) => i !== index);
      setPerfil({ ...perfil, experiencia: novasExperiencias });
      showSuccess("Experiência removida com sucesso!");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Erro ao remover experiência.");
    }
  };

  return {
    perfil,
    setPerfil,
    editando,
    setEditando,
    salvandoPerfil,
    uploadingPhoto,
    todasHabilidades,
    lidarComSalvarPerfil,
    handleFileUpload,
    handleRemoverFormacao,
    handleRemoverExperiencia,
  };
}