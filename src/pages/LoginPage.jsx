import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function LoginPage({ userInfo, setCurrentUser }) {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
  });

  const navigate = useNavigate();

  const userSubmit = (values) => {
    const user = userInfo.find((u) => u.username === values.username);

    if (!user || user.password !== values.password) {
      toast.error("Invalid username or password");
      return;
    }

    toast.success("Login successful!");
    user.isloggedIn = true;
    setCurrentUser(user);
    navigate("/");
  };
  return (
    <div className="w-full min-h-dvh flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white/15 backdrop-blur-md border flex flex-col items-center border-white/25 rounded-2xl shadow-2xl p-8 w-90">
        <img
          className="w-30 h-auto object-cover"
          src={logo}
          alt="InstaPay Logo"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <Formik
          onSubmit={userSubmit}
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
        >
          <Form className="space-y-4 w-full">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white mb-1">
                Username
              </label>
              <Field
                type="text"
                className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                name="username"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm"
              />
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <Field
                type="password"
                className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />

              <span className="text-sm text-white">
                Don't have an account?{" "}
                <Link
                  to="/Register"
                  className="text-purple-600 hover:underline"
                >
                  Register
                </Link>
              </span>
              <button
                type="submit"
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
