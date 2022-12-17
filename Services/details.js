"use strict"

const localStorageKey = "bookGenre";

async function getData2 () {
    let list = localStorage.getItem(localStorageKey);
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${localStorage.getItem(localStorageKey)}.json?api-key=FZi6T0tvXiCmPowsTGjVWaT4r0XgcVnw`)
        const data = await response.json()
        const results = data.results.books
        // if (results && results.length >0){
        //     localStorage.setItem(localStorageKey, JSON.stringify(results))
        //     list = results
        // }
        // console.log(data.updated)
        return results
    }
    catch (error) {
        console.log('Hubo un error')
    }

}

async function startApp() {
    const booksData = await getData2()
    console.log(booksData)

booksData.forEach(result => {
   
    const ourData = {name: result.title, url: result.book_image, onList: result.weeks_on_list, description: result.description}
    
    console.log(ourData)
   
});
 }

startApp()  

