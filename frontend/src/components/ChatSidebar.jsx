import {
  IoAdd,
  IoChatbubbleOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { RouteHomepageLayout } from "../helpers/RouteName";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { FaLink } from "react-icons/fa";

const ChatSidebar = ({
  rooms,
  selectedRoomId,
  isOpen,
  onSelectRoom,
  onClose,
  onOpenModal,
}) => {
  return (
    <aside
      className={`fixed bottom-0 left-0 top-16 z-40 flex w-[min(21rem,86vw)] flex-col border-r border-violet-100 bg-white px-4 py-5 shadow-[12px_0_36px_rgba(47,32,89,0.08)] transition-transform duration-300 sm:static sm:z-auto sm:w-[18rem] sm:shrink-0 sm:translate-x-0 sm:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* <div className="mb-5 flex items-center justify-between border-b border-gray-300 px-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Your community
          </p>
          <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-800">
            Conversations
          </h2>
        </div>
        <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-violet-50 px-2 text-xs font-bold text-violet-700">
          {rooms?.length || 0}
        </span>
      </div> */}

      <div className="mb-5 flex items-center justify-between pb-3 border-b border-gray-300 px-2">
        <Link to={RouteHomepageLayout} className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-700 text-lg text-white shadow-md shadow-violet-200">
            <IoChatbubbleOutline />
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight tracking-tight text-slate-900 sm:text-xl">
              Suraksha Chat
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Stay connected, stay safe
            </span>
          </span>
        </Link>
      </div>

      {/* Quick Action */}
      <div className="mb-5 pb-3  flex flex-col gap-3">
        <p className="mb-3 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
          <FaLink className="text-sm" />
          Quick Action
        </p>

        <Link
          to={RouteHomepageLayout}
          className="flex items-center gap-2 rounded px-4 py-3 ring-1 ring-violet-100 text-sm font-semibold text-violet-700 transition hover:border-violet-200 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-violet-500 sm:px-5">
          <HiOutlineHome className="text-base" />
          <span>Home</span>
        </Link>

        {/* <Link
          className="flex items-center gap-2 rounded shadow-sm ring-1 ring-violet-100 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-200 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-violet-500 sm:px-5">
          <HiOutlineHome className="text-base" />
          <span>Create Group</span>
        </Link> */}

        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 rounded px-4 py-3 ring-1 ring-violet-100 text-sm font-semibold text-violet-700 transition hover:border-violet-200 cursor-pointer hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-violet-500 sm:px-5">
          <IoAdd className="text-base" />
          <span>Create a group</span>
        </button>
      </div>

      <div className="mb-3 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        <IoPeopleOutline className="text-sm" />
        Groups
      </div>

      <ul className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
        {rooms?.length > 0 ? (
          rooms.map((room) => {
            const isSelected = room?._id === selectedRoomId;
            return (
              <li key={room?._id}>
                <button
                  type="button"
                  aria-current={isSelected ? "page" : undefined}
                  onClick={() => {
                    onSelectRoom(room);
                    onClose();
                  }}
                  className={`group flex w-full items-center gap-3 cursor-pointer rounded-2xl px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-violet-500 ${
                    isSelected
                      ? "bg-violet-50 text-violet-800 shadow-sm ring-1 ring-violet-100"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}>
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-extrabold ${
                      isSelected
                        ? "bg-linear-to-br from-fuchsia-500 to-violet-700 text-white shadow-md shadow-violet-200"
                        : "bg-linear-to-br from-violet-50 to-fuchsia-50 text-violet-600"
                    }`}>
                    {room?.roomName?.charAt(0)?.toUpperCase() || "G"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">
                      {room.roomName}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {room.roomType === "private"
                        ? "Private group"
                        : "Community"}
                    </span>
                  </span>
                  {/* {isSelected && (
                    <IoSparkles className="shrink-0 text-violet-500" />
                  )} */}
                </button>
              </li>
            );
          })
        ) : (
          <li className="mx-1 rounded-2xl border border-dashed border-violet-200 bg-violet-50/40 px-4 py-7 text-center">
            <IoPeopleOutline className="mx-auto text-2xl text-violet-300" />
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Your groups will appear here
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Create a space to bring your people together.
            </p>
          </li>
        )}
      </ul>

      {/* <div className="mt-4 rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 to-fuchsia-50/70 p-4">
        <p className="text-sm font-bold text-slate-800">
          A little safer, together.
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Stay close to your trusted circle, wherever the day takes you.
        </p>
      </div> */}

      {/* <button
        onClick={onOpenModal}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-fuchsia-600 to-violet-700 px-5 py-3.5 text-sm cursor-pointer font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
        Create a group
        <IoAdd className="text-xl" />
      </button> */}
    </aside>
  );
};

export default ChatSidebar;
