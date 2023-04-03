import AuthLayout from "@/components/layouts/authLayout"
import React, { useRef, useState } from "react"
import twitterLogo from "../../../public/twitter.webp"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm, SubmitHandler } from "react-hook-form"
import { EyeIcon } from "@heroicons/react/outline"
import { signUp } from "@/utils/fetch/register"
import toast from "react-hot-toast"
import LoadingBar, {LoadingBarRef} from "react-top-loading-bar"

interface IFormInput {
   username: string
   email: string
   password: number
}

export default function Signup() {
   const ref = useRef<LoadingBarRef>(null)
   const [visible, setVisible] = useState<boolean>(false)
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>()
   const router = useRouter()

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      ref.current?.continuousStart()

      try {
         const res = await signUp(data)
         toast.success("Registered Successfully!")
         router.push("/auth/login")
      } catch (error: any) {
         toast.error(error.message || "An error occurred")
      }
      
      setTimeout(() => {
         ref.current?.complete()
      }, 500)
   }

   return (
      <AuthLayout>
         <LoadingBar color="#00aded" ref={ref} shadow={true} />

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
                     className="mt-1 w-full rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-gray-500 outline-none transition duration-300 focus:border-twitter focus:bg-white/90 "
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

               <div className="flex w-full max-w-4xl flex-col lg:w-2/3">
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
                     className="mt-1 w-full rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-gray-500 outline-none transition duration-300 focus:border-twitter focus:bg-white/90"
                     placeholder="example@mail.com"
                  />
                  <div className="h-2 ">
                     {errors.email && errors.email?.type === "pattern" && (
                        <span className="text-xs text-red-600">
                           enter a valid email
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
                     className="mt-1 w-full rounded-xl border-4 border-twitter/50 bg-white py-3 px-2 text-lg font-bold text-gray-500 outline-none transition duration-300 focus:border-twitter focus:bg-white/90"
                     placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  />
                  <EyeIcon
                     className={`absolute right-5 bottom-7 h-7 w-7 cursor-pointer rounded-full text-twitter transition ${
                        visible && "bg-twitter/30"
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
                  Create Account
               </button>
               <div className="flex h-12 flex-col text-center lg:text-start">
                  {errors.username && errors.username?.type === "required" && (
                     <span className="text-xs text-red-600">
                        username is required
                     </span>
                  )}
                  {errors.email && errors.email?.type === "required" && (
                     <span className="text-xs text-red-600">
                        email is required
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
