import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

// create an object from prisma
const prisma = new PrismaClient();

// create a function to "create" new event
// asyncronous = fungsi yang berjalan secara pararel
const createTicket = async (request: Request, response: Response) => {
  try {
    // read a request from body
    const eventID = request.body.eventID;
    const userID = request.body.userID;
    // const userID = new Date(request.body.eventDate).toISOString();
    const seatID = request.body.seatID;
    // const price = Number(request.body.price);

    //insert to event table using prisma
    const newData = await prisma.tickets.create({
      data: {
        eventID: eventID,
        userID: userID,
        seatID: seatID,
      },
    });
    return response.status(200).json({
      status: true,
      message: `Ticket has been created`,
      data: newData,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

// create a function to READ event
const readTicket = async (request: Request, response: Response) => {
  try {
    // await untuk memebri delay pada sistem asyncronous sehingga berjalan
    // seperti syncronous dan menunggu sistem sebelumnya
    const dataTicket = await prisma.tickets.findMany();
    return response.status(200).json({
      status: true,
      message: `Ticket has been loaded`,
      data: dataTicket,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

export { createTicket, readTicket };
