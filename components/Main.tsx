import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="bg-teal-100 flex-grow max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
      {children}
    </main>
  );
};
