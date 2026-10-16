import appInit, { app } from "./app.js";
import dbIniT from "./config/mongoDb.js";

const PORT = process.env.API_PORT;

dbIniT();
appInit();
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
