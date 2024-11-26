"use client";

import React from "react";

const ContactUs = () => {
  return (
    <div className="p-8 mt-16 rounded-xl shadow-2xl bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 max-w-screen-md mx-auto">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-700 dark:text-blue-400">
        Contact Us!
      </h2>
      <p className="text-center mb-8 text-lg">
        {"We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible."}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          fetch("/api/contact-us", {
            method: "POST",
            body: formData,
          });
        }}
        className="space-y-6"
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2"
          >
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-10 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
