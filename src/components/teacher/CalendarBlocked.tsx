"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CalendarBlockerProps {
  diasBloqueados: string[];
  onToggleDay: (dateString: string) => void;
}

export function CalendarBlocker({ diasBloqueados, onToggleDay }: CalendarBlockerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const generateCalendarDays = () => {
    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  const isBlocked = (date: Date) => {
    return diasBloqueados.includes(formatDateString(date));
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const dateString = formatDateString(date);
            const blocked = isBlocked(date);
            const currentMonth = isCurrentMonth(date);
            const today = isToday(date);
            const past = isPastDate(date);

            return (
              <button
                key={index}
                onClick={() => {
                  if (!past && currentMonth) {
                    onToggleDay(dateString);
                  }
                }}
                disabled={past || !currentMonth}
                className={`
                  relative p-2 text-sm rounded-lg transition-all duration-200 min-h-[40px] flex items-center justify-center
                  ${currentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${past ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  ${today ? 'ring-2 ring-indigo-500' : ''}
                  ${blocked && currentMonth && !past
                    ? 'bg-red-100 text-red-800 border-2 border-red-200 hover:bg-red-200' 
                    : currentMonth && !past
                    ? 'hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                    : ''
                  }
                `}
              >
                <span className={today ? 'font-bold' : ''}>{date.getDate()}</span>
                {blocked && currentMonth && (
                  <X className="absolute top-0 right-0 w-3 h-3 text-red-600 transform translate-x-1 -translate-y-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
            <span>Dia bloqueado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-indigo-500 rounded"></div>
            <span>Hoje</span>
          </div>
        </div>
      </div>
    </div>
  );
}