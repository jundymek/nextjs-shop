import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <main className="bg-gray-50 flex items-center p-5 flex-grow container mx-auto ">{children}</main>;
};
