import { Link } from "react-router-dom";

const FormContainer = ({ title, subTitle, prompt, promptAction, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">{subTitle}</p>

        {children}

        <p className="mt-6 text-center text-sm text-gray-600">
          {prompt}
          <Link to="/login" className="text-indigo-600 hover:underline">
            {promptAction}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormContainer;
