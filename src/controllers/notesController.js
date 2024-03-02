const Note = require('../models/note.js')

const notesController ={
    getNotasById : () =>{
        console.log("Accediste a la ruta /getNotasById")
    },
    createNota:async (data, res)=>{
        try{
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
    
            datos.save()
            .then(noteData=>res.status(200)
            .send({message:"Note created succesfully", data: noteData}));
        }
        catch(error){
            res.status(400)
            .send({message:"Note could not be created", error:error})
        }
    },
    updateNota: async(data, res)=>{
        try{
            const datos = await Note.findByIdAndUpdate(data.id, {
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
            datos.save()
            .then(noteData=>res.status(200).send({message:"Note updated succesfully", data: noteData}));
        }
        catch(error){
            res.
            res.status(400).send({message:"Note could not be updated", error:error})
        }
    },
    deleteNota: async(id, res)=>{
        try{
            // const nota = await Note.updateOne()
        }
        catch(err){

        }
    }
}

module.exports = notesController;

