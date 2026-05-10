import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function RegisterPage({ userInfo, setUserInfo }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const navigate = useNavigate();

  const userSubmit = (event) => {
    const user = userInfo.find((u) => u.username === event.username);

    if (user) {
      toast.error(
        "Username already exists. Please choose a different username.",
      );
      return;
    }
    if (event.password !== event.confirmPassword) {

      toast.error("Passwords do not match. Please try again.");
      return;
    }
    const newUser = {
      name: event.name,
      username: event.username,
      password: event.password,
      balance: 0,
      isloggedIn: false,
      transactions: [],
    };
    setUserInfo((prevUserInfo) => [...prevUserInfo, newUser]);
    toast.success("User registered successfully!");
    navigate("/Login");
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white/15 backdrop-blur-md border flex flex-col items-center border-white/25 rounded-2xl shadow-2xl p-8 w-90">
        <img
          className="w-30 h-auto object-cover"
          src={logo}
          alt="InstaPay Logo"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h2>
        <Formik
          onSubmit={userSubmit}
          initialValues={{
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
        >
          <Form className="space-y-4 w-full">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <Field
                type="text"
                className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
                name="name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
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
              <label className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <Field
                type="password"
                className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500 text-sm"
              />
              <button
                // onClick={userSubmit}
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Register
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
