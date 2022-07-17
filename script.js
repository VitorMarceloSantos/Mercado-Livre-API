const btnSearch = document.querySelector('#btn-search');
const liNav = document.querySelectorAll('.dropdown-item'); // selecionando todas li da navegação
const selectFigure = document.querySelectorAll('.select-all'); // selecionando todos desenhos/ divs / e textos
const btnLeftOfertas = document.querySelector('#arrow-left');
const btnRightOfertas = document.querySelector('#arrow-right');
const btnLeftOfertasBook = document.querySelector('#arrow-left-books');
const btnRightOfertasBook = document.querySelector('#arrow-right-books');
const btnLeftOfertasGames = document.querySelector('#arrow-left-games');
const btnRightOfertasGames = document.querySelector('#arrow-right-games');
const cartItems = []; // array de objtos onde será armazenado os itens do carrinho
const favorityeItems = []; // array de objtos onde será armazenado os itens favoritos

// const doNotPlus = (e) => { // alterar o valor total dos produtos

//   if ((e.target).checked) {
//     const divContainer = document.getElementsByClassName(`${(e.target.id)}`);
//     console.log(`${(e.target.id)}`)
//     divContainer.borderRadius = '30px'
//   } else console.log('não')
// }

const refreshTotal = (e) => { // Atualizando o valor de acordo com a quantidade
  const quant = e.target.value;
  const precoUnitario = Number(e.target.classList.item((e.target.classList).length - 1));
  const idPreco = document.getElementById(`${(e.target.classList.item((e.target.classList).length - 2))}`);
  idPreco.textContent = `R$ ${(precoUnitario * quant).toLocaleString('pt-BR', { minimumFractionDigits: 2})}`;

  //Adicionando a quantidade no array de objetos
  const idItem =  (e.target.classList.item(0)).split(':')[1]; 
  cartItems.forEach((item, index) => {
    if (item.sku === idItem) cartItems[index].quantidade = quant;
  });
}

const cartShopp = () => { // função carrinho de compras
  // console.log(cartItems)
  cartItems.forEach((item) => {
    const cartShopping = document.querySelector('#cart-products'); // local onde será apresentado

    const divContainer = document.createElement('div');
    const img = document.createElement('img');
    const divImg = document.createElement('div');
    const divInformation = document.createElement('div');
    const divQuant = document.createElement('div');
    const textQquant = document.createElement('p');
    const title = document.createElement('p');
    const quantItems = document.createElement('input');
    const priceItem = document.createElement('p');
    const deleteItem = document.createElement('input');
    const textCheck = document.createElement('label');
    const containerCheck = document.createElement('div');

    //Adicionando Classes
    divContainer.classList.add('divContainer');
    divInformation.classList.add('divInformation');
    divImg.classList.add('divImg');
    priceItem.classList.add('priceItem');
    priceItem.setAttribute('id', `item:${item.sku}`);
    quantItems.setAttribute('type', 'number');
    quantItems.setAttribute('value', 1);
    quantItems.setAttribute('min', 1);
    divQuant.classList.add('divQuant');
    containerCheck.classList.add('container-check');
    
    // Adicionando Informações
    img.setAttribute('src', item.img);
    title.textContent = item.name;
    priceItem.textContent = `R$ ${(item.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2})}`;
    textQquant.textContent = 'Quantidade: ';
    deleteItem.setAttribute('type', 'checkbox');
    deleteItem.setAttribute('id', `check:${item.sku}`);
    deleteItem.classList.add('checkbox');
    textCheck.setAttribute('for', `check:${item.sku}`);
    textCheck.textContent = 'Selecionar';
    deleteItem.setAttribute('checked', 'true')

    // Criando Div
    containerCheck.appendChild(deleteItem);
    containerCheck.appendChild(textCheck);
    divContainer.appendChild(containerCheck);
    divQuant.appendChild(textQquant);
    divQuant.appendChild(quantItems);
    divInformation.appendChild(title);
    divInformation.appendChild(divQuant);
    divImg.appendChild(img);
    divContainer.appendChild(divImg);
    divContainer.appendChild(divInformation);
    divContainer.appendChild(priceItem);

    // Adicionando
    cartShopping.appendChild(divContainer);

    // Adicionando Evento Input
    quantItems.classList.add(`item:${item.sku}`);
    quantItems.classList.add(item.preco);
    quantItems.addEventListener('click', refreshTotal); // alterando via setas do input
    quantItems.addEventListener('keyup', refreshTotal); // alterando usuario digintado o valor
    //deleteItem.addEventListener('click', doNotPlus); // o produto não selecionado (checked : false), terá o blackground color alterardo, e não será somado no valor total



  });
}
// Criando Evento Btn-Cart
const btnCart = document.querySelector('.fa-cart-shopping');
btnCart.addEventListener('click', cartShopp);

// Add LocalStorage
const setLocalStorage = (items) => {
  localStorage.clear();
  localStorage.setItem('cartItems', JSON.stringify(items)); // adicionando elementos ao localStorage
}

// Buscando o produto pelo Id
const searchItem = async (id) => {
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const object = await result.json();
  return object;
};
// Adicionar Carrinho
const addCart = async (e) => {
  const numberItems = document.querySelector('#number-item');
  const objeto = await searchItem(e.target.classList.item((e.target.classList).length - 1)); // selecionando a classe com o Id do item
  const { id, title, price, thumbnail  } = objeto; // destruturação
  cartItems.push({sku: id, name: title, preco: price, img: thumbnail  }); // adicionando os elementos no array
  // console.log(cartItems)
  numberItems.textContent = cartItems.length; // quantidade de itens adicionado ao carrinho
  numberItems.style.display = 'flex'; // alterando a propriedade
  setLocalStorage(cartItems); // adicionando ao localStorage
}

const resetItems = () => { // removendo os itens, para realizar nova buscar sem a necessidade de reinicar a página
  const section = document.querySelector("#products");
  if ( section.childElementCount > 0) {
    while ( section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }
}

const searchMenu = (category, local) => { // realizando a busca de acordo com as opções do menu navegação
  resetItems();
  searchProduct(category, local);
}

liNav.forEach((li) => { // adicionando o escutador de evento em cada um dos elementos do array que contém todas as linhas do menu navegacao
  li.addEventListener('click', (e) => searchMenu(e.target.textContent, "#products"));
})

const searchCategory = (category, local) => { // realizando a opção de categoria
  resetItems();
  searchProduct(category, local);
}

selectFigure.forEach((div) => { // adicionando o escutador de evento em cada um dos elementos do array que contém todas as linhas do menu navegacao
  div.addEventListener('click', (e) => searchCategory(e.target.classList.item((e.target.classList).length - 1), "#products")); // selecionando a ultima classe do elemento
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
  const contProduct = document.querySelector('#products'); 
  contProduct.style.height = 'auto'; // volta a tela ao tamanho para comportar todos os produtos, pois foi alterado para 78vh.
  const section = document.querySelector(local);
  const divCard = document.createElement("div");
  const img = document.createElement("img");
  const divBody = document.createElement("div");
  const descriptionText = document.createElement('p');
  const priceText = document.createElement('p');
  // const cardTitle = document.createElement("h5");
  // const btnAdd = document.createElement('button'); // adicionar ao carrinho
  const containerIcons = document.createElement('div');
  const iAdd = document.createElement('i'); // adicionar ao carrinho
  const iFavority = document.createElement('i'); // adicionar aos favoritos
  const btnProductView = document.createElement('button'); // ver detalhes do produto
  const divDescription = document.createElement("div");

  // Adicionando Classes
  divCard.classList.add("card");
  divBody.classList.add("card-body");
  img.classList.add("card-img-top");
  containerIcons.classList.add('container-icons');
  // btnAdd.classList.add('btn');
  //btnAdd.classList.add('btn-outline-success');

  iFavority.classList.add('fa-solid');
  iFavority.classList.add('fa-heart');
  iFavority.classList.add(product.id); // adicionando o id como classe
  iAdd.classList.add('fa-solid');
  iAdd.classList.add('fa-cart-plus');
  iAdd.classList.add(product.id); // adicionando o id como classe
  btnProductView.classList.add('btn');
  btnProductView.classList.add('btn-outline-info');
  divDescription.classList.add('div-Description');
  priceText.classList.add('price-txt');


  // Atribuindo valores
  img.src = product.img;
  descriptionText.textContent = product.title;
  priceText.textContent = product.price;
  // btnAdd.textContent = 'Adicionar';
  btnProductView.textContent = 'Detalhes';
  // btnAdd.setAttribute('type', 'button');
  btnProductView.setAttribute('type', 'button');
  

  // divBody.appendChild(cardTitle);
  divCard.appendChild(img);
  divDescription.appendChild(descriptionText);
  divBody.appendChild(divDescription);
  divBody.appendChild(priceText);
  containerIcons.appendChild(iFavority);
  containerIcons.appendChild(iAdd);
  divBody.appendChild(containerIcons);
  // divBody.appendChild(btnAdd);
  divBody.appendChild(btnProductView);
  divCard.appendChild(divBody);
  section.appendChild(divCard);

 
  btnProductView.setAttribute('id',product.id); // o botão detalhes recebe o id do produto
  // Adicionando Eventos a botões
  btnProductView.addEventListener('click', productId,);
  iAdd.addEventListener('click', addCart);
}

const cardGroup = (products, local) => { // adicionando os produtos
  products.forEach((item) => {
    newCard(item, local); // passando a localização da criação
  });
}

const categoryURL = (category) => {
  return `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;
  // return `https://api.mercadolibre.com/items/${category}`
  // return `https://api.mercadolibre.com/catalog_products/${category}`  - retornando as caracteristicas do produto por ID(MLB6326752);
  // https://api.mercadolibre.com/items?ids=MLA599260060&attributes=id,price,category_id,title  - nesse formato vai pegar apenas os atributos necessarios pelo ID do produto
}

const lengthResults = (local, resultsArray) => {
  if ((local === '#container-ofertas') || (local === '#container-books') || (local === '#container-games')) { // no container de ofertas vai aparecer somente 10 produtos
    const resultAlterado = [];
    for (let i = 0; i < 10; i += 1) { // quantidade de produtos = 10
      resultAlterado.push(resultsArray[i]);
    }
    return resultAlterado;
  }
  return resultsArray;
}

const searchProduct = async(category, local) => {
  if (local === '#products') { // vai ocultar a div que mostra a pagina inicial e apresentar os produtos em tela
    const contIndex = document.querySelector('#container-initial-page');
    const contProduct = document.querySelector('#products');
    contProduct.style.height = '78vh';
    contIndex.style.display = 'none';
  }
  const loader = document.querySelector(local);
  // Criando Preloader
  const divLoader = document.createElement('div');
  const imgLoader = document.createElement('img');
  divLoader.setAttribute('id', 'preloader');
  imgLoader.setAttribute('id', `imgPreloader_${Math.floor(Math.random())}`); // gerando um IdAleatorio
  imgLoader.setAttribute('src', 'img/spinner/fundo_4.png');
  divLoader.appendChild(imgLoader);
  loader.appendChild(divLoader);
  // Preloader
  let i = 1;
  const loaderContador = setInterval(() => {  
        // const img = document.querySelector(imgId);
        imgLoader.setAttribute('src', `img/spinner/preloader_${i}.png`)
        i += 1;
        if (i === 4) i = 1; // zerando a variável i
    },250)
  // Fim Preloader
  const apiUrl = categoryURL(category);
  const object = await fetch(apiUrl);
  const results = await object.json();
  const resultsArray = results.results; // vai receber a propriedade results contendo o array com as informações dos produtos

  const arraySearch = (lengthResults(local, resultsArray)).map((item) => { // retorna um array de objetos com as propriedades selecionadas
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
  divLoader.remove(); // removendo a div após a API retornar os valores
  clearInterval(loaderContador);
  cardGroup(arraySearch, local);
  // console.log(results)
}

const selectCategory = () => {
  btnSearch.addEventListener('click', () => {
    const textSearch = document.querySelector('#text-search').value;
    resetItems();
    searchProduct(textSearch, '#products'); // search, usuarios digitou na busca
  });

  document.addEventListener('keypress', function (e) { // monitora todas as teclas(keys) pressionadas
    const textSearch = document.querySelector('#text-search').value;
    if (e.key === "Enter") { // caso a key seja a tecla Enter, vai chamar a função
      resetItems();
      searchProduct(textSearch, '#products'); // search, usuarios digitou na busca
    }
  }, false);
}

// Criando as ofertas do dia
const searchOfertas = () => {
  const arrayOfertas = ['Informática','Geek','Esporte','Carros', 'Motos', 'VideoGame', 'Beleza', 'Decoração', 'Celulares', 'Eletrônicos']; // id de produtos para ser adicionado nas ofertas do dia
  const random = arrayOfertas[Math.floor(Math.random()*arrayOfertas.length)]; // seleciona uma categoria aleatóriamente
  searchProduct(random, '#container-ofertas'); 
}
// Criando as ofertas Livros
const searchOfertasBook = () => {
  const arrayOfertas = ['Livro Ficção','Livro Romance','Livro Informática','Livro Policial', 'Livro Cronicas do Gelo e Fogo', 'Livro Senhor dos Aneis', 'Livro Financeiro', 'Livro Auto Ajuda']; // id de produtos para ser adicionado
  const random = arrayOfertas[Math.floor(Math.random()*arrayOfertas.length)]; // seleciona uma categoria aleatóriamente
  searchProduct(random, '#container-books'); 
}
// Criando as ofertas Games
const searchOfertasGames = () => {
  const arrayOfertas = ['Jogos Ps4','Jogos Ps5','Jogos Xbox','PlayStation 4', 'PlayStation 5', 'Xbox', 'Super Nintendo', 'Fliperama', 'Jogos Super Nintendo', 'Acessorios Ps4', 'Acessorios Ps5', 'Acessorios Xbox']; // id de produtos para ser adicionado
  const random = arrayOfertas[Math.floor(Math.random()*arrayOfertas.length)]; // seleciona uma categoria aleatóriamente
  searchProduct(random, '#container-games'); 
}
const resetItemsOfertas = (local) => { // removendo os itens, para realizar nova buscar sem a necessidade de reinicar a página
  const section = document.querySelector(local);
  if ( section.childElementCount > 0) {
    while ( section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }
}
// Criando Carousel Ofertas
const carouselOfertas = () => {
  resetItemsOfertas("#container-ofertas");
  searchOfertas();
}
btnLeftOfertas.addEventListener('click', carouselOfertas);
btnRightOfertas.addEventListener('click', carouselOfertas);

// Criando Carousel Livros
const carouselOfertasBook = () => {
  resetItemsOfertas('#container-books');
  searchOfertasBook();
}
btnLeftOfertasBook.addEventListener('click', carouselOfertasBook);
btnRightOfertasBook.addEventListener('click', carouselOfertasBook);

// Criando Carousel Games
const carouselOfertasGames = () => {
  resetItemsOfertas('#container-games');
  searchOfertasGames();
}
btnLeftOfertasGames.addEventListener('click', carouselOfertasGames);
btnRightOfertasGames.addEventListener('click', carouselOfertasGames);

const btnIndex = document.querySelector('#return-index'); // voltar a página inicial
btnIndex.addEventListener('click', () => {
  location.reload();  // Realiza o recarregamento da página
});

window.onload = function () {
  selectCategory();
  searchOfertas();
  searchOfertasBook();
  searchOfertasGames();
}
  


