require("dotenv").config();

const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

app.post("/gerar", async (req, res) => {
    try {

        const { prompt } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });

        const result = await model.generateContent(`
Você é um desenvolvedor frontend especialista.

Crie uma página web moderna.

IMPORTANTE:
- Retorne SOMENTE HTML.
- Inclua CSS dentro da tag <style>.
- Não use markdown.
- Não use blocos \`\`\`.
- A página deve ser responsiva.

Pedido:
${prompt}
`);

        const html = result.response.text();

        console.log("RESPOSTA GEMINI:");
        console.log(html);

        res.json({
            html: html
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: erro.message
        });

    }
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});