const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const alfabetoSubstituto = [
  "@", "s", "4", "1", "m", "n", "b", "!", "7", "x",
  "9", "6", "3", "%", "f", "&", "5", "L", "K", "J",
  "2", "#", "8", "Q", "A", "Z", "g", "t", "v", "E", 
  "D", "C", "$", "0", "P", "h"
];

// Função para gerar um hash fixo baseado na palavra
function gerarHashPalavra(palavra) {
  let hash = 0; 
  for (let i = 0; i < palavra.length; i++) {
    hash = (hash << 5) - hash + palavra.charCodeAt(i); // Gera um hash baseado no caractere
  }
  return Math.abs(hash).toString(16); // Converte para hexadecimal e garante número positivo
}

const seletor = document.getElementById("deslocamento");
const texto = document.getElementById("para-criptografar");
const botao = document.getElementById("btn");
const resposta = document.getElementById("resposta");

// Preenchendo o seletor de deslocamento
for (let i = 0; i < alfabeto.length; i++) {
  seletor.innerHTML += `<option value="${i}">${alfabeto[i]}</option>`;
}

botao.addEventListener("click", () => {
  let textoParaCriptografar = texto.value.toUpperCase();
  let deslocamento = +seletor.value;
  let cifrado = cifrar(textoParaCriptografar, deslocamento);
  resposta.classList.remove("invisivel");
  resposta.innerText = cifrado;
});

function cifrar(texto, deslocamento) {
  let textoCriptografado = [];

  for (let i = 0; i < texto.length; i++) {
    let charAtual = texto[i];
    let indiceOriginal = alfabeto.indexOf(charAtual);

    if (indiceOriginal !== -1) {
      // Aplica o deslocamento
      let novoIndice = (indiceOriginal + deslocamento) % alfabeto.length;
      let novaLetra = alfabeto[novoIndice];

      // Substitui pelo alfabeto secreto
      let substituida = alfabetoSubstituto[alfabeto.indexOf(novaLetra)];
      textoCriptografado.push(substituida);

      // Adiciona um caractere fixo baseado no hash
      let caractereExtra = gerarCaractereExtra(texto, i);
      textoCriptografado.push(caractereExtra);
    } else {
      // Se não estiver no alfabeto, mantém o caractere original
      textoCriptografado.push(charAtual);
    }
  }

  return textoCriptografado.join("");
}

// Gera caracteres extras fixos baseados na palavra e posição
function gerarCaractereExtra(palavra, indice) {
  let hash = gerarHashPalavra(palavra);
  return hash[indice % hash.length]; // Sempre retorna um caractere fixo do hash
}
