let id = 1;
function autoId(){
    return id++;
}
let listCar = [
    {
        id:autoId(),
        brand: 'bmw',
        model: 'i8',
        yearlanc: '2020',
        color: 'black'
    },
    {
        id:autoId(),
        brand: 'ferrari',
        model: 'aventador',
        yearlanc: '2020',
        color: 'red'
    },
    {
        id:autoId(),
        brand: 'volvo',
        model: 'ispace',
        yearlanc: '2020',
        color: 'gray'
    }
]
const store = (brand)=>{
    if(!brand)
    return listCar.map(car => car);
    return listCar.filter(car => car.brand === brand)
}

const create = (car) =>{
    if(!car.brand || !car.model || !car.yearlanc || !car.color){
        return {error:401,message:'Não foi possivel criar esse car'};
    }
    const newCar ={
        id:autoId(),
        ...car
    }
    listCar.push(newCar);
    return car;
}
const del = (id) =>{
    const carErased = listCar.filter(car => car.id == id);
    const newList = listCar.filter(car => car.id != id);
    listCar = newList;
    return carErased;
}
const update = (id,obj) => {
    let index = listCar.findIndex((car) => car.id == id)
    let carUpdated ={
        ...listCar[index],
        ...obj
    }
    listCar.splice(index,1,carUpdated);
    return listCar[index];
    
}
module.exports = {store,create,del,update};    