const imageContainer = document.getElementById('images');
const resultsContainer = document.getElementById('results');
const button = document.getElementById('resultsButton');

const image1 = document.querySelector('#images img:first-child');
const image2 = document.querySelector('#images img:nth-child(2)');
const image3 = document.querySelector('#images img:nth-child(3)');

let state = {
    clicksSoFar: 0,
    clicksAllowed: 25,
    allImages: [],
};

function Items(name, image){
    this.name = name;
    this.imageFile = image;
    this.votes = 0;
    this.views = 0;
    state.allImages.push(this);
};

new Items('r2d2 luggage bag', 'images/bag.jpg');
new Items('banana slicer', 'images/banana.jpg');
new Items('tablet/toilet paper holder', 'images/bathroom.jpg');
new Items('toe-less rubber rain-boots', 'images/boots.jpg');
new Items('coffee/breakfast maker', 'images/breakfast.jpg');
new Items('meatball flavored bubble-gum', 'images/bubblegum.jpg');
new Items('chair with rounded seat', 'images/chair.jpg');
new Items('cthulu toy', 'images/cthulhu.jpg');
new Items('duck bill mask for dogs', 'images/dog-duck.jpg');
new Items('canned dragon meat', 'images/dragon.jpg');
new Items('utensils pen topper', 'images/pen.jpg');
new Items('sweeping dog boots', 'images/pet-sweep.jpg');
new Items('pizza slicer scizzors', 'images/scissors.jpg');
new Items('shark sleeping bag', 'images/shark.jpg');
new Items('baby sweeping pajamas', 'images/sweep.png');
new Items('tauntaun sleeping bag', 'images/tauntaun.jpg');
new Items('canned unicorn meat', 'images/unicorn.jpg');
new Items('watering can', 'images/water-can.jpg');
new Items('wine glass', 'images/wine-glass.jpg');

function renderItems(){
    function randomImage(){
        return Math.floor(Math.random() * state.allImages.length);
    }

    let item1 = randomImage();
    let item2 = randomImage();
    let item3 = randomImage();

    while(item1 === item2 || item1 === item3 || item2 === item3){
        item2 = randomImage();
        item3 = randomImage();
    };

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

function renderButton(){
    button.disabled = false;
};

function renderResults(){
    console.log('render results firing');
    let resultsList = resultsContainer.createElement('ul');
    resultsContainer.appendChild(resultsList);
    
}

function handleClick(e){
    let itemName = e.target.alt;
    for (let i = 0; i < state.allImages.length; i++) {
        if (itemName === state.allImages[i].name){
            state.allImages[i].votes++;
            break;
        }
    }
    
    state.clicksSoFar++;

    if(state.clicksSoFar >= state.clicksAllowed){
    removeEventListener();
    renderButton();
    } else {
    renderItems();
}

    
}

function wiredEventListeners(){
    imageContainer.addEventListener('click', handleClick);
    button.addEventListener('click', renderResults)
}

function removeEventListener(){
    resultsContainer.removeEventListener('click', handleClick);
}


renderItems();
wiredEventListeners();
