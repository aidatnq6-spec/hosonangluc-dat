"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { RegisterDialog } from "./RegisterDialog";

const Ctx = createContext<() => void>(() => {});

export const useOpenRegister = () => useContext(Ctx);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  return (
    <Ctx.Provider value={show}>
      {children}
      {open && <RegisterDialog onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}
