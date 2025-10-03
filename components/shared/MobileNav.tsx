import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <Image src="/assets/icons/menu.svg"
            alt="menu"
            width={30}
            height={30} 
            className="cursor-pointer"    
          />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-6 bg-white md:hidden border-l border-gray-200">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
          <Separator className="border border-gray-200" />
          <NavItems/>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;