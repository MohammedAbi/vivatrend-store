import { Link } from "react-router-dom";
import Img1 from "../assets/images/background.jpg";

const TermsAndPrivacy = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Main content area accounting for header */}
      <div className="flex flex-1 mt-[90px]">
        {/* Left side - hidden on mobile */}
        <div className="relative lg:w-1/2 hidden lg:flex h-[calc(100vh-90px)]">
          <div className="absolute top-[20%] left-[10%] flex flex-col max-w-[80%]">
            <h1 className="text-4xl text-white font-bold my-4 leading-tight">
              Your Trust Matters
            </h1>
            <p className="text-xl text-white font-normal mb-6">
              We're committed to transparency and protecting your rights
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Clear terms for your protection
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Responsible data handling
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Easy-to-understand policies
              </li>
            </ul>
          </div>
          <img
            src={Img1}
            alt="VivaTrend's commitment to customer trust and transparency"
            className="w-full h-full object-cover"
          />
          <div className="absolute w-full h-full bg-black/50 z-10 pointer-events-none"></div>
        </div>

        {/* Right side - content */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col p-8 md:p-20 overflow-y-auto">
          <h2 className="h1 w-full max-w-[500px] mx-auto text-primary text-xl font-semibold mb-8">
            VivaTrend
          </h2>

          <div className="w-full flex flex-col max-w-[500px] mx-auto">
            <div className="w-full flex flex-col mb-8">
              <h3 className="h3 mb-6" id="terms">
                Terms & Conditions
              </h3>

              <h4 className="text-lg font-semibold mb-2">
                1. Account Registration
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                By creating an account with VivaTrend, you confirm that all
                information provided is accurate and complete. You must be at
                least 16 years old to use our services.
              </p>

              <h4 className="text-lg font-semibold mb-2">
                2. Orders & Payments
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                All orders are subject to availability. Prices are shown in your
                local currency and include applicable taxes. We accept all major
                credit cards and PayPal.
              </p>

              <h4 className="text-lg font-semibold mb-2">
                3. Returns & Refunds
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Items may be returned within 30 days of receipt. Sale items are
                final. Refunds will be issued to the original payment method
                within 5-7 business days.
              </p>

              <h4 className="text-lg font-semibold mb-2">
                4. Intellectual Property
              </h4>
              <p className="text-sm text-gray-600 mb-6">
                All content on our platform, including designs, text, and
                images, are property of VivaTrend and protected by copyright
                laws.
              </p>

              <h3 className="h3 mb-6 mt-8" id="privacy">
                Privacy Policy
              </h3>

              <h4 className="text-lg font-semibold mb-2">
                1. Information We Collect
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                We collect personal information you provide during registration,
                purchases, and interactions with our services. This may include
                name, email, address, and payment details.
              </p>

              <h4 className="text-lg font-semibold mb-2">
                2. How We Use Your Data
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Your information is used to process orders, provide customer
                support, improve our services, and (with consent) send marketing
                communications.
              </p>

              <h4 className="text-lg font-semibold mb-2">3. Data Security</h4>
              <p className="text-sm text-gray-600 mb-4">
                We implement industry-standard security measures including
                encryption and secure servers to protect your personal
                information.
              </p>

              <h4 className="text-lg font-semibold mb-2">4. Your Rights</h4>
              <p className="text-sm text-gray-600 mb-6">
                You may access, correct, or request deletion of your personal
                data at any time by contacting our support team or through your
                account settings.
              </p>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  For any questions about these policies, please contact us at{" "}
                  <Link to="/contact" className="text-accent underline">
                    our support center
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="w-full flex items-center justify-center mt-8">
              <Link to="/register" className="btn btn-lg btn-primary py-3 px-8">
                Back to Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
