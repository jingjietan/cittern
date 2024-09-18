import type { Request, Response } from "express";

export const addRouteHandler = (req: Request, res: Response) => {
  const number1 = parseInt(req.body.number1);
  const number2 = parseInt(req.body.number2);
  if (isNaN(number1) || isNaN(number2)) {
    res.status(400).send({
      'message': 'Invalid input'
    });
    return;
  }

  res.send({
    'result': number1 + number2
  });
}

export const subtractRouteHandler = (req: Request, res: Response) => {
  const number1 = parseInt(req.body.number1);
  const number2 = parseInt(req.body.number2);
  if (isNaN(number1) || isNaN(number2)) {
    res.status(400).send({
      'message': 'Invalid input'
    });
    return;
  }

  res.send({
    'result': number1 - number2
  });
}