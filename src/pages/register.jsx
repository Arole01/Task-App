import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../lib/authSchema";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = (data) => {};

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#f8f9fd] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
        <p className="mb-6 mt-2 text-sm text-gray-500">
          Join TaskFlow and manage your tasks efficiently.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5"></form>
      </div>
    </section>
  );
}
