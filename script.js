const btnSearch = document.querySelector('#btn-search');
const liNav = document.querySelectorAll('.dropdown-item'); // selecionando todas li da navegação
const selectFigure = document.querySelectorAll('.select-all'); // selecionando todos desenhos/ divs / e textos
const btnLeftOfertas = document.querySelector('#arrow-left');
const btnRightOfertas = document.querySelector('#arrow-right');
const btnLeftOfertasBook = document.querySelector('#arrow-left-books');
const btnRightOfertasBook = document.querySelector('#arrow-right-books');
const btnLeftOfertasGames = document.querySelector('#arrow-left-games');
const btnRightOfertasGames = document.querySelector('#arrow-right-games');
let cartItems = []; // array de objtos onde será armazenado os itens do carrinho
let favoriteItems = []; // array de objtos onde será armazenado os itens favoritos

// Atualizando quantidade cart
const refreshCart = () => {
  const numberItems = document.querySelector('#number-item');
  numberItems.textContent = cartItems.reduce((acc, curr) => {
    return acc + Number(curr.quantidade);
  }, 0); // quantidade de itens adicionado ao carrinho
  numberItems.style.display = 'flex'; // alterando a propriedade
}
// Atualizando quantidade cart Favorite
const refreshCartFavorite = () => {
  const numberItems = document.querySelector('#number-favorite');
  numberItems.textContent = favoriteItems.reduce((acc, curr) => {
    return acc + Number(curr.quantidade);
  }, 0); // quantidade de itens adicionado ao carrinho
  numberItems.style.display = 'flex'; // alterando a propriedade
}

// Calcula o Valor total do itens
const priceTotal = () => {
  const textPrice = document.querySelector('#text-price-total');
  const totalPrice = cartItems.reduce((acc, curr) => {
   if (curr.checked === true) { // verifica se o check está ativado
    return acc + ((curr.quantidade) * (curr.preco));
   } else return acc;
  }, 0);
  if ( totalPrice === undefined ) {
    textPrice.textContent = `R$ 0,00`;
  }else textPrice.textContent = `R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2})}`;
}

const doNotPlus = (e) => { // alterar o valor total dos produtos
   //Adicionando o checked no array de objetos
  cartItems.forEach((item, index) => {
    if (!(e.target).checked) {
      const idItem = ((e.target).id).split(':')[1];
      if (item.sku === idItem) cartItems[index].checked = false;
    }else if ((e.target).checked) {
      const idItem = ((e.target).id).split(':')[1];
      if (item.sku === idItem) cartItems[index].checked = true;   
    }  
  });
  refreshCart(); // atualizando cart
  priceTotal(); // atualizando o preço total
}

const doNotFavorite = (e) => { // alterar o status do favorito
  //Adicionando o checked no array de objetos
 favoriteItems.forEach((item, index) => {
   if (!(e.target).checked) {
     const idItem = ((e.target).id).split(':')[1];
     if (item.sku === idItem) favoriteItems[index].checked = false;
   }else if ((e.target).checked) {
     const idItem = ((e.target).id).split(':')[1];
     if (item.sku === idItem) favoriteItems[index].checked = true;   
   }  
 });
 refreshCartFavorite(); // atualizando cart
}

const refreshTotal = (e) => { // Atualizando o valor de acordo com a quantidade
  const quant = e.target.value;
  //Adicionando a quantidade no array de objetos
  const idItem =  (e.target.classList.item(0)).split(':')[1]; 
  cartItems.forEach((item, index) => {
    if (item.sku === idItem) cartItems[index].quantidade = quant;
  });
  priceTotal(); // atualizando o valor total
  refreshCart();
}

const refreshTotalFavorite = (e) => { // Atualizando o valor de acordo com a quantidade
  const quant = e.target.value;
  //Adicionando a quantidade no array de objetos
  const idItem =  (e.target.classList.item(0)).split(':')[1]; 
  favoriteItems.forEach((item, index) => {
    if (item.sku === idItem) favoriteItems[index].quantidade = quant;
  });
  refreshCartFavorite();
}

const cartShopp = (container1, container2, array) => { // função carrinho de compras / favoritos
  const cart = document.querySelector(container1);
  cart.style.display = 'flex';
  const index = document.querySelector('#container-initial-page');
  index.style.display = 'none';

  array.forEach((item) => {
    const cartShopping = document.querySelector(container2); // local onde será apresentado
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
    quantItems.classList.add(`item:${item.sku}`);
    quantItems.classList.add(item.preco);

    if (container1 === '#container-cart-shopp') { // Eventos somente para o carrinho de compra
      // Adicionando Evento Input
      quantItems.addEventListener('click', refreshTotal); // alterando via setas do input
      quantItems.addEventListener('keyup', refreshTotal); // alterando usuario digintado o valor
      deleteItem.addEventListener('click', doNotPlus); // o produto não selecionado não será somado no valor total
      priceTotal(); // atualizando o valor total
    }else {
      quantItems.addEventListener('click', refreshTotalFavorite); // alterando via setas do input
      quantItems.addEventListener('keyup', refreshTotalFavorite); // alterando usuario digintado o valor
      deleteItem.addEventListener('click', doNotFavorite); // o produto não selecionado não será somado no valor total
    }
  });
}

// Criando Evento Btn-Cart
const btnCart = document.querySelector('.fa-cart-shopping');
btnCart.addEventListener('click', () => {
  const cartShopping = document.querySelector('#cart-products'); // local onde será apresentado
  if (cartShopping.childElementCount > 0) {
    while ( cartShopping.firstChild) {
      cartShopping.removeChild(cartShopping.firstChild);
    }
  }
  const initialPage = document.querySelector('#container-initial-page');
  const products = document.querySelector('#container-products');
  initialPage.style.display = 'none';
  products.style.display = 'none';
  const cartFavorite = document.querySelector('#container-cart-favorite');
  cartFavorite.style.display = 'none';
  const desenvolvedor = document.querySelector('#container-desenvolvedor');
  desenvolvedor.style.display = 'none';
  cartShopp('#container-cart-shopp', '#cart-products', cartItems);
});

// Criando Evento Btn-Favorite
const btnFavorite = document.querySelector('.fa-heart');
btnFavorite.addEventListener('click', () => {
  const cartFavorite = document.querySelector('#cart-products-favorite'); // local onde será apresentado
  if (cartFavorite.childElementCount > 0) {
    while ( cartFavorite.firstChild) {
      cartFavorite.removeChild(cartFavorite.firstChild);
    }
  }
  const initialPage = document.querySelector('#container-initial-page');
  const products = document.querySelector('#container-products');
  initialPage.style.display = 'none';
  products.style.display = 'none';
  const cart = document.querySelector('#container-cart-shopp');
  cart.style.display = 'none';
  const desenvolvedor = document.querySelector('#container-desenvolvedor');
  desenvolvedor.style.display = 'none';
  cartShopp('#container-cart-favorite', '#cart-products-favorite', favoriteItems);
});

// Add LocalStorageCart
const setLocalStorage = (items) => {
  localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', JSON.stringify(items)); // adicionando elementos ao localStorage
}

// Pegando LocalStorageCart
const getLocalStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')); // recuperando as informações armazenada 
  return cartItems;
}

// Add LocalStorageFavorite
const setLocalStorageFavorite = (items) => {
  localStorage.removeItem('cartFavorite');
  localStorage.setItem('cartFavorite', JSON.stringify(items)); // adicionando elementos ao localStorage
}

// Pegando LocalStorageFavorite
const getLocalStorageFavorite = () => {
  const favoriteItem = JSON.parse(localStorage.getItem('cartFavorite')); // recuperando as informações armazenada 
  return favoriteItem;
}

// Verificar Storage possui elementos
const verifyStorage = () => { // caso seja maior que 0 é porque há itens adicionados no carrinho
  if (getLocalStorage() !== null) { // verifica se o localStorage está vazio
    const armazenamento = getLocalStorage();
    armazenamento.forEach((item) => {
      cartItems.push(item);
    });
    cartShopp('#container-cart-shopp', '#cart-products', cartItems);
    refreshCart();
  }
  if (getLocalStorageFavorite() !== null) { // verifica se o localStorage está vazio
    const armazenamentoFavorite = getLocalStorageFavorite();
    armazenamentoFavorite.forEach((item) => {
      favoriteItems.push(item);
    });
    cartShopp('#container-cart-favorite', '#cart-products-favorite', favoriteItems);
    refreshCartFavorite();
  }
};

// Buscando o produto pelo Id
const searchItem = async (id) => {
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const object = await result.json();
  return object;
};

// Adicionar Carrinho
const addCart = async (e) => {
  const objeto = await searchItem(e.target.classList.item((e.target.classList).length - 1)); // selecionando a classe com o Id do item
  const { id, title, price, thumbnail  } = objeto; // destruturação
  cartItems.push({sku: id, name: title, preco: price, img: thumbnail, quantidade: 1, checked: true }); // adicionando os elementos no array
  setLocalStorage(cartItems); // adicionando ao localStorage
  refreshCart();
}

// Adicionar Favorito
const addCartFavorite = async (e) => {
  const objeto = await searchItem(e.target.classList.item((e.target.classList).length - 1)); // selecionando a classe com o Id do item
  const { id, title, price, thumbnail  } = objeto; // destruturação
  favoriteItems.push({sku: id, name: title, preco: price, img: thumbnail, quantidade: 1, checked: true }); // adicionando os elementos no array
  setLocalStorageFavorite(favoriteItems); // adicionando ao localStorage
  refreshCartFavorite();
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
  contProduct.style.display = 'flex'
  const section = document.querySelector(local);
  const divCard = document.createElement("div");
  const img = document.createElement("img");
  const divBody = document.createElement("div");
  const descriptionText = document.createElement('p');
  const priceText = document.createElement('p');
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
  iFavority.classList.add('fa-solid');
  iFavority.classList.add('fa-heart-circle-plus');
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
  iFavority.addEventListener('click', addCartFavorite);
}

const cardGroup = (products, local) => { // adicionando os produtos
  products.forEach((item) => {
    newCard(item, local); // passando a localização da criação
  });
}

const categoryURL = (category) => {
  return `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;
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
  const cart = document.querySelector('#container-cart-shopp');
  cart.style.display = 'none';
  const products = document.querySelector("#container-products");
  products.style.display = 'block';
  if (local === '#products') { // vai ocultar a div que mostra a pagina inicial e apresentar os produtos em tela
    const contIndex = document.querySelector('#container-initial-page');
    const contProduct = document.querySelector('#products');
    contProduct.style.height = '78vh';
    contIndex.style.display = 'none';
    const desenvolvedor = document.querySelector('#container-desenvolvedor');
    desenvolvedor.style.display = 'none';
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
  // location.reload();  // Realiza o recarregamento da página
  const cartFavorite = document.querySelector('#container-cart-favorite');
  cartFavorite.style.display = 'none';
  const cart = document.querySelector('#container-cart-shopp');
  cart.style.display = 'none';
  const index = document.querySelector('#container-initial-page');
  index.style.display = 'block';
  const desenvolvedor = document.querySelector('#container-desenvolvedor');
  desenvolvedor.style.display = 'none';
});

//Btns - Cart
const btnReturnIndex = document.querySelector('#btn-return-index'); // voltar a página inicial
btnReturnIndex.addEventListener('click', () => {
  const cart = document.querySelector('#container-cart-shopp');
  cart.style.display = 'none';
  const index = document.querySelector('#container-initial-page');
  index.style.display = 'block';
  const desenvolvedor = document.querySelector('#container-desenvolvedor');
  desenvolvedor.style.display = 'none';
});

const btnEraseCart = document.querySelector('#btn-erase-cart');
btnEraseCart.addEventListener('click', () => {
  if ( cartItems.length > 0) {
    const section = document.querySelector("#cart-products");
    while ( section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }
  localStorage.removeItem('cartItems'); // remove somente o cart
  cartItems = [];
  const numberItems = document.querySelector('#number-item');
  numberItems.textContent = 0; // quantidade de itens adicionado ao carrinho
  numberItems.style.display = 'none'; // alterando a propriedade
  const textPrice = document.querySelector('#text-price-total');
  textPrice.textContent = `R$ 0,00`;
});

//Btns - Favorite
const btnReturnIndexFavorite = document.querySelector('#btn-return-index-favorite'); // voltar a página inicial
btnReturnIndexFavorite.addEventListener('click', () => {
  const cart = document.querySelector('#container-cart-favorite');
  cart.style.display = 'none';
  const index = document.querySelector('#container-initial-page');
  index.style.display = 'block';
  const desenvolvedor = document.querySelector('#container-desenvolvedor');
  desenvolvedor.style.display = 'none';
});

const btnEraseFavorite = document.querySelector('#btn-erase-cart-favorite');
btnEraseFavorite.addEventListener('click', () => {
  if ( favoriteItems.length > 0) {
    const section = document.querySelector("#cart-products-favorite");
    while ( section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }
  localStorage.removeItem('cartFavorite'); // apagar somente favoritos
  favoriteItems = [];
  const numberItems = document.querySelector('#number-favorite');
  numberItems.textContent = 0; // quantidade de itens adicionado ao carrinho
  numberItems.style.display = 'none'; // alterando a propriedade
});
const btnContato = document.querySelector('#btn-contato');
btnContato.addEventListener('click', () => {
  const cartFavorite = document.querySelector('#container-cart-favorite');
  cartFavorite.style.display = 'none';
  const cart = document.querySelector('#container-cart-shopp');
  cart.style.display = 'none';
  const index = document.querySelector('#container-initial-page');
  index.style.display = 'none';
  const products = document.querySelector('#products');
  products.style.display = 'none';
  const desenvolvedor = document.querySelector('#container-desenvolvedor');
  desenvolvedor.style.display = 'flex';
});

window.onload = function () {
  selectCategory();
  searchOfertas();
  searchOfertasBook();
  searchOfertasGames();
  verifyStorage();
}
  


