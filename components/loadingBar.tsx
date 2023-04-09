import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/features/store"
import { stopLoading } from "@/features/slices/loadingSlice"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import { useRouter } from "next/router"

const LoadingBarComponent = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const isLoading = useSelector((state: RootState) => state.loading.isLoading)
   const progress = useSelector((state: RootState) => state.loading.progress)
   const loadingBarRef = useRef<LoadingBarRef>(null)

   useEffect(() => {
      if (isLoading) {
         loadingBarRef.current?.continuousStart()
      } else {
         loadingBarRef.current?.complete()
      }
   }, [isLoading])

   useEffect(() => {
      dispatch(stopLoading())
   }, [router.asPath, dispatch])

   return (
      <>
         <LoadingBar
            height={5}
            progress={progress}
            color="#00aded"
            ref={loadingBarRef}
            className="z-50"
         />
      </>
   )
}

export default LoadingBarComponent
