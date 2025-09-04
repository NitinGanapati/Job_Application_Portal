import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.DB_URL, {
        dbName: "JOB_PORTAL_WITH_AUTOMATION"
    }).then(()=>{
        console.log("Connected to database.")
    }).catch(err=>{
        console.log(`Some error occured while connecting to database: ${err}`)
    })
}
export default connection;