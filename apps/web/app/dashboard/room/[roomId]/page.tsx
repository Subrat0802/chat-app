"use client";
import {
  setRoomDetails,
  RoomState,
  ChatProp,
  RoomDetail,
  addMsg,
} from "@/redux/slices/rooms";
import { setUserDetails, UserState } from "@/redux/slices/userDetails";
import { meRoute } from "@/services/operations/auth";
import { getRoomDetails } from "@/services/operations/dashboard";
import { MoveRight, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RoomPage() {
  const { roomId } = useParams();
  const fetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputText = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  console.log(inputText.current?.value);

  const roomDetail = useSelector(
    (state: { rooms: RoomState }) => state.rooms.roomDetail
  );

  const userDetail = useSelector((state: UserState) => state.userDetails);

  useEffect(() => {
    if (!fetched.current) {
      setLoading(true);
      fetched.current = true;
      (async () => {
        const response: RoomDetail = await getRoomDetails(roomId as string);
        setLoading(false);
        dispatch(setRoomDetails(response));
      })();
    }
  }, [roomId]);

  if (loading || !roomDetail) {
    return <p>Loading...</p>;
  }

  const handleEnter = () => {
    const value = inputText.current?.value.trim();
    if (!value) return;
    const ws = new WebSocket(`ws://localhost:8080?roomId=${roomDetail.id}&user=${userDetail.id}`);
    ws.onopen = () => ws.send(value);
    ws.onmessage = (event) => {
      console.log("Raw message from server (string):", event.data); // always string

      try {
        const msg = JSON.parse(event.data);
        if(inputText.current) inputText.current.value = ""
        dispatch(addMsg(msg.data));
        
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err, event.data);
      }
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket closed");
  };

  return (
    <div>
      <div className="w-full h-[7vh] flex justify-between items-center px-2 bg-[#242626]">
        <div className="flex justify-center items-center gap-2">
          <Users />
          <h1 className="text-xl font-bold">{roomDetail.roomName}</h1>
        </div>
      </div>

      <div className="h-[86vh] overflow-y-scroll custom-scroll">
        {roomDetail.chats.map((el: ChatProp) => (
          <p key={el.id}>{el.text}</p>
        ))}
      </div>
      <div className="h-[7vh] flex w-full px-2 gap-2 pb-2 text-white ">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEnter();
          }}
          ref={inputText}
          placeholder="message"
          className="w-[93%] rounded-2xl p-2 bg-[#242626]"
        />
        <button
          onClick={handleEnter}
          className="w-[8%] text-center hover:bg-blue-700 transition-all duration-200 bg-blue-800 rounded-full flex justify-center items-center"
        >
          <MoveRight />
        </button>
      </div>
    </div>
  );
}
