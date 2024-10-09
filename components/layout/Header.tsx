import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header className="py-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* logo */}
          <div className="flex items-center gap-5 justify-center xl:w-max">
            <Image
              src="/stellarHorizons.png"
              alt="LikeHome"
              width={55}
              height={20}
            />
            <span className="ml-2 text-lg font-bold">LikeHome</span>{" "}
            {/* Text displayed next to image */}
          </div>
          <div className="flex items-center gap-8 ">
            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              {" "}
              {/* Flex container for navigation items */}
              <div className="text-black-700 hover:text-purple-600 cursor-pointer">
                Home
              </div>
              <div className="text-black-700 hover:text-purple-600 cursor-pointer">
                Rooms
              </div>
              <div className="text-black-700 hover:text-purple-600 cursor-pointer">
                Contact
              </div>
            </nav>
            {/* sign in & register */}

            <button className="px-4 py-2 bg-black text-white rounded hover:bg-black-500">
              {" "}
              {/* Sign In Button */}
              SIGN IN
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              {" "}
              {/* Register Button */}
              REGISTER
            </button>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;