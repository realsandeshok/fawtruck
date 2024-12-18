import { Bell, User } from 'lucide-react';
import { Button } from "../../ui/button";

// Define the type for props
interface HeaderProps {
  activePage: string; // Replace `string` with a more specific type if necessary
}

export function Header({ activePage }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b-1 border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{activePage}</h1>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  );
}
