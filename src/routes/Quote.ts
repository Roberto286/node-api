import express from 'express';
import controller from '../controllers/Quote';

const router = express.Router();

router.post('/create', controller.createQuote);
router.get('/', controller.readAllQuotes);
router.get('/random', controller.readRandomQuote);
router.get('/by-author/:authorName', controller.readQuoteByAuthor);
router.patch('/update/:quoteId', controller.updateQuote);
router.delete('/delete/:quoteId', controller.deleteQuote);
export = router;