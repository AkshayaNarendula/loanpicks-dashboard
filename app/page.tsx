"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function AuthPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [loading, setLoading] = useState(false);  // ⭐ NEW — speed improvement

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true); // ⭐ Show instant feedback

    if (!isLogin) {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      } else {
        setShowPopup(true);
        setLoading(false);
      }
      return;
    }

    // LOGIN MODE
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // ⭐ INSTANT FEEL NAVIGATION
    router.push("/dashboard?loading=true");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-black">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          {isLogin ? "Log In" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* EMAIL */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-500 text-xl" />
            <input
              className="border w-full p-3 pl-12 rounded-lg focus:outline-purple-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-500 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              className="border w-full p-3 pl-12 pr-12 rounded-lg focus:outline-purple-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {showPassword ? (
              <FiEyeOff
                className="absolute right-3 top-3.5 text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                className="absolute right-3 top-3.5 text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          {!isLogin && (
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-500 text-xl" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="border w-full p-3 pl-12 pr-12 rounded-lg focus:outline-purple-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {showConfirmPassword ? (
                <FiEyeOff
                  className="absolute right-3 top-3.5 text-gray-600 text-xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FiEye
                  className="absolute right-3 top-3.5 text-gray-600 text-xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
          )}

          {/* ERROR */}
          {errorMsg && (
            <p className="text-red-600 text-center -mt-2">{errorMsg}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg text-lg text-white transition 
            ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
              ? "Log In"
              : "Create Account"}
          </button>
        </form>

        {/* Switch */}
        <p className="text-center mt-6">
          {isLogin ? (
            <>
              Not registered yet?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(false)}>
                Create an Account
              </span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(true)}>
                Log in
              </span>
            </>
          )}
        </p>

      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[350px]">
            <h2 className="text-xl font-semibold mb-3">Verify Your Email</h2>
            <p className="text-gray-700 mb-5">
              A confirmation link has been sent to <br />
              <strong>{email}</strong>
              <br />
              Please check your inbox to continue.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
