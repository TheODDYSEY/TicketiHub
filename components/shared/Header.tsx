import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="wrapper flex items-center justify-between py-4 md:py-5">
        <Link 
          href="/" 
          className="w-36 transition-transform hover:scale-105"
        >
          <Image 
            src="/assets/images/logo3.svg" 
            alt="TicketiHub Logo" 
            width={128} 
            height={38}
            className="transition-opacity hover:opacity-90"
          />
        </Link>
        
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems/>
          </nav>
        </SignedIn>
        
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav/>
          </SignedIn>
          <SignedOut>
            <Button 
              asChild 
              className='rounded-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all font-semibold' 
              size='lg'
            >
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header