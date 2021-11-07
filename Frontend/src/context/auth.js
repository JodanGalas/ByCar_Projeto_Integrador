import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    estaLogado: false,
    atividade: "",
    cod: "",
    cpf: "",
    email: "",
    endereco: "",
    nome: "",
    senha: "",
    status: "",
    telefone: "",
  });


  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("App deve ficar dentro do Provider");
  }

  return context;
}
