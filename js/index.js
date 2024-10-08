// Fetch, load and show categories  on html:

// card object demo from API........................
const cardDemo = {
    category_id: "1001",
    video_id: "aaab",
    thumbnail: "https://i.ibb.co/QPNzYVy/moonlight.jpg",
    title: "Midnight Serenade",
    authors: [
        {
            "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            "profile_name": "Noah Walker",
            "verified": false
        }
    ],
    others: {
        views: "543K",
        posted_date: ""
    },
    description: "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
}

//-------------------------------------- create load categories------------------------------------------
// load Categories.......................
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}
// load Videos............................
const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

// remove active class from btn
function removeActiveClass() {
    const buttons = document.getElementsByClassName('category-btn')
    console.log(buttons);
    for (let button of buttons) {
        button.classList.remove('btn-error')
    }
}
// load Category Videos...............
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // sobaike active class remove koro

            removeActiveClass();

            // id ke active class add koro
            const activeBtn = document.getElementById(`btn-${id}`);
            // activeBtn.classList.remove('btn')
            activeBtn.classList.add('btn-error')
            displayVideos(data.category)
        })
        .catch(error => console.log(error))
}
// load description (async-await used here)
const loadDescription = async (videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDescription(data.video);

}
const displayDescription = (video) => {
    const detailsContainer = document.getElementById('modal-content');
    document.getElementById('customModal').showModal();

    detailsContainer.innerHTML = `
    <div class="">
        <img class="w-full h-auto object-cover " src="${video.thumbnail}"/>
        <div class="px-0 py-5 flex gap-3">
            <div class ="w-10 h-10 ">
                 <img class="w-full h-full rounded-full object-cover" src="${video.authors[0].profile_picture}"/> 
            </div>
            <div class ="w-full "> 
                <h2 class= "text-base font-bold mb-2">${video.title} </h2>
                <div class ="flex gap-2 items-center">
                    <p class ="text-xs text-[rgba(23, 23, 23, 0.7)]">${video.authors[0].profile_name} </p>

                    ${video.authors[0].verified === true
            ? `<img class ="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
            : ''
        }  
                </div>
            </div>
        </div>
        <p class="text-justify">${video.description}</p>
    </div>
    `;

}

//------------------------------------- create display categories-----------------------------------------

// categories displaying.......................
const displayCategories = (categoriesArray) => {

    categoriesArray.forEach(item => {
        // create a button inside a div
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick ="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        `;

        // add buttonContainer to categoryContainer
        const categoryContainer = document.getElementById('categories');
        categoryContainer.append(buttonContainer);
    })
}

// posted date displaying..................
function getTimeString(time) {
    const years = parseInt((time / (365 * 86400)));
    let restSeconds = parseInt((time % (365 * 86400)));

    const restMonths = parseInt((restSeconds / (30 * 86400)));
    restSeconds = parseInt((restSeconds % (30 * 86400)));

    const restDays = parseInt(restSeconds / 86400);
    restSeconds = parseInt(restSeconds % 86400);

    const restHours = parseInt(restSeconds / 3600);
    restSeconds = parseInt(restSeconds % 3600);

    const restMinutes = parseInt(restSeconds / 60);
    restSeconds = parseInt(restSeconds % 60);

    return `${years === 0 ? '' : `${years} yrs`} ${restMonths === 0 ? '' : `${restMonths} months`} ${restHours === 0 ? '' : `${restHours} hrs`} ${restMinutes === 0 ? '' : `${restMinutes} min`} ${restSeconds === 0 ? '' : `${restSeconds} seconds`} ago`;
}

// videos displaying.......................
const displayVideos = (videosArray) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';

    if (videosArray.length === 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
            <div class ="flex justify-center items-center py-20">
                <div class ="flex flex-col  items-center gap-5 ">
                    <img class="w-24 h-24 md:w-36 md:h-36" src="./assets/Icon.png"/>
                    <p class = "text-[#171717] text-xl md:text-2xl font-bold text-center w-3/4">Oops!! Sorry, There is no content here
                    </p>
                </div>
            </div>
        `;
        return;
    }
    else {
        videosContainer.classList.add('grid')
    };
    videosArray.forEach((video) => {
        // create a card
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
         <figure class ="h-[200px] rounded-md relative">
            <img class ="h-full w-full object-cover"
            src="${video.thumbnail}" />
            ${video.others.posted_date?.length === 0
                ? ''
                : `<span class="absolute bottom-2 right-2 bg-[#171717] text-white text-[10px] p-1 rounded-[4px]">${getTimeString(video.others.posted_date)}</span>`
            }
        </figure>
        <div class="px-0 py-5 flex gap-3">
            <div class ="w-10 h-10 ">
                 <img class="w-full h-full rounded-full object-cover" src="${video.authors[0].profile_picture}"/> 
            </div>
            <div class ="w-full "> 
                <h2 class= "text-base font-bold mb-2">${video.title} </h2>
                <div class ="flex gap-2 items-center">
                    <p class ="text-xs text-[rgba(23, 23, 23, 0.7)]">${video.authors[0].profile_name} </p>

                    ${video.authors[0].verified === true
                ? `<img class ="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
                : ''
            }  
                </div>
                <div class="flex justify-between items-center mt-0">
                    <p class ="text-xs text-[rgba(23, 23, 23, 0.7)]">${video.others.views} views</p>
                    <button onclick="loadDescription('${video.video_id}')" class ="btn btn-sm btn-error">
                        Details
                    </button>
                </div>
            </div>
        </div>
        `;

        // add cards to videosContainer
        videosContainer.append(card);
    })
}
document.getElementById('search-input').addEventListener('keyup', (event)=>{
    loadVideos(event.target.value)
})
// function calling here
loadCategories();
loadVideos();