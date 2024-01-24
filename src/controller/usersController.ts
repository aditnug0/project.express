import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

// create an object from prisma
const prisma = new PrismaClient();

// create a function to "create" new seats
// asyncronous = fungsi yang berjalan secara pararel
const createUsers = async (request: Request, response: Response) => {
  try {
    // read a request from body
    // const eventID = request.body.eventID;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const email = request.body.email;
    const password = request.body.password;
    const role = request.body.role;

    //insert to seats table using prisma
    const newData = await prisma.users.create({
      data: {
        // eventID: eventID,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: role,
      },
    });
    return response.status(200).json({
      status: true,
      message: `Users been logged`,
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
const readUsers = async (request: Request, response: Response) => {
  try {
    // await untuk memebri delay pada sistem asyncronous sehingga berjalan
    // seperti syncronous dan menunggu sistem sebelumnya
    const dataUsers = await prisma.users.findMany();
    return response.status(200).json({
      status: true,
      message: `Users been logged in`,
      data: dataUsers,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

export { createUsers, readUsers };
