import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Db Connected")
        })

        connection.on('error', (err)=>{
            console.log("Error! :", err)
        })

    }catch(error){
        console.log(error)
    }
}