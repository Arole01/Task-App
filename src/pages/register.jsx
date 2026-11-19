import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../lib/authSchema";
import Btn from "../ui/btn";
import { toast } from "sonner";
import { useState } from "react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const navigate = useNavigate();

  const handleRegister = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(
      (user) => user.email === data.email.toLowerCase(),
    );

    if (userExists) {
      toast.error("This email is already registered");
      return;
    }

    const newUser = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email.trim().toLowerCase(),
      password: data.password,
      occupation: data.occupation,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Account created successfully!");

    navigate("/login");
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#f8f9fd] px-4 py-10 transition-colors duration-300 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create an Account
        </h1>

        <p className="mb-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join TaskFlow and manage your tasks efficiently.
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>

            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstname")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.firstname?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastname")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.lastname?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="text"
              placeholder="Enter you email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500"
            />

            <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-indigo-600"
              />

              <label
                htmlFor="showPassword"
                className="cursor-pointer text-sm text-gray-600 dark:text-gray-400"
              >
                Show password
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your full name"
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="showConfirmPassword"
                checked={showConfirmPassword}
                onChange={(e) => setShowConfirmPassword(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-indigo-600"
              />

              <label
                htmlFor="showConfirmPassword"
                className="cursor-pointer text-sm text-gray-600 dark:text-gray-400"
              >
                Show confirm password
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Occupation
            </label>

            <input
              type="text"
              placeholder="Enter your occupation"
              {...register("occupation")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />

            {errors.occupation && (
              <p className="mt-1 text-xs text-red-500">
                {errors.occupation.message}
              </p>
            )}
          </div>

          <Btn
            type="submit"
            label="Create Account"
            btnSize="sm"
            btnStyle="secondary"
          />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 dark:text-indigo-400"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
