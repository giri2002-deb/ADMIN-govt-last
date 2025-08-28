import Image from "next/image"

interface StaticImagePageProps {
  imageUrl: string
  data?: any
}

export default function StaticImagePage({ imageUrl }: StaticImagePageProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt="Static Document Page"
        width={794}
        height={1123}
        className="max-w-full max-h-full object-contain"
        priority
      />
    </div>
  )
}
