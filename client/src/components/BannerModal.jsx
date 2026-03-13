import React, { useState, useEffect } from "react";
// import { act } from "react";

export default function BannerModal() {
  const [activeBanner, setActiveBanner] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/flash-banner");
        const data = await res.json();

        const active = (data.data || []).find(
          (b) => b.status === true && b.isDeleted === false,
        );
        console.log(active);
        if (active) {
          setActiveBanner(active);
          setTimeout(() => setIsOpen(true), 300);
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
      }
    };

    fetchBanner();
  }, []);

  if (!activeBanner) return null;

  const handleClick = () => {
    if (activeBanner.url) window.open(activeBanner.url, "_blank");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <button
              className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {activeBanner.photo && (
              <img
                src={`http://localhost:5000/uploads/${activeBanner.photo}`}
                alt={activeBanner.title}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={handleClick}
              />
            )}

            {activeBanner.buttonText && activeBanner.url && (
              <div className="p-4 text-center">
                <button
                  className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  onClick={handleClick}
                >
                  {activeBanner.buttonText}
                </button>
              </div>
            )}
          </div>

          <style jsx>{`
            @keyframes scale-in {
              from {
                transform: scale(0.85);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-scale-in {
              animation: scale-in 0.3s ease-out;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
