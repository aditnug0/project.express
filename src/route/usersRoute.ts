import express from "express";
import { createUsers, deleteUser, login, readUsers, updateUser } from "../controller/usersController";
import { verifyUser } from "../middleware/verifyUser";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/user`, verifyUser, readUsers);

// adress for add new event
app.post(`/user`, verifyUser, createUsers);

app.put(`/user/:userID`, verifyUser, updateUser);

app.delete(`/user/:userID`, verifyUser, deleteUser);

app.post(`/user/login`, login,);


export default app;
