import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
import md5 from "md5"
import { sign } from "jsonwebtoken";
import { Sign } from "crypto";


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
    const password = md5(request.body.password);
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




// baru
// function for update event 
const updateUser = async (request: Request, response: Response) => {

  try {
    // read event id that sent from url
    const userID = request.params.userID
    // read data perubahan
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const email = request.body.email
    const password = md5(request.body.password)


    // make sure that data has existed
    const findUser = await prisma.users.findFirst({
      where: { userID: Number(userID) }
    })

    if (!findUser) {
      return response.status(400).json({
        status: false,
        message: `Data user not found`
      })
    }

    const dataUser = await prisma.users.update({
      where: { userID: Number(userID) },
      data: {
        firstname: firstname || findUser.firstname,
        lastname: lastname || findUser.lastname,
        email: email || findUser.email,
        password: password || findUser.password
      }
    })

    return response.status(200).json({
      status: true,
      message: `User has been updated`,
      data: dataUser
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}
// create a function to delete event
const deleteUser = async (request: Request, response: Response) => {
  try {

    // get event id from url 
    const userID = request.params.userID

    // make sure that event is exist 
    const findUser = await prisma.users.findFirst({
      where: { userID: Number(userID) }
    })

    if (!findUser) {
      return response.status(400).json({
        status: false,
        message: `Event not found`
      })
    }

    // execute for delete event
    const dataUser = await prisma.users.delete({
      where: { userID: Number(userID) }
    })

    // return response 
    return response.status(200).json({
      status: true,
      message: `Data user has been deleted `
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}
const login = async (request: Request, response: Response) => {
  try {
    const email = request.body.email
    const password = md5(request.body.password)
    const user = await prisma.users.findFirst(
      {
        where: { email: email, password: password }
      }
    )
    if (user) {
      const payload = user
      const secretkey = 'yummy😋😋'
      const token = sign(payload, secretkey)

      return response.status(200).json({
        status: true,
        message: "login success 😁",
        token: token
      })
    }
    else {
      return response.status(200).json({
        status: false,
        message: "Failed to LogIn 💀"
      })
    }

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
}
export { createUsers, readUsers, updateUser, deleteUser, login };

