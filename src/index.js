//CODIGO DEL SERVIDOR
const express = require('express')
const app = express()

//SETTINGS
app.set('port',3000)


app.listen(app.get('port'),()=>{
    console.log(`Listening in port ${app.get('port')}`)
})