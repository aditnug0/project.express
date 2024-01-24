import express from "express";
import { createUsers, readUsers } from "../controller/usersController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/user`, readUsers);

// adress for add new event
app.post(`/user`, createUsers);

export default app;
