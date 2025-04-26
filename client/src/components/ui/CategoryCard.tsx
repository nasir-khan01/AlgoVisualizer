import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ReactNode } from "react";

type CategoryCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  iconBgClass: string;
  buttonText: string;
  buttonLink: string;
  buttonColorClass: string;
};

const CategoryCard = ({
  title,
  description,
  icon,
  iconBgClass,
  buttonText,
  buttonLink,
  buttonColorClass
}: CategoryCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition duration-300 hover:shadow-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`${iconBgClass} p-3 rounded-full mr-4`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Link href={buttonLink}>
            <Button className={`inline-flex items-center px-4 py-2 ${buttonColorClass}`}>
              {buttonText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
