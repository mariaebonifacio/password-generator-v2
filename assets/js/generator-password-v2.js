// Gerar senhas aleatórias


//Obter os elementos
//Selecione os elementos usando DOM usando o método querySelector, que retorna o primeiro elemento que corresponde seletor CSS especificamente
const sliderElement = document.querySelector('.password-generator__slider'); //Elemento do controle deslizante
const buttonElement = document.querySelector('.password-generator__button'); //Botão de gerar senha
const sizePassword = document.querySelector('.password-generator__size'); // Elemento que mostra o tamanho da senha
const password = document.querySelector('.password-generator__output'); // Elemento que exibe a senha gerada
const containerPassword = document.querySelector('.password-generator__result'); // Container da senha gerada
const welcomeElement = document.querySelector('.password-generator__welcome');  //Elemento de saudação
const datetimeElement = document.querySelector('.password-generator__datetime'); // Elemento de data e hora


//Objeto que contém os conjuntos de caracteres possíveis para a geração de senha
//Cada propriedade representa um tipo diferente de caractere
const charsets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', //Letras maiúsculas
    lowercase:'abcdefghijklmnopqstuvwxyz', // Letras minúsculas
    numbers: '0123456789', //Números
    special: '!@#$%¨&*' //Caracteres especiais
};

//Variáveis para armazenar a senha atual e o histórico de senhas
let novaSenha = '';    //armazena a senha atual gerada 
let historicoSenhas = [];   //Array para armazenar as últimas senhas geradas

const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return 'Bom dia!';
    if (hora >= 12 && hora < 18) return 'Boa tarde!';
    return 'Boa noite!';
}

// Variáveis para armazenar a data (dia, mes e ano)
const formatarDataHora = () => {
    const agora = new Date(); //Cria um novo objeto 
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']; //array para Dia da Semana
    //Obtem e formata os componentes da data
    const dia = agora.getDate().toString().padStart(2, '0'); //dia
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); //mes
    const ano = agora.getFullYear(); //ano
    const diaSemana = diasSemana[agora.getDay()]; //dia da semana

    //Obtém e formata os componentes do horário ( Hora, minutos, segundos )
    const hora = agora.getHours().toString().padStart(2, '0') //hora
    const minutos = agora.getMinutes().toString().padStart(2, '0') //minutos
    const segundos = agora.getSeconds().toString().padStart(2, '0') //segundos

    //Retornando os valores para resposta no site
    return `${diaSemana}, ${dia}/${mes}/${ano}, ${hora}:${minutos}:${segundos}.`
}

const atualizarHeader = () => {
    welcomeElement.textContent = `${getSaudacao()}`  //Atualiza a saudação

    datetimeElement.textContent = formatarDataHora(); //Atualiza data e hora
}

//Atualizar header a cada segundo
setInterval(atualizarHeader, 1000)

//Inicializar header
atualizarHeader();

//Exibe inicialmnte o valor do slider
sizePassword.textContent = sliderElement.value;

//Atualiza o valor exibido do tamanho da senha conforme o slider é movimentado
sliderElement.addEventListener('input', (e){
    sizePassword.textContent = e.target.value;
});

//Função principal para gerar a senha
const generatePassword = () => {
    let selectedCharset = ''; //String que armazena TODOS OS CARACTERES POSSÍVEIS PARA A SENHA 

    //Obter os checkboxes selecionados
    const uppercaseChecked = document.querySelector('uppercase-check').checked;
    const lowercaseChecked = document.querySelector('lowercase-check').checked;
    const numbersChecked = document.querySelector('numbers-check').checked;
    const specialChecked = document.querySelector('special-check').checked;

    //Construir o charset baseado nas opções selecionadas
    if (uppercaseChecked) selectedCharset += charsets.uppercase;
    if (lowercaseChecked) selectedCharset += charsets.lowercase;
    if (numbersChecked) selectedCharset += charsets.numbers;
    if (specialChecked) selectedCharset += charsets.special;

    //Se nenhuma opção estiver selecionada, selecionar todas
    //verificação do que está ou não marcado - negando
    if (!selectedCharset){

        selectedCharset = Object.values(charsets).join('');

        document.querySelector('.uppercase-check').checked = true;
        document.querySelector('.lowercase-check').checked = true;
        document.querySelector('.numbers-check').checked = true;
        document.querySelector('.special-check').checked = true;

    }



}