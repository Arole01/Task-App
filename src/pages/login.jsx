import Btn from "../ui/btn";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../lib/authSchema";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";

function Login({ setAuthenticated }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data) => {
    console.log(data);

    setAuthenticated(true);
    navigate("/");
  };

  return (
    <>
      <section className="flex min-h-[80vh] items-center justify-center bg-[#f7f8fc] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <LockKeyhole className="h-7 w-7 text-indigo-600" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue managing your tasks
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border bg-gray-50 pl-12 py-3 pr-4 text-sm  outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-gray-50 pl-12 py-3 pr-4 text-sm  outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Btn
              label="Login"
              btnSize="sm"
              btnStyle="primary"
              className="flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition hover:bg-indigo-700"
              iconRight={<ArrowRight size={18} />}
            />
          </form>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-500">
              New user?👇
              <Link to="/register">
                {" "}
                <Btn
                  label="Register"
                  btnSize="sm"
                  btnStyle="secondary"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
