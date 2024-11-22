import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do Express, que será o núcleo da nossa aplicação
const app = express();

app.use(express.static("uploads"));
// Carrega as rotas definidas no arquivo postsRoutes.js e as associa à aplicação
routes(app);

// Inicia o servidor, escutando na porta 3000. A função de callback é executada quando o servidor está pronto
app.listen(3000, () => {
    // Mensagem de log para indicar que o servidor está funcionando
    console.log("Servidor escutando!");
});