const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10 bg-gray-100">
      <h1 className="h2 text-red-600">404</h1>
      <p className="h3 text-gray-700">Page Not Found</p>
      <p className="text-lg mt-4 text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <div className="mt-6">
        <a href="/" className="btn btn-primary text-lg">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
