import React from "react";

const team = [
  {
    name: "Mauricio Curiel",
    image: "/stellarHorizons.png",
    description:
      "Project Manager overseeing development and project milestones",
  },
  {
    name: "Ahsan Ali",
    image: "/stellarHorizons.png",
    description:
      "Backend Developer specializing in server-side development and testing.",
  },
  {
    name: "Ali Altimimi",
    image: "/stellarHorizons.png",
    description:
      "Backend Developer focused on database architecture and optimization.",
  },
  {
    name: "Connor Linville",
    image: "/stellarHorizons.png",
    description:
      "Backend Developer with expertise in deployment strategies and user authentication systems.",
  },
  {
    name: "Steven Lu",
    image: "/stellarHorizons.png",
    description:
      "Frontend Developer responsible for implementing designs from Figma into a responsive UI.",
  },
  {
    name: "Raymund Mercader",
    image: "/stellarHorizons.png",
    description:
      "Full Stack Developer experienced in both backend and frontend development.",
  },
  {
    name: "Minh Nguyen",
    image: "/stellarHorizons.png",
    description:
      "UI/UX Designer skilled in creating intuitive user interfaces using Figma.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      {/* Team Introduction */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6">Meet the LikeHome Team</h1>
        <p className="text-lg">
          We are a group of passionate developers committed to building the best
          hotel-booking platform.
        </p>
      </section>

      {/* Team Cards */}
      <section className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
