"use strict"
import '../Services/firebase.js'
import { auth } from '../Services/firebase.js'
import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

const localStorageKey = "bookGenre";

async function getData2 () {
    /**
     * Corrección
     * Según este flujo, siempre llamas a la api, nunca consumes los datos del localStorage
     */
    let list = localStorage.getItem(localStorageKey);
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${localStorage.getItem(localStorageKey)}.json?api-key=FZi6T0tvXiCmPowsTGjVWaT4r0XgcVnw`)
        const data = await response.json()
        const results = data.results.books
        return results
    }
    catch (error) {
        console.log('Hubo un error')
    }

}

async function startApp() {
    const booksData = await getData2()

booksData.forEach(result => {
   
    const ourData = {name: result.title, url: result.book_image, onList: result.weeks_on_list, description: result.description, urlBuy: result.amazon_product_url}

    const bookName = document.createElement('div')
    bookName.setAttribute('class','detailName')
    bookName.innerHTML= ourData.name

    const bookUrl = document.createElement('img')
    bookUrl.setAttribute('class','detailUrl')
    bookUrl.setAttribute('src', ourData.url)

    const bookLista = document.createElement('p')
    bookLista.setAttribute('class','detailLista')
    bookLista.innerHTML= 'Weeks on list: ' + ourData.onList

    const bookDescription = document.createElement('p')
    bookDescription.setAttribute('class','detailDescription')
    
    const bookButton = document.createElement("a");
    bookButton.setAttribute('class', 'amazonLink')
    bookButton.innerHTML = 'Buy at Amazon'
    bookButton.setAttribute('target', '_blank')
    bookButton.setAttribute('href',`${ourData.urlBuy}`)
 

   

    if(ourData.description === ""){
        bookDescription.innerHTML= "Descripción no disponible..."
    }else{
        bookDescription.innerHTML= ourData.description
    }
    

    const sonDetail = document.createElement('div')
    sonDetail.setAttribute('class', 'detail')
    sonDetail.append(bookName)
    sonDetail.append(bookUrl)
    sonDetail.append(bookLista)
    sonDetail.append(bookDescription)
    sonDetail.append(bookButton)
    const detail = document.getElementById('textDetail')
    detail.append(sonDetail)

   
});

        const titleELEM = document.getElementById("title")
        const bookType = document.createElement("h2")
        bookType.setAttribute("class","greyBook")
        bookType.innerHTML = localStorage.getItem(localStorageKey)

        titleELEM.append(bookType)
 }

startApp()  

//Logout
const logoutButon = document.querySelector('#logout')

logoutButon.addEventListener('click', async () => {
  await signOut(auth)
  window.location.href = 'http://localhost:5500/index.html'


})