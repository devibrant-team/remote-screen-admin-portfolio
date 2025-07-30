import React from "react";
import GoogleAuthModal from "../RegisterScreen";
import { useState } from "react";
const Welcome = () => {
      const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  return (
 <div className="min-h-screen font-sans text-white">
  {showModal && <GoogleAuthModal onClose={() => setShowModal(false)} />}

  {/* 👇 Add this wrapper */}
  <div className={`${showModal ? "blur-sm pointer-events-none select-none" : ""}`}>
    {/* Hero Section */}
    <header className="bg-gradient-to-br from-white via-rose-100 to-red-600 text-gray-900 flex flex-col items-center justify-center h-screen px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
        Welcome to <span className="text-red-600">Iguana</span>
      </h1>
      <p className="mt-6 text-xl md:text-2xl max-w-2xl text-gray-800/80">
        Innovative signage that turns heads and grows your brand.
      </p>
      <button
        onClick={handleGetStarted}
        className="mt-10 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition"
      >
        Get Started with Google
      </button>
    </header>

    {/* Services Section */}
    <section className="bg-white text-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Custom Signage</h3>
            <p className="text-gray-600">
              Tailor-made signs for retail, events, and promotions that make a
              statement.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Digital Displays</h3>
            <p className="text-gray-600">
              LED & screen-based signage for indoor or outdoor environments.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">
              Installation & Maintenance
            </h3>
            <p className="text-gray-600">
              End-to-end service from design to secure installation and
              upkeep.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-red-800 text-center py-8 text-white">
      <p className="text-sm text-white/70">
        © 2025 Iguana Signage. All rights reserved.
      </p>
    </footer>
  </div>
</div>

  );
};

export default Welcome;
