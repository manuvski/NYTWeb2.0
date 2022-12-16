"use strict"
const localStorageKey = "bookList";

async function getData () {
    const localStorageBooks = localStorage.getItem(localStorageKey);
    let list = localStorageBooks ? JSON.parse(localStorageBooks) : [];
     
    if (!list || list.length === 0) {
    try {
        const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=FZi6T0tvXiCmPowsTGjVWaT4r0XgcVnw')
        const data = await response.json()
        const results = data.results
        if (results && results.length >0){
            localStorage.setItem(localStorageKey, JSON.stringify(results))
            list = results
        }
    }
    catch (error) {
        console.log('Hubo un error')
    }
}

    return list
}

async function startApp() {
    const booksData = await getData()

booksData.forEach(result => {
    let aux = 0;    
    const ourData = {name: result.list_name, old: result.oldest_published_date,new: result.newest_published_date, update: result.updated}
    
    const cardELEM = document.querySelectorAll("#card");
    const h4ELEM = cardELEM[aux].querySelector("h4");
        h4ELEM.innerHTML = ourData.name;

        aux++
});
}

startApp()  