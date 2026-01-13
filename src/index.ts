import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from './db.js';

const app = express();
const JWT_PASSWORD = "secret-key";

app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
    //zod validation, hash the password
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "User Signed Up."
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists."
        })
    }

});


app.post('/api/v1/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUSer = await UserModel.findOne({
        username,
        password
    })

    if (existingUSer) {
        const token = jwt.sign({
            id: existingUSer._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
});


app.post('/api/v1/content', (req, res) => { });
app.get('/api/v1/content', (req, res) => { });
app.delete('/api/v1/content', (req, res) => { });
app.get('/api/v1/brain/share', (req, res) => { });
app.get('/api/v1/brain/:shareLink', (req, res) => { });

app.listen(3000);

export default app;