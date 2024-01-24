import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

// create an object from prisma
const prisma = new PrismaClient();

// create a function to "create" new seats
// asyncronous = fungsi yang berjalan secara pararel
const createSeats = async (request: Request, response: Response) => {
  try {
    // read a request from body
    const eventID = Number(request.body.eventID);
    const rowNum = request.body.rowNum;
    const seatNum = request.body.seatNum;
    const status = request.body.status;

    //insert to seats table using prisma
    const newData = await prisma.seats.create({
      data: {
        eventID: eventID,
        rowNum: rowNum,
        seatNum: seatNum,
        status: status,
      },
    });
    return response.status(200).json({
      status: true,
      message: `Seat has been booked`,
      data: newData,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

// create a function to READ seat
const readSeats = async (request: Request, response: Response) => {
  try {
    // await untuk memebri delay pada sistem asyncronous sehingga berjalan
    // seperti syncronous dan menunggu sistem sebelumnya
    const dataSeats = await prisma.seats.findMany();
    return response.status(200).json({
      status: true,
      message: `Seats has been loaded`,
      data: dataSeats,
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
const updateSeat = async (request: Request, response: Response) => {

  try {
    // read event id that sent from url
    const seatID = request.params.seatID
    // read data perubahan
    const eventID = request.body.eventID
    const rowNum = request.body.rowNum
    const seatNum = request.body.seatNum

    // make sure that data has existed
    const findSeat = await prisma.seats.findFirst({
      where: { seatID: Number(seatID) }
    })

    if (!findSeat) {
      return response.status(400).json({
        status: false,
        message: `Data seat not found`
      })
    }

    const dataSeat = await prisma.seats.update({
      where: { seatID: Number(seatID) },
      data: {
        eventID: eventID || findSeat.eventID,
        rowNum: rowNum || findSeat.rowNum,
        seatNum: seatNum || findSeat.seatNum
      }
    })

    return response.status(200).json({
      status: true,
      message: `Seat has been updated`,
      data: dataSeat
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}
// create a function to delete event
const deleteSeat = async (request: Request, response: Response) => {
  try {

    // get event id from url 
    const seatID = request.params.seatID

    // make sure that event is exist 
    const findSeat = await prisma.seats.findFirst({
      where: { seatID: Number(seatID) }
    })

    if (!findSeat) {
      return response.status(400).json({
        status: false,
        message: `Event not found`
      })
    }

    // execute for delete event
    const dataSeat = await prisma.seats.delete({
      where: { seatID: Number(seatID) }
    })

    // return response 
    return response.status(200).json({
      status: true,
      message: `Data seat has been deleted `
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}

export { createSeats, readSeats, updateSeat, deleteSeat };
