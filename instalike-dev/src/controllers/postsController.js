import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModel.js";

// Controlador responsável por listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função do modelo para obter todos os posts
  const resultado = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os dados dos posts no formato JSON
  res.status(200).json(resultado);
};

// Controlador responsável por criar um novo post
export async function novoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const postNovo = req.body;
  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(postNovo);
    // Envia uma resposta HTTP com status 200 (sucesso) e os dados do post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga a mensagem de erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição." });
  }
}

// Controlador responsável por fazer o upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const postNovo = {
    descricao: "",
    imgURL: req.file.originalname,
    alt: ""
  };
  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(postNovo);
    // Gera um novo nome para a imagem, utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (sucesso) e os dados do post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga a mensagem de erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição." });
  }
}