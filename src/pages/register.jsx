import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../lib/authSchema";
import Btn from "../ui/btn";
import { toast } from "sonner";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

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
      email: data.email.toLowerCase(),
      password: data.password,
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful");
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#f8f9fd] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
        <p className="mb-6 mt-2 text-sm text-gray-500">
          Join TaskFlow and manage your tasks efficiently.
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstname")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.firstname?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastname")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.lastname?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Enter you email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
            />

            <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <Btn
            type="submit"
            label="Create Account"
            btnSize="sm"
            btnStyle="secondary"
          />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
