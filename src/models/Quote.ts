import mongoose, {Document, Schema} from "mongoose";

export interface IQuote{
    authorName: string;
    quoteText: string;
    date: Date;
}

export interface IQuoteModel extends IQuote, Document {

};

const QuoteSchema: Schema = new Schema({
    authorName: { type: String, required: true },
    quoteText: { type: String, required: true },
    date: { type: Date, default: new Date}
},
{
    versionKey: false
});

export default mongoose.model<IQuoteModel>('Quote', QuoteSchema);