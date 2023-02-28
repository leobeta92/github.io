const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NYT API
const apiKey = 's2yAtSphTJxxvRdvQwmlzF8SHShsGET7';
const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key
=${apiKey}`;

let resultsArray = [];
let favorites = {};

// Limit number of articles
const count = 4;

function showContent() {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    // if (page === 'results') {
    //     resultsNav.classList.remove('hidden');
    //     favoritesNav.classList.add('hidden');
    // } else {
    //     resultsNav.classList.add('hidden');
    //     favoritesNav.classList.remove('hidden');
    // }
    loader.classList.add('hidden');
}

// Get APOD results
function createDOMNodes() {
    const currentArray = resultsArray.results;
    const displayArray = currentArray.splice(0,count);
    console.log("Current Array:",displayArray);
    displayArray.forEach((result) => {
        // Card Container
        console.log("Result:",displayArray.indexOf(result));
        const card = document.createElement('div');
        card.classList.add('card');
        // Link 
        const link = document.createElement('a');
        link.href = result.url;
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.multimedia[0].url;
        image.alt = 'NYT Top Article';
        image.title = 'View Article';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        
        // Card Text
        const cardAbstract = document.createElement('p');
        cardAbstract.textContent = result.abstract;
        cardAbstract.classList.add('card-text-hidden');

        // See More & Arrow
        const seeMoreContainer = document.createElement('div');
        seeMoreContainer.classList.add('see-more-container');
        
       
        const seeMore = document.createElement('p');
        seeMore.classList.add('see-more');
        seeMore.textContent = 'Expand +';  
        
        const seeLess = document.createElement('p');
        seeLess.classList.add('see-less');
        seeLess.classList.add('hidden');
        seeLess.textContent = 'Collapse -';  

        // Adding event listeners to See More/See Less
        seeMore.addEventListener('click', () => {
            console.log('Adding/Removing:',cardAbstract);
            if (cardAbstract.classList.contains('card-text-hidden')) {
                cardAbstract.classList.remove('card-text-hidden');
                seeLess.classList.remove('hidden');
                seeMore.classList.add('hidden');
            }
        }); 
        
        seeLess.addEventListener('click', () => {
            console.log('Adding/Removing:',cardAbstract);
            if (!cardAbstract.classList.contains('card-text-hidden')) {
                cardAbstract.classList.add('card-text-hidden');
                seeLess.classList.add('hidden');
                seeMore.classList.remove('hidden');
            }
        }); 

        seeMoreContainer.append(seeMore,seeLess);

                // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add to Read Later';
        saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);      

        // if (page === 'results') {
        //     saveText.textContent = 'Add to Favorites';
        //     saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);      
        // }
        // else {
        //     saveText.textContent = 'Remove Favorite';
        //     saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);  
        // }


        // Append
        cardBody.append(cardTitle, cardAbstract, seeMoreContainer,saveText);
        link.appendChild(image);
        card.append(link,cardBody);
        imagesContainer.appendChild(card);
    });

}

// Update DOM
function updateDOM(page) {
    // Get favorites from local storage
    // if (localStorage.getItem('nasaFavorites')) {
    //     favorites = JSON.parse(localStorage.getItem('nasaFavorites'))
    // }
    // console.log("Updating DOM");
    imagesContainer.textContent = '';
    createDOMNodes(page);
    showContent(page);
}

// Get 10 Images from NASA API
async function getNYTArticles() {
    // Show loader
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log("Initial Array:",resultsArray);
        updateDOM();
    }
    catch (error) {
        // Catch error here.

    }
}


// add result to favorites
function saveFavorite(itemUrl) {
    // Loop through Results array to select favorite
    // displayArray.forEach((item) => {
    //     if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
    //         favorites[itemUrl] = item;
    //         // show save confirmation for 2 seconds
    //         saveConfirmed.hidden = false;
    //         setTimeout(() => {
    //             saveConfirmed.hidden = true;
    //         }, 2000);
    //         // Set favorites in localStorage
    //         localStorage.setItem('articleFavorites', JSON.stringify(favorites));
    //     }
    // });

    window.alert('Feature Coming Soon');

// Current Progress
    // favorites[itemUrl] = itemUrl;
    // localStorage.setItem('articleFavorites',JSON.stringify(favorites))

}

// Remove item from favorites
function removeFavorite(itemUrl) {
    console.log("removing from favorites");
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        // Set favorites in localStorage
        localStorage.setItem('articleFavorites', JSON.stringify(favorites));
        updateDOM('favorites'); 
    }

}

// On Load
getNYTArticles();