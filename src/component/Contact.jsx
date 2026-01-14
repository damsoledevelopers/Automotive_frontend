import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaPaperclip } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="wrapper bg-white p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Help & <span className="text-red-500">Support</span>
        </h1>
        <div className="flex gap-4 sm:gap-6 text-red-600 font-medium text-sm sm:text-base justify-end sm:justify-start">
          <a href="/faq" className="hover:underline whitespace-nowrap">
            FAQ
          </a>
          <a href="/my-tickets" className="hover:underline whitespace-nowrap">
            My Tickets
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
        {/* Left Section - Location & Phone */}
        <div className="md:w-1/2 flex flex-col gap-6 sm:gap-8">
          {/* Location */}
          <div className="flex gap-3 sm:gap-4 items-start">
            <FaMapMarkerAlt className="text-red-500 text-xl sm:text-2xl mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-semibold mb-2">Location</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Smart Parts Online Private Limited <br />
                Unit Nos. 1609 &amp; 1610, 16th floor, Magnum Global Park <br />
                Golf Course Extension Road, Sector - 58 <br />
                Gurugram, Haryana, 122011
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-3 sm:gap-4 items-start sm:items-center">
            <FaPhoneAlt className="text-sky-500 text-xl sm:text-2xl flex-shrink-0 mt-1 sm:mt-0" />
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-0">Phone</h2>
              <a
                href="tel:+911141189222"
                className="text-sm sm:text-base text-sky-600 hover:underline break-all"
              >
                +91 114 1189222
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2">
          <form className="space-y-3 sm:space-y-4">
            <input
              type="email"
              placeholder="Email"
              value="abc@gmail.com"
              disabled
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <select className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500">
              <option>Question type</option>
              <option>Help me find spare part for my car</option>
              <option>Order related query</option>
              <option>Refund and return related</option>
              <option>I want to become seller</option>
              <option>I want to become B2B customer</option>
              <option>Error or problem with website/app</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Comment"
              rows="4"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md text-sm sm:text-base resize-y focus:outline-none focus:ring-2 focus:ring-gray-500"
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center justify-center gap-2 hover:bg-sky-400 hover:text-white border border-dashed border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm text-gray-600 cursor-pointer transition-colors w-full sm:w-1/2">
                <FaPaperclip className="text-sm sm:text-base" /> 
                <span className="whitespace-nowrap">Attach files</span>
                <input type="file" multiple hidden />
              </label>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium hover:bg-red-600 transition-colors w-full sm:w-1/2"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 sm:mt-10 md:mt-12 border-t border-gray-200 pt-4 sm:pt-6 text-gray-700 space-y-4 sm:space-y-6">
        <p className="text-sm sm:text-base leading-relaxed">
          At boodmo, we are committed to providing exceptional service and
          support. If you have any questions, concerns, or feedback, please
          don't hesitate to reach out to us.
        </p>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Customer Support</h3>
          <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>
              <strong>Phone (IVR):</strong>{" "}
              <a href="tel:+911141189222" className="text-red-600 hover:underline break-all">
                +91 114 1189222
              </a>
            </li>
            <li>
              <strong>Operating Hours:</strong> All days, 10:00 to 19:00 IST
              (except public holidays)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Address</h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Smart Parts Online Private Limited <br />
            Unit Nos. 1609 &amp; 1610, 16th floor, Magnum Global Park <br />
            Golf Course Extension Road, Sector - 58 <br />
            Gurugram, Haryana, 122011
          </p>
          <p className="text-sm sm:text-base text-red-500 font-semibold mt-2 sm:mt-3">
            Please do not send order returns to the above-mentioned address. They
            will not be delivered and returned to you.
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Business Inquiries</h3>
          <p className="text-sm sm:text-base leading-relaxed">
            For business partnerships, bulk orders, or corporate-related
            questions:{" "}
            <a
              href="https://boodmo.com/pages/static/become_a_vendor_on_boodmo/"
              className="text-sky-600 hover:underline break-all"
            >
              Become a Vendor
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Follow Us</h3>
          <ul className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
            <li>
              <a
                href="https://www.facebook.com/boodmocom/"
                className="text-sky-600 hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.x.com/boodmo_In"
                className="text-sky-600 hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/boodmo-com"
                className="text-sky-600 hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Contact;
