import { FC } from "react";
import { Image, CreditCard, Info, LogOut, LucideIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { ModeToggle } from "./mode-toggle";

interface SidebarProps {
  setActivePage: (page: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ setActivePage }) => {
  const navItems: { icon: LucideIcon; label: string }[] = [
    { icon: Image, label: "Banner" },
    { icon: CreditCard, label: "Card" },
    { icon: Info, label: "About Us" },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between h-20 shadow-md px-4">
        <h1 className="text-3xl uppercase text-white dark:text-gray-200">Admin</h1>
        <ModeToggle />
      </div>
      <ul className="flex flex-col py-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <Button
              variant="ghost"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-400 hover:text-black dark:hover:text-white w-full justify-start"
              onClick={() => setActivePage(item.label)}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-auto pb-4">
        <Button
          variant="ghost"
          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-400 hover:text-black dark:hover:text-white w-full justify-start"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <LogOut className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
};
