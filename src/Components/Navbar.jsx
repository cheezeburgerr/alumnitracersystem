import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Toaster } from "@/components/ui/toaster"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "../hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar"



const Navbar = ({ user }) => {
  const { toast } = useToast()
  const [user2, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  // console.log(user2);
  const handleLogout = () => {
    // Remove the access token from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    // Optionally, you can redirect the user to the login page or home page
    window.location.href = "/"; // or wherever you want to redirect after logout
  };


  return (
    <div className="w-full p-2 sticky top-0 bg-background z-50 border-b ">
      <Toaster />

      <nav className="max-w-8xl mx-auto flex justify-between">
        <Link to={'/'}><div className="flex gap-4 items-center"> <img src="/../src/assets/psu_logo.png" alt="PSU Logo" className="h-12" />
          <p className="hidden md:block font-bold text-primary">PSU Alumni Tracer System</p></div></Link>

        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <Link to="/" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <Link to="/contact" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}

            {user2 ? (
              <>
                <NavigationMenuItem>
                  <div className="mx-4">

                    <DropdownMenu>
                      <DropdownMenuTrigger>

                        <Avatar className>
                          <AvatarImage src={user2 && user2.image} />
                          <AvatarFallback>{user2.first_name.slice(0, 1) + user2.last_name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{user2.first_name + ' ' + user2.last_name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </div>

                </NavigationMenuItem>

              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link to="/login" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/register" >
                    <Button>
                      Register
                    </Button>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            <NavigationMenuItem>
              <ModeToggle />

            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>


      </nav>


    </div>

  );
};

export default Navbar;

