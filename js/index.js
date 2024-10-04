// Fetch, load and show categories  on html:

// card object demo from API........................
const cardDemo ={
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

//-------------------------------------------- create load categories------------------------------------------
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



//------------------------------------------ create display categories-----------------------------------------
// categories displaying.......................

const displayCategories = (categoriesArray) => {

    categoriesArray.forEach(item => {
        // create a button
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        // add button to categoryContainer
        const categoryContainer = document.getElementById('categories');
        categoryContainer.append(button);
    })
}

// videos displaying.......................

const displayVideos = (videosArray) => {
    const videosContainer = document.getElementById('videos');
    videosArray.forEach((video) => {
        console.log(video);
        // add a card

        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
         <figure>
            <img
            src="${video.thumbnail}" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Show Details</button>
        </div>
        `;

        // add videos to videosContainer

        videosContainer.append(card);
    })
}


loadCategories();
loadVideos();