  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
  import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB6gm-jfDFQJRBhOreQkqp4Kb_FLQMAIbM",
    authDomain: "nytwebfirebase.firebaseapp.com",
    projectId: "nytwebfirebase",
    storageBucket: "nytwebfirebase.appspot.com",
    messagingSenderId: "1046334328262",
    appId: "1:1046334328262:web:ef234e2980ec13347336c7"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  // Firebase Credentials
  export const auth = getAuth(app)
// Google login
  export const provider = new GoogleAuthProvider();