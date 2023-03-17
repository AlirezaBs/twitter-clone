import AuthLayout from "@/components/authLayout"
import React, { useState } from "react"
import twitterLogo from "../../../public/Twitter-logo.svg"
import Image from "next/image"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { EyeIcon } from "@heroicons/react/outline"

interface IFormInput {
   username: string
   email: string
   password: number
}

export default function Signup() {
   const [visible, setVisible] = useState<boolean>(false)
   const { register, handleSubmit } = useForm<IFormInput>()

   const onSubmit: SubmitHandler<IFormInput> = () => {}

   return (
      <AuthLayout>
         <div className="flex h-full flex-col items-center justify-center space-y-5 p-5 dark:bg-bgDark md:p-8 lg:items-start lg:space-y-8">
            <Link href="/" className="cursor-pointer">
               <Image
                  src={twitterLogo}
                  alt="TWITTER"
                  loading="eager"
                  width={50}
                  height={50}
               />
            </Link>
            <h1 className="text-center text-3xl font-bold lg:text-start lg:text-5xl">
               Create Account
            </h1>

            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex w-full flex-col space-y-4"
            >
               <div className="flex w-full max-w-4xl flex-col space-y-1 lg:w-2/3">
                  <label
                     htmlFor="username"
                     className="pl-1 font-light hover:cursor-pointer"
                  >
                     username
                  </label>
                  <input
                     {...register("username", {
                        required: true,
                        minLength: 4,
                        maxLength: 15,
                     })}
                     id="username"
                     type="text"
                     className="w-full rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-black outline-none transition duration-300 focus:border-twitter "
                     placeholder="username"
                  />
               </div>

               <div className="flex w-full max-w-4xl flex-col space-y-1 lg:w-2/3">
                  <label
                     htmlFor="email"
                     className="pl-1 font-light hover:cursor-pointer"
                  >
                     email
                  </label>
                  <input
                     {...register("email", {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                     })}
                     id="email"
                     type="text"
                     className="w-full  rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-black outline-none transition duration-300 focus:border-twitter"
                     placeholder="example@mail.com"
                  />
               </div>

               <div className="relative flex w-full max-w-4xl flex-col space-y-1 lg:w-2/3">
                  <label
                     htmlFor="password"
                     className="pl-1 font-light hover:cursor-pointer"
                  >
                     password
                  </label>
                  <input
                     {...register("password", {
                        required: true,
                        minLength: 5,
                        maxLength: 15,
                     })}
                     id="password"
                     type={visible ? "text" : "password"}
                     className="w-full  rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-black outline-none transition duration-300 focus:border-twitter"
                     placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  />
                  <EyeIcon
                     className="absolute right-5 bottom-4 h-7 w-7 cursor-pointer text-twitter"
                     onClick={() => setVisible(!visible)}
                  />
               </div>

               <button
                  type="submit"
                  className="over:bg-twitter/80 mt-5 w-2/3 max-w-4xl self-center rounded-full bg-twitter py-4 text-lg font-bold text-white hover:bg-twitter/80 active:bg-twitter/70 md:w-2/3 lg:self-start"
               >
                  Create Account
               </button>
            </form>
         </div>
      </AuthLayout>
   )
}
