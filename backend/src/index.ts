import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db.js';
import { JWT_PASSWORD } from './config.js';
import { userMiddleware } from './middleware.js';
import { random } from './utils.js';
import z from 'zod';
import cookieParser from 'cookie-parser';

const app = express();
app.set('trust proxy', 1);

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Update with your frontend URL
    credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());

// zod schemas for input validation
const signupSchema = z.object({
        email: z.email('Please enter a valid email address'),
        password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(25, 'Password must be at most 25 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
    });

app.post('/api/v1/signup', async (req, res) => {
    // Validate input using zod schema
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: validation.error.issues.map(e => e.message).join(', ')
        });
    }

    const { email, password } = validation.data;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt

    try {
        await UserModel.create({
            email: email,
            password: hashedPassword
        })

        res.json({
            message: "User created successfully"
        })
    } catch (e) {
        res.status(409).json({
            message: "User with this email already exists"
        })
    }
});


app.post('/api/v1/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        return res.status(403).json({
            message: "Invalid email or password"
        });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password); // Compare provided password with hashed password in the database

    if (passwordMatch) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);

        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction, // Set secure flag in production
            sameSite: isProduction ? 'strict' : 'lax', // Prevent CSRF on POST/DELETE
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: "Signin successful"
        });
    } else {
        res.status(403).json({
            message: "Invalid email or password"
        });
    }
});


app.post('/api/v1/logout', (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 0
    });
    res.json({ message: "Logged out successfully" });
});


app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const userId = req.userObjectId!;
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        title,
        link,
        type,
        userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
});


app.get('/api/v1/content', userMiddleware, async (req, res) => {
    const userId = req.userObjectId!;
    const content = await ContentModel.find({
        userId
    })

    res.json({
        content
    })
});


app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const userId = req.userObjectId!;
    const contentId = req.body.contentId;

    await ContentModel.deleteOne({
        _id: contentId,
        userId // Ensure that the user can only delete their own content
    })

    res.json({
        message: "Content deleted"
    })
});

// create a shareable link for the user's brain
app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const userId = req.userObjectId!;
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId,
            hash: hash
        })

        res.json({
            hash
        })
    } else {
        await LinkModel.deleteOne({
            userId
        });

        res.json({
            message: "Link deleted"
        })
    }
});

// fetch shared brain content using the shareable link
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(404).json({
            message: "Shared brain not found"
        })
        return;
    }
    // userId 
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(404).json({
            message: "User not found"
        })
        return;
    }

    res.json({
        email: user.email,
        content: content
    })
});

app.get("/health", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;