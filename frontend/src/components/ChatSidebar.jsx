const ChatSidebar = ({ rooms, isOpen, onSelectRoom, onClose, onOpenModal }) => {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div className="fixed inset-0 lg:hidden z-30" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white text-gray-800 border-r border-gray-200 shadow-lg md:shadow-none flex flex-col transform transition-transform duration-300 z-40 p-4
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Header */}
        {/* <div className="border-b mb-5">
          <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-5 tracking-wide px-3">
            Contact Groups
          </h4>
        </div> */}

        {/* Rooms List */}
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {rooms?.length > 0 ? (
            rooms?.map((room) => (
              <li
                key={room?._id}
                onClick={() => {
                  onSelectRoom(room);
                  onClose();
                }}
                className="py-3 px-3 rounded-xl text-purple-700 hover:bg-purple-100 transition cursor-pointer">
                {room.roomName}
              </li>
            ))
          ) : (
            <li className="p-2 text-center text-gray-400 italic">
              No rooms available
            </li>
          )}
        </ul>

        {/* Bottom - Create Room */}
        {/* <form
          onSubmit={handleSubmit(handleCreateRoom)}
          className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="New contact group name"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            {...register("roomName", {
              required: "Room name is required",
            })}
          />

          {errors.roomName && (
            <p className="text-red-500 text-xs">{errors.roomName.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-md font-medium cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            Create Contacts
          </button>
        </form> */}

        <button
          onClick={onOpenModal}
          className="mt-6 bg-linear-to-r from-pink-500 to-purple-700 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition">
          Create Group
        </button>
      </div>
    </>
  );
};

export default ChatSidebar;
