import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
              <span className="font-bold text-lg ml-2">AlgorithmViz</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <a className={`${
                  isActive("/")
                    ? "border-blue-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Home
                </a>
              </Link>
              <Link href="/sorting">
                <a className={`${
                  isActive("/sorting")
                    ? "border-blue-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Sorting
                </a>
              </Link>
              <Link href="/pathfinding">
                <a className={`${
                  isActive("/pathfinding")
                    ? "border-blue-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Pathfinding
                </a>
              </Link>
              <Link href="/about">
                <a className={`${
                  isActive("/about")
                    ? "border-blue-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  About
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="sm:hidden ml-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/">
            <a className={`${
              isActive("/")
                ? "bg-blue-50 dark:bg-gray-700 border-blue-500 text-blue-700 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Home
            </a>
          </Link>
          <Link href="/sorting">
            <a className={`${
              isActive("/sorting")
                ? "bg-blue-50 dark:bg-gray-700 border-blue-500 text-blue-700 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Sorting
            </a>
          </Link>
          <Link href="/pathfinding">
            <a className={`${
              isActive("/pathfinding")
                ? "bg-blue-50 dark:bg-gray-700 border-blue-500 text-blue-700 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Pathfinding
            </a>
          </Link>
          <Link href="/about">
            <a className={`${
              isActive("/about")
                ? "bg-blue-50 dark:bg-gray-700 border-blue-500 text-blue-700 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              About
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
