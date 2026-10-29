import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiArrowUpRight,
  HiOutlineBellAlert,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineSpeakerWave,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import SafetyTips from "../components/SafetyTips";
import { RouteChatLayout } from "../helpers/RouteName";
import { Link } from "react-router-dom";

const Home = () => {
  const [sosState, setSosState] = useState({ status: "idle", message: "" });
  const [soundMessage, setSoundMessage] = useState("");
  const [playingSound, setPlayingSound] = useState(null);

  const user = useSelector((state) => state?.user?.user?.user);
  const rooms = useSelector((state) => state?.room?.rooms) || [];
  const privateRooms = rooms.filter((room) => room.roomType === "private");

  // const availRooms = useSelector((state) => console.log(state.room.rooms))
  // console.log(rooms);

  const alarmRef = useRef(null);
  const ringtoneRef = useRef(null);
  const displayName = user?.fullName?.trim();
  const firstName = displayName?.split(/\s+/)[0];

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const handleSOS = () => {
    if (privateRooms.length === 0) {
      setSosState({
        status: "error",
        message:
          "Create a private room with your trusted contacts before sending an SOS.",
      });
      return;
    }

    if (!navigator.geolocation) {
      setSosState({
        status: "error",
        message: "Location is not supported by this browser.",
      });
      return;
    }

    setSosState({ status: "loading", message: "Getting your location…" });
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const message = {
          type: "location",
          userId: user?.id,
          lat: coords.latitude,
          lng: coords.longitude,
          timestamp: new Date().toISOString(),
        };

        try {
          await Promise.all(
            privateRooms.map((room) =>
              axios.post(
                `${import.meta.env.VITE_API_URL}/sos`,
                { roomId: room._id, message },
                { withCredentials: true },
              ),
            ),
          );
          setSosState({
            status: "success",
            message: `SOS and location sent to ${privateRooms.length} private ${
              privateRooms.length === 1 ? "room" : "rooms"
            }.`,
          });
        } catch (error) {
          console.error("SOS Error:", error.response?.data || error.message);
          setSosState({
            status: "error",
            message:
              "Your SOS could not be sent. Please try again or contact local emergency services.",
          });
        }
      },
      (error) => {
        console.error("Location Error:", error);
        setSosState({
          status: "error",
          message:
            error.code === error.PERMISSION_DENIED
              ? "Allow location access in your browser settings to send an SOS."
              : "We could not get your location. Check location services and try again.",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const toggleSound = async (soundName, audioRef) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingSound === soundName) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingSound(null);
      setSoundMessage("");
      return;
    }

    const otherAudio =
      soundName === "siren" ? ringtoneRef.current : alarmRef.current;
    otherAudio?.pause();
    if (otherAudio) otherAudio.currentTime = 0;
    try {
      audio.loop = true;
      await audio.play();
      setPlayingSound(soundName);
      setSoundMessage("");
    } catch (error) {
      console.error("Audio playback error:", error);
      setSoundMessage(
        "Sound could not play. Check your device volume and try again.",
      );
    }
  };

  const stopAllSounds = () => {
    [alarmRef.current, ringtoneRef.current].forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlayingSound(null);
    setSoundMessage("");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8f7fb]">
      <audio
        ref={alarmRef}
        src="/alarm.mp3"
        onEnded={() => setPlayingSound(null)}
      />
      <audio
        ref={ringtoneRef}
        src="/ringtone.mp3"
        onEnded={() => setPlayingSound(null)}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-11">
        <section className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-violet-700">
              YOUR PERSONAL SAFETY SPACE
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {greeting}
              {firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Your trusted circle and safety tools are all in one place. Take a
              moment to check in before you head out.
            </p>
          </div>
          <Link
            to={RouteChatLayout}
            className="inline-flex min-h-11 items-center justify-center sm:hidden gap-2 self-start rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-800 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 sm:self-auto">
            Open your chats
            <HiArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="relative overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-rose-50" />
            <div className="relative">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <HiOutlineBellAlert className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                    Emergency SOS
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Sends your current location to your private rooms.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center rounded-3xl bg-[#fff8f8] px-4 py-7 sm:py-8">
                <button
                  type="button"
                  onClick={handleSOS}
                  disabled={sosState.status === "loading"}
                  aria-label="Send emergency SOS with your location"
                  className="group relative flex h-36 w-36 items-center justify-center rounded-full border-10 cursor-pointer border-rose-100 bg-rose-600 text-white shadow-[0_12px_30px_-8px_rgba(225,29,72,0.5)] transition hover:scale-[1.03] hover:bg-rose-700 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-300 disabled:cursor-wait disabled:opacity-70 sm:h-40 sm:w-40">
                  <span className="text-4xl font-black tracking-wide">
                    {sosState.status === "loading" ? "…" : "SOS"}
                  </span>
                </button>
                <p className="mt-5 text-center text-sm font-medium text-slate-700">
                  Tap only when you need urgent help
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <HiOutlineUserGroup className="h-5 w-5 shrink-0 text-violet-700" />
                <p className="text-sm text-slate-600">
                  {privateRooms.length > 0 ? (
                    <>
                      SOS will be shared with
                      <Link
                        to={RouteChatLayout}
                        className="font-semibold pl-1 text-blue-600 hover:text-blue-700 hover:underline">
                        {privateRooms.length} emergency / private
                        <span className="pl-1">
                          {privateRooms.length === 1 ? "room" : "rooms"}
                        </span>
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      No private rooms yet. Add trusted contacts to a private
                      room to prepare your SOS circle.
                    </>
                  )}
                </p>
              </div>

              {sosState.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                    sosState.status === "error"
                      ? "bg-rose-50 text-rose-800"
                      : sosState.status === "success"
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-violet-50 text-violet-800"
                  }`}>
                  {sosState.status === "error" ? (
                    <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                  ) : (
                    <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  )}
                  {sosState.message}
                </div>
              )}
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Suraksha does not contact emergency services. If you are in
                immediate danger, call your local emergency number.
              </p>
            </div>
          </article>

          <section className="rounded-[1.75rem] border border-violet-100 bg-[#e6e2f4] p-5 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-sm">
                <HiOutlineSpeakerWave className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Sound tools
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Optional sounds that may help draw attention or create a
                  moment to step away.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <article className="rounded-2xl border border-amber-100 bg-white p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <HiOutlineSpeakerWave className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Siren sound
                    </h3>
                    <p className="text-xs text-slate-500">
                      Plays an attention-grabbing alarm
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSound("siren", alarmRef)}
                  className={`mt-4 min-h-11 w-full rounded-xl px-4 py-2.5 cursor-pointer text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    playingSound === "siren"
                      ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}>
                  {playingSound === "siren" ? "Stop siren" : "Play siren"}
                </button>
              </article>

              <article className="rounded-2xl border border-emerald-100 bg-white p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <HiOutlinePhone className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Simulated call sound
                    </h3>
                    <p className="text-xs text-slate-500">
                      Plays a ringtone; it does not place a call
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSound("ringtone", ringtoneRef)}
                  className={`mt-4 min-h-11 w-full rounded-xl px-4 py-2.5 text-sm cursor-pointer font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                    playingSound === "ringtone"
                      ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}>
                  {playingSound === "ringtone"
                    ? "Stop ringtone"
                    : "Play ringtone"}
                </button>
              </article>
            </div>

            {soundMessage && (
              <p role="status" className="mt-3 text-sm text-rose-700">
                {soundMessage}
              </p>
            )}
            {playingSound && (
              <button
                type="button"
                onClick={stopAllSounds}
                className="mt-4 min-h-10 w-full rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-50">
                Stop all sounds
              </button>
            )}
          </section>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm sm:mt-10 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
              <HiOutlineMapPin className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                A few things to keep in mind
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Practical reminders for looking out for yourself and others.
              </p>
            </div>
          </div>
          <SafetyTips />
        </section>
      </main>
    </div>
  );
};

export default Home;
