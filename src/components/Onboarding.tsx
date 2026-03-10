"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

export interface OnboardingStep {
  target: string; 
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: { x: number; y: number };
}

interface OnboardingProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip: () => void;
  show: boolean;
}

export default function Onboarding({
  steps,
  onComplete,
  onSkip,
  show,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!show) return;

    const updateTargetPosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    updateTargetPosition();
    window.addEventListener("resize", updateTargetPosition);
    window.addEventListener("scroll", updateTargetPosition);

    return () => {
      window.removeEventListener("resize", updateTargetPosition);
      window.removeEventListener("scroll", updateTargetPosition);
    };
  }, [currentStep, steps, show]);

  if (!show || !targetRect) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const getTooltipPosition = () => {
    const placement = step.placement || "bottom";
    const offset = step.offset || { x: 0, y: 0 };
    const padding = 20;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = targetRect.top - padding + offset.y;
        left = targetRect.left + targetRect.width / 2 + offset.x;
        break;
      case "bottom":
        top = targetRect.bottom + padding + offset.y;
        left = targetRect.left + targetRect.width / 2 + offset.x;
        break;
      case "left":
        top = targetRect.top + targetRect.height / 2 + offset.y;
        left = targetRect.left - padding + offset.x;
        break;
      case "right":
        top = targetRect.top + targetRect.height / 2 + offset.y;
        left = targetRect.right + padding + offset.x;
        break;
    }

    return { top, left };
  };

  const tooltipPosition = getTooltipPosition();

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 z-[9998]">
        {/* Fundo escuro com recorte */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.7)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Borda destacada ao redor do elemento */}
        <div
          className="absolute border-4 border-indigo-500 rounded-xl pointer-events-none animate-pulse"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.3)",
          }}
        />
      </div>

      {/* Tooltip */}
      <div
        className="fixed z-[9999] transform -translate-x-1/2"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-[400px] border-2 border-indigo-500">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {currentStep + 1}
                </div>
                <span className="text-sm text-gray-500">
                  {currentStep + 1} de {steps.length}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
            </div>
            <button
              onClick={onSkip}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <p className="text-gray-700 mb-6 leading-relaxed">{step.content}</p>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Pular tour
            </button>

            <div className="flex items-center space-x-2">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-1"
              >
                <span>{isLastStep ? "Concluir" : "Próximo"}</span>
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
