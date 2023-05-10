//CLASE 15
const { admin } = require('./firebase');

module.exports = async (req, res) => {
    switch( req.method ) {
        case 'GET':
            return procesarGET(req, res);
        case 'POST':
            return procesarPOST(req, res);
        case 'PUT':
            return procesarPUT(req, res);
        case 'DELETE':
            return procesarDELETE(req, res);
        default:
            res.code(500).send({error: 'Método HTTP no soportado!'});
    }
};

function getColeccion() {
    return admin.firestore().collection('categorias');
}

async function procesarPOST(req, res) {    
    try {
        const {nombre, descripcion} = req.body; //se llaman los datos del body, desestructura el objeto y se crean const con el mismo nombre
        //aqui se crea el objeto que se almacena en la bbdd
        const categoria = {
            nombre,
            descripcion
        }
        const documento = await getColeccion().doc(); // crea documento vacío y autogenera id
        const id        = documento.id;
        documento.set( categoria ); //con set se entregan los datos que se quieren almacenar
        categoria.id = id;  //para tener el id dentro del obj json como en mongodb - firebase deja los id fuera
        return categoria; 
    } catch (error) {
        res.code(500).send({error: error.message});
    }
}

async function procesarGET(req, res) {
    try {
        const querySnapshot = await getColeccion().get();
        const documentos    = querySnapshot.docs.map( d => {
            /*
            return {
                id: d.id,
                ...d.data()
            }
            */
           return d.data(); 
        });
        return documentos;
    } catch (error) {
        res.code(500).send({error: error.message});
    }
}

async function procesarPUT(req, res) {
    try {
        const {nombre, descripcion, id} = req.body;
        const categoria = {
            nombre,
            descripcion
        }
        const documento = await getColeccion().doc( id ); // crea documento vacío         
        documento.update( categoria );        
        return categoria; 
    } catch (error) {
        res.code(500).send({error: error.message});
    }
}
async function procesarDELETE(req, res) {
    try {
        const id = req.query.id; // http://localhost:3000/categoria?id=XXXXXX
        const docRef = await getColeccion().doc( id );
        await docRef.delete();
        return {borrado: true};    
    } catch (error) {
        return {borrado: false, mensaje: error.message};
    }
    
}