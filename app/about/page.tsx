import ContactUs from "@/components/about/contact-us";
import Image from "next/image";
import React from "react";

const team = [
  {
    name: "Mauricio Curiel",
    image: "/images/team/mau.png",
    description:
      "Project Manager overseeing development and project milestones",
    linkedin: "",
  },
  {
    name: "Ahsan Ali",
    image: "/images/team/Ahsan.png",
    description:
      "Backend Developer specializing in server-side development and testing.",
    linkedin: "",
  },
  {
    name: "Ali Altimimi",
    image: "/images/team/Ali.png",
    description:
      "Backend Developer focused on database architecture and optimization.",
    linkedin: "",
  },
  {
    name: "Connor Linville",
    image: "/images/team/Connor.png",
    description:
      "Backend Developer with expertise in deployment strategies and user authentication systems.",
    linkedin: "",
  },
  {
    name: "Steven Lu",
    image: "/images/team/Steven.png",
    description:
      "Frontend Developer responsible for implementing designs from Figma into a responsive UI.",
    linkedin: "",
  },
  {
    name: "Raymund Mercader",
    image: "/images/team/Raymund.png",
    description:
      "Full Stack Developer experienced in both backend and frontend development.",
    linkedin: "",
  },
  {
    name: "Hoa Tuong Minh Nguyen",
    image: "/images/team/Minh.png",
    description:
      "UI/UX Designer on Figma and Frontend Developer.",
    linkedin: "https://www.linkedin.com/in/hoa-nguyen-m1000/",
  },
  {
    name: "Ryan Tang",
    image: "/images/team/Ryan.png",
    description: "Backend Developer focused on stripe and prisma integration.",
    linkedin: "",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-8">
      <div className="flex-[1] lg:flex-[0.6]">
        <section className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg">
            We are a group of passionate developers committed to building the
            best hotel-booking platform.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <a
                 
                    href={member.linkedin}
                   
                  className="hover:text-blue-500"
                
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  My LinkedIn Profile
                </a>
              </p>
            </div>
          ))}
        </section>
        <ContactUs />
      </div>
    </div>
  );
};

export default AboutPage;
