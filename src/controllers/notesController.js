const Note = require('../models/note.js')

const notesController ={
    getAllNotes: async (req, res)=>{
        try{
            const user = req.user?.email;
            const query = Note.where({active:true, user:user})
            const notas = await query.find({})
            res.status(200).send({message:"Notes found", data: notas, status:200})
        }catch(err){
            console.log(err)
        }
    },
    getNotasById : async(req, res) =>{
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
            .send({message:"Note created succesfully", data: noteData, status:200}));
        }
        catch(error){
            res.status(400)
            .send({message:"Note could not be created", error:error, status:400})
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
            res.status(400).send({message:"Note could not be updated", error:error})
        }
    },
    deleteNote: async(id,req, res)=>{
        try {
            const user = req.user?.email;
            const noteToBeDeleted = await Note.findById({_id:id});
            if(noteToBeDeleted.user != user){
                res.status(401).json({ message: "Not allowed to delete this note", error: err.message, status: 400 });
            }
            
            const doc = await Note.updateOne({ _id: id }, { $set: { active: false } });
            if (doc.nModified === 0) {
                res.status(404).json({ message: "Note not found", status: 404 });
            } else {
                res.status(200).json({ message: "Note deleted successfully", data: doc, status: 200 });
            }
        } catch (err) {
            res.status(400).json({ message: "Note could not be deleted", error: err.message, status: 400 });
        }
    }
}

module.exports = notesController;

