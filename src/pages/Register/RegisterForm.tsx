import React, { useState, useEffect } from "react";
import { useAuth } from "../../context";
import TermsCheckbox from "../../components/ui/TermsCheckbox";

interface RegisterFormProps {
  onLoginClick: () => void;
}

interface MediaInput {
  url: string;
  alt: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick }) => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    venueManager: false,
  });
  const [avatar, setAvatar] = useState<MediaInput>({ url: "", alt: "" });
  const [banner, setBanner] = useState<MediaInput>({ url: "", alt: "" });
  const [usernamePreview, setUsernamePreview] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    if (error) clearError();
  };

  const handleMediaChange = (
    type: "avatar" | "banner",
    field: "url" | "alt",
    value: string
  ) => {
    if (type === "avatar") {
      setAvatar((prev) => ({ ...prev, [field]: value }));
    } else {
      setBanner((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Generate username preview whenever names change
  useEffect(() => {
    const preview = generateUsername(formData.firstName, formData.lastName);
    setUsernamePreview(preview);
  }, [formData.firstName, formData.lastName]);

  const generateUsername = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      setValidationError("Both first and last name are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords don't match!");
      return;
    }

    if (!termsAccepted) {
      setValidationError("Please accept the terms and conditions");
      return;
    }

    const username = generateUsername(formData.firstName, formData.lastName);
    if (username.length < 3) {
      setValidationError("Username must be at least 3 characters");
      return;
    }

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setValidationError("Email must be a @stud.noroff.no address");
      return;
    }

    // Validate URLs if provided
    if (avatar.url && !isValidUrl(avatar.url)) {
      setValidationError("Please enter a valid avatar URL");
      return;
    }

    if (banner.url && !isValidUrl(banner.url)) {
      setValidationError("Please enter a valid banner URL");
      return;
    }

    try {
      await register({
        name: username,
        email: formData.email,
        password: formData.password,
        bio: formData.bio || undefined,
        avatar: avatar.url || undefined,
        banner: banner.url || undefined,
        venueManager: formData.venueManager,
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <div className="w-full flex flex-col mb-2">
        <h3 className="h3 mb-2">Create Account</h3>
        <p className="text-base mb-6">
          Join us today and start your style journey.
        </p>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {validationError && (
        <div className="text-red-500 mb-4">{validationError}</div>
      )}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
              required
              value={formData.firstName}
              onChange={handleChange}
              pattern="[a-zA-Z0-9 ]+"
              title="Only letters, numbers, and spaces allowed"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
              required
              value={formData.lastName}
              onChange={handleChange}
              pattern="[a-zA-Z0-9 ]+"
              title="Only letters, numbers, and spaces allowed"
            />
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Your username will be:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {usernamePreview || "..."}
          </span>
          <p className="text-xs mt-1">
            (Only lowercase letters, numbers, and underscores allowed)
          </p>
        </div>

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="your.name@stud.noroff.no"
          className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password (min. 8 characters)"
          minLength={8}
          className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword" className="sr-only">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="bio" className="sr-only">
          Bio
        </label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself (optional)"
          className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
          rows={3}
          value={formData.bio}
          onChange={handleChange}
        />

        {/* Avatar URL Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture URL (optional)
          </label>
          {avatar.url && (
            <div className="flex items-center gap-4 mb-2">
              <img
                src={avatar.url}
                alt={avatar.alt || "Avatar preview"}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setAvatar({ url: "", alt: "" })}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          )}
          <input
            type="url"
            placeholder="https://example.com/avatar.jpg"
            className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
            value={avatar.url}
            onChange={(e) => handleMediaChange("avatar", "url", e.target.value)}
          />
          <input
            type="text"
            placeholder="Alt text for avatar (optional)"
            className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
            value={avatar.alt}
            onChange={(e) => handleMediaChange("avatar", "alt", e.target.value)}
          />
        </div>

        {/* Banner URL Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner Image URL (optional)
          </label>
          {banner.url && (
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-4">
                <img
                  src={banner.url}
                  alt={banner.alt || "Banner preview"}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setBanner({ url: "", alt: "" })}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
          <input
            type="url"
            placeholder="https://example.com/banner.jpg"
            className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
            value={banner.url}
            onChange={(e) => handleMediaChange("banner", "url", e.target.value)}
          />
          <input
            type="text"
            placeholder="Alt text for banner (optional)"
            className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
            value={banner.alt}
            onChange={(e) => handleMediaChange("banner", "alt", e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4 py-4">
          <input
            type="checkbox"
            id="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
            className="h-4 w-4 text-accent rounded focus:ring-accent"
          />
          <label htmlFor="venueManager" className="ml-2 text-sm text-gray-700">
            I want to register as a venue manager
          </label>
        </div>

        <TermsCheckbox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />

        <div className="text-center mt-4 mb-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-accent hover:text-accent-dark font-medium"
            >
              Login here
            </button>
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-lg btn-primary py-3 mb-4"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
