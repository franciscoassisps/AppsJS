const client = require('./client');
let newNote = {
    title: 'New note',
    content:'New note content'
}

client.insert(newNote, (error, note) => {
    if(!error){
        console.log('New note created successfully', note)
    }else{
        console.error(error);
    }
})