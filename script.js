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

  divCard.classList.add("card");
  divBody.classList.add("card-body");
  // cardTitle.classList.add("card-title");
  img.classList.add("card-img-top");

  img.src = product.img;
  descriptionText.textContent = product.title;
  priceText.textContent = product.price;
  // cardTitle.innerHTML = pokemon.name;

  // divBody.appendChild(cardTitle);
  divCard.appendChild(img);
  divBody.appendChild(descriptionText);
  divBody.appendChild(priceText);
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
}

const searchProduct = async(category) => {
  const apiUrl = categoryURL(category);

  const object = await fetch(apiUrl);
  const results = await object.json();
  const arraySearch = results.results.map((item) => { // retorna um array de objetos com as propriedades selecionadas
    return { id: item.id,  title: item.title, img: item.thumbnail, price: item.price };
  });
  cardGroup(arraySearch);
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
  


