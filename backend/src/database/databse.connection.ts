import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");

        console.log("url123 : ", process.env.DATABASE_URL)
        await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/profileManagement" as string, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("Connected DB:", mongoose.connection.db?.databaseName);
    } catch (error) {
        console.error("Failed to connect with database", error);
        throw error;
    }
};

export default connectDatabase;
