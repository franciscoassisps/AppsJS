const services = require('../services/cars');

const store = (req,res)=>{
    const {brand} = req.params;
    const result = services.store(brand);
    res.send(result);
}
const create = (req,res) =>{
    const car = req.body
    const result = services.create(car);
    if(result.error){
        res.status(result.error).send(result.message);
        return false;
    }
    res.send(result)
}
const del = (req,res)=>{
    const {id} = req.params;
    const result = services.del(id);
    res.send(result)
}
const update = (req,res)=>{
    const{id} = req.params;
    const {body} = req;
    const result = services.update(id,body);
}
module.exports = {store,create,del,update};