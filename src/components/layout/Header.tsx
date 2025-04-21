// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsList, BsX } from "react-icons/bs";
// import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
// import { useCart } from "../../hooks/useCart";
// import { useAuth } from "../../context";

// const Header: React.FC = () => {
//   const [header, setHeader] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { getCartItemCount, toggleCart } = useCart();
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const cartItemCount = getCartItemCount();

//   useEffect(() => {
//     const handleScroll = () => {
//       setHeader(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleLogout = () => {
//     logout();
//     closeMenu();
//     navigate("/");
//   };

//   const formatUsername = (username: string) => {
//     return username
//       .split("_")
//       .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
//       .join(" ");
//   };

//   return (
//     <header
//       className={`${
//         header ? "bg-white py-6 shadow-lg" : "bg-black py-8"
//       } fixed left-0 z-50 w-full transition-all duration-500`}
//     >
//       <div className="container mx-auto flex items-center justify-between lg:gap-x-8 px-3">
//         {/* Logo */}
//         <Link
//           to="/"
//           className={`${
//             header ? "text-accent" : "text-white"
//           } text-3xl font-bold`}
//         >
//           VivaTrend
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           className={`lg:hidden text-2xl transition-colors duration-300 ${
//             header ? "text-accent" : "text-white"
//           }`}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//         >
//           {isMenuOpen ? <BsX /> : <BsList />}
//         </button>

//         {/* Desktop Navigation */}
//         <nav
//           className={`${
//             header ? "text-black" : "text-gray-200"
//           } hidden lg:flex gap-x-4 px-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
//         >
//           <Link to="/" className="hover:text-accent hover:underline transition">
//             Home
//           </Link>
//           <Link
//             to="/products"
//             className="hover:text-accent hover:underline transition"
//           >
//             Products
//           </Link>
//           <Link
//             to="/contact"
//             className="hover:text-accent hover:underline transition"
//           >
//             Contact
//           </Link>

//           {/* Cart Button */}
//           <button
//             onClick={toggleCart}
//             className="hover:text-accent hover:underline transition flex items-center relative"
//             aria-label="Cart"
//           >
//             <FaShoppingCart className="text-2xl" />
//             {cartItemCount > 0 && (
//               <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItemCount}
//               </span>
//             )}
//           </button>

//           {/* Profile/Login Section */}
//           {user ? (
//             <div className="flex items-center gap-2">
//               <Link
//                 to="/profile"
//                 className="hover:text-accent hover:underline transition flex items-center gap-1"
//               >
//                 <span className="normal-case">{formatUsername(user.name)}</span>
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="hover:text-accent hover:underline transition flex items-center"
//                 aria-label="Logout"
//               >
//                 <FaSignOutAlt className="text-xl ml-2" />
//               </button>
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               className="hover:text-accent hover:underline transition flex items-center"
//               aria-label="Login"
//             >
//               <FaUserCircle className="text-2xl" />
//             </Link>
//           )}
//         </nav>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
//           <nav className="flex flex-col items-center p-4">
//             <Link
//               to="/"
//               className="py-2 text-gray-800 hover:text-accent"
//               onClick={closeMenu}
//             >
//               Home
//             </Link>
//             <Link
//               to="/products"
//               className="py-2 text-gray-800 hover:text-accent"
//               onClick={closeMenu}
//             >
//               Products
//             </Link>
//             <Link
//               to="/contact"
//               className="py-2 text-gray-800 hover:text-accent"
//               onClick={closeMenu}
//             >
//               Contact
//             </Link>
//             <button
//               onClick={() => {
//                 toggleCart();
//                 closeMenu();
//               }}
//               className="py-2 text-gray-800 hover:text-accent flex items-center relative"
//             >
//               <FaShoppingCart className="text-2xl mr-2" />
//               {cartItemCount > 0 && (
//                 <span className="bg-red-600 text-white text-xs rounded-full px-2">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
//             {user ? (
//               <>
//                 <Link
//                   to="/profile"
//                   className="py-2 text-gray-800 hover:text-accent flex items-center"
//                   onClick={closeMenu}
//                 >
//                   <span className="normal-case">
//                     {formatUsername(user.name)}
//                   </span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="py-2 text-gray-800 hover:text-accent flex items-center"
//                 >
//                   <FaSignOutAlt className="text-xl mr-2" />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="py-2 text-gray-800 hover:text-accent flex items-center"
//                 onClick={closeMenu}
//               >
//                 <FaUserCircle className="text-2xl mr-2" />
//                 Login
//               </Link>
//             )}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsList, BsX } from "react-icons/bs";
import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../context";

const Header: React.FC = () => {
  const [header, setHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const formatUsername = (username: string) => {
    return username
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-black py-8"
      } fixed left-0 z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex items-center justify-between lg:gap-x-8 px-3">
        {/* Logo */}
        <Link
          to="/"
          className={`${
            header ? "text-accent" : "text-white"
          } text-3xl font-bold`}
        >
          VivaTrend
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden text-2xl transition-colors duration-300 ${
            header ? "text-accent" : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <BsX /> : <BsList />}
        </button>

        {/* Desktop Navigation */}
        <nav
          className={`${
            header ? "text-black" : "text-gray-200"
          } hidden lg:flex gap-x-4 px-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <Link to="/" className="hover:text-accent hover:underline transition">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-accent hover:underline transition"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="hover:text-accent hover:underline transition"
          >
            Contact
          </Link>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="hover:text-accent hover:underline transition flex items-center relative"
            aria-label="Cart"
          >
            <FaShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile/Login Section */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="hover:text-accent hover:underline transition flex items-center gap-1"
              >
                <span className="normal-case">{formatUsername(user.name)}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-accent hover:underline transition flex items-center"
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-xl ml-2" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-accent hover:underline transition flex items-center"
              aria-label="Login"
            >
              <FaUserCircle className="text-2xl" />
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
          <nav className="flex flex-col items-center p-4">
            <Link
              to="/"
              className="py-2 text-gray-800 hover:text-accent"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="py-2 text-gray-800 hover:text-accent"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="py-2 text-gray-800 hover:text-accent"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                toggleCart();
                closeMenu();
              }}
              className="py-2 text-gray-800 hover:text-accent flex items-center relative"
            >
              <FaShoppingCart className="text-2xl mr-2" />
              {cartItemCount > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full px-2">
                  {cartItemCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="py-2 text-gray-800 hover:text-accent flex items-center"
                  onClick={closeMenu}
                >
                  <span className="normal-case">
                    {formatUsername(user.name)}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 text-gray-800 hover:text-accent flex items-center"
                >
                  <FaSignOutAlt className="text-xl mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="py-2 text-gray-800 hover:text-accent flex items-center"
                onClick={closeMenu}
              >
                <FaUserCircle className="text-2xl mr-2" />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
