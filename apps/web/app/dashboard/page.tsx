"use client";
import { setRooms } from "@/redux/slices/rooms";
import { createRoom, getRooms } from "@/services/operations/dashboard";
import { MessageCircle, PlusCircleIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [createGrp, setCreateGrp] = useState(false);

  const rooms = useSelector((e: any) => e.rooms.rooms);

  const getUserRoom = async () => {
    const response = await getRooms();
    console.log("user rooms", response);
    dispatch(setRooms(response));
  };
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
      setCreateGrp(false)
    } catch (error) {
      console.error("Failed to create room", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleCreateGrp = () => {
    setCreateGrp(!createGrp);
  };
  return (
    <div className="min-h-[100vh] bg-[#161818] flex text-white relative">
      <div
        className={`${createGrp ? "block" : "hidden"} absolute z-20 flex justify-center items-center  w-screen h-screen bg-[#a281810f] `}
        onClick={handleCreateGrp}
      >
        <div className="flex flex-col p-10 bg-black" onClick={(e) => e.stopPropagation()}>
          <input
            className="border "
            value={inputText}
            onChange={(e) => handleChange(e)}
            placeholder="Room name.."
          />
          <button
            className="bg-white p-2 border text-black"
            onClick={handleClick}
          >
            Create room
          </button>
        </div>
      </div>
      {/* sidebar */}
      <div className="flex flex-col border-r border-gray-600 w-full md:w-[30%] pt-5 fixed h-screen overflow-y-auto">
        <div className="flex justify-between items-center px-3">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-blue-500" />
            <span className="text-2xl font-bold ">ChatFlow</span>
          </div>
          <div onClick={handleCreateGrp}>
            <PlusCircleIcon />
          </div>
        </div>

        <div className="px-3 my-3">
          <input
            placeholder="Search group "
            className="bg-[#343636] w-full p-2 rounded-full"
          />
        </div>

        <div className="flex-1 overflow-y-auto ">
          <div className="flex flex-col gap-2 ">
            {rooms.map((el: any) => (
              <div
                key={el.id}
                className="flex gap-3 p-1 pl-3 justify-between items-center  transition-all duration-200
               hover:bg-gray-700"
              >
                <div className="flex gap-3">
                  <div className="bg-white/20 w-fit p-3 rounded-full">
                    <Users />
                  </div>
                  <div className="flex flex-col justify-between  py-1">
                    <p>{el.roomName}</p>
                    <p className="text-gray-700 text-[10px]">2 minutes ago</p>
                  </div>
                </div>

                <div className="mr-3  flex justify-center items-center ">
                  <div className="text-center text-[9px] font-bold w-full px-2 py-1 rounded-full bg-blue-900">
                    2
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[100vh]"></div>
    </div>
  );
};

export default Page;
