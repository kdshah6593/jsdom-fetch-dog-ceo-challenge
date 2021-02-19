console.log('%c HI', 'color: firebrick')

let breeds = [];

document.addEventListener("DOMContentLoaded", function(){
    getImages();
    getBreeds();
});

function getImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => {
            json.message.forEach(msg => addImage(msg))
        });
}

function addImage(img) {
    let dogContainer = document.getElementById("dog-image-container");
    let dogImg = document.createElement("img");
    dogImg.src = img
    dogContainer.append(dogImg);
}

function getBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            breeds = Object.keys(json.message);
            updateBreedList(breeds);
            selectBreedListener();
        });
}

function updateBreedList(breeds) {
    let ul = document.getElementById("dog-breeds")
    
    while(ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild);
    }

    breeds.forEach(breed => addBreed(breed))
}

function addBreed(breed) {
    let breedList = document.getElementById('dog-breeds');
    let breedLi = document.createElement('li')
    breedLi.textContent = breed
    breedList.append(breedLi)
    breedLi.addEventListener('click', changeColor);
}

function changeColor(event) {
    event.target.style.color = 'blue';
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function selectBreedListener() {
    let breedDropdown = document.getElementById("breed-dropdown")
    breedDropdown.addEventListener("change", function(e){
        selectBreedsStartingWith(e.target.value);
    });
}