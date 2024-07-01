import noteModel from "../model/note";

export const saveNote = async(id:string, name:string) => {
    try {
        const note = new noteModel({
            user: id,
            name
        });
        await note.save();
        return note;
    } catch (error) {
        console.log(error);
    }
}

export const saveContents = async(id:string, name:string, contents:any) => {
    try {
        const note = await noteModel.findOne({user:id, name})
        if (!note) throw new Error("Note not found");

        note.contents.push(contents);
        await note.save();  
        return note;
    } catch (error) {
        console.log(error);
    }
}

export const getNotes = async(id:string) => {
    try {
        const notes = await noteModel.find({user:id});
        return notes;
    } catch (error) {
        console.log(error);
    }
}

export const findNotes = async(id:string, name:string) => {
    try {
        const note = await noteModel.findOne({user:id, name});
        return note;
    } catch (error) {
        console.log(error);
    }
}