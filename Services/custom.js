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
   
    const ourData = {name: result.list_name, old: result.oldest_published_date,new: result.newest_published_date, update: result.updated}


    const cardELEM = document.createElement("div")
    cardELEM.setAttribute("id","card");
    const h4ELEM = document.createElement("h4")
    h4ELEM.innerHTML = ourData.name

    const divINFO = document.createElement("div")
    divINFO.setAttribute("id","infoCard")
    for (let i = 0; i < 3; i++) {
        const pELEM = document.createElement("p") 
        pELEM.innerHTML = i === 0 ?
        ourData.old : i === 1 ?
        ourData.new : i === 2 ?
        ourData.update : "";
        divINFO.append(pELEM);
    }

    const linkELEM = document.createElement("a");
    linkELEM.innerHTML = "READ MORE ▶"

    cardELEM.append(h4ELEM)
    cardELEM.append(divINFO)
    cardELEM.append(linkELEM)
    const contentELEM = document.getElementById("content")
    contentELEM.append(cardELEM)
   
        
});
}

startApp()  