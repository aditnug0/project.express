import express from "express";
import { createTicket, deleteTicket, readTicket, updateTicket } from "../controller/ticketController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/ticket`, readTicket);

// adress for add new event
app.post(`/ticket`, createTicket);

app.put(`/ticket/:ticketID`, updateTicket);

app.delete(`/ticket/:ticketID`, deleteTicket);

export default app;
