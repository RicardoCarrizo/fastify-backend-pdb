//CONFIGURACION FIREBASE
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFsanPPc5viXxDztqJT__VV-gau40c1bQ",
  authDomain: "pueba-frontend-2023.firebaseapp.com",
  projectId: "pueba-frontend-2023",
  storageBucket: "pueba-frontend-2023.appspot.com",
  messagingSenderId: "7117503611",
  appId: "1:7117503611:web:da209ec6ee92fd926cb6de",
  measurementId: "G-140YQJGYDY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//CONFIGURACION FIREBASE-ADMIN
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json"); // <--- archivo descargado en configuracion proyecto/cuentas de servicio/generar nueva clave privada
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "pueba-frontend-2023.appspot.com"
});
//EXPORTAR
module.exports = {
    app,
    admin
}

//24:00