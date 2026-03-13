import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid md:grid-cols-4 gap-8 mb-12">

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Discipulus
                        </h3>
                        <p className="text-gray-400 mb-6">
                            A plataforma que conecta estudantes aos melhores professores do Brasil.
                        </p>

                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-[#6562ff] rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
                                <span className="text-sm font-bold">f</span>
                            </div>
                            <div className="w-10 h-10 bg-[#6562ff] rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
                                <span className="text-sm font-bold">ig</span>
                            </div>
                            <div className="w-10 h-10 bg-[#6562ff] rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
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
                            <li><Link href="/teacher-guidelines" className="text-gray-400 hover:text-white transition-colors">Diretrizes</Link></li>
                            <li><Link href="/earnings" className="text-gray-400 hover:text-white transition-colors">Ganhos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Suporte</h4>
                        <ul className="space-y-3">
                            <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Central de Ajuda</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
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
    );
}