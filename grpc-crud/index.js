const grpc = require('grpc');
const notesProto = grpc.load('notes.proto');
const uuidv1 = require('uuid/v1');
const notes = [];


const server = new grpc.Server()
server.addService (notesProto.NoteService.service,{
    list:(_, callback) => {
        callback(null, notes)
    },
    get: (call, callback) => {
        let note = notes.find((n) => n.id == call.require.id)
        if(note){
            callback(null,note)
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details:"Not Found"
            })
        }
    },
    insert:(call, callback) =>{
        let note = call.request
        note.id = uuidv1()
        notes.push(note)
        callback(null, note)
    },
    update: (call,callback) =>{
        let existingNote = notes.find((n)=> n.id == call.request.id)
        if(existingNote){
            existingNote.title = call.request.title
            existingNote.content = call.request.content
            callback(null,existingNote)
        }else{
            callback({
                code:grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    delete: (call, callback) => {
        let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id)
        if(existingNoteIndex != -1){
            notes.splice(existingNoteIndex,1)
            callback (null, {})
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    }
})

server.bind('localhost:50051',
grpc.ServerCredentials.createInsecure())
console.log('Server running at http://localhost:50051')
server.start();
