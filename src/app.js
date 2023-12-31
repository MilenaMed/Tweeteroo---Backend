import express from "express";
import cors from "cors";

const app = express();

//Ferramentas
app.use(cors())
app.use(express.json())

//Globais
let usuarios = [];
const tweets = [];

//POST - Criar usuário
app.post("/sign-up", (request, response) => {
    const novoUsuário =
    {
        username: request.body.username,
        avatar: request.body.avatar
    }
    if (!novoUsuário.username || typeof novoUsuário.username !== "string" || !novoUsuário.avatar || typeof novoUsuário.avatar !== "string") {
        return response.status(400).send("Todos os campos são obrigatórios")
    } else {
        usuarios.push(novoUsuário)
        response.status(201).send("OK")
    }
})

//POST - Criando tweets
app.post("/tweets", (request, response) => {

    //Checando se tem conta
    const TemConta = usuarios.find(u => u.username === request.body.username)
    const foto = usuarios.find(user => user.username === request.body.username)

    const posttweet =
    {
        username: request.body.username,
        avatar: foto.avatar,
        tweet: request.body.tweet
    }

    if (!TemConta) {
        return response.status(401).send("UNAUTHORIZED")
    }

    else if(!posttweet.username || typeof posttweet.username !== "string" || !posttweet.tweet || typeof posttweet.tweet !== "string") {
        return response.status(400).send("Todos os campos são obrigatórios")
    }
    else {
        tweets.push(posttweet)
        response.status(201).send("OK")
    }
})

//GET - Tweets já criados
app.get("/tweets", (request, response) => {
    if (tweets.length > 10) {
        const ultimosTweets = tweets.slice(-10)
        response.send(ultimosTweets)
    }
    else {
        response.send(tweets)
    }
});

//GET - Tweets por usuário
app.get("/tweets/:username", (request, response) => {
    const { nomeUsuário } = request.params
    const tweetsUsuário = tweets.filter((t) => t.username === nomeUsuário)
    response.send(tweetsUsuário)

});


//Porta
const porta = process.env.PORT || 5000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));