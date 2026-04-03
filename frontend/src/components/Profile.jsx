import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user?.user?.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Profile
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
        Personal details
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder={user?.fullName}
            className="mt-2 w-full border-b border-slate-300 bg-transparent px-0 py-2 focus:outline-none dark:border-slate-700 dark:text-white"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder={user?.email}
            className="mt-2 w-full border-b border-slate-300 bg-transparent px-0 py-2 focus:outline-none dark:border-slate-700 dark:text-white"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Age
          </label>
          <input
            id="age"
            type="number"
            placeholder={user?.age}
            className="mt-2 w-full border-b border-slate-300 bg-transparent px-0 py-2 focus:outline-none dark:border-slate-700 dark:text-white"
            {...register("age")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={user?.phone}
            className="mt-2 w-full border-b border-slate-300 bg-transparent px-0 py-2 focus:outline-none dark:border-slate-700 dark:text-white"
            {...register("phone")}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Address
          </label>
          <textarea
            id="address"
            placeholder={user?.address || "Enter address"}
            rows={4}
            className="mt-2 w-full border-b border-slate-300 bg-transparent px-0 py-2 focus:outline-none dark:border-slate-700 dark:text-white"
            {...register("address")}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
