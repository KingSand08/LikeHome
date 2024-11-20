import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white p-6 mt-10 rounded-lg shadow-lg flex-[1] lg:flex-[0.4] max-w-screen-md ml-auto mr-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Us!</h2>
      <form>
        <div className="mb-4 ">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
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
  );
};

export default ContactUs;
