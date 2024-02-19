import { PrismaClient } from "@prisma/client";
import { Request, Response, request, response } from "express";
import { eventNames } from "process";

// create an object from prisma
const prisma = new PrismaClient();

// create a function to "create" new event
// asyncronous = fungsi yang berjalan secara pararel
const createEvent = async (request: Request, response: Response) => {
  try {
    // read a request from body
    const eventName = request.body.eventName;
    const eventDate = new Date(request.body.eventDate).toISOString();
    const venue = request.body.venue;
    const price = Number(request.body.price);

    //insert to event table using prisma
    const newData = await prisma.events.create({
      data: {
        eventName: eventName,
        eventDate: eventDate,
        venue: venue,
        price: price,
      },
    });
    return response.status(200).json({
      status: true,
      message: `Event has been created`,
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
const readEvent = async (request: Request, response: Response) => {
  try {
    // pagination
    const page = Number(request.query.page) || 1;
    const qty = Number(request.query.qty) || 5;
    // searching
    const keyword = request.query.keyword?.toString() || "";

    // await untuk memebri delay pada sistem asyncronous sehingga berjalan
    // seperti syncronous dan menunggu sistem sebelumnya
    const dataEvent = await prisma.events.findMany({
      //untuk mendefinisikan jml data yang diambil
      take: qty,
      skip: (page - 1) * qty,
      where: {
        OR: [
          { eventName: { contains: keyword } },
          { venue: { contains: keyword } }
        ]
      },
      orderBy: { eventName: "asc" }
    });
    return response.status(200).json({
      status: true,
      message: `Events has been loaded`,
      data: dataEvent,
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
const updateEvent = async (request: Request, response: Response) => {

  try {
    // read event id that sent from url
    const eventID = request.params.eventID
    // read data perubahan
    const eventName = request.body.eventName
    const price = Number(request.body.price)
    const venue = request.body.venue
    const eventDate = new Date(request.body.eventDate).toISOString()
    // make sure that data has existed
    const findEvent = await prisma.events.findFirst({
      where: { eventID: Number(eventID) }
    })

    if (!findEvent) {
      return response.status(400).json({
        status: false,
        message: `Data event not found`
      })
    }

    const dataEvent = await prisma.events.update({
      where: { eventID: Number(eventID) },
      data: {
        eventName: eventName || findEvent.eventName,
        eventDate: eventDate || findEvent.eventDate,
        venue: venue || findEvent.venue,
        price: price || findEvent.price
      }
    })

    return response.status(200).json({
      status: true,
      message: `Event has been updated`,
      data: dataEvent
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}
// create a function to delete event
const deleteEvent = async (request: Request, response: Response) => {
  try {

    // get event id from url 
    const eventID = request.params.eventID

    // make sure that event is exist 
    const findEvent = await prisma.events.findFirst({
      where: { eventID: Number(eventID) }
    })

    if (!findEvent) {
      return response.status(400).json({
        status: false,
        message: `Event not found`
      })
    }

    // execute for delete event
    const dataEvent = await prisma.events.delete({
      where: { eventID: Number(eventID) }
    })

    // return response 
    return response.status(200).json({
      status: true,
      message: `Data events has been deleted `
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}

export { createEvent, readEvent, updateEvent, deleteEvent };
