import { useEffect } from "react";
import Img1 from "../assets/images/background.jpg";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  useEffect(() => {
    document.title = "VivaTrend - Contact Us";
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Main content area accounting for header */}
      <div className="flex flex-1 mt-[90px]">
        {/* Left side - hidden on mobile */}
        <div className="relative lg:w-1/2 hidden lg:flex h-[calc(100vh-90px)]">
          <div className="absolute top-[20%] left-[10%] flex flex-col max-w-[80%]">
            <h1 className="text-4xl text-white font-bold my-4 leading-tight">
              Connect With VivaTrend
            </h1>
            <p className="text-xl text-white font-normal mb-6">
              We'd love to hear from you about your style journey
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Personalized style consultations
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Quick response times
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Dedicated customer support
              </li>
            </ul>
          </div>
          <img
            src={Img1}
            alt="VivaTrend customer service representative helping a client"
            className="w-full h-full object-cover"
          />
          <div className="absolute w-full h-full bg-black/50 z-10 pointer-events-none" />
        </div>

        {/* Right side - contact form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col p-8 md:p-20 overflow-y-auto">
          <h2 className="h1 w-full max-w-[500px] mx-auto text-primary text-xl font-semibold mb-8">
            VivaTrend
          </h2>

          <div className="w-full flex flex-col max-w-[500px] mx-auto">
            <div className="w-full flex flex-col mb-6">
              <h3 className="h3 mb-2">Contact Us</h3>
              <p className="text-base mb-6">
                Have questions? Reach out and we'll get back to you within 24
                hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <FiMail className="text-accent text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-medium">Email Us</h4>
                  <p className="text-sm text-gray-600">support@vivatrend.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPhone className="text-accent text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-medium">Call Us</h4>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start md:col-span-2">
                <FiMapPin className="text-accent text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-medium">Visit Us</h4>
                  <p className="text-sm text-gray-600">
                    123 Fashion Ave, Suite 456
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <form className="w-full flex flex-col">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="w-full">
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
                    required
                  />
                </div>
              </div>

              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
                required
              />

              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message..."
                rows={4}
                className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="btn btn-lg btn-primary py-3 mt-6"
              >
                Send Message
              </button>
            </form>

            <div className="w-full flex items-center justify-center mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
