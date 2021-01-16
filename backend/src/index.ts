import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import { connectDb } from './db';

import User from './entity/User';

connectDb();

const app = express();
app.use(json());
app.use(cors());

app.post('/user/login', async (req, res) => {
    try {
        const email: string = req.body.email || '';
        const password: string= req.body.password || '';

        const user = await User.findLoggedUser(email, password);

        if (!user) {
            res.status(401);
            res.json('Usuário inválido');
            return;
        }

        res.json(user);
    } catch (e) {
        res.status(400);
        res.json(e.message);
    }
});

app.post('/user/create', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (e) {
        res.status(400);
        res.json(e.message);
    }
});

app.get('/user/me', async (req, res) => {
    try {
        const user = await User.findById(req.query.id);

        if (!user) {
            res.status(400);
            res.json('User not found');
            return;
        }

        res.json(user);
    } catch (e) {
        res.status(400);
        res.json(e.message);
    }
});

app.listen('8080', () => {
    console.log('server is listening on port 8080');
});
