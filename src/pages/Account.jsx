import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food/reels",
          {
            withCredentials: true,
          }
        );

        console.log("REELS:", response.data);

        setReels(response.data.data || []);
      } catch (error) {
        console.log(
          "ERROR:",
          error.response?.data || error.message
        );
      }
    };

    fetchReels();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Main Container */}
      <div className="w-full lg:w-[500px] mx-auto min-h-screen bg-black">

        {/* ================= PROFILE ================= */}
        <div className="px-4 pt-6 pb-5 border-b border-white/10">

          {/* Profile information */}
          <div className="flex items-center gap-4">

            <img
              className="w-[80px] h-[80px] rounded-full object-cover border-2 border-white/20"
              src="/download.png"
              alt="Account profile"
            />

            <div className="flex-1">

              <h1 className="text-xl font-bold">
                Food Partner
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                @foodpartner
              </p>

              <p className="text-sm text-gray-400 mt-1">
                📍 Mumbai, India
              </p>

            </div>

          </div>


          {/* Stats */}
          <div className="flex justify-around mt-6">

            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">
                {reels.length}
              </span>

              <span className="text-xs text-gray-400">
                Reels
              </span>
            </div>


            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">
                0
              </span>

              <span className="text-xs text-gray-400">
                Customers
              </span>
            </div>


            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">
                0
              </span>

              <span className="text-xs text-gray-400">
                Followers
              </span>
            </div>

          </div>


          {/* Edit / Follow button */}
          <button
            className="w-full mt-5 py-2 rounded-lg
                       bg-white text-black font-semibold
                       hover:bg-gray-200 transition"
          >
            Edit Profile
          </button>

        </div>


        {/* ================= REELS HEADER ================= */}
        <div className="px-4 py-4">

          <h2 className="text-lg font-semibold">
            Your Reels
          </h2>

        </div>


        {/* ================= REELS GRID ================= */}

        {reels.length > 0 ? (

          <div className="grid grid-cols-3 gap-[2px]">

            {reels.map((reel, index) => (

              <div
                key={reel._id || index}
                className="relative aspect-[3/4] bg-gray-900 overflow-hidden"
              >

                <video
                  src={reel.vedio}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />

                {/* Video overlay */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1">

                  <i className="ri-play-fill text-white text-sm"></i>

                  <span className="text-white text-xs font-semibold">
                    Reel
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* No reels */
          <div className="h-[300px] flex flex-col items-center justify-center">

            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">

              <i className="ri-video-line text-3xl text-gray-400"></i>

            </div>

            <p className="text-gray-400 mt-4">
              No reels added yet
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Account;