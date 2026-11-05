import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/userSlice";
import {
  CalendarDays,
  MapPin,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";

const fields = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    icon: User,
    rules: { required: "Full name is required" },
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    icon: Mail,
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    },
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    icon: CalendarDays,
    rules: {
      required: "Age is required",
      min: { value: 18, message: "You must be at least 18 years old" },
    },
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    icon: Phone,
    rules: {
      required: "Phone number is required",
      pattern: {
        value: /^[6-9]\d{9}$/,
        message: "Please enter a valid Indian mobile number",
      },
    },
  },
];

const Profile = () => {
  const user = useSelector(
    (state) => state.user?.user?.user ?? state.user?.user,
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      age: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      age: user?.age ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    const updatedFields = Object.keys(dirtyFields).reduce((updates, field) => {
      updates[field] = data[field];
      return updates;
    }, {});

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile`,
        updatedFields,
        { withCredentials: true },
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        reset({
          fullName: response.data.user.fullName ?? "",
          email: response.data.user.email ?? "",
          age: response.data.user.age ?? "",
          phone: response.data.user.phone ?? "",
          address: response.data.user.address ?? "",
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Unable to update your profile.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update your profile.",
      );
    }
  };

  const initials =
    user?.fullName
      ?.trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full min-w-0 bg-slate-50 mt-5 sm:mt-0 px-3 py-6 sm:px-5  lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <header className="mb-6 sm:mb-8">
          <p className="mb-2 text-2xl sm:text-3xl text-center font-semibold uppercase tracking-[0.16em] text-violet-700">
            Profile
          </p>
        </header>

        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start xl:gap-6">
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex min-w-0 gap-4 border-b border-slate-100 p-4 items-center lg:p-7">
              <div
                aria-label={`${user?.fullName || "Your"} profile avatar`}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl font-bold text-violet-800 ring-4 ring-violet-50">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="wrap-break-word text-xl font-semibold text-slate-900">
                  {user?.fullName || "Your account"}
                </h2>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {user?.email || "Add your email address"}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="min-w-0 p-4 sm:p-6 lg:p-7">
              <div className="grid min-w-0 gap-4 gap-y-5 sm:grid-cols-2 sm:gap-x-5">
                {fields.map(({ name, label, type, icon: Icon, rules }) => (
                  <div key={name}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        aria-hidden="true"
                        className="pointer-events-none h-4 w-4 text-slate-400"
                      />
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-slate-700">
                        {label}
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id={name}
                        type={type}
                        min={name === "age" ? 18 : undefined}
                        aria-invalid={Boolean(errors[name])}
                        aria-describedby={
                          errors[name] ? `${name}-error` : undefined
                        }
                        className={`w-full min-w-0 rounded-xl border bg-white py-2 sm:py-3 px-3 sm:px-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 ${
                          errors[name] ? "border-rose-300" : "border-slate-200"
                        }`}
                        {...register(name, rules)}
                      />
                    </div>
                    {errors[name] && (
                      <p
                        id={`${name}-error`}
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-rose-600">
                        {errors[name].message}
                      </p>
                    )}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <div className="flex items-center mb-2 gap-2">
                    <MapPin
                      aria-hidden="true"
                      className="pointer-events-none h-4 w-4 text-slate-400"
                    />
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-slate-700">
                      Home address
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      id="address"
                      rows={3}
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={
                        errors.address ? "address-error" : undefined
                      }
                      className={`w-full resize-y rounded-xl px-3 sm:px-3 border bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 ${
                        errors.address ? "border-rose-300" : "border-slate-200"
                      }`}
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                  </div>
                  {errors.address && (
                    <p
                      id="address-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-rose-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-7 flex justify-center pt-5">
                <button
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center gap-2 cursor-pointer rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
                  <Save aria-hidden="true" className="h-4 w-4" />
                  {isSubmitting ? "Saving changes..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
