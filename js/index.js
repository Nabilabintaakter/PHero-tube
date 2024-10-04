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
// categories loading.......................
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}
// videos loading............................
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}
// category wise video loading...............
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
        .catch(error => console.log(error))
}

//------------------------------------- create display categories-----------------------------------------

// categories displaying.......................
const displayCategories = (categoriesArray) => {

    categoriesArray.forEach(item => {
        // create a button inside a div
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button onclick ="loadCategoryVideos(${item.category_id})" class="btn btn-md">
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
            <div class ="space-y-2"> 
                <h2 class= "text-base font-bold">${video.title} </h2>
                <div class ="flex gap-2 items-center">
                    <p class ="text-xs text-[rgba(23, 23, 23, 0.7)]">${video.authors[0].profile_name} </p>

                    ${video.authors[0].verified === true
                ? `<img class ="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
                : ''
            }  
                </div>
                <p class ="text-xs text-[rgba(23, 23, 23, 0.7)]">${video.others.views} views</p>
            </div>
        </div>
        `;

        // add cards to videosContainer
        videosContainer.append(card);
    })
}

// function calling here
loadCategories();
loadVideos();