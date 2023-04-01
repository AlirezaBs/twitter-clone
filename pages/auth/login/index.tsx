import AuthLayout from "@/components/layouts/authLayout"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import twitterLogo from "../../../public/twitter.webp"
import { useForm } from "react-hook-form"
import { EyeIcon } from "@heroicons/react/outline"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"

interface IFormInput {
   username: string
   password: string
}

export default function Login() {
   const router = useRouter()
   const [visible, setVisible] = useState<boolean>()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>()

   const onSubmit = async (data: IFormInput) => {
      const res = await signIn("credentials", {
         username: data.username,
         password: data.password,
         redirect: false,
      })

      if (res?.error) {
         toast.error(
            res.error === "Cannot read properties of undefined (reading 'id')"
               ? "Invalid username or password"
               : res.error || "An error occurred"
         )
         return
      }

      toast.success(`Welcome ${data.username}`)
      router.push("/feed")
   }

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
               Log In
            </h1>

            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex w-full flex-col space-y-2"
            >
               <div className="flex w-full max-w-4xl flex-col lg:w-2/3">
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
                     className="mt-1 w-full rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-gray-500 outline-none transition duration-300 focus:border-twitter "
                     placeholder="username"
                  />
                  <div className="h-2">
                     {errors.username &&
                        (errors.username.type === "maxLength" ||
                           "minLength") && (
                           <span className="text-xs text-red-600">
                              username must be between 4 and 15 characters
                           </span>
                        )}
                  </div>
               </div>

               <div className="relative flex w-full max-w-4xl flex-col lg:w-2/3">
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
                     className="mt-1 w-full rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-gray-500 outline-none transition duration-300 focus:border-twitter"
                     placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  />
                  <EyeIcon
                     className={`absolute right-4 bottom-5 hover:bg-twitter/10 p-2 h-11 w-11 cursor-pointer rounded-full text-twitter transition ${
                        visible && "bg-twitter/30 hover:bg-twitter/50"
                     }`}
                     onClick={() => setVisible(!visible)}
                  />
                  <div className="flex h-3 flex-col">
                     {errors.password &&
                        (errors.password.type === "maxLength" ||
                           "minLength") && (
                           <span className="text-xs text-red-600">
                              password must be between 5 and 15 characters
                           </span>
                        )}
                  </div>
               </div>

               <button
                  type="submit"
                  className="over:bg-twitter/80 w-2/3 max-w-4xl self-center rounded-full bg-twitter py-4 text-lg font-bold text-white hover:bg-twitter/80 active:bg-twitter/70 md:w-2/3 lg:self-start"
               >
                  Log In
               </button>
               <div className="flex h-12 flex-col text-center lg:text-start">
                  {errors.username && errors.username?.type === "required" && (
                     <span className="text-xs text-red-600">
                        username is required
                     </span>
                  )}
                  {errors.password && errors.password?.type === "required" && (
                     <span className="text-xs text-red-600">
                        password is required
                     </span>
                  )}
               </div>
            </form>
         </div>
      </AuthLayout>
   )
}
