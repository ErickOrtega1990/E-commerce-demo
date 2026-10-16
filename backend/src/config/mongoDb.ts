import mongoose from "mongoose";
import "dotenv/config";

async function dbIniT() {
  const URI: string = process.env.DATABASE_URL ?? "";
  if (!URI) throw new Error("No DB URI deinfined");
  try {
    mongoose.connection.readyState === 2 &&
      console.log("Connecting with data base");
    await mongoose.connect(URI);
    mongoose.connection.readyState === 1 &&
      console.log("Connection with data base succeded");
  } catch {
    console.log("Connection error whith data base");
  }
}

export default dbIniT;
