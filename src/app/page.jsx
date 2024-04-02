"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      alert(res.error)
    } else {
      router.push("https://google.com");
      router.refresh();
    }
  });
  return (
    <div className="mt-20 w-[50%] mx-auto">
      <form
      onSubmit={onSubmit}
        action=""
        className="bg-white p-12 grid items-center rounded-xl "
      >
        <h1 className="text-slate-500 font-bold text-4xl mb-4 text-center">
          Login
        </h1>

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm ">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
          })}
          className="py-2 rounded block mb-2 border-b-2 outline-none text-slate-500 w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label
          htmlFor="password"
          className="text-slate-500 mb-2 block text-sm "
        >
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            },
          })}
          className="py-2 rounded block mb-2 border-b-2 outline-none text-slate-500 w-full"
          placeholder="****"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm "
        >
          Confirma Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "password is required",
            },
          })}
          className="py-2 rounded block mb-2 border-b-2 outline-none text-slate-500 w-full"
          placeholder="****"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="w-[80%] rounded-full mx-auto font-bold text-xl bg-slate-600 hover:bg-slate-900 text-white p-3 py-4  mt-4">
          Register
        </button>
      </form>
    </div>
  );
}

export default page;