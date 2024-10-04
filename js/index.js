// Fetch, load and show categories  on html:

// create load categories

const loadCategories = () =>{
    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}



// create display categories
const displayCategories = (categoriesArray) =>{

    categoriesArray.forEach(item => {
        console.log(item.category);
        // create a button
        const button = document.createElement ('button');
        button.classList = 'btn';
        button.innerText = item.category;

        // add button to categoryContainer
        const categoryContainer = document.getElementById('categories');
        categoryContainer.append(button);
    })
}


loadCategories()