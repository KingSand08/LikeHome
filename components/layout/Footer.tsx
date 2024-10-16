import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-accent py-[50px] lg:py-[50px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* logo */}
          <div className="flex items-center gap-5 justify-center xl:w-max">
            <Image
              src="/stellarHorizons.png"
              alt="Stellar Horizons Logo"
              width={55}
              height={20}
            />
            <span className="ml-2 text-lg font-bold text-accent-content">Stellar Horizons</span>{" "}
            {/* Text displayed next to image */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
