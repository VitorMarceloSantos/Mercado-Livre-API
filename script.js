// const fetch = require('node-fetch');
const btnSearch = document.querySelector('#btn-search');

function newCard(product) { // criando o card(bootstrap) via java script
  const section = document.querySelector("#products");

  const divCard = document.createElement("div");
  const img = document.createElement("img");
  const divBody = document.createElement("div");
  const descriptionText = document.createElement('p');
  const priceText = document.createElement('p');
  // const cardTitle = document.createElement("h5");
  const btnAdd = document.createElement('button'); // adicionar ao carrinho
  const btnProductView = document.createElement('button'); // ver detalhes do produto
  const divDescription = document.createElement('div'); // irá armazenar o texo que descreve o elemento

  // Adicionando Classes
  divCard.classList.add("card");
  divBody.classList.add("card-body");
  img.classList.add("card-img-top");
  btnAdd.classList.add('btn');
  btnAdd.classList.add('btn-outline-success');
  btnProductView.classList.add('btn');
  btnProductView.classList.add('btn-outline-info');
  divDescription.classList.add('div-Description');

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
}

const cardGroup = (products) => { // adicionando os produtos
  products.forEach((item) => {
    newCard(item);
  });
}

const categoryURL = (category) => {
  return `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;
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
  console.log(results)
}

const selectCategory = () => {
  btnSearch.addEventListener('click', () => {
    const textSearch = document.querySelector('#text-search').value;
    searchProduct(textSearch);
  });

  document.addEventListener('keypress', function (e) { // monitora todas as teclas(keys) pressionadas
    const textSearch = document.querySelector('#text-search').value;
    if (e.key === "Enter") { // caso a key seja a tecla Enter, vai chamar a função
     searchProduct(textSearch); // vai passar null como parâmetro
    }
  }, false);
}

window.onload = function () {
  selectCategory();
}
  


