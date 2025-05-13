import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
interface LoginFormInputs {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const authenticate = async (data: LoginFormInputs): Promise<void> => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          expiresInMins: 30,
        }),
      });

      const resData = await response.json();

      if (resData && resData.accessToken) {
        localStorage.setItem("at", resData.accessToken);
        localStorage.setItem("rt", resData.refreshToken);
        navigate("/settings");
      } else {
        console.error("Login failed", resData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="h-full flex justify-center w-full bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg my-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login form
        </h2>
        <form onSubmit={handleSubmit(authenticate)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
