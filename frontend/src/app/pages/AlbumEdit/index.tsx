import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const EditAlbum: React.FC = () => {
  const { id: albumId } = useParams();
  const navigate = useNavigate();
  const {artistLogin} = useContext(GlobalContext)

  const [album, setAlbum] = useState<{ name: string; songs: { songID: number, name: string }[] }>({
    name: "",
    songs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/albums/${albumId}`);
        if (!response.ok) throw new Error("Erro ao buscar o álbum");
        const data = await response.json();

        setAlbum({
          name: data.name,
          songs: data.songs || [],
        });
        setLoading(false);
      } catch (error) {
        alert("Erro ao carregar os dados do álbum");
        console.error(error);
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const handleSongChange = (index: number, value: string) => {
    const updatedSongs = [...album.songs];
    updatedSongs[index] = { ...updatedSongs[index], name: value };
    setAlbum({ ...album, songs: updatedSongs });
  };

  const handleDeleteSong = async (index: number) => {
    const songId = album.songs[index].songID; // Obter o ID da música a ser deletada
    try {
      const response = await fetch(`http://localhost:5001/albums/${albumId}/songs/${songId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar a música");

      // Atualizar a lista de músicas no estado, removendo a música deletada
      const updatedSongs = album.songs.filter((_, i) => i !== index);
      setAlbum({ ...album, songs: updatedSongs });
      alert("Música deletada com sucesso!");
    } catch (error) {
      alert("Erro ao deletar a música");
      console.error(error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles["edit-album-container"]}>
      <h2 className={styles["album-header"]}>Álbum: {album.name}</h2>
      <div className={styles["music-list"]}>
        {album.songs.length === 0 ? (
          <p>Este álbum não tem músicas cadastradas.</p>
        ) : (
          album.songs.map((song, index) => (
            <div key={index} className={styles["music-item"]}>
              <input
                type="text"
                value={song.name}
                onChange={(e) => handleSongChange(index, e.target.value)}
                className={styles["music-input"]}
              />
              <button
                className={styles["delete-button"]}
                onClick={() => handleDeleteSong(index)}
              >
                Deletar
              </button>
            </div>
          ))
        )}
      </div>
      <button className={styles["save-button"]}>
        Salvar Alterações
      </button>
      <button className={styles["back-button"]} onClick={() => navigate(`/artists/${artistLogin}`)}>
        Voltar
      </button>
    </div>
  );
};

export default EditAlbum;
