import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10 shadow-lg border-t-2 dark:border-t-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Image
              src="/icons/app/stellarHorizons.png"
              alt="Stellar Horizons Logo"
              width={55}
              height={20}
              className="w-auto h-auto"
            />
            <span className="text-lg md:text-xl font-bold tracking-wide text-center">
              Stellar Horizons
            </span>
          </div>

          {/* Navigation Links */}

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-center space-x-2">
            <Link
              href="/welcome"
              className="p-4 text-sm md:text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Welcome
            </Link>
            <Link
              href="/"
              className="p-4 text-sm md:text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>
            <Link
              href={"/profile"}
              className="p-4 text-sm md:text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Profile
            </Link>
            <Link
              href="/about"
              className="p-4 text-sm md:text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              About Us
            </Link>
            <Link
              href={"/bookings"}
              className="p-4 text-sm md:text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Bookings
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Stellar Horizons. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
