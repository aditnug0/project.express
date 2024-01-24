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
    const dataTickets = await prisma.tickets.findMany();
    return response.status(200).json({
      status: true,
      message: `Ticket has been loaded`,
      data: dataTickets,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};




// baru
// function for update event 
const updateTicket = async (request: Request, response: Response) => {

  try {
    // read event id that sent from url
    const ticketID = request.params.ticketID
    // read data perubahan
    const eventID = request.body.eventID
    const userID = request.body.userID
    const seatID = request.body.seatID


    // make sure that data has existed
    const findTicket = await prisma.tickets.findFirst({
      where: { ticketID: Number(ticketID) }
    })

    if (!findTicket) {
      return response.status(400).json({
        status: false,
        message: `Data ticket not found`
      })
    }

    const dataTicket = await prisma.tickets.update({
      where: { ticketID: Number(ticketID) },
      data: {
        eventID: eventID || findTicket.eventID,
        userID: userID || findTicket.userID,
        seatID: seatID || findTicket.seatID,
      }
    })

    return response.status(200).json({
      status: true,
      message: `Ticket has been updated`,
      data: dataTicket
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}
// create a function to delete event
const deleteTicket = async (request: Request, response: Response) => {
  try {

    // get ticket id from url 
    const ticketID = request.params.ticketID

    // make sure that event is exist 
    const findTicket = await prisma.tickets.findFirst({
      where: { ticketID: Number(ticketID) }
    })

    if (!findTicket) {
      return response.status(400).json({
        status: false,
        message: `Ticket not found`
      })
    }

    // execute for delete event
    const dataTicket = await prisma.tickets.delete({
      where: { ticketID: Number(ticketID) }
    })

    // return response 
    return response.status(200).json({
      status: true,
      message: `Data ticket has been deleted `
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}


export { createTicket, readTicket, updateTicket, deleteTicket };
