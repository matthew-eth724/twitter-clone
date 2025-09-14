import { express, cors, session, passport, cookieParser } from "./utils/imports";
import { errorHandler, requestLogger } from "./middleware/index";
import { PORT, sessionOptions } from "./utils/index";

import DBConnect from "./DB/index";
import apiRouter from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(session(sessionOptions));
app.use(requestLogger);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

try {
    DBConnect();
} catch (error) {
    console.error("DB CONNECTION ERROR", error);
}

app.get("/", (req, res) => res.send("Hello world"));

app.use(errorHandler);
