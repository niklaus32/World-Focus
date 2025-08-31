import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">UOACS/WINCS</h1>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-gray-200">HOME</a>
          <a href="/about" className="hover:text-gray-200">ABOUT</a>
          <a href="/resources" className="hover:text-gray-200">RESOURCES</a>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;