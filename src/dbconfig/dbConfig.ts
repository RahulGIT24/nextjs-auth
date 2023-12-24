import mongoose from "mongoose";

async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB Connected")
        })
    } catch (e) {
        console.log("Error while connecting to DB");
        console.log(e);
        return;
    }
}

export default connect;