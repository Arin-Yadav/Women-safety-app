import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, setCurrentRoomId, setRoom } from "../redux/slices/roomSlice";
import { IoChatbubbleOutline, IoHome } from "react-icons/io5";
import { RouteHomepageLayout } from "../helpers/RouteName";
import CreateRoomModal from "../components/CreateRoomModal";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";

const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rooms = useSelector((state) => state.room.rooms) || [];

  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user;
  const userId = user?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/rooms/getRooms`,
          {
            params: { userId },
            withCredentials: true,
          },
        );

        dispatch(setRoom(response.data.rooms || []));
      } catch (error) {
        console.error("Fetch Rooms Error:", error);
      }
    };

    fetchRooms();
  }, [dispatch, userId]);

  const handleCreateRoom = async (roomData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rooms/create`,
        roomData,
        { withCredentials: true },
      );

      const newRoom = response.data.room;

      dispatch(setCurrentRoomId(newRoom._id));
      dispatch(addRoom(newRoom));

      setSelectedRoom(newRoom);
      setShowModal(false);
    } catch (error) {
      console.error("Create Room Error:", error);
    }
  };

  return (
    <div className="h-dvh overflow-hidden bg-[#f7f7fc] text-slate-800">
      <nav className="fixed block md:hidden inset-x-0 top-0 z-50 h-16 border-b border-violet-100/80 bg-white/95 shadow-[0_4px_24px_rgba(47,32,89,0.04)] backdrop-blur-xl">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label={
                sidebarOpen ? "Close conversations" : "Open conversations"
              }
              aria-expanded={sidebarOpen}
              className="grid h-10 w-10 place-items-center rounded-xl text-xl text-violet-700 cursor-pointer transition hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-violet-500 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
            </button>

            {/* <Link to={RouteHomepageLayout} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-700 text-lg text-white shadow-md shadow-violet-200">
                <IoChatbubbleOutline />
              </span>
              <span>
                <span className="block text-lg font-extrabold leading-tight tracking-tight text-slate-900 sm:text-xl">
                  Suraksha
                </span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                  Stay connected, stay safe
                </span>
              </span>
            </Link> */}
          </div>

          <Link
            to={RouteHomepageLayout}
            className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/70 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:border-violet-200 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-violet-500 sm:px-5">
            <IoHome className="text-base" />
            <span>Home</span>
          </Link>
        </div>
      </nav>

      <div className="flex h-dvh pt-16 md:pt-0">
        {sidebarOpen && (
          <button
            aria-label="Close conversations"
            className="fixed inset-0 z-30 bg-slate-900/25 backdrop-blur-[2px] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <ChatSidebar
          rooms={rooms}
          selectedRoomId={selectedRoom?._id}
          onSelectRoom={(room) => {
            setSelectedRoom(room);
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenModal={() => setShowModal(true)}
        />

        <main className="min-w-0 flex-1 overflow-hidden bg-linear-to-br from-[#faf9ff] via-[#f8f8fc] to-[#f4f3fb]">
          {!selectedRoom ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="relative mb-7">
                <div className="absolute -inset-3 rounded-4xl bg-violet-200/50 blur-xl" />
                <div className="relative grid h-24 w-24 place-items-center rounded-4xl border border-white bg-white text-violet-600 shadow-[0_16px_50px_rgba(91,61,161,0.14)]">
                  <IoChatbubbleOutline className="text-4xl" />
                </div>
              </div>
              <span className="mb-3 rounded-full border border-violet-100 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600">
                Your safe space
              </span>
              <h1 className="max-w-lg text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Every check-in starts with a conversation.
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                Choose a group to catch up with your people, or create a new
                space for the ones who matter.
              </p>
              {/* <button
                onClick={() => setShowModal(true)}
                className="mt-7 inline-flex items-center gap-2 cursor-pointer rounded-full bg-linear-to-r from-fuchsia-600 to-violet-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                <IoChatbubbleOutline />
                Create a group
              </button> */}
            </div>
          ) : (
            <ChatArea key={selectedRoom._id} room={selectedRoom} />
          )}
        </main>
      </div>

      {showModal && (
        <CreateRoomModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateRoom}
        />
      )}
    </div>
  );
};

export default ChatLayout;
