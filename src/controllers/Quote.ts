import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Quote from "../models/Quote";

const createQuote = (req:Request, res: Response, next: NextFunction) => {
    const {body} = req.body;

    const quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        body
    });

    return quote
        .save()
        .then((quote) => res.status(201).json({quote}))
        .catch((err) => res.status(500).json({err}));
}

const readQuote = (req: Request, res: Response, next: NextFunction) => {};

const readRandomQuote = (req:Request, res: Response, next: NextFunction) => {

}

const readAllQuotes = (req:Request, res: Response, next: NextFunction) => {
    return Quote.find()
        .then((quotes) => res.status(200).json({ quotes }))
        .catch((err) => res.status(500).json({ err }));

}

const readQuoteByAuthor = (req:Request, res: Response, next: NextFunction) => {

}

const updateQuote = (req:Request, res: Response, next: NextFunction) => {};

const deleteQuote = (req:Request, res: Response, next: NextFunction) => {

}

export default { createQuote, readAllQuotes };