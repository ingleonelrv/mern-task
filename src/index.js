//CODIGO DEL SERVIDOR
const express = require('express')
const app = express()
const morgan=require('morgan')
const path=require('path')

//SETTINGS
//cuando desplegamos en sevicios cloud ellos nos dan el puerto
app.set('port',process.env.PORT || 3000)

//MIDDLEWARES (FUNCTIONS THAT EXECUTE BEFORE TO GO ROUTES)
app.use(morgan('dev'))
//aseguro q antes de llegar a las rutas el intercambio de datos sea formateado json
app.use(express.json())

//ROUTES
app.use('/api/task',require('./routes/task.routes'))

//STATIC FILES (HTML,CSS,JS OR BUNDLE)
//por defecto express.static encuentra public en la raiz pero como esta dentro de src debo indicarlo
// console.log(__dirname)
app.use(express.static(path.join(__dirname,'public')))


//STARTING THE SERVER
app.listen(app.get('port'),()=>{
    console.log(`Listening in port ${app.get('port')}`)
})