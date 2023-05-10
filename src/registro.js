// ---> fastify.post('/registro', require('./src/registro.js'));

const {admin } = require('./firebase.js');

module.exports=async(req, res) =>{
   /*  //OPCION 1
    const email = req.body.email;
    const contrasena = req.body.contrasena;
 */

        //OPCION2
        const {email, contrasena} = req.body; //javaScript destructuring - destructuración


        try {
            const usuario = await admin.auth().createUser({
                email: email,
                password: contrasena
            } );
            return usuario;
        } catch (error) {
            res.code(500).send({error: 'Ocurrio un Error al crear el usuario'}) //ejemplo de enviar codigo de error clase 13 57:00
        }
};
