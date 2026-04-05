const ChatSidebar = ({ rooms, isOpen, onSelectRoom, onClose, onOpenModal }) => {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div className="fixed inset-0 lg:hidden z-30" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-16 left-0 h-[calc(100vh-64px)] lg:h-auto w-64 bg-linear-to-b from-white to-gray-50 text-gray-800 border-r shadow-sm p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Header */}
        <h4 className="text-sm font-semibold text-gray-700 tracking-wide mb-3">
          Contact Group
        </h4>

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
                className="p-2 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-200">
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer">
          Create Group
        </button>
      </div>
    </>
  );
};

export default ChatSidebar;
