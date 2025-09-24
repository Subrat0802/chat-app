import express, { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { signupSchema, signinSchema } from "@repo/common/types";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/be-common";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(403).json({
        message: "Zod validation error",
        error: parsedData.error.flatten().fieldErrors,
        success: false,
      });
    }

    const { email, username, password } = parsedData.data;

    const checkExistingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (checkExistingUser) {
      return res.status(404).json({
        message: "Email already present, please try with different email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await prismaClient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    if (!createUser) {
      return res.status(404).json({
        message: "Error while signup.",
        success: false,
      });
    }

    const { password: _, ...safeParse } = createUser;

    return res.status(200).json({
      message: "User signup successfully",
      success: true,
      user: safeParse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while signup.",
      success: false,
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(403).json({
        error: parsedData.error.flatten().fieldErrors,
        message: "Zod validation error",
        success: false,
      });
    }

    const { email, password } = parsedData.data;

    const checkUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        message: "No user signup with this email, please signup first",
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(404).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    const { password: _, ...safeParse } = checkUser;

    res.status(200).json({
      message: "User signin successfully",
      user: safeParse,
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while signup.",
      success: false,
    });
  }
});

app.post("/room", async (req, res) => {
  const { roomName, ownerId } = req.body;
  const respone = await prismaClient.room.create({
    data: {
      roomName,
      ownerId,
    },
  });
  res.json({
    respone,
  });
});

app.post("/chat", async (req, res) => {
  const { text, senderId, roomId } = req.body;
  const respone = await prismaClient.chat.create({
    data: {
      text,
      senderId,
      roomId,
    },
  });
  res.json({
    respone,
  });
});

app.listen(3001);
