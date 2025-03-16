import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Definindo o tipo para o contexto
interface BibliotecaContextType {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  playlistToEdit: any; // Você pode refinar o tipo dependendo do que for armazenado aqui
  setPlaylistToEdit: Dispatch<SetStateAction<any>>; // Mesma coisa aqui
  userID: number;
}

// Criando o contexto com o tipo correto
const BibliotecaContext = createContext<BibliotecaContextType | null>(null);

interface BibliotecaProviderProps {
  children: ReactNode;
  userID: number;
}

export const BibliotecaProvider = ({ children, userID }: BibliotecaProviderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playlistToEdit, setPlaylistToEdit] = useState(null);

  return (
    <BibliotecaContext.Provider value={{ modalOpen, setModalOpen, playlistToEdit, setPlaylistToEdit, userID }}>
      {children}
    </BibliotecaContext.Provider>
  );
};


export const Biblioteca = () => {
  
}