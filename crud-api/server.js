const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./src/controllers/cars')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',controller.store)
app.get('/:brand',controller.store)
app.post('/',controller.create)
app.delete('/:id',controller.del)
app.put('/:id',controller.update)

app.listen(3000,(err) =>{
    if (err) console.log(err)
    console.log('server running on port ... 3000')
});