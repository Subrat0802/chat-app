'use client'
import { setRooms } from "@/redux/slices/rooms";
import { createRoom, getRooms } from "@/services/operations/dashboard";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const getUserRoom = async () => {
    const response = await getRooms();
    console.log("user rooms",response)
    dispatch(setRooms(response));
  }
  useEffect(() => {
  (async () => {
    await getUserRoom();
  })();
}, []);


  const handleClick = async () => {
  try {
    console.log("Creating room:", inputText);
    const response = await createRoom(inputText);
    console.log("Room created:", response);
    getUserRoom();
    setInputText("");
  } catch (error) {
    console.error("Failed to create room", error);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)

  }
  return (
    <div className="w-screen h-screen text-white bg-[#0f0f0f]">
      <p>Hello User</p>
      <input value={inputText} onChange={(e) => handleChange(e)} placeholder="Room name.."/>
      <button className="bg-white p-2 border text-black" onClick={handleClick}>Create room</button>
    </div>
  )
}

export default Page