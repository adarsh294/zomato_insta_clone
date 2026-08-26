import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
const Account = () => {
    const [zoomed, setzoomed] = useState(false)
  const [reels, setReels] = useState([]);
  const [partnername, setpartnername] = useState('');
  const [email, setemail] = useState('');
  const [followers, setfollowers] = useState();
  const [profile, setprofile] = useState('');
const { foodPartnerId } = useParams();
 useEffect(() => {
  const fetchFoodPartner = async () => {
    try {
      if (!foodPartnerId || foodPartnerId === "undefined") {
        return;
      }

      const response = await axios.get(
         `http://localhost:3000/api/food/account/${foodPartnerId}`,
        {
        //   params: { find: foodPartnerId },
          withCredentials: true,
        }
      );

      const partnerData = response.data?.data || [];
      const firstItem = partnerData[0];

      setpartnername(firstItem?.foodpartner?.name || "food partner");
      setemail(firstItem?.foodpartner?.email || "no email found");
      setfollowers(firstItem?.foodpartner?.followers )
      setprofile(firstItem?.foodpartner?.profile)
      console.log("FOOD PARTNER RESPONSE:", response.data);
      setReels(partnerData);
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  fetchFoodPartner();
}, [foodPartnerId]);
const zoom = async () =>{
  setzoomed(prev => !prev);
}
  return (
    <div className="min-h-screen bg-[#121212] text-white">

      {/* Main Coniner */}
      <div className={`account w-full lg:w-[450px] mx-auto min-h-screen bg-black ${zoomed?'bg-black/50 backdrop-blur-md':''}`}>

        {/* PROFILE  */}
        <div className="px-4 pt-6 pb-5 border-b border-white/10">

          {/* Profile information */}
          <div className="flex items-center gap-10 pr-[20px]">

            <img onClick={zoom}  
              className={`w-[80px] h-[80px] rounded-full object-cover transition-all duration-300 border-2 border-white/20  ${zoomed
      ? "fixed inset-0 m-auto w-[300px] h-[300px] z-50 rounded-full "
      : "w-[80px] h-[80px] rounded-full"
    }`}
              src={profile?profile:"/download.png"}
              alt="Account profile"
            />

            <div className="flex-1">

              <h1 className="text-xl font-bold tracking-tight">
                {partnername?partnername:"food partner"}
              </h1>

              <p className="text-sm text-gray-400 mt-1 font-medium">
                @foodpartner
              </p>


              <p className="text-sm text-gray-400 mt-1">
                  {reels[0]?.foodpartner?.address}
              </p>
          
            </div>
          </div>
           <p className="text-sm text-gray-400 mt-2">
         {email?email:"no email found"}
           </p>

          {/* Stats */}
          {/* <div className="flex justify-around mt-6">

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
                {followers?followers:"0"}
              </span>

              <span className="text-xs text-gray-400">
                Followers
              </span>
            </div>

          </div> */}
     <div className="flex justify-around mt-6">

  <div className="flex flex-col items-center">
    <span className="text-xl font-bold tracking-tight">
      {reels.length}
    </span>
    <span className="text-xs text-gray-400 mt-1">
      Reels
    </span>
  </div>

  <div className="flex flex-col items-center">
    <span className="text-xl font-bold tracking-tight">
      0
    </span>
    <span className="text-xs text-gray-400 mt-1">
      Customers
    </span>
  </div>

  <div className="flex flex-col items-center">
    <span className="text-xl font-bold tracking-tight">
      {followers || 0}
    </span>
    <span className="text-xs text-gray-400 mt-1">
      Followers
    </span>
  </div>

</div>

          

        </div>

    {/* <div className="a w-full flex justify-center gap-3.5 px-[10px]">
    <button className="py-[0.3rem] bg-blue-400 flex-1  font-bold font-sans text-white rounded-[5px]">follow</button>  <button className="py-[0.3rem] bg-white flex-1  font-bold font-sans text-black rounded-[5px]">message</button>
    </div> */}
    <div className="w-full flex gap-3 px-3 mt-1">
  <button className="flex-1 py-2 bg-blue-400 hover:bg-blue-500 font-semibold text-black rounded-lg transition">
    Follow
  </button>

  <button className="flex-1 py-2 bg-white hover:bg-gray-200 font-semibold text-black rounded-lg transition">
    Message
  </button>
</div>
        {/* REELS HEADER */}
        <div className="px-4 py-4">

          <h2 className="text-lg font-semibold">
           Reels
          </h2>

        </div>


        {/* REELS GRID  */}

        {reels.length > 0 ? (

          <div className="grid grid-cols-3 gap-[4px] px-[5px]">

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
                  className="w-full h-full object-cover rounded-[4px]"
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