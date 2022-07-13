import { NextFunction, Request, Response } from 'express';

export default function validationMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  } catch (error) {
    next(error);
  }
}
