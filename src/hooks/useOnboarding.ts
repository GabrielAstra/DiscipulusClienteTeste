"use client";

import { useState, useEffect } from "react";

export function useOnboarding(perfil: { onBoarding?: boolean } | null) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!perfil) {
      setShowOnboarding(false);
      return;
    }

    if (perfil.onBoarding === false) {
      setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
    } else {
   
      setShowOnboarding(false);
    }
  }, [perfil]);

  const completeOnboarding = async () => {
    setShowOnboarding(false);
    
    try {
      await fetch("/api/user/onboarding", {
        method: "POST",
      });
      
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
