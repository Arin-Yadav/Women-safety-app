import { useSelector } from "react-redux";

export default function HomePage() {
  const user = useSelector((state) => state.user?.user);
  const userName = user?.user?.fullName || "there";
  const userId = user?.user?.id;

  const handleSOS = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const locationMessage = {
        type: "location",
        userId,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString(),
      };

      fetch(`${import.meta.env.VITE_API_URL}/sos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: `${import.meta.env.VITE_ROOM_ID}`,
          message: locationMessage,
        }),
      });
    });
  };

  return (
    <div className="space-y-12">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Home
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
          Welcome, {userName}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Keep emergency actions close and everything else calm.
        </p>
      </div>

      <div>
        <button
          onClick={handleSOS}
          className="h-32 w-32 rounded-full bg-rose-600 text-xl font-semibold text-white transition hover:bg-rose-700"
        >
          SOS
        </button>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Sends your current location to the configured emergency room.
        </p>
      </div>
    </div>
  );
}
