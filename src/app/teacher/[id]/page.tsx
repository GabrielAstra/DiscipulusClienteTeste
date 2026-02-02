import PerfilProfessor from "@/components/PerfilProfessor";

export default function ProfessorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <PerfilProfessor id={id} />;
}
