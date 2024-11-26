import ContactUs from "@/components/about/contact-us";
import Image from "next/image";
import React from "react";
import developers from "@/data/developers.json";

const AboutPage = () => {
  return (
    <div className="text-gray-800 dark:text-gray-100 p-8 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex-[1] lg:flex-[0.6] max-w-6xl mx-auto">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-6 text-primary dark:text-primary">
            Meet Our Team
          </h2>
          <p className="text-lg">
            We are a group of passionate developers committed to building the
            best hotel-booking platform.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {developers.map((member, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 dark:bg-slate-700 dark:text-gray-100 p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={member.image}
                alt={`${member.name}'s picture`}
                className="w-24 h-24 rounded-full mx-auto mb-4 ring-primary ring-[3px] ring-offset-[3px] dark:ring-offset-slate-700 ring-offset-white object-cover"
                width={100}
                height={100}
                quality={100}
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="mb-4 text-sm">{member.description}</p>
              {member.linkedin && (
                <p>
                  <a
                    href={member.linkedin}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    My LinkedIn Profile
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>

        <div className="mt-12">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
