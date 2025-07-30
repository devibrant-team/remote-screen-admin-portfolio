import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setGoogleUser, setPasswords, registerUser } from "../Redux/authSlice";
import { Eye, EyeOff } from "lucide-react"; // or use heroicons if you prefer

// Zod schema for password validation
const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const GoogleAuthModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const googleUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [step, setStep] = useState("google");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    try {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id &&
        step === "google"
      ) {
        window.google.accounts.id.initialize({
          client_id:
            "858482116776-o25eg40gipsiaapmdkb9vvon50tcrfjq.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          {
            theme: "outline",
            size: "large",
            text: "continue_with",
          }
        );

        window.google.accounts.id.prompt();
      }
    } catch (error) {
      console.error("Google API error:", error);
    }
  }, [step]);

  const handleCredentialResponse = (response) => {
    const idToken = response.credential;
    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const userObject = JSON.parse(jsonPayload);

    const payloadToBackend = {
      idToken,
      googleId: userObject.sub,
      email: userObject.email,
      emailVerified: userObject.email_verified,
      name: userObject.name,
      givenName: userObject.given_name,
      familyName: userObject.family_name,
      picture: userObject.picture,
      locale: userObject.locale,
    };

    dispatch(setGoogleUser(payloadToBackend));
    setStep("password");
  };

  const onSubmit = (data) => {
    dispatch(setPasswords(data));
    dispatch(
      registerUser({
        name: googleUser?.name || "",
        email: googleUser?.email || "",
        password: data.password,
      })
    ).then((res) => {
      if (res.type === "auth/registerUser/fulfilled") {
        alert("Registration successful!");
        onClose();
      } else {
        alert("Failed to register: " + (res.payload || "Unknown error"));
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {step === "google" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Register with Google
            </h2>
            <div id="googleSignInDiv" className="flex justify-center"></div>
          </>
        )}

        {step === "password" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Set Your Password
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md p-3 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                  {...register("password")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.password.message}
                </p>
              )}

              <div className="relative mb-4">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-md p-3 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.confirmPassword.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Registering..." : "Continue"}
              </button>
              {error && <p className="mt-3 text-red-600">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleAuthModal;
