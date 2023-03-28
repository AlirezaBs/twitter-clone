const imageLoader = (url: string) => {
   return `${process.env.NEXT_PUBLIC_API_URL_IMG}${url}`
}

export default imageLoader
