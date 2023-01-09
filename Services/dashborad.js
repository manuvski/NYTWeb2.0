"use strict"
import '../Services/firebase.js'
import { auth } from '../Services/firebase.js'
import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"


const localStorageKey = "bookList";
const spinnerElement = document.getElementById('spinner')
const contentElement = document.getElementById('content')

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
        /**
         * Corrección
         * Esta varibale no existe
         */
        bool = true
        
    }
    catch (error) {
        console.log('Hubo un error')

    }
}
spinnerElement.setAttribute('class', 'hidden')
contentElement.removeAttribute('class', 'hidden')

return list
}

async function startApp() {
    const booksData = await getData()

booksData.forEach(result => {
   
    const ourData = {name: result.list_name, old: result.oldest_published_date,new: result.newest_published_date, update: result.updated}

    /**
     * Corrección
     * Console.log sobra
     */
    console.log(ourData.url)
    const cardELEM = document.createElement("div")
    cardELEM.setAttribute("id","card");
    const h4ELEM = document.createElement("h4")
    h4ELEM.innerHTML = ourData.name

    const divINFO = document.createElement("div")
    divINFO.setAttribute("id","infoCard")
    for (let i = 0; i < 3; i++) {
        const pELEM = document.createElement("p") 
        if (i === 0) {
            pELEM.innerHTML = ourData.old
        } else if (i === 1) {
            pELEM.innerHTML = ourData.new
        } else if (i === 2) {
            pELEM.innerHTML = ourData.update;
        }
        divINFO.append(pELEM);
    }

   

    const linkELEM = document.createElement("a");
    linkELEM.innerHTML = "READ MORE ▶"
    linkELEM.setAttribute('href', './details.html')
    cardELEM.append(h4ELEM)
    cardELEM.append(divINFO)
    cardELEM.append(linkELEM)
    const contentELEM = document.getElementById("content")
    contentELEM.append(cardELEM)
   
    
    linkELEM.onclick = () => {
        localStorage.setItem("bookGenre", h4ELEM.textContent)
       
    }

});
}

startApp()  


//Logout
 const logoutButon = document.querySelector('#logout')

logoutButon.addEventListener('click', async () => {
  await signOut(auth)
    /**
     * Corrección
     * Al añadir ese puerto sin una variable de entorno rompe la navegación
     */
  window.location.href = 'http://localhost:5500/index.html'


})