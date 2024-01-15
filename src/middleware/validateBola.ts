import { error } from "console";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/** create validation scheme  */
let schema = Joi.object({
  rb: Joi.number().required().min(1),
});

/**create a validation function  */
let validateBola = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { error } = schema.validate(request.body);
  if (error) {
    /**status 400 = bad request */
    return response.status(400).json({
      message: error.details,
    });
  }
  next();
};

export { validateBola };
