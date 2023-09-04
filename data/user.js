import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(process.env.mongoURL , {
    dbName: "userList",
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((e) => {
    console.log(e);
  });
