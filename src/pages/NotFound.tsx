import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center pt-[180px] pb-40 bg-gray-100">
      <h1 className="h2 text-red-600">404</h1>
      <p className="h3 text-gray-700">Page Not Found</p>
      <p className="text-lg mt-4 text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="btn btn-lg btn-primary py-3 px-6 text-sm sm:text-base"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
