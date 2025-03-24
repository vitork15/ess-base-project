import { createContext, useState, ReactNode } from "react";

// Definição dos tipos do contexto
type GlobalContextProps = {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  isArtist: boolean;
  setIsArtist: (value: boolean) => void;
  userId: number;
  setUserId: (value: number) => void;
  userLogin: string
  setUserLogin: (value: string) => void
  artistLogin: string;
  setArtistLogin: (value: string) => void;
  musicPlaying: number
  setMusicPlaying: (value: number) => void
};

// Criando o contexto com um valor inicial vazio
export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

// Criando o Provider para fornecer os estados globais
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [artistLogin, setArtistLogin] = useState("");
  const [userLogin, setUserLogin] = useState("")
  const [musicPlaying, setMusicPlaying] = useState(-1)

  return (
    <GlobalContext.Provider value={{ isLogged, setIsLogged, isArtist, setIsArtist, userId, setUserId, artistLogin, setArtistLogin, userLogin, setUserLogin, musicPlaying, setMusicPlaying }}>
      {children}
    </GlobalContext.Provider>
  );
};
