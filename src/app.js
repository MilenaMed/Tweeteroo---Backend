import express from "express";
import cors from "cors";

const app = express();

//Ferramentas
app.use(cors())
app.use(express.json())

// POST - Criar usuário
app.post("/sign-up", (request, response) => {
    const novoUsuário =
    {
        username: request.body.username,
        avatar: request.body.avatar
    }

    usuarios.push(novoUsuário)
    response.send("OK")
})

const porta = process.env.PORT || 5000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));