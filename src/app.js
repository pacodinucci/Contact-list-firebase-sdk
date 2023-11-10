import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';
import exphbs from "express-handlebars";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', join(__dirname, 'views'));
app.engine('.hbs', exphbs.create({
    defaultLayout: "main",
    extname: ".hbs"
}).engine);
app.set('view engine', '.hbs')

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(router);


app.use('/public', express.static(join(__dirname, 'public')));

export default app;

