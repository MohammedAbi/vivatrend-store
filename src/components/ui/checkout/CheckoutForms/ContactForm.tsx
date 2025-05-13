import React from "react";
import { FiUser, FiMail, FiMapPin } from "react-icons/fi";
import { CheckoutFormData } from "../CheckoutForms/types";

interface ContactFormProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onInputChange,
  onContinue,
}) => (
  <div className="bg-white rounded-lg p-6 mb-6 border">
    <h2 className="text-xl font-bold text-primary mb-6">Contact Information</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-sm font-medium text-primary/70 mb-1"
            htmlFor="firstName"
          >
            First Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="w-full pl-10 pr-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
              required
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-primary/70 mb-1"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            className="w-full px-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-primary/70 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full pl-10 pr-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-primary/70 mb-1"
          htmlFor="address"
        >
          Address
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={onInputChange}
            className="w-full pl-10 pr-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-primary/70 mb-1"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={onInputChange}
            className="w-full px-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-primary/70 mb-1"
            htmlFor="zipCode"
          >
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            value={formData.zipCode}
            onChange={onInputChange}
            className="w-full px-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="btn btn-primary btn-lg bg-accent text-white hover:bg-accent/90"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
);

export default ContactForm;
