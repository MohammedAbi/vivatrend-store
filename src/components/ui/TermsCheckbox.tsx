import React from "react";
import { Link } from "react-router-dom";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          checked={checked}
          onChange={onChange}
          className="mr-2"
          required
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link
            to="/terms-privacy"
            id="terms"
            className="hover:text-accent hover:underline transition"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/terms-privacy"
            id="privacy"
            className="hover:text-accent hover:underline transition"
          >
            Privacy Policy
          </Link>
        </label>
      </div>
    </div>
  );
};

export default TermsCheckbox;
