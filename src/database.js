const mongoose = require('mongoose')
const URI='mongodb://localhost/mern-tasks'

mongoose.connect(URI,{
    //propiedades
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err))

module.exports=mongoose