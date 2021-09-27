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
  fetch(`https://api.pokemontcg.io/v2/cards/?q=name:${name}`)
    .then((response) => response.json())
    .then((data) => {
      const rarityArr = [];

      for (let i = 0; i < data.data.length; i++) {
        const rarity = data.data[i].rarity;
        rarityArr.push(rarity);
      }

      const promoIdx = rarityArr.indexOf('Promo');
      const rainbowIdx = rarityArr.indexOf('Rare Rainbow');
      const secretIdx = rarityArr.indexOf('Rare Secret');
      const holoIdx = rarityArr.indexOf('Rare Holo');
      const rareIdx = rarityArr.indexOf('Rare');
      const commonIdx = rarityArr.indexOf('Common');
      const uncommonIdx = rarityArr.indexOf('Uncommon');

      if (promoIdx != -1) {
        pokeCardUrl = data.data[promoIdx].images.small;
        avgPrice = data.data[promoIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[promoIdx].types[0]);
      } else if (rainbowIdx != -1) {
        pokeCardUrl = data.data[rainbowIdx].images.small;
        avgPrice = data.data[rainbowIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[rainbowIdx].types[0]);
      } else if (secretIdx != -1) {
        pokeCardUrl = data.data[secretIdx].images.small;
        avgPrice = data.data[secretIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[secretIdx].types[0]);
      } else if (holoIdx != -1) {
        pokeCardUrl = data.data[holoIdx].images.small;
        avgPrice = data.data[holoIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[holoIdx].types[0]);
      } else if (rareIdx != -1) {
        pokeCardUrl = data.data[rareIdx].images.small;
        avgPrice = data.data[rareIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[rareIdx].types[0]);
      } else if (commonIdx != -1) {
        pokeCardUrl = data.data[commonIdx].images.small;
        avgPrice = data.data[commonIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[commonIdx].types[0]);
      } else if (uncommonIdx != -1) {
        pokeCardUrl = data.data[uncommonIdx].images.small;
        avgPrice = data.data[uncommonIdx].cardmarket.prices.averageSellPrice;
        colorType = lowercase(data.data[uncommonIdx].types[0]);
      } else {
        console.log('No Match');
      }

      cardScreen.innerHTML = `<img src="${pokeCardUrl}" /><div class="price-container ${colorType}"><h4 class="price-text">Average Sell Price: $${avgPrice}</h4></div>`;
    })
    .catch((err) => console.log(err));
};

// get pokemon stats
const fetchPokemonStats = (name) => {
  fetch(`https://api.pokemontcg.io/v2/cards/?q=name:${name}`)
    .then((response) => response.json())
    .then((data) => {
      const rarityArr = [];

      for (let i = 0; i < data.data.length; i++) {
        const rarity = data.data[i].rarity;
        rarityArr.push(rarity);
      }

      const promoIdx = rarityArr.indexOf('Promo');
      const rainbowIdx = rarityArr.indexOf('Rare Rainbow');
      const secretIdx = rarityArr.indexOf('Rare Secret');
      const holoIdx = rarityArr.indexOf('Rare Holo');
      const rareIdx = rarityArr.indexOf('Rare');
      const commonIdx = rarityArr.indexOf('Common');
      const uncommonIdx = rarityArr.indexOf('Uncommon');

      if (promoIdx != -1) {
        pokeType = data.data[promoIdx].types[0];
        pokeHP = data.data[promoIdx].hp;
        pokeAttackName1 = data.data[promoIdx].attacks[0].name;
        pokeAttackText1 = data.data[promoIdx].attacks[0].text;
        if (data.data[promoIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[promoIdx].attacks[1].name;
          pokeAttackText2 = data.data[promoIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[promoIdx].weaknesses) {
          pokeWeakness = data.data[promoIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[promoIdx].types[0]);
      } else if (rainbowIdx != -1) {
        pokeType = data.data[rainbowIdx].types[0];
        pokeHP = data.data[rainbowIdx].hp;
        pokeAttackName1 = data.data[rainbowIdx].attacks[0].name;
        pokeAttackText1 = data.data[rainbowIdx].attacks[0].text;
        if (data.data[rainbowIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[rainbowIdx].attacks[1].name;
          pokeAttackText2 = data.data[rainbowIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[rainbowIdx].weaknesses) {
          pokeWeakness = data.data[ranbowIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[rainbowIdx].types[0]);
      } else if (secretIdx != -1) {
        pokeType = data.data[secretIdx].types[0];
        pokeHP = data.data[secretIdx].hp;
        pokeAttackName1 = data.data[secretIdx].attacks[0].name;
        pokeAttackText1 = data.data[secretIdx].attacks[0].text;
        if (data.data[secretIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[secretIdx].attacks[1].name;
          pokeAttackText2 = data.data[secretIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[secretIdx].weaknesses) {
          pokeWeakness = data.data[secretIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[secretIdx].types[0]);
      } else if (holoIdx != -1) {
        pokeType = data.data[holoIdx].types[0];
        pokeHP = data.data[holoIdx].hp;
        pokeAttackName1 = data.data[holoIdx].attacks[0].name;
        pokeAttackText1 = data.data[holoIdx].attacks[0].text;
        if (data.data[holoIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[holoIdx].attacks[1].name;
          pokeAttackText2 = data.data[holoIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[holoIdx].weaknesses) {
          pokeWeakness = data.data[holoIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[holoIdx].types[0]);
      } else if (rareIdx != -1) {
        pokeType = data.data[rareIdx].types[0];
        pokeHP = data.data[rareIdx].hp;
        pokeAttackName1 = data.data[rareIdx].attacks[0].name;
        pokeAttackText1 = data.data[rareIdx].attacks[0].text;
        if (data.data[rareIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[rareIdx].attacks[1].name;
          pokeAttackText2 = data.data[rareIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[rareIdx].weaknesses) {
          pokeWeakness = data.data[rareIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[rareIdx].types[0]);
      } else if (commonIdx != -1) {
        pokeType = data.data[commonIdx].types[0];
        pokeHP = data.data[commonIdx].hp;
        pokeAttackName1 = data.data[commonIdx].attacks[0].name;
        pokeAttackText1 = data.data[commonIdx].attacks[0].text;
        if (data.data[commonIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[commonIdx].attacks[1].name;
          pokeAttackText2 = data.data[commonIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[commonIdx].weaknesses) {
          pokeWeakness = data.data[commonIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[commonIdx].types[0]);
      } else if (uncommonIdx != -1) {
        pokeType = data.data[uncommonIdx].types[0];
        pokeHP = data.data[uncommonIdx].hp;
        pokeAttackName1 = data.data[uncommonIdx].attacks[0].name;
        pokeAttackText1 = data.data[uncommonIdx].attacks[0].text;
        if (data.data[uncommonIdx].attacks.length > 1) {
          pokeAttackName2 = data.data[uncommonIdx].attacks[1].name;
          pokeAttackText2 = data.data[uncommonIdx].attacks[1].text;
        } else {
          pokeAttackName2 = '';
          pokeAttackText2 = '';
        }
        if (data.data[uncommonIdx].weaknesses) {
          pokeWeakness = data.data[uncommonIdx].weaknesses[0].type;
        } else {
          pokeWeakness = '';
        }
        colorType = lowercase(data.data[uncommonIdx].types[0]);
      } else {
        console.log('No Match');
      }

      cardScreen.innerHTML = `<div class="stats-container ${colorType}"><p class="stats-text"><b><u>Type</u></b> <br> ${pokeType} <br><br> <b><u>HP</u></b> <br> ${pokeHP} <br><br> <b><u>Attacks</u></b> <br> ${pokeAttackName1} <br> <sub>${pokeAttackText1}</sub> <br><br> ${pokeAttackName2} <br> <sub>${pokeAttackText2}</sub>  <br><br> <b><u>Weakness</u></b> <br> ${pokeWeakness}</p></div>`;
    })
    .catch((err) => console.log(err));
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
  pokeItem.addEventListener('click', () => {
    cardScreen.innerHTML = '';
  });
}

// initialize app
fetchAllPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
