const prompt = require('prompt-sync')();
console.log()
console.log(`===============================`)
console.log('| VOTAÇÃO PARA MELHOR STREAMER |');
console.log(`===============================`)
console.log()
let objetoCandidatos=[{//Objeto criado para os candidatos - maior facilidade de usar para verificar o ganhador e empate!
nome: 'Yoda',
votos: 0
},
{
nome: 'Surskity',
votos:0
},
{
nome: 'Alan',
votos:0
},
{
nome: 'Nulo',
votos:0
},
{
nome: 'Branco',
votos:0
}
];
let continuar = 'S' //para o while externo continar rodando enquanto for sim
function opcaoDeVoto(){//para sempre mostrar a opcao de voto
console.log(`Suas opções de voto são:
 +==================================+
+| [1]- ${objetoCandidatos[0].nome};                       |+
+| [2]- ${objetoCandidatos[1].nome};                   |+
+| [3]- ${objetoCandidatos[2].nome};                       |+
+| [4]- Voto nulo;                  |+
+| [5]- Voto em Branco.             |+
 +==================================+
`)
}
function autorizacaoVoto(idadeUsuario){ // verifica a idade do usuario e retorna o status pra votar
    if(idadeUsuario<16){
        return '\033[0;31mNegado\033[0m'
    }
    if(idadeUsuario>=16&&idadeUsuario<18){
        return '\033[1;33mOpcional\033[0m'
    }
    else{
        return '\033[1;32mObrigatório\033[0m'
    }

}
function votacao(autorizacao, voto){ //verifica e autoriza(ou nao) de acordo com o status da autorizacaoVoto e depois contabiliza(ou nao) o voto!
    if(autorizacao==='\033[0;31mNegado\033[0m'){
        console.log(`Voce não pode votar`)
        console.log()
    }else{
        if(voto==1){
            console.log(`votou em: ${objetoCandidatos[0].nome}`)
            objetoCandidatos[0].votos++;
        }
        if(voto==2){
            console.log(`votou em: ${objetoCandidatos[1].nome}`)
           objetoCandidatos[1].votos++;
            
        }
        if(voto==3){
            console.log(`votou em: ${objetoCandidatos[2].nome}`)
            objetoCandidatos[2].votos++;
        }
        if(voto==4){
            console.log(`votou: ${objetoCandidatos[3].nome}`)
            objetoCandidatos[3].votos++;
        }
        if(voto==5){
            console.log(`votou: ${objetoCandidatos[4].nome}`)
            objetoCandidatos[4].votos++;
        }

    }
}
function exibirResultados(a,b,c,d,e){// function para exibir o total de votos e o ganhador!
    console.log(`Os candidatos tiveram esses votos:
+===============================+
 |   [1]- Yoda: ${a} votos        |
 |   [2]- Surskity: ${b} votos    |
 |   [3]- Alan: ${c} votos        |
 |   [4]- Nulo: ${d} votos        |
 |   [5]- Branco: ${e} votos      |
+===============================+`)    

    let ganhador='';
    let votos=0;
    let empatados=[];
    for (let i = 0; i < 3; i++) {
        if(a==b){
            empatados.push(objetoCandidatos[0].nome)
            empatados.push(objetoCandidatos[1].nome)
        }else if(b==c){
            empatados.push(objetoCandidatos[1].nome)
            empatados.push(objetoCandidatos[2].nome)
        }else if(a==c){
            empatados.push(objetoCandidatos[0].nome)
            empatados.push(objetoCandidatos[2].nome)
        }
        if (a> votos) {
          votos = a;
          ganhador = objetoCandidatos[0].nome;
        } else if (b > votos) {
          votos = b;
          ganhador = objetoCandidatos[1].nome;
        } else if (c > votos) {
          votos = c;
          ganhador = objetoCandidatos[2].nome;
        } 
      }
      if (ganhador == "") {
          console.log()
        console.log('Não houve um ganhador, nenhum streamer foi votado.¯¯|_(ツ)_/¯¯')
        console.log()
        }else if(empatados.indexOf(ganhador)!==-1){
        console.log()
        console.log('Empatou a votação dos streamers.. (´･_･`)')
        console.log()
    }else{
        console.log()
console.log('O melhor Streamer foi para: '+`${ganhador}`+'!!!! PARABÉNS ヽ(´▽`)/')
        console.log()
    }
}

 

externo: while(continuar==='S'){//onde acontece algumas validacoes e o roda o código
interno1: while(true){
    anoUsuario = prompt('Digite o seu ano de nascimento [exemplo -> 1996]: ').trim()
    if((!isNaN(anoUsuario))&&(anoUsuario>1900&&anoUsuario<2022)){
        break interno1;
    }
}
idadeUsuario = new Date().getFullYear()-anoUsuario;
console.log()
console.log(`Seu status é: `+ autorizacaoVoto(idadeUsuario));
console.log()
if(autorizacaoVoto(idadeUsuario)==='\033[0;31mNegado\033[0m'){
    console.log(`Voce não pode votar`)
    console.log()
    continue;
    }else{

        opcaoDeVoto();
interno2: while(true){
        if(autorizacaoVoto(idadeUsuario)==='\033[1;33mOpcional\033[0m'){
        console.log(`Use somente [1]-[2]-[3]-[4]-[5] para votar ou [0] para sair`)
        console.log()
        voto=parseInt(prompt('Digite a sua escolha: '));
        console.log()
        if(!isNaN(voto)&&voto===0){
            break;
        }
        if(!isNaN(voto)&&voto>=1&&voto<=5){
            break interno2;
        }
    }else{
        console.log(`Use somente [1]-[2]-[3]-[4]-[5] para votar`)
        console.log()
        voto=parseInt(prompt('Digite a sua escolha: '));
        console.log()
        if(!isNaN(voto)&&voto===0){
            continue;
        }
        if(!isNaN(voto)&&voto>=1&&voto<=5){
            break interno2;
        }
    }
    }
    votacao(autorizacaoVoto(),voto)
    console.log()
    
    interno3: while(true){
        console.log()
        continuar=prompt(`Deseja continuar votando? [S] ou [N]: `).toLocaleUpperCase().trim()
        if(isNaN(continuar)&&continuar==='S'||continuar==='N'){
            break interno3;
        }
    }
    console.clear()
    }
if(continuar==='N'){
exibirResultados(objetoCandidatos[0].votos,objetoCandidatos[1].votos,objetoCandidatos[2].votos,objetoCandidatos[3].votos,objetoCandidatos[4].votos);
break externo;
}
};
console.log()
console.log(`Elogios, dúvidas e etc -> kellbberbarcarolo@gmail.com! Obrigado(a) pelo feedback!`)
console.log()

