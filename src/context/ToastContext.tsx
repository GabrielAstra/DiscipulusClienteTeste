"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface ToastContextType {
  showError: (message: string, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const showError = (message: string, title?: string) => {
    toast.error(message, {
      description: title,
      duration: 5000,
      style: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#991b1b',
      },
    });
  };

  const showSuccess = (message: string, title?: string) => {
    toast.success(message, {
      description: title,
      duration: 4000,
      style: {
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        color: '#166534',
      },
    });
  };

  const showWarning = (message: string, title?: string) => {
    toast.warning(message, {
      description: title,
      duration: 4000,
      style: {
        background: '#fffbeb',
        border: '1px solid #fed7aa',
        color: '#92400e',
      },
    });
  };

  const showInfo = (message: string, title?: string) => {
    toast.info(message, {
      description: title,
      duration: 4000,
      style: {
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        color: '#1e40af',
      },
    });
  };

  return (
    <ToastContext.Provider value={{ showError, showSuccess, showWarning, showInfo }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
}