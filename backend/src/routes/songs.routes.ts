import { Router } from "express";
import SongController from "../controllers/songs.controller";

const songRoutes = Router();

const songController = new SongController();

songRoutes.get("/songs", (req, res) => songController.getAll(req, res));
songRoutes.get("/songs/:id", (req, res) => songController.getSongById(req, res));
songRoutes.get("/topsongs", (req, res) => songController.topSongs(req, res));
songRoutes.get("/albumsongs/:id", (req, res) => songController.getAlbumSongs(req, res));
export default songRoutes;
