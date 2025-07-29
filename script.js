// --- Seleção de Elementos HTML ---
const incluirMaiusculas = document.getElementById('incluirMaiusculas');
const incluirMinusculas = document.getElementById('incluirMinusculas');
const incluirNumeros = document.getElementById('incluirNumeros');
const incluirSimbolos = document.getElementById('incluirSimbolos');
const tamanhoSenhaInput = document.getElementById('tamanhoSenhaInput');
const tamanhoSenhaValor = document.getElementById('tamanhoSenhaValor');
const gerarSenhaBtn = document.getElementById('gerarSenhaBtn');
const resultadoSenha = document.getElementById('resultadoSenha');
const valorEntropia = document.getElementById('valorEntropia');
const forcaSenha = document.getElementById('forcaSenha');

// --- Conjuntos de Caracteres ---
const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const caracteresMinusculos = 'abcdefghijklmnopqrstuvwxyz';
const caracteresNumeros = '0123456789';
const caracteresSimbolos = '!@#$%^&*()_+[]{}|;:,.<>?/~`'; // Símbolos comuns

// --- Funções Auxiliares ---

// Atualiza o valor do slider no display
tamanhoSenhaInput.addEventListener('input', () => {
    tamanhoSenhaValor.textContent = tamanhoSenhaInput.value;
});

// Gera um número aleatório entre min e max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Obtém um caractere aleatório de uma string
function getRandomChar(str) {
    return str[getRandomNumber(0, str.length - 1)];
}

// --- Função Principal: Gerar Senha e Calcular Entropia ---
function gerarSenhaSegura() {
    let caracteresPermitidos = '';
    let senhaGerada = '';
    let tamanhoAlfabeto = 0; // Usado para o cálculo da entropia

    // Constrói a string de caracteres permitidos e calcula o tamanho do alfabeto
    if (incluirMaiusculas.checked) {
        caracteresPermitidos += caracteresMaiusculos;
        tamanhoAlfabeto += caracteresMaiusculos.length;
    }
    if (incluirMinusculas.checked) {
        caracteresPermitidos += caracteresMinusculos;
        tamanhoAlfabeto += caracteresMinusculos.length;
    }
    if (incluirNumeros.checked) {
        caracteresPermitidos += caracteresNumeros;
        tamanhoAlfabeto += caracteresNumeros.length;
    }
    if (incluirSimbolos.checked) {
        caracteresPermitidos += caracteresSimbolos;
        tamanhoAlfabeto += caracteresSimbolos.length;
    }

    // Validação: Garante que pelo menos um tipo de caractere seja selecionado
    if (caracteresPermitidos.length === 0) {
        alert("Por favor, selecione pelo menos um tipo de caractere para gerar a senha.");
        resultadoSenha.textContent = "Nenhum tipo selecionado!";
        valorEntropia.textContent = "Entropia: 0.00 bits";
        classificarForcaSenha(0); // Mostra como fraca ou padrão
        return; // Sai da função
    }

    const tamanhoDesejado = parseInt(tamanhoSenhaInput.value);

    // Gerar a senha caractere por caractere
    for (let i = 0; i < tamanhoDesejado; i++) {
        senhaGerada += getRandomChar(caracteresPermitidos);
    }

    // Exibir a senha no HTML
    resultadoSenha.textContent = senhaGerada;

    // --- Cálculo da Entropia ---
    // Entropia = Comprimento da Senha * log2(Tamanho do Alfabeto)
    let entropia = 0;
    if (tamanhoAlfabeto > 0) {
        entropia = tamanhoDesejado * Math.log2(tamanhoAlfabeto);
    }
    valorEntropia.textContent = `Entropia: ${entropia.toFixed(2)} bits`;

    // Classificar e exibir a força da senha
    classificarForcaSenha(entropia);
}

// --- Função para Classificar a Força da Senha ---
function classificarForcaSenha(entropia) {
    // Remove todas as classes de força anteriores
    forcaSenha.classList.remove('fraca', 'media', 'forte', 'muito-forte');

    // Adiciona a classe apropriada com base na entropia
    if (entropia < 60) {
        forcaSenha.textContent = "Fraca";
        forcaSenha.classList.add('fraca');
    } else if (entropia >= 60 && entropia < 90) {
        forcaSenha.textContent = "Média";
        forcaSenha.classList.add('media');
    } else if (entropia >= 90 && entropia < 120) {
        forcaSenha.textContent = "Forte";
        forcaSenha.classList.add('forte');
    } else { // entropia >= 120
        forcaSenha.textContent = "Muito Forte";
        forcaSenha.classList.add('muito-forte');
    }
}

// --- Event Listeners ---
// Gera a senha quando o botão é clicado
gerarSenhaBtn.addEventListener('click', gerarSenhaSegura);

// Gera a senha inicialmente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    gerarSenhaSegura(); // Gera uma senha inicial ao carregar
});