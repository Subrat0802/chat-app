'use client'
import { setRooms } from "@/redux/slices/rooms";
import { createRoom, getRooms } from "@/services/operations/dashboard";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const rooms = useSelector((e: any) => e.rooms.rooms);

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
    <div className="w-screen h-screen flex flex-col items-center gap-3 text-white bg-[#0f0f0f] pt-10">
      <p>Hello User</p>
      <div >
      <input className="border " value={inputText} onChange={(e) => handleChange(e)} placeholder="Room name.."/>
      <button className="bg-white p-2 border text-black" onClick={handleClick}>Create room</button>
      </div>
      <div>
        {
          rooms.map((el:any) => (
            <p key={el.id}>{el.roomName}</p>
          ))
        }
      </div>
    </div>
  )
}

export default Page