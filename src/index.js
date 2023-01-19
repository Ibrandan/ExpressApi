import app from "./app.js";
import { PORT } from "./config.js";
app.listen(PORT);
console.log("Express server listening on port " + PORT);
