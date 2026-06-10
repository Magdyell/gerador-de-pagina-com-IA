async function gerarPagina() {

    const prompt = document.getElementById("prompt").value;
    const codigo = document.getElementById("codigo");
    const resultado = document.getElementById("resultado");

    if (!prompt.trim()) {
        alert("Digite uma descrição.");
        return;
    }

    codigo.textContent = "Gerando...";

    try {

        const resposta = await fetch("/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        });

        const dados = await resposta.json();

        codigo.textContent = dados.html;
        resultado.srcdoc = dados.html;

    } catch (erro) {

        codigo.textContent = "Erro ao gerar página";
        console.error(erro);

    }
}