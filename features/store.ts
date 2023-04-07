import { configureStore } from "@reduxjs/toolkit"
import loadingSlice from "./slices/loadingSlice"

export const store = configureStore({
   reducer: { loading: loadingSlice },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // disable serializable check for non-serializable actions
      }),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
