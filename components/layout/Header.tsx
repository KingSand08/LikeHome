import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header className="py-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* logo */}
          <a href="./">
            <div className="flex items-center gap-5 justify-center xl:w-max">
              {/* Replace with product logo later */}
              <Image
                src="/stellarHorizons.png"
                alt="LikeHome Logo"
                width={55}
                height={20}
              />
              <span className="ml-2 text-lg font-bold">LikeHome</span>{" "}
              {/* Text displayed next to image */}
            </div>
          </a>
          <div className="flex items-center gap-8 ">
            {/* Navigation Links */}
            <input
              type="text"
              placeholder="Search"
              className="input input-primary text-neutral w-full max-w-xs" 
            />
            <nav className="flex items-center gap-8">
              {" "}
              {/* Flex container for navigation items */}
              <div className="text-primary-content hover:text-accent cursor-pointer">
                Contact
              </div>
            </nav>
            {/* sign in & register */}
          
            <button className="btn px-4 py-2 btn-secondary text-secondary-content rounded ">
              {" "}
              {/* Sign In Button */}
              SIGN IN
            </button>
            <button className="btn px-4 py-2 btn-primary text-primary-content rounded ">
              {" "}
              {/* Register Button */}
              REGISTER
            </button>
            {/* <ThemeSwitch /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
