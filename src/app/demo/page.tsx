"use client"

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Play, Pause, Search, Star, Calendar, Clock, Video, CheckCircle, User, BookOpen, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';
interface Teacher {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  price: string;
  avatar: string;
  specialties: string[];
  experience: string;
  description: string;
}

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const steps = [
    {
      title: "Busque por Professores",
      description: "Encontre o professor ideal usando nossos filtros avançados",
      component: "search"
    },
    {
      title: "Escolha seu Professor",
      description: "Veja perfis detalhados, avaliações e especialidades",
      component: "profile"
    },
    {
      title: "Agende sua Aula",
      description: "Selecione data e horário que funcionam para você",
      component: "schedule"
    },
    {
      title: "Realize o Pagamento",
      description: "Pagamento seguro e protegido pela plataforma",
      component: "payment"
    },
    {
      title: "Tenha sua Aula",
      description: "Conecte-se via vídeo e aprenda com qualidade",
      component: "lesson"
    }
  ];

  const teachers = [
    {
      id: 1,
      name: "Prof. Ana Silva",
      subject: "Matemática",
      rating: 4.9,
      reviews: 127,
      price: "R$ 45/hora",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      specialties: ["Cálculo", "Álgebra", "Geometria"],
      experience: "8 anos",
      description: "Especialista em matemática com foco em vestibulares e ENEM"
    },
    {
      id: 2,
      name: "Prof. Carlos Mendes",
      subject: "Física",
      rating: 4.8,
      reviews: 89,
      price: "R$ 50/hora",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      specialties: ["Mecânica", "Eletricidade", "Óptica"],
      experience: "12 anos",
      description: "Professor universitário com experiência em ensino médio"
    },
    {
      id: 3,
      name: "Prof. Maria Santos",
      subject: "Química",
      rating: 5.0,
      reviews: 156,
      price: "R$ 40/hora",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      specialties: ["Orgânica", "Inorgânica", "Físico-Química"],
      experience: "6 anos",
      description: "Doutora em Química com metodologia inovadora"
    }
  ];

  useEffect(() => {
  let interval: NodeJS.Timeout;
  if (isPlaying) {
    interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
  }
  return () => clearInterval(interval);
}, [isPlaying, steps.length]);


  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const SearchComponent = () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por matéria ou professor..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
            defaultValue="Matemática"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {["Matemática", "Física", "Química", "Português"].map((subject) => (
          <button
            key={subject}
            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              subject === "Matemática" 
                ? "border-indigo-500 bg-indigo-50 text-indigo-700" 
                : "border-gray-200 hover:border-indigo-300 text-gray-700"
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Encontrados <span className="font-semibold text-indigo-600">127 professores</span> de Matemática
      </div>
    </div>
  );

  const ProfileComponent = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
            selectedTeacher?.id === teacher.id
              ? "border-indigo-500 shadow-xl scale-105"
              : "border-gray-100 hover:border-indigo-300 hover:shadow-xl"
          }`}
          onClick={() => setSelectedTeacher(teacher)}
        >
          <div className="text-center mb-4">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-indigo-100"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
            <p className="text-indigo-600 font-semibold">{teacher.subject}</p>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(teacher.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {teacher.rating} ({teacher.reviews} avaliações)
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Experiência:</span>
              <span className="font-semibold">{teacher.experience}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Preço:</span>
              <span className="font-semibold text-indigo-600">{teacher.price}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Especialidades:</p>
            <div className="flex flex-wrap gap-1">
              {teacher.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">{teacher.description}</p>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors">
            Selecionar Professor
          </button>
        </div>
      ))}
    </div>
  );

  const ScheduleComponent = () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      {selectedTeacher && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
          <div className="flex items-center">
            <img
              src={selectedTeacher.avatar}
              alt={selectedTeacher.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{selectedTeacher.name}</h3>
              <p className="text-indigo-600">{selectedTeacher.subject} - {selectedTeacher.price}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Escolha a Data
          </h4>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 6;
              const isToday = day === 15;
              const isSelected = day === 16;
              const isAvailable = day > 14 && day < 25;
              
              return (
                <button
                  key={i}
                  className={`h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    day < 1 || day > 31
                      ? "text-gray-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-indigo-600 text-white shadow-lg"
                      : isToday
                      ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                      : isAvailable
                      ? "hover:bg-indigo-50 text-gray-700 border border-gray-200"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => day > 14 && day < 25 && setSelectedDate(`2025-01-${day}`)}
                  disabled={day < 1 || day > 31 || day <= 14 || day >= 25}
                >
                  {day > 0 && day <= 31 ? day : ""}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Horários Disponíveis
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {["09:00", "10:00", "14:00", "15:00", "16:00", "19:00", "20:00", "21:00"].map((time) => (
              <button
                key={time}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  selectedTime === time
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-indigo-300 text-gray-700"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">
              Aula agendada para {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const PaymentComponent = () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Resumo do Pedido</h4>
          
          {selectedTeacher && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedTeacher.avatar}
                  alt={selectedTeacher.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{selectedTeacher.name}</h5>
                  <p className="text-gray-600">{selectedTeacher.subject}</p>
                </div>
                <span className="font-semibold text-indigo-600">{selectedTeacher.price}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">16 de Janeiro, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium">15:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium">1 hora</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-indigo-600">R$ 45,00</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Informações de Pagamento</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número do Cartão
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                defaultValue="4532 1234 5678 9012"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validade
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  defaultValue="12/28"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  defaultValue="123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome no Cartão
              </label>
              <input
                type="text"
                placeholder="João Silva"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                defaultValue="João Silva"
              />
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div className="text-sm">
                <p className="font-semibold text-green-800">Pagamento Seguro</p>
                <p className="text-green-600">Seus dados estão protegidos com criptografia SSL</p>
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors">
              Confirmar Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonComponent = () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-2">Aula Confirmada!</h4>
        <p className="text-gray-600">Sua aula está agendada e confirmada</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white text-sm">Aula ao Vivo</span>
            </div>
            
            <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-white mb-4 mx-auto" />
                <p className="text-white text-lg font-semibold">Conectando...</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={teachers[0].avatar}
                  alt={teachers[0].name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-white font-semibold">{teachers[0].name}</p>
                  <p className="text-gray-300 text-sm">Professora de Matemática</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                  <Video className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-xl p-6">
            <h5 className="font-semibold text-indigo-900 mb-4">Detalhes da Aula</h5>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-indigo-700">Data:</span>
                <span className="font-medium text-indigo-900">16 de Janeiro, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700">Horário:</span>
                <span className="font-medium text-indigo-900">15:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700">Matéria:</span>
                <span className="font-medium text-indigo-900">Matemática - Cálculo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700">Tipo:</span>
                <span className="font-medium text-indigo-900">Aula Individual</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h5 className="font-semibold text-green-900 mb-4">Recursos Disponíveis</h5>
            <div className="space-y-2">
              {[
                "Quadro virtual interativo",
                "Compartilhamento de tela",
                "Chat em tempo real",
                "Gravação da aula",
                "Materiais complementares"
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h5 className="font-semibold text-purple-900 mb-4">Após a Aula</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">Avalie seu professor</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">Acesse materiais extras</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">Agende próximas aulas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepComponent = () => {
    switch (steps[currentStep].component) {
      case "search":
        return <SearchComponent />;
      case "profile":
        return <ProfileComponent />;
      case "schedule":
        return <ScheduleComponent />;
      case "payment":
        return <PaymentComponent />;
      case "lesson":
        return <LessonComponent />;
      default:
        return <SearchComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Discipulus
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Veja Como Funciona o
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Discipulus
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Descubra como é simples encontrar o professor ideal e ter aulas de qualidade na nossa plataforma.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isPlaying
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? "Pausar Demo" : "Iniciar Demo"}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-indigo-600 transition-all duration-500 ${
                            index < currentStep ? "w-full" : "w-0"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Demo Content */}
          <div className="mb-12">
            {renderStepComponent()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevStep}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Anterior</span>
            </button>
            
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-300"
            >
              <span>Próximo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Junte-se a milhares de estudantes que já melhoraram suas notas com o Discipulus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Encontrar Professores</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Seja um Professor</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}