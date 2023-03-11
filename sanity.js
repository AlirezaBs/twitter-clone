import { createClient } from "next-sanity"

const config = {
   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
   useCdn: process.env.NODE_ENV === "production",
   useCdn: true,
   apiVersion: '2021-08-31'
}

// set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config) 