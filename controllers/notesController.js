const Note = require('../models/note.js')

const notesController ={
    getNotasById : () =>{
        console.log("Accediste a la ruta /getNotasById")
    },
    createNota:(data)=>{
        const datos = new Note({
            title:data.title,
            content:data.content,
            user:data.user,
            category:data.category,
            reminder:{
                active:data.reminder.active,
                date:data.reminder.date,
                mode:data.reminder.mode
            }
        })

        datos.save().then(noteData=>console.log(noteData))
    }
}

module.exports = notesController;

