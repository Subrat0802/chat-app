"use client";
import { getRoomDetails } from "@/services/operations/dashboard";
import { Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RoomPage() {
  const { roomId } = useParams();
  const fetched = useRef(false);
  const [roomDetails, setRoomDetails] = useState([])
  console.log("DATA", roomDetails);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!fetched.current) {
      setLoading(true)
      fetched.current = true;
      (async () => {
        const resposne = await getRoomDetails(roomId as string);
        setRoomDetails(resposne)
        setLoading(false)
      })();
    }
  }, [roomId]);

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="">
      <div className="w-full h-[7vh] flex justify-between items-center px-2 bg-[#242626]">
        <div className="flex justify-center items-center gap-2">
          <Users />
          <h1 className="text-xl font-bold">{roomDetails?.roomName}</h1>
        </div>
      </div>
      <div className="h-[86vh]">
        Messages
      </div>
      <div className="h-[7vh] w-full px-2 text-white ">
        <input placeholder="message" className="w-full border-none rounded-2xl p-2 bg-[#242626]"/>
      </div>
    </div>
  );
}
