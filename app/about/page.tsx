import Image from "next/image";
import React from "react";

const DEFAULT_IMAGE = "/icons/app/stellarHorizons.png" as const;

const team = [
  {
    name: "Mauricio Curiel",
    image: "/images/team/mau.png",
    description:
      "Project Manager overseeing development and project milestones",
    email: "",
  },
  {
    name: "Ahsan Ali",
    image: "/images/team/Ahsan.png",
    description:
      "Backend Developer specializing in server-side development and testing.",
    email: "",
  },
  {
    name: "Ali Altimimi",
    image: "/images/team/Ali.png",
    description:
      "Backend Developer focused on database architecture and optimization.",
    email: "",
  },
  {
    name: "Connor Linville",
    image: "/images/team/Connor.png",
    description:
      "Backend Developer with expertise in deployment strategies and user authentication systems.",
    email: "",
  },
  {
    name: "Steven Lu",
    image: "/images/team/Steven.png",
    description:
      "Frontend Developer responsible for implementing designs from Figma into a responsive UI.",
    email: "",
  },
  {
    name: "Raymund Mercader",
    image: "/images/team/Raymund.png",
    description:
      "Full Stack Developer experienced in both backend and frontend development.",
    email: "",
  },
  {
    name: "Hoa Tuong Minh Nguyen",
    image: "/images/team/Minh.png",
    description:
      "UI/UX Designer on Figma and Frontend Developer.",
    email: "hoatuongminh@gmail.com",
  },
  {
    name: "Ryan Tang",
    image: "/images/team/Ryan.png",
    description: "Backend Developer focused on stripe and prisma integration.",
    email: "",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      {/* Main Flex Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Us Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex-[1] lg:flex-[0.4]">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <form>
            <div className="mb-4 ">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div >
            <div className="flex justify-center">
              <button
                type="submit"
                className=" bg-black text-white py-2 px-20 rounded-md hover:bg-blue-600 w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Meet Our Team */}
        <div className="flex-[1] lg:flex-[0.6]">
          <section className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg">
              We are a group of passionate developers committed to building the best hotel-booking platform.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg text-center"
              >
              <Image
                src={member.image}
                alt={`${member.name}'s picture`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
                width={100}
                height={100}
                quality={100}
              />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p>{member.description}</p>
                <p className="text-sm text-gray-600">
                  <a href={`mailto:${member.email}`} className="hover:text-blue-500">
                    {member.email}
                  </a>
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
