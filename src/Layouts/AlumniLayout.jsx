import Navbar from "@/Components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarNav } from "../Components/SidebarNav";

export default function AlumniLayout({ children, user, pageName }) {

  const location = useLocation();

  // const [user, setUser] = useState();

  // useEffect(() => {
  //     const token = localStorage.getItem("access_token");

  //     // If token exists, fetch the user profile
  //     if (token) {
  //       axios
  //         .get("http://127.0.0.1:8000/api/user", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           setUser(response.data); 
  //           // setLoading(false);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching user data:", error);

  //         });
  //     } else {

  //     }
  //   }, []);

  const [user2, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const sidebarNavItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Profile",
      href: "/profile",
    },
    {
      title: "Announcements",
      href: "/announcements",
    },

  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <div className="relative md:flex-grow md:flex gap-8 px-6 lg:px-2 max-w-8xl md:mx-auto py-12">
        <div className={`hidden ${user2 ? 'md:flex' : 'hidden'} relative w-1/3 flex-col gap-4 p-2`}>

          {user2 && (
            <>
              <div className="sticky top-[130px]">
              <SidebarNav items={sidebarNavItems} />
              </div>
            </>
          )}
        </div>
        <div className="md:w-screen">
          {pageName && (
            <h1 className="font-bold text-2xl mb-4">{pageName}</h1>
          )}
          {children}

        </div>
      </div>
      <footer className="bg-primary text-white text-center text-xs p-3">
        PSU Alumni Tracer System 2024. All Rights Reserved
      </footer>
    </div>
  );
}
