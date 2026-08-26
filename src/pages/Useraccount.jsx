import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Useraccount = () => {
  const [reels, setReels] = useState([]);
  const [partnername, setpartnername] = useState("");
  const [profile, setprofile] = useState("");
  const [email, setemail] = useState("");
  const [followers, setfollowers] = useState(0);

  const { userid } = useParams();

  useEffect(() => {
    const fetchFoodPartner = async () => {
      try {
        console.log("userid:", userid);

        if (!userid || userid === "undefined") {
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/food/account/${userid}`,
          {
            withCredentials: true,
          }
        );

        const partnerData = response.data?.data || [];
        const firstItem = partnerData[0];

        setpartnername(
          firstItem?.foodpartner?.name || "Food Partner"
        );

        setemail(
          firstItem?.foodpartner?.email || "No email found"
        );

        setprofile(
          firstItem?.foodpartner?.profile || ""
        );

        setfollowers(
          firstItem?.foodpartner?.followers || 0
        );

        setReels(partnerData);

        console.log("FOOD PARTNER RESPONSE:", response.data);

      } catch (error) {
        console.log(
          "ERROR:",
          error.response?.data || error.message
        );
      }
    };

    fetchFoodPartner();
  }, [userid]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">

      {/* MAIN CONTAINER */}
      <div className="w-full lg:w-[450px] mx-auto min-h-screen bg-black">

        {/*  PROFILE  */}
        <div className="px-4 pt-6 pb-5 border-b border-white/10">

          {/* Profile information */}
          <div className="flex items-center gap-6">

            {/* Profile Image */}
            <img
              className="w-[80px] h-[80px] rounded-full object-cover border-2 border-white/20 flex-shrink-0"
              src={profile || "/download.png"}
              alt="Food partner profile"
            />

            {/* Name + username + address */}
            <div className="flex-1">

              <h1 className="text-xl font-bold tracking-tight">
                {partnername || "Food Partner"}
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                @foodpartner
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {reels[0]?.foodpartner?.address || ""}
              </p>

            </div>

          </div>


          {/* EMAIL */}
          <p className="text-sm text-gray-400 mt-3">
            {email || "No email found"}
          </p>


          {/*  STATS  */}
          <div className="flex justify-around mt-6">

            {/* Reels */}
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight">
                {reels.length}
              </span>

              <span className="text-xs text-gray-400 mt-1">
                Reels
              </span>
            </div>


            {/* Customers */}
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight">
                0
              </span>

              <span className="text-xs text-gray-400 mt-1">
                Customers
              </span>
            </div>


            {/* Followers */}
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight">
                {followers || 0}
              </span>

              <span className="text-xs text-gray-400 mt-1">
                Followers
              </span>
            </div>

          </div>


          {/* BUTTONS */}
          <button
  className="
    w-full
    mt-5
    py-2
    rounded-lg
    bg-white
    text-black
    font-semibold
    hover:bg-gray-200
    active:scale-[0.98]
    transition
  "
>
  Edit Profile
</button>
  </div>

        {/*  REELS HEADER  */}
        <div className="px-4 py-4">

          <h2 className="text-lg font-semibold tracking-tight">
            Reels
          </h2>

        </div>


        {/*  REELS GRID*/}

        {reels.length > 0 ? (

          <div className="grid grid-cols-3 gap-[4px] w-[97%] mx-auto">

            {reels.map((reel, index) => (

              <div
                key={reel._id || index}
                className="
                  relative
                  aspect-[3/4]
                  bg-gray-900
                  overflow-hidden
                  rounded-[3px]
                "
              >

                <video
                  src={reel.vedio}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />

                {/* VIDEO OVERLAY */}
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

          /* NO REELS */
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

export default Useraccount;