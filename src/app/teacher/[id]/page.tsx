import PerfilProfessor from "@/components/PerfilProfessor";

export default async function ProfessorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PerfilProfessor id={id} />;
}
