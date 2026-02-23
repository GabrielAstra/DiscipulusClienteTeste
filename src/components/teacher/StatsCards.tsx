import { Calendar, Star, Clock } from "lucide-react";

interface StatsCardsProps {
  totalAulas: number;
  confirmadas: number;
  pendentes: number;
}

export default function StatsCards({ totalAulas, confirmadas, pendentes }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
        <div className="bg-indigo-100 p-3 rounded-xl">
          <Calendar className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{totalAulas}</div>
          <div className="text-sm text-gray-600">Aulas este mês</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Star className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{confirmadas}</div>
          <div className="text-sm text-gray-600">Confirmadas</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-xl">
          <Clock className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{pendentes}</div>
          <div className="text-sm text-gray-600">Pendentes</div>
        </div>
      </div>
    </div>
  );
}
