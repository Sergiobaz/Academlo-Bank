import express from 'express';
import { singup, login, getHistory } from './user.controller.js';

export const router = express.Router();

router.post('/singup', singup);

router.post('/login', login);

router.get('/:id/history', getHistory);
