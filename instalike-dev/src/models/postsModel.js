import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da operação
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}