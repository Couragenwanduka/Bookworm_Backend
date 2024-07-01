import  express from 'express';
import { signIn } from '../controller/userController';
import { getCategory } from '../controller/controller';
import { saveCategory } from '../controller/controller';
import { saveBook } from '../controller/bookController';
import { getBooks } from '../controller/bookController';
import { findByUser } from '../controller/noteController';
import { addContents } from '../controller/noteController';
import { createNote } from '../controller/noteController';
import { createUser } from '../controller/userController';
import { getText } from '../controller/bookController';
import { getSavedBook } from '../controller/bookController';
import { findBooksByGenre } from '../controller/bookController';
import { updateSavedBookCategory } from '../controller/bookController';

const router = express.Router();

// user routers
router.post('/sign-in', signIn);
router.post('/sign-up', createUser);

// book routers
router.get('/books', getBooks);
router.post('/save-book', saveBook);
router.get('/saved-books/:id', getSavedBook);
router.get('/books/:genre', findBooksByGenre);
router.patch('/update-bookCategory', updateSavedBookCategory);
router.post('/get-text', getText);  

// category routers
router.get('/categories', getCategory);
router.post('/categories', saveCategory);

// note routers
router.post('create-note', createNote);
router.post('add-contents', addContents);
router.get('get-notes:id',findByUser);

export default router;