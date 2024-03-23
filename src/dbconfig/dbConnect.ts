import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connecting", () => {
      console.log("connecting to database");
    });

    connection.on("connected", function () {
      console.log("connection successful");
    });

    connection.on("error", function (error) {
      console.log("error : something went wrong ", error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
