import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Quote from "../models/Quote";

const createQuote = (req:Request, res: Response, next: NextFunction) => {
    const {body} = req.body;

    const quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        authorId : `${req.body.authorId}`,
        authorName : `${req.body.authorName}`,
        quoteText : `${req.body.quoteText}`,
        date : `${req.body.date ? req.body.date : new Date()}`
    });

    return quote
        .save()
        .then((quote) => res.status(201).json({quote}))
        .catch((err) => res.status(500).json({err}));
}

const readQuote = (req: Request, res: Response, next: NextFunction) => {

};

const readRandomQuote = (req:Request, res: Response, next: NextFunction) => {
    return Quote.aggregate([{$sample:{size:1}}])
        .then((quote) => res.status(200).json({ quote }))
        .catch((err) => res.status(500).json({ err }));}

const readAllQuotes = (req:Request, res: Response, next: NextFunction) => {
    return Quote.find()
        .then((quotes) => res.status(200).json({ quotes }))
        .catch((err) => res.status(500).json({ err }));

}

const readQuoteByAuthor = (req:Request, res: Response, next: NextFunction) => {
    const authorName = req.params.authorName;
    return Quote.aggregate([
        { $match: { authorName : new RegExp('^'+authorName+'$', "i") } },
        { $sample:{size:1}}
    ])
        .then((quote) => res.status(200).json({ quote }))
        .catch((err) => res.status(500).json({ err }))
}

const updateQuote = (req:Request, res: Response, next: NextFunction) => {
    const quoteId = req.params.quoteId;

    return Quote.findById(quoteId)
        .then((quote) => {
            if (quote) {
                quote.set(req.body);

                return quote
                    .save()
                    .then((quote) => res.status(201).json({ quote }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteQuote = (req:Request, res: Response, next: NextFunction) => {
    const quoteId = req.params.quoteId;

    return Quote.findByIdAndDelete(quoteId)
        .then((quote) => (quote ? res.status(201).json({ author: quote, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));}

export default { createQuote, readAllQuotes, readRandomQuote, readQuoteByAuthor, updateQuote, deleteQuote };