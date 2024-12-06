const prompt = require("prompt-sync")();
const fs = require("fs");

const artistas = [];
const titulos = [];
const generos = [];
const anos = [];
const precos = [];
let dadosAlterados = false;

function titulo(texto) {
  console.log();
  console.log(texto);
  console.log("- ".repeat(40));
}

function gravaDados() {
  if (!dadosAlterados) {
    console.log("Nenhum dado foi adicionado.");
    return;
  }

  const discos = [];

  for (let i = 0; i < artistas.length; i++) {
    if (
      artistas[i] === undefined ||
      titulos[i] === undefined ||
      generos[i] === undefined ||
      anos[i] === undefined ||
      precos[i] === undefined
    ) {
      continue;
    } else {
      discos.push(
        artistas[i] +
          ";" +
          titulos[i] +
          ";" +
          generos[i] +
          ";" +
          anos[i] +
          ";" +
          precos[i]
      );
    }
  }

  fs.writeFileSync("discos.txt", discos.join("\n"));

  console.log("Dados salvos em arquivo...");
}

function obtemDados() {
  if (fs.existsSync("discos.txt")) {
    const discos = fs.readFileSync("discos.txt", "utf-8").split("\n");
    for (let i = 0; i < discos.length; i++) {
      const partes = discos[i].split(";");

      if (partes.length === 5) {
        artistas.push(partes[0]);
        titulos.push(partes[1]);
        generos.push(partes[2]);
        anos.push(Number(partes[3]));
        precos.push(Number(partes[4]));
      }
    }
    console.log("Dados Carregados com Sucesso!");
  } else {
    console.log("Arquivo de dados não encontrado. Iniciando com dados vazios.");
  }
}

function adicionar() {
  titulo("Adicionar Discos");

  let art;
  let ttl;
  let gnr;
  let ano;
  let prc;

  //-----------------------------------------Artista
  do {
    art = prompt("Artista.....:");
    if (!art) {
      console.log("Erro: O nome do artista não pode estar vazio. Por favor, insira um nome válido");
    }
  } while (!art);

  //-----------------------------------------Titulo
  do {
    ttl = prompt("Titulo......:");
    if (!ttl) {
      console.log("Erro: O titulo não pode estar vazio. Por favor, insira um titulo válido");
    }
  } while (!ttl);

  //-----------------------------------------Gênero
  do {
    gnr = prompt("Gênero......:");
    if (gnr === undefined) {console.log("Erro: Gênero inválido. Por favor, insira um Gênero válido");}
  } while (gnr === undefined);

  //-----------------------------------------Ano
  do {
    ano = Number(prompt("Ano.........:"));
    if (isNaN(ano) || ano <= 0) {
      console.log("Erro: O ano deve ser um número maior que 0. Por favor, insira um ano válido.");
    }
  } while (isNaN(ano) || ano <= 0);

  //-----------------------------------------Preço
  do {
    prc = Number(prompt("Preço R$....:"));
    if (isNaN(prc) || prc <= 0) {
      console.log("Erro: O Preço deve ser um número maior que 0. Por favor, insira um ano válido.");
    }
  } while (isNaN(prc) || prc <= 0);

  if (typeof ano == "undefined") ano = 0;
  if (typeof prc == "undefined") prc = 0;

  artistas.push(art);
  titulos.push(ttl);
  generos.push(gnr);
  anos.push(ano);
  precos.push(prc);

  dadosAlterados = true;
  console.log("Ok! Disco Cadastrado com Sucesso!");
}

function listagem() {
  titulo("Lista de Discos Cadastrados");

  console.log();
  console.log(" Nº Artista...........................: Titulo...........................................: Gênero.................: Ano..: Preço R$.:");
  console.log("-------------------------------------------------------------------------------------------------------------------------------------");

  for (let i = 0; i < artistas.length; i++) {
    if (
      artistas[i] === undefined ||
      titulos[i] === undefined ||
      generos[i] === undefined ||
      anos[i] === undefined ||
      precos[i] === undefined
    ) {
      continue;
    } else {
      console.log(
        `${String(i + 1)
          .padStart(2)
          .padEnd(3)} ${artistas[i].padEnd(35)} ${titulos[i].padEnd(
          50
        )} ${generos[i].padEnd(25)}${anos[i]} ${precos[i]
          .toLocaleString("pt-br", { minimumFractionDigits: 2 })
          .padStart(12)}`
      );
      dadosAlterados = true;
    }
  }
}

function pesqArtista() { //------PESQUISAR DISCO POR ARTISTA
  titulo("Pesquisa de Discos por Artista");

  const artista = prompt("Artista....: ").toUpperCase();

  console.log();
  console.log(" Nº Artista...........................: Titulo...........................................: Gênero.................: Ano..: Preço R$.:");
  console.log("-------------------------------------------------------------------------------------------------------------------------------------");

  let contador = 0;

  for (let i = 0; i < artistas.length; i++) {
    if (artistas[i].toUpperCase() == artista) {
      console.log(
        `${String(i + 1)
          .padStart(2)
          .padEnd(3)} ${artistas[i].padEnd(35)} ${titulos[i].padEnd(
          50
        )} ${generos[i].padEnd(25)}${anos[i]} ${precos[i]
          .toLocaleString("pt-br", { minimumFractionDigits: 2 })
          .padStart(12)}`
      )
      dadosAlterados = true;
      contador++
    }
  }

  if (contador == 0) {
    console.log("Não há discos do artista informado.");
  }
}

function pesqTitulo() { //------PESQUISAR DISCO POR TITULO
  titulo("Pesquisa de Discos por Titulo")

  const tit = prompt("Titulo....: ").toUpperCase();

  console.log();
  console.log(" Nº Artista...........................: Titulo...........................................: Gênero.................: Ano..: Preço R$.:");
  console.log("-------------------------------------------------------------------------------------------------------------------------------------");

  let contador = 0;
  for (let i = 0; i < titulos.length; i++){
    if(titulos[i].toUpperCase() == tit){
      console.log(
        `${String(i + 1)
          .padStart(2)
          .padEnd(3)} ${artistas[i].padEnd(35)} ${titulos[i].padEnd(
          50
        )} ${generos[i].padEnd(25)}${anos[i]} ${precos[i]
          .toLocaleString("pt-br", { minimumFractionDigits: 2 })
          .padStart(12)}`
      );
      dadosAlterados = true;
      contador++
    }
  }
}

function pesqGenero() {
  titulo("Pesquisa de Discos por Gênero");

  const genero = prompt("Gênero....: ").toUpperCase();

  console.log();
  console.log(" Nº Artista...........................: Titulo...........................................: Gênero.................: Ano..: Preço R$.:");
  console.log("-------------------------------------------------------------------------------------------------------------------------------------");

  let contador = 0;

  for(let i = 0; i < generos.length; i++){
    if(generos[i].toUpperCase() == genero){
      console.log(
        `${String(i + 1)
          .padStart(2)
          .padEnd(3)} ${artistas[i].padEnd(35)} ${titulos[i].padEnd(
          50
        )} ${generos[i].padEnd(25)}${anos[i]} ${precos[i]
          .toLocaleString("pt-br", { minimumFractionDigits: 2 })
          .padStart(12)}`
      );
      dadosAlterados = true;
      contador++
    }
  }
}

function pesqAno(){ //------PESQUISAR DISCO POR ANO
  titulo("Pesquisa de Discos por Ano")

  const ano = prompt("Ano....: ")

  console.log()
  console.log(" Nº Artista...........................: Titulo...........................................: Gênero.................: Ano..: Preço R$.:")
  console.log("-------------------------------------------------------------------------------------------------------------------------------------")

  let contador = 0

  for(let i = 0; i < anos.length; i++){
    if(anos[i] == ano){
      console.log(
        `${String(i + 1)
          .padStart(2)
          .padEnd(3)} ${artistas[i].padEnd(35)} ${titulos[i].padEnd(
          50
        )} ${generos[i].padEnd(25)}${anos[i]} ${precos[i]
          .toLocaleString("pt-br", { minimumFractionDigits: 2 })
          .padStart(12)}`
      );
      dadosAlterados = true;
      contador++
    }
  }

}


function pesqPreco() { //------PESQUISAR DISCO POR PREÇO
  titulo("Pesquisa de Discos por Preço");

  const minimo = Number(prompt("R$ Mínimo...: "));
  const maximo = Number(prompt("R$ Maximo...: "));

  console.log();
  console.log(" Nº Artista...........................: Titulo...........................................: Gênero.................: Ano..: Preço R$.:");
  console.log("-------------------------------------------------------------------------------------------------------------------------------------");
  let contador = 0;
  for (let i = 0; i < artistas.length; i++) {
    if (precos[i] >= minimo && precos[i] <= maximo) {
      console.log(`${String(i + 1).padStart(2).padEnd(3)} ${artistas[i].padEnd(35)} ${titulos[i].padEnd(50)} ${generos[i].padEnd(25)}${anos[i]} ${precos[i].toLocaleString("pt-br", { minimumFractionDigits: 2 }).padStart(12)}`);
      contador++;
      dadosAlterados = true;
    }
  }

  if (contador == 0) {
  console.log("Não há discos nessa faixa de preço.");
  }
}


function pesquisar() {
  titulo("Menu Pesquisar")

  console.log(".....1. Pesquisar por Artista");
  console.log(".....2. Pesquisar por Titulo");
  console.log(".....3. Pesquisar por Gênero");
  console.log(".....4. Pesquisar por Ano");
  console.log(".....5. Pesquisar por Faixa de Preço");
  console.log(".....6. voltar");
  const option = Number(prompt("Opção: "));

  switch (option) {
    case 1: {
      pesqArtista()
      break
    }
    case 2: {
      pesqTitulo()
      break
    }
    case 3: {
      pesqGenero()
      break
    }
    case 4: {
      pesqAno()
      break
    }
    case 5: {
      pesqPreco()
      break
    }
    default: {
      break
    }
  }
  
}




function alterarDisco() {
  titulo("Alterar informações do Disco:");
  listagem();

  let contador;
  console.log();
  const i = Number(prompt("Nº...: "));

  console.log(`Disco Selecionado: ${titulos[i - 1]} | ${artistas[i - 1]} | ${generos[i - 1]} | ${anos[i - 1]} | R$${precos[i - 1]}`);
  console.log("--------------------------------------------------------------");
  console.log(".....1. Alterar o Artista");
  console.log(".....2. Alterar o Titulo");
  console.log(".....3. Alterar o Genero");
  console.log(".....4. Alterar o Ano");
  console.log(".....5. Alterar o Preço");
  console.log(".....6. Alterar Tudo");
  console.log(".....7. Cancelar");
  const option = Number(prompt("Opção: "));

  switch (option) {
    case 1: {
      const art = prompt("Artista.....:");
      artistas[i - 1] = art;
      contador++;
      console.log("Disco Alterado com Sucesso!");
      break;
    }

    case 2: {
      const ttl = prompt("Titulo......:");
      titulos[i - 1] = ttl;
      contador++;
      dadosAlterados = true;
      console.log("Disco Alterado com Sucesso!");
      break;
    }

    case 3: {
      const gnr = prompt("Gênero......:");
      generos[i - 1] = gnr;
      contador++;
      dadosAlterados = true;
      console.log("Disco Alterado com Sucesso!");
      break;
    }

    case 4: {
      const ano = Number(prompt("Ano.........:"));
      anos[i - 1] = ano;
      contador++;
      dadosAlterados = true;
      console.log("Disco Alterado com Sucesso!");
      break;
    }

    case 5: {
      const prc = Number(prompt("Preço R$....:"));
      precos[i - 1] = prc;
      contador++;
      dadosAlterados = true;
      console.log("Disco Alterado com Sucesso!");
      break;
    }

    case 6: {
      const art = prompt("Artista.....:");
      const ttl = prompt("Titulo......:");
      const gnr = prompt("Gênero......:");
      const ano = Number(prompt("Ano.........:"));
      const prc = Number(prompt("Preço R$....:"));

      artistas[i - 1] = art;
      titulos[i - 1] = ttl;
      generos[i - 1] = gnr;
      anos[i - 1] = ano;
      precos[i - 1] = prc;
      contador++;
      dadosAlterados = true;
      console.log("Disco Alterado com Sucesso!");
      break;
    }

    default: {
      break;
    }
  }
}

function excluir() {
  titulo("Excluir Disco");
  let contador = 0;

  listagem();

  let d = Number(prompt("Excluir disco N°...: "));
  d--;

  if (artistas[d] != undefined) {
    artistas.splice(d, 1);
    titulos.splice(d, 1);
    generos.splice(d, 1);
    anos.splice(d, 1);
    precos.splice(d, 1);
    contador++;
    dadosAlterados = true;

    console.log(`Disco Excluído com Sucesso`);
  }

  if (contador == 0) {
    console.log("Disco não encontrado.");
  }
}

//----------------------- Programa principal

obtemDados();
menuPrincipal: do {
  titulo("Avenida do Rock - Loja de Discos");
  console.log("1. Adicionar Discos");
  console.log("2. Listagem de Discos Cadastrados");
  console.log("3. Pesquisar");
  console.log("4. Alterar Disco");
  console.log("5. Excluir");
  console.log("6. Finalizar");
  const opcao = Number(prompt("Opção: "));
  switch (opcao) {
    case 1: {
      adicionar();
      break;
    }
    case 2: {
      listagem();
      break;
    }
    case 3: {
      pesquisar();
      break;
    }
    case 4: {
      alterarDisco();
      break;
    }
    case 5: {
      excluir();
      break;
    }
    default: {
      break menuPrincipal;
    }
  }
} while (true);

gravaDados();
