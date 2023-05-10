//clase 13 - 01:50:00
const { app } = require('./firebase.js');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

module.exports = async (req, res) => {
    const {email, contrasena} = req.body;
    try {
        const usuario = await signInWithEmailAndPassword(getAuth(), email, contrasena);
        //caso exito
        return {usuario};
    } catch (error) {
        switch( error.code ) {
            // codigos de error firebase auth - docs
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return res.code(401).send({
                    codigo: error.code,
                    mensaje: error.message
                });
            default:
                res.code(500).send({
                    codigo: error.code,
                    mensaje: error.message
                });
        }
        
    }
}; 

