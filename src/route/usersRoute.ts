import express from "express";
import { createUsers, deleteUser, readUsers, updateUser } from "../controller/usersController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/user`, readUsers);

// adress for add new event
app.post(`/user`, createUsers);

app.put(`/user/:userID`, updateUser);

app.delete(`/user/:userID`, deleteUser);


export default app;
