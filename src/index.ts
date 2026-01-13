import express from 'express';
import { UserModel } from './db.js';

const app = express();

app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
    //zod validation
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username: username,
        password: password
    })

    res.json({
        message: "User Signed Up"
    })
});
app.post('/api/v1/signin', (req, res) => {});
app.post('/api/v1/content', (req, res) => {});
app.get('/api/v1/content', (req, res) => {});
app.delete('/api/v1/content', (req, res) => {});
app.get('/api/v1/brain/share', (req, res) => {});
app.get('/api/v1/brain/:shareLink', (req, res) => {});

export default app;