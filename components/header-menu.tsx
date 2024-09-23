"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, Folder, LogOut } from 'lucide-react';

const HeaderMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { signOut } = useAuth(); 

  const toggleMenu = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleItemClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = async () => {
    await signOut(); 
    router.push("/"); 
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          onClick={toggleMenu} 
          className="mr-4" 
          variant="ghost" 
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleItemClick("/dashboard")}>
          <Folder className="mr-2 h-4 w-4" />
          <span>Projects</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
