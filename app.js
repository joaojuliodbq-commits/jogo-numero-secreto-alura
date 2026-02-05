///////////////segunda versão do código//////////////////
let maiorSecretoPossivel = 10; // Define o valor do maior número secreto possível no jogo.
let listaDeNumerosSorteados = []; // Colchetes são usados para listas.
let numeroSecreto = gerarNumeroAleatorio();
let contador;
let palavraTentativa;
parametroInicial();
//console.log(`O número secreto é ${numeroSecreto}`);


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function parametroInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${maiorSecretoPossivel}`);
    contador = 1;
    document.getElementById("botaoChute").removeAttribute('disabled');
}

function verificarChute() {
    let chute = Number(document.querySelector("input").value); //Usei Number() para trocar o tipo da variável chute
    palavraTentativa = contador > 1 ? 'tentativas':'tentativa';
    
    if(chute === numeroSecreto) { //Sem o Number() acima, não poderia usar o comparador "===" pois chute seria uma string
        exibirTextoNaTela("h1", "Acertou!!!");
        exibirTextoNaTela("p", `Parabéns! Você descobriu o número secreto com ${contador} ${palavraTentativa}`);
        document.getElementById("reiniciar").removeAttribute('disabled');
        document.getElementById("botaoChute").setAttribute('disabled', true);
    } else {
        if (numeroSecreto < chute) {
            exibirTextoNaTela("p", `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
        }
        contador++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * maiorSecretoPossivel + 1);
    //console.log(listaDeNumerosSorteados);
    if (listaDeNumerosSorteados.length == maiorSecretoPossivel) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    //console.log(`O número secreto é ${numeroSecreto}`);
    parametroInicial();
    limparCampo();
    document.getElementById("reiniciar").setAttribute('disabled', true);
}

