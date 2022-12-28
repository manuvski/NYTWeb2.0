import './firebase.js'  

import {auth} from './firebase.js'  
import { onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"



//Metodo para el registro
const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value
    
try {
    const userData = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userData)
    const signupModal = document.querySelector('#signupModal')
    const modal = bootstrap.Modal.getInstance(signupModal)
    modal.hide()
    window.location.href = '../Views/dashboard.html'

} catch (error) {
       if (error.code === 'auth/weak-password') {
        alert('Contraseña demasiado débil')
    } else if (error.code === 'auth/invalid-email') {
        alert('Email no válido')
    } else if (error.code === 'auth/email-already-in-use') {
        alert ('El correo ya está en uso')
    } else if (error.code) {
        alert ('Algo no fue bien')
    }
}
})

//Metodo para cerrar sesion
const logoutButon = document.querySelector('#logout')

logoutButon.addEventListener('click', async () => {
   await signOut(auth)

})
const loginButon =  document.querySelectorAll('#login')
const logoutButon2 = document.querySelectorAll('#logout')
const emailInfo = document.querySelectorAll('.emailinfo')


//Metodo para comprobar si hay sesion
onAuthStateChanged(auth, async (user) => {
    if (user){
        loginButon.forEach(link => link.style.display = 'none')
        logoutButon2.forEach(link => link.style.display = 'flex')
        const email = signupForm['signup-email'].value
        console.log(email)
        const emailInfo = document.createElement('a')
        emailInfo.setAttribute('class', 'emailinfo')
        emailInfo.innerHTML = email
        const logoutNav = document.getElementById('logOutNav')
        logoutNav.append(emailInfo)
        // window.location.href = '../Views/dashboard.html'
        
   

    } else {
        loginButon.forEach(link => link.style.display = 'flex')
        logoutButon2.forEach(link => link.style.display = 'none')
        emailInfo.forEach(link => link.style.display = 'none')
    }
})


//Metodo para iniciar sesion
const signinForm = document.querySelector('#login-form')

signinForm.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const email = signinForm['login-email'].value
    const password = signinForm['login-password'].value
    
try {
    const userData = await signInWithEmailAndPassword(auth, email, password)
    console.log(userData)
    const signinModal = document.querySelector('#signinModal')
    const modal = bootstrap.Modal.getInstance(signinModal)
    modal.hide()
   

} catch (error) {
    console.log(error)
       if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta')
    } else if (error.code === 'auth/user-not-found') {
        alert('Email no válido')
    } else if (error.code) {
        alert ('Algo no fue bien')
    }
}
})

//Metodo para el inicio de sesion con Google
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const googlebutton = document.querySelector('#googleButton')

googlebutton.addEventListener('click', async (e) =>{
e.preventDefault()
try {
 const credentials = await signInWithPopup(auth, provider)
    console.log(credentials)
    const modal = bootstrap.Modal.getInstance(document.querySelector('#googleButton'))
    modal.hide()

} catch (error) {
    console.log(error)
}



})






