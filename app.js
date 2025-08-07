let listaNumeroSorteados = [];
let numeroAleatorio = geradorNumAleatorio(1, 10);
console.log(numeroAleatorio);
let tentativas = 1;

exibirMenssagemInicial();

function exibirTextoNaTela(tag, texto) {
    let elemento = document.querySelector(tag)
    elemento.innerHTML= texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMenssagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function limparCampo(id) {
    document.querySelector(`#${id}`).value= "";
}

function geradorNumAleatorio(intervaloIni, intervaloFim) {
    intervaloIni = Math.ceil(intervaloIni);
    intervaloFim = Math.floor(intervaloFim);
    let qtdMaxLista = (intervaloFim  - intervaloIni + 1);

    if  (qtdMaxLista <= listaNumeroSorteados.length) {
        console.log(`A quantidade de maxima de armazenamento da lista foi atingida`);
        return null;
    }

    let numeroEscolhido = Math.floor(Math.random() * (intervaloFim  - intervaloIni + 1)) + intervaloIni;

    if  (listaNumeroSorteados.includes(numeroEscolhido)) {
        return geradorNumAleatorio(intervaloIni, intervaloFim);
    } else {
        listaNumeroSorteados.push(numeroEscolhido);
        console.log(listaNumeroSorteados)
        return numeroEscolhido;
    }
    
}

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    if (chute === numeroAleatorio) {
        let palavraT = tentativas > 1? 'tentativas' : 'tentativa';
        let menssagemDeAcerto = `Prabéns, voce acertou o número secreto em ${tentativas} ${palavraT}!`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', menssagemDeAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');  
    } else
        if (chute > numeroAleatorio) {
            exibirTextoNaTela('p', 'Quase lá chute mais baixo');
        } else {
            exibirTextoNaTela('p', 'Quase lá chute mais alto');
        }
        tentativas++;
        limparCampo('campo_chute');
}

function reiniciar() {
    numeroAleatorio = geradorNumAleatorio(1, 10);
    tentativas = 1;
    console.log(numeroAleatorio);
    exibirMenssagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); 
}




    //Receber a variavel do chute pelo usuario
    //Comparar as duas variaveis
    //if varivel == chute  braeak{Mennsagem parabens, numero de tentativas}
    //  if variavel >   {um pouco menos}  else {Um pouco mais}
    //contador de tentativas ++