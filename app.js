// DOM objects
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeFrontImg = document.querySelector('.poke-front-image');
const pokeBackImg = document.querySelector('.poke-back-image');
const pokeList = document.querySelectorAll('.list-poke');
const pokeId = document.querySelector('.poke-id');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const searchButton = document.querySelector('#submit-button');
const searchInput = document.querySelector('#search');
const cardButton = document.querySelector('.card-button');
const cardScreen = document.querySelector('.card-container');
const statButton = document.querySelector('.stats-button');

// types of pokemon
const types = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

// // url pages
let nextUrl = null;
let prevUrl = null;

// capitalize the first letter
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);
// lowercase the first letter
const lowercase = (str) => str[0].toLowerCase() + str.substr(1);

// reset screen
const resetScreen = () => {
  // shows screen for pokemon
  mainScreen.classList.remove('hide');

  // remove the previous class type if it exists
  for (const type of types) {
    mainScreen.classList.remove(type);
  }
};

// get list of data of pokemons for right screen
const fetchAllPokemons = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { results, previous, next } = data;
      nextUrl = next;
      prevUrl = previous;

      for (let i = 0; i < pokeList.length; i++) {
        const pokeItem = pokeList[i];
        const resultData = results[i];

        // if resultData has current index
        if (resultData) {
          const { name, url } = resultData;

          const urlArr = url.split('/');
          const id = urlArr[urlArr.length - 2];

          pokeItem.textContent = id + '. ' + capitalize(name);
        } else {
          pokeItem.textContent = '';
        }
      }
    })
    .catch((err) => console.log(err));
};

// get data of pokemon for left screen
const fetchPokemon = (name, id) => {
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}` ||
      `https://pokeapi.co/api/v2/pokemon/${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      resetScreen();

      // change screen color based on pokemon type
      const colorType = data['types'][0]['type']['name'];
      mainScreen.classList.add(colorType);
      // displays the pokemon name
      pokeName.textContent = capitalize(data['name']);
      // display pokemons id
      pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
      // show the pokemon images
      pokeFrontImg.src = data['sprites']['front_default'] || '';
      pokeBackImg.src = data['sprites']['back_default'] || '';
    })
    .catch((err) => console.log(err));
};

// get card data for pokemon
const fetchPokemonCard = (name) => {
  fetch(`https://api.pokemontcg.io/v2/cards/?q=name:pikachu`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        const rarity = data.data[i].rarity;
        console.log(rarity);

        // const pic = data.data[i].images.small;
        // for (let i = 0; i < rarity.length; i++) {
        //   // const pic = data.data[i].images.small;

        //   switch (rarity) {
        //     case 'Promo':
        //       pokeCardUrl = pic;
        //       break;
        //     case 'Rare Rainbow':
        //       pokeCardUrl = pic;
        //       break;
        //     case 'Rare Secret':
        //       pokeCardUrl = pic;
        //       break;
        //     case 'Rare Holo':
        //       pokeCardUrl = pic;
        //       break;
        //     case 'Rare':
        //       pokeCardUrl = pic;
        //       break;
        //     case 'Common':
        //       pokeCardUrl = pic;
        //       break;
        //     case 'Uncommon':
        //       pokeCardUrl = pic;
        //       break;
        //     default:
        //       break;
        //   }
        // }
      }

      cardScreen.innerHTML = `<img src="${pokeCardUrl}" />`;
    });
};

// get pokemon stats
const fetchPokemonStats = (name) => {
  fetch(`https://api.pokemontcg.io/v2/cards/?q=name:${name}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        const rarity = data.data[i].rarity;
        // const stats = data.data[i].images.small;

        const priceLookUp = data.data[i].cardmarket.prices.averageSellPrice;

        console.log(priceLookUp);

        switch (rarity) {
          case 'Promo':
            price = priceLookUp;
            break;
          case 'Rare Rainbow':
            price = priceLookUp;
            break;
          case 'Rare Secret':
            price = priceLookUp;
            break;
          case 'Rare Holo':
            price = priceLookUp;
            break;
          case 'Rare':
            price = priceLookUp;
            break;
          case 'Common':
            price = priceLookUp;
            break;
          case 'Uncommon':
            price = priceLookUp;
            break;
          default:
            break;
        }
      }

      cardScreen.innerHTML = `<p>${price}/>`;
    });
};

// click handlers
const handlePrevButtonClick = () => {
  if (prevUrl) {
    fetchAllPokemons(prevUrl);
  }
};

const handleNextButtonClick = () => {
  if (nextUrl) {
    fetchAllPokemons(nextUrl);
  }
};

const handleListItemClick = (e) => {
  e.preventDefault();

  if (!e.target) return;

  const listItem = e.target;
  if (!listItem.textContent) return;

  const name = lowercase(listItem.textContent.split('. ')[1]);
  fetchPokemon(name);
};

const handleSearchButtonClick = (e) => {
  e.preventDefault();
  const pokemon = lowercase(searchInput.value);

  fetchPokemon(pokemon);

  searchInput.value = '';
};

const handleCardButtonClick = () => {
  const pokemon = pokeName.textContent;
  fetchPokemonCard(pokemon);
};

const handleStatsButtonClick = () => {
  const pokemon = pokeName.textContent;
  fetchPokemonStats(pokemon);
};

// // event listeners
prevButton.addEventListener('click', handlePrevButtonClick);

nextButton.addEventListener('click', handleNextButtonClick);

searchButton.addEventListener('click', handleSearchButtonClick);

cardButton.addEventListener('click', handleCardButtonClick);

statButton.addEventListener('click', handleStatsButtonClick);

for (const pokeItem of pokeList) {
  pokeItem.addEventListener('click', handleListItemClick);
}

// initialize app
fetchAllPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
