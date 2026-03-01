import dotenv from "dotenv";
dotenv.config();

const jwtPassword = process.env.JWT_PASSWORD;
if (!jwtPassword) {
    throw new Error("JWT_PASSWORD not set in .env");
}
export const JWT_PASSWORD = jwtPassword;