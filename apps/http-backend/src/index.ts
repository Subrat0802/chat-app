import express, { Request, response, Response, Router } from "express";
import { prismaClient } from "@repo/db/client";
import { signupSchema, signinSchema } from "@repo/common/types";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/be-common";
import { middleware } from "./middleware";

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

app.post("/room", middleware, async (req, res) => {
  const { roomName} = req.body;
  //@ts-ignore
  const ownerId = req.userId.id
  if(!roomName || !ownerId){
    return res.status(404).json({
      message:"Room name is required",
      success:false
    })
  }

  const checkSameName = await prismaClient.room.findFirst({
    where:{
      roomName
    }
  })

  if(checkSameName){
    return res.status(404).json({
      message:"Room name is already present. please try with different room name",
      success:false
    })
  }

  const respone = await prismaClient.room.create({
    data: {
      roomName,
      ownerId,
    },
  });
  res.status(200).json({
    response:respone,
    message:"Room is created",
    success:true
  });
});

app.post("/chat", middleware, async (req, res) => {
  const { text, roomId } = req.body;
  //@ts-ignore
  const senderId = req.userId?.id;

  if (!text || !roomId) {
    return res.status(400).json({
      message: "Text and roomId are required",
      success: false
    });
  }

  // Check if user is member of room
  const isUserMember = await prismaClient.room.findFirst({
    where: {
      id: roomId,
      members: {
        some: { id: senderId }
      }
    },
  });

  if (!isUserMember) {
    return res.status(403).json({
      message: "You're not a member of this room and cannot send messages",
      success: false
    });
  }

  // Create chat message
  const response = await prismaClient.chat.create({
    data: {
      text,
      senderId,
      roomId,
    },
  });

  if (!response) {
    return res.status(500).json({
      message: "Error while adding message to database",
      success: false
    });
  }

  res.status(200).json({
    response: response,
    message: "Message added",
    success: true
  });
});



app.post("/joinroom/:roomId", middleware, async (req, res) => {
  try{
    const {roomId} = req.params;
    //@ts-ignore
    const userId = req.userId.id;
    if(!roomId || !userId){
      return res.status(404).json({
        message:"Invalid credentials, try again",
        success:false
      })
    }

    const checkRoom = await prismaClient.room.findUnique({
      where: { 
        id: roomId 
      },
      include: { members: true }  
    });

    if(!checkRoom){
      return res.status(404).json({
        message:"The room you trying to join is not valid.",
        success:false
      })
    }

    const alreadyMember = checkRoom.members.some(m => m.id === userId);
    if (alreadyMember) {
      return res.status(400).json({
        message: "You are already a member of this room",
        success: false
      });
    }

    const addMember = await prismaClient.room.update({
      where: {
        id: roomId
      },
      data: {
        members:{
          connect:{id: userId}
        }
      },
      include:{
        members:true
      }
    })

    if(!addMember){
      return res.status(404).json({
        message:"Error while joining room",
        success:false
      })
    }

    return res.status(200).json({
      message:"You join the room successfully",
      success:true,
      roomId:roomId
    })


  }catch(error){
    return res.status(500).json({
      message:"Server error while joining room"
    })
  }
})

app.get("/getAllRoomsOfUser", middleware, async (req, res) => {
  try{
    //@ts-ignore
    const {id} = req.userId;
    if(!id) {
      return res.status(404).json({
        message:"User is is not present.",
        success:false
      })
    }

    

    const response = await prismaClient.user.findFirst({
      where:{
        id:id
      },
      include:{
        createdRooms: true,
        joinedRooms:true
      }
    })

    console.log("ALl rooms", response);

    if(!response){
      return res.status(404).json({
        message:"Error while grtting rooms",
        success:false
      })
    }

    return res.status(200).json({
      message:"All rooms",
      response,
      success:false
    })
  }catch(error){
    return res.status(500).json({
      message:"Server error while getting rooms",
      success:false,
      error
    })
  }
})

app.get("/geRoomsDetails/:roomId", middleware, async (req, res) => {
  try{
    const {roomId} = req.params;

    const respone = await prismaClient.room.findFirst({
      where:{
        id:roomId,
      },
      include:{
        members:true,
        chats:true
      }
    })
    if(!respone) {
      return res.status(404).json({
        message:"Error while getting room details",
        success:false
      })
    }
    res.json({
      data:respone,
      message:"Room details"
    })
  }catch(error){
    return res.status(500).json({
      message:"Server error while while getting room details",
      success:false
    })
  }
})


app.get("/me", middleware, async (req, res) => {
  try{
    //@ts-ignore
    const {id} = req.userId;
    if(!id){
      return res.status(404).json({
        message:"Not getting user id",
        success:false
      })
    }

    const response = await prismaClient.user.findFirst({
      where:{
        id:id
      }
    })

    

    if(!response){
      return res.status(404).json({
        message:"user not found, try to login again.",
        success:false,
      })
    }

    const {password: _, ...safeParse} = response

    return res.status(200).json({
      message:"user details",
      success:true,
      data:safeParse
    })

  }catch(error){
    return res.status(500).json({
      message:"Server error while hitting me route",
      success:false
    })
  }
})


app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, path: "/" });
  return res.status(200).json({ message: "Logged out successfully" });
});


app.listen(3001);