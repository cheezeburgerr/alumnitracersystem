import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Link } from "react-router-dom";
import { buttonVariants } from "@/Components/ui/button"
export function SidebarNav({ className, items, ...props }) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 md:flex-col md:space-x-0 md:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
