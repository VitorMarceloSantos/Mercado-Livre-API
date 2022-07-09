const fetch = require('node-fetch');

function newCard(product) { // criando o card(bootstrap) via java script
  const section = document.querySelector("section");

  const divCard = document.createElement("div");
  const img = document.createElement("img");
  const divBody = document.createElement("div");
  const descriptionText = document.createElement('p');
  const priceText = document.createElement('p');
  // const cardTitle = document.createElement("h5");

  divCard.classList.add("card");
  divBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  img.classList.add("card-img-top");

  img.src = product.img;
  descriptionText.textContent = product.title;
  priceText.textContent = product.price;
  // cardTitle.innerHTML = pokemon.name;

  // divBody.appendChild(cardTitle);
  divCard.appendChild(img);
  divCard.appendChild
  divCard.appendChild(divBody);
  section.appendChild(divCard);
}

const selectCategory = (category) => {
  return `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;
}

const searchProduct = async(category) => {
  const apiUrl = selectCategory(category);

  const object = await fetch(apiUrl);
  const results = await object.json();
  const arraySearch = results.results.map((item) => { // retorna um array de objetos com as propriedades selecionadas
    return { id: item.id,  title: item.title, img: item.thumbnail, price: item.price };
  });
  // console.log(arraySearch)
  newCard(arraySearch);
}
searchProduct('computador')
