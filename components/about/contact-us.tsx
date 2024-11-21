"use client";

import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-base-100 p-6 mt-10 rounded-lg shadow-lg flex-[1] lg:flex-[0.4] max-w-screen-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">
        Contact Us!
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          fetch("/api/contact-us", {
            method: "POST",
            body: formData,
          });
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-base-200 text-base-content w-full border border-base-300 rounded-md p-2 focus:ring focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-base-200 text-base-content w-full border border-base-300 rounded-md p-2 focus:ring focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="bg-base-200 text-base-content w-full border border-base-300 rounded-md p-2 focus:ring focus:ring-primary focus:outline-none"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary px-10"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
