import express from "express";
import cors from "cors";

const app = express();

//Ferramentas
app.use(cors())
app.use(express.json())

const porta = process.env.PORT || 5000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));