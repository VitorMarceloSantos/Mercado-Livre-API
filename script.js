// const fetch = require('node-fetch');
const btnSearch = document.querySelector('#btn-search');
const liNav = document.querySelectorAll('.dropdown-item'); // selecionando todas li da navegação

const resetItems = () => { // removendo os itens, para realizar nova buscar sem a necessidade de reinicar a página
  const section = document.querySelector("#products");
  if ( section.childElementCount > 0) {
    while ( section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }
}

const searchMenu = (category) => { // realizando a busca de acordo com as opções do menu navegação
  resetItems();
  searchProduct(category);
}

liNav.forEach((li) => { // adicionando o escutador de evento em cada um dos elementos do array que contém todas as linhas do menu navegacao
  li.addEventListener('click', (e) => searchMenu(e.target.textContent));
})


function productId(e) { // Detalhes do Produto
  const searchProduct = async(category) => {
    const apiUrl = `https://api.mercadolibre.com/items/${category}`;
    const object = await fetch(apiUrl);
    const results = await object.json();
    // Criando Variáveis
    const modalTitle = document.querySelector('#ModalTitle');
    const modalEspecificacoes = document.querySelector('#ModalEspecificacoes');
    const modalName = document.createElement('p');
    const img = document.createElement('img');
    // Zerando as Informações do Modal
    while (modalEspecificacoes.firstChild) {
      modalEspecificacoes.removeChild(modalEspecificacoes.firstChild);
    }
    // Adicionando Informações
    modalTitle.textContent = 'Especificações Técnicas';
    modalName.textContent = results.title;
    img.setAttribute('src',results.thumbnail);
    modalEspecificacoes.appendChild(img);
    modalEspecificacoes.appendChild(modalName);
    (results.attributes).forEach((description) => {
      const text = document.createElement('p');
      text.textContent = `${description.name}: ${description.value_name}`;
      modalEspecificacoes.appendChild(text);
    });
    // Criando Modal
    const myModal = new bootstrap.Modal(document.getElementById('Modal1'))
    myModal.show();
  }
  searchProduct(e.target.id); // chamando a função e passando o parâmetro
}

function newCard(product, local) { // criando o card(bootstrap) via java script
  const section = document.querySelector(local);
  const divCard = document.createElement("div");
  const img = document.createElement("img");
  const divBody = document.createElement("div");
  const descriptionText = document.createElement('p');
  const priceText = document.createElement('p');
  // const cardTitle = document.createElement("h5");
  const btnAdd = document.createElement('button'); // adicionar ao carrinho
  const btnProductView = document.createElement('button'); // ver detalhes do produto
  const divDescription = document.createElement("div");

  // Adicionando Classes
  divCard.classList.add("card");
  divBody.classList.add("card-body");
  img.classList.add("card-img-top");
  btnAdd.classList.add('btn');
  btnAdd.classList.add('btn-outline-success');
  btnProductView.classList.add('btn');
  btnProductView.classList.add('btn-outline-info');
  divDescription.classList.add('div-Description');
  priceText.classList.add('price-txt');

  // Atribuindo valores
  img.src = product.img;
  descriptionText.textContent = product.title;
  priceText.textContent = product.price;
  btnAdd.textContent = 'Adicionar';
  btnProductView.textContent = 'Detalhes';
  btnAdd.setAttribute('type', 'button');
  btnProductView.setAttribute('type', 'button');
  

  // divBody.appendChild(cardTitle);
  divCard.appendChild(img);
  divDescription.appendChild(descriptionText);
  divBody.appendChild(divDescription);
  divBody.appendChild(priceText);
  divBody.appendChild(btnAdd);
  divBody.appendChild(btnProductView);
  divCard.appendChild(divBody);
  section.appendChild(divCard);

 
  btnProductView.setAttribute('id',product.id); // o botão detalhes recebe o id do produto
  // Adicionando Eventos a botões
  btnProductView.addEventListener('click', productId,
    
  );
}

const cardGroup = (products) => { // adicionando os produtos
  products.forEach((item) => {
    newCard(item, '#products'); // passando a localização da criação
  });
}

const categoryURL = (category) => {
  return `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;
  // return `https://api.mercadolibre.com/items/${category}`
  // return `https://api.mercadolibre.com/catalog_products/${category}`  - retornando as caracteristicas do produto por ID(MLB6326752);
  // https://api.mercadolibre.com/items?ids=MLA599260060&attributes=id,price,category_id,title  - nesse formato vai pegar apenas os atributos necessarios pelo ID do produto
}

const searchProduct = async(category) => {
  const apiUrl = categoryURL(category);
  const object = await fetch(apiUrl);
  const results = await object.json();
  const arraySearch = results.results.map((item) => { // retorna um array de objetos com as propriedades selecionadas
    // Limitar o tamanho da descrição do produto
    const arrayTemp = (item.title).split(' ');
    const arrayFinal = arrayTemp.reduce((acc, curr, index) => {
      if(index < 6){ // o tamanho máximo é 6 palavras
        return `${acc} ${curr}`; 
      } 
      return acc;
    }, '');
    return { id: item.id,  title: arrayFinal, img: item.thumbnail, price: `R$ ${(item.price).toLocaleString('pt-br', {minimumFractionDigits: 2})}` };
  }); // map
  cardGroup(arraySearch);
  // console.log(results)
}

const selectCategory = () => {
  btnSearch.addEventListener('click', () => {
    const textSearch = document.querySelector('#text-search').value;
    resetItems();
    searchProduct(textSearch); // search, usuarios digitou na busca
  });

  document.addEventListener('keypress', function (e) { // monitora todas as teclas(keys) pressionadas
    const textSearch = document.querySelector('#text-search').value;
    if (e.key === "Enter") { // caso a key seja a tecla Enter, vai chamar a função
      resetItems();
      searchProduct(textSearch); // search, usuarios digitou na busca
    }
  }, false);
}

// Criando as ofertas do dia
const arrayOfertas = ['Informática','Geek','Esporte','Carros', 'Motos', 'VideoGame', 'Beleza', 'Decoração', 'Celulares', 'Eletrônicos']; // id de produtos para ser adicionado nas ofertas do dia
const ofertas = document.querySelector('#container-ofertas');
const random = arrayOfertas[Math.floor(Math.random()*arrayOfertas.length)]

searchProduct(id); 


window.onload = function () {
  selectCategory();
}
  


