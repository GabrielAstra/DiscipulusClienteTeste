"use client";

import { useState, useEffect } from "react";

export function useOnboarding(perfil: { onBoarding?: boolean } | null) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!perfil) {
      setShowOnboarding(false);
      return;
    }

    console.log('=== DEBUG ONBOARDING ===');
    console.log('perfil.onBoarding:', perfil.onBoarding);
    console.log('Deve mostrar onboarding:', perfil.onBoarding === false);
    console.log('========================');

    // Só mostra se for explicitamente false
    if (perfil.onBoarding === false) {
      setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
    } else {
      // Se for true ou undefined, não mostra
      setShowOnboarding(false);
    }
  }, [perfil]);

  const completeOnboarding = async () => {
    setShowOnboarding(false);
    
    try {
      await fetch("/api/user/onboarding", {
        method: "POST",
      });
      
      // Recarregar os dados do perfil
      window.location.reload();
    } catch (error) {
      console.error("Erro ao completar onboarding:", error);
    }
  };

  const skipOnboarding = async () => {
    await completeOnboarding();
  };

  return {
    showOnboarding,
    completeOnboarding,
    skipOnboarding,
  };
}
