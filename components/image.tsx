import Image, { StaticImageData } from "next/image"

interface Props {
   src: string | StaticImageData
   alt?: string
   width: number
   height: number
   className?: string
   layout?: string
}

export default function ImageComponent({
   src,
   width,
   height,
   className,
   alt,
   layout,
}: Props) {
   return (
      <Image
         src={src}
         alt={alt || ""}
         width={width}
         height={height}
         className={className}
         layout={layout}
      />
   )
}
