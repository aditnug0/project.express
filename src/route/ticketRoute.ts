import express from "express";
import { createTicket, readTicket } from "../controller/ticketController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/ticket`, readTicket);

// adress for add new event
app.post(`/ticket`, createTicket);

export default app;
