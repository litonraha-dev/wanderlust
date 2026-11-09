"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
 
  const handleSignOut = ()=>{
     authClient.signOut();
  }
  return (
    <div>
      <div className=" flex items-center justify-between px-8 py-4 shadow-md">
        <div className="flex gap-4">
          <Link href="/"> Home</Link>
          <Link href="/destinations"> Destination</Link>
          <Link href="/add-destination">Add Destination</Link>
          <Link href='/my-bookings'>My Bookings</Link>
          <h1>Admin</h1>
        </div>
        <div>
          <Image
            src="/images/Wanderlast.png"
            height={40}
            width={100}
            alt="Wanderlast"
          ></Image>
        </div>
        <div className="flex gap-4">
          <h1>Profile</h1>
         
          {
            user? <Popover>
            <PopoverTrigger render={ <Avatar>
            <AvatarImage
              src={user?.image as string}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>}>
            
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user?.name}</PopoverTitle>
                <PopoverDescription>{user?.email}
                <Button variant={'destructive'} onClick={handleSignOut}>SignOut</Button>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>:<>
           <Link href="/login">Login</Link>
          <Link href="/signup"> Signup</Link>
          </>
          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
