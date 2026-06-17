"use client"

import { cn } from "@/lib/utils"

interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: {
    imageUrl: string
    profileUrl: string
  }[]
}

export function AvatarCircles({ numPeople, className, avatarUrls }: AvatarCirclesProps) {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a key={index} href={url.profileUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="h-8 w-8 rounded-full border-2 border-white object-cover"
            src={url.imageUrl}
            width={32}
            height={32}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {numPeople && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#171717] text-center text-xs font-medium text-white">
          +{numPeople}
        </div>
      )}
    </div>
  )
}
