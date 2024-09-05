import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const { JWT_SECRET } = process.env;

function createToken(payload, exp) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: exp });
  return token;
}

function validateToken(token) {
  
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
    
  } catch (error) {
    console.error(error)
    return false;
  }
}

export { createToken, validateToken };
