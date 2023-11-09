const imageContainer = document.getElementById('images');
const resultsContainer = document.getElementById('results');
const button = document.getElementById('resultsButton');
const canvasContainer = document.getElementById('canvas');

const image1 = document.querySelector('#images img:first-child');
const image2 = document.querySelector('#images img.img2');
const image3 = document.querySelector('#images img.img3');

let state = {
  clicksSoFar: 0,
  clicksAllowed: 25,
  allImages: [],
  renderedImages: new Set(),
};

function Items(name, image) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  state.allImages.push(this);
}

new Items('R2D2 Luggage', 'images/bag.jpg');
new Items('Banana Slicer', 'images/banana.jpg');
new Items('Tablet/Toilet Roll Stand', 'images/bathroom.jpg');
new Items('Toe-less Rain Boots', 'images/boots.jpg');
new Items('All-In-One Breakfast', 'images/breakfast.jpg');
new Items('Meatball Bubble-gum', 'images/bubblegum.jpg');
new Items('Round Seat Chair', 'images/chair.jpg');
new Items('Cthulu Toy', 'images/cthulhu.jpg');
new Items('Duck-bill Dog Mask', 'images/dog-duck.jpg');
new Items('Dragon Meat', 'images/dragon.jpg');
new Items('Kitchen Utensils Pet Topper', 'images/pen.jpg');
new Items('Sweeping Dog Boots', 'images/pet-sweep.jpg');
new Items('Pizza Slicer Scizzors', 'images/scissors.jpg');
new Items('Shark Sleeping Bag', 'images/shark.jpg');
new Items('Baby Sweeping Pajamas', 'images/sweep.png');
new Items('Tauntaun Sleeping Bag', 'images/tauntaun.jpg');
new Items('Unicorn Meat', 'images/unicorn.jpg');
new Items('Watering Can', 'images/water-can.jpg');
new Items('Wine Glass', 'images/wine-glass.jpg');

function initialize() {
  for (let i = 0; i < state.allImages.length; i++) {
    let imagesString = localStorage.getItem(i.toString());
    if (imagesString === null) {
      continue;
    }
    let parsedImage = JSON.parse(imagesString);
    state.allImages[i].name = parsedImage.name;
    state.allImages[i].views = parsedImage.views;
    state.allImages[i].votes = parsedImage.votes;
  }
}

function renderItems() {
  function randomImage() {
    return Math.floor(Math.random() * state.allImages.length);
  }

  let currentSet = new Set();

  let item1 = randomImage();
  while (state.renderedImages.has(item1)) {
    item1 = randomImage();
  }
  currentSet.add(item1);

  let item2 = randomImage();
  while (state.renderedImages.has(item2) || item2 === item1) {
    item2 = randomImage();
  }
  currentSet.add(item2);

  let item3 = randomImage();
  while (state.renderedImages.has(item3) || item3 === item1 || item3 === item2) {
    item3 = randomImage();
  }
  currentSet.add(item3);

  state.renderedImages = currentSet;

  image1.src = state.allImages[item1].imageFile;
  image1.alt = state.allImages[item1].name;

  image2.src = state.allImages[item2].imageFile;
  image2.alt = state.allImages[item2].name;

  image3.src = state.allImages[item3].imageFile;
  image3.alt = state.allImages[item3].name;

  state.allImages[item1].views++;
  state.allImages[item2].views++;
  state.allImages[item3].views++;
}

function renderButton() {
  button.disabled = false;
}

function renderResults() {
  console.log('render results firing');
  let resultsList = document.createElement('ul');
  resultsContainer.appendChild(resultsList);
  let names = [];
  let votes = [];
  let views = [];

  for (let i = 0; i < state.allImages.length; i++) {
    let listItems = document.createElement('li');
    listItems.textContent = `${state.allImages[i].name}: ${state.allImages[i].votes}`;
    // resultsList.appendChild(listItems);
    names.push(state.allImages[i].name);
    votes.push(state.allImages[i].votes);
    views.push(state.allImages[i].views);
  }


  const data = {
    labels: names,
    datasets: [
      {
        label: 'Votes',
        data: votes,
        borderWidth: 1,
        backgroundColor: ['blue']
      },
      {
        label: 'Views',
        data: views,
        borderWidth: 1,
        backgroundColor: ['red']
      }
    ]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const myChart = new Chart(canvasContainer, config);
}


function handleClick(e) {
  let itemName = e.target.alt;
  for (let i = 0; i < state.allImages.length; i++) {
    if (itemName === state.allImages[i].name) {
      state.allImages[i].votes++;
      localStorage.setItem(i.toString(), JSON.stringify(state.allImages[i]));
      break;
    }
  }

  state.clicksSoFar++;

  if (state.clicksSoFar >= state.clicksAllowed) {
    removeEventListener();
    renderButton();

  } else {
    renderItems();
  }

}

function wiredEventListeners() {
  imageContainer.addEventListener('click', handleClick);
  button.addEventListener('click', renderResults);
}

function removeEventListener() {
  imageContainer.removeEventListener('click', handleClick);
}

initialize();
renderItems();
wiredEventListeners();

