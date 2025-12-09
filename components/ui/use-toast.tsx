// components/ui/use-toast.tsx
"use client";
import * as React from "react";

type Toast = { title?: string; description?: string };
const ToastContext = React.createContext<(t: Toast) => void>(() => {});

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const addToast = (t: Toast) => {
    setToasts((s) => [...s, t]);
    setTimeout(() => setToasts((s) => s.slice(1)), 3500);
  };
  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2">
        {toasts.map((t, i) => (
          <div
            key={i}
            className="p-3 bg-black/80 text-white rounded-md shadow-lg max-w-xs"
          >
            <div className="font-semibold">{t.title}</div>
            {t.description && <div className="text-sm opacity-90">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
