import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, novoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";


const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados ("uploads/")
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo carregado
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer e configura o armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função que define as rotas da aplicação
const routes = (app) => {
  // Permite que a aplicação processe requisições com conteúdo JSON no corpo
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar posts (provavelmente implementada na função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (provavelmente implementada na função novoPost)
  app.post("/posts", novoPost);

  // Rota POST para upload de imagem (provavelmente implementada na função uploadImagem)
  // O middleware "upload.single('imagem')" processa arquivos únicos com o campo "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função "routes" para ser usada em outro arquivo
export default routes;