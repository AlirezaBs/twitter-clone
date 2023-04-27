const imageLoader = (url: string) => {
   return `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${url}`
}

export default imageLoader
