"use client"

import Image from "next/image"

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
          <Image
            fill
            alt="Documents"
            src={"/documents.png"}
            className="object-contain dark:hidden"
          />
          <Image
            fill
            alt="Documents"
            src={"/documents-dark.png"}
            className="object-contain dark:block hidden"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden lg:block">
          <Image
            fill
            alt="Reading"
            src="/reading.png"
            className="object-contain dark:hidden"
          />
          <Image
            fill
            alt="Documents"
            src={"/reading-dark.png"}
            className="object-contain dark:block hidden"
          />
        </div>
      </div>
    </div>
  )
}
