import express from 'express';
import controller from '../controllers/Quote';

const router = express.Router();

router.post('/create', controller.createQuote);
router.get('/', controller.readAllQuotes);

export = router;