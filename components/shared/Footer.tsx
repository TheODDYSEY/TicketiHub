import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/' className="transition-transform hover:scale-105">
          <Image
            src="/assets/images/logo3.svg"
            alt="logo"
            width={128}
            height={38}
            className="transition-opacity hover:opacity-80"
          />
        </Link>
        <p className="text-gray-600 text-sm font-medium">2024 TicketiHub. All Rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer