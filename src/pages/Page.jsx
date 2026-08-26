import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tab from "./Tab.jsx"
const Page = () => {
  const authData = useSelector( (state) => state.active.activetab.foodpartner);
  const [reels, setReels] = useState([]);
   const [like, setLike] = useState([]);
   const [foodpartner, setfoodpartner] = useState([]);
   const [following, setFollowing] = useState([]);
  const visit = (reel)=>{
 const foodPartnerId = reel.foodpartner._id;
navigate(`/account/${foodPartnerId}`);
};
let user;
  useEffect(() => {
    const getReels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food/reels",
          {
            withCredentials: true,
          }
        ); 
        setReels(response.data.data || []);
        
         const likes = await axios.get(
                  `http://localhost:3000/api/food/like`,
                  {
                    withCredentials: true,
                  }
                );
              const likesByReel = (likes.data.data || []).map((e) => ({
                id: e._id,
                user: e.users,
                count:e.count
              }));
              setLike(likesByReel);
              const respo = await axios.get(
          "http://localhost:3000/api/foodpartner/getuser",
          {
            withCredentials: true,
          }
        ); 
            setfoodpartner(respo.data.data || []);
      const resp = await axios.get("http://localhost:3000/api/user/getuser",{
           withCredentials: true,
        });
        
      const followlist = resp.data.data;   
setFollowing(followlist);
      } catch (error) {
        console.log(error);
      }
    };

    getReels();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-[60px] text-white bg-black border-b border-gray-200 z-50">
        <div className="max-w-[975px] mx-auto h-full flex items-center justify-between px-4">

          <h1 className="text-2xl font-semibold italic">
           vibe
          </h1>

          <div className="flex items-center gap-[14px] sm:gap-[17px] lg:gap-5 text-2xl">
            <Link to="/reel">
            <span  className="material-symbols-outlined  !text-[20px] sm:!text-[24px] md:!text-[28px]">animated_images</span>
            </Link>
            
            <span  className="material-symbols-outlined cursor-pointer  !text-[20px] sm:!text-[24px] md:!text-[28px]">
              favorite
            </span>

            <span   className="material-symbols-outlined cursor-pointer !text-[20px] sm:!text-[24px] md:!text-[28px]">
              chat
            </span>
             <Link to="/foodpartner/upload">
            <span  className="material-symbols-outlined cursor-pointer  !text-[20px] sm:!text-[24px] md:!text-[28px]">
              add_box
            </span>
             </Link>
             <Link  to={`/useraccount/${authData}`}>
          <span    style={{ display: authData ? "inline" : "none" }} className={`cursor-pointer  material-symbols-outlined  !text-[20px] sm:!text-[24px] md:!text-[28px]`}>
account_circle
</span>
             </Link>
          </div>

        </div>
      </header>


      {/* MAIN */}
      <main className="pt-[75px] pb-[70px]">

        <div className="max-w-[975px] mx-auto flex gap-8">


          {/* FEED */}
          <section className="w-full max-w-[500px] mx-auto">


            {/* STORIES */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-5 pl-2.5 border-b border-gray-200">
                {foodpartner.map((item) => {
                return (
                  <div key={item._id} className="w-fit h-fit px-[2px] py-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 ">
                  <img src={item.profile} className="w-[40px] h-[40px] rounded-full  object-cover" alt={item.name || "Food partner"}/>
                    </div>
                    );
              })}
            </div>


            {/* POSTS */}
            <div className="mt-5">

              {reels.map((reel) => (

                <article
                  key={reel._id}
                  className="border-b border-gray-200 pb-5 mb-6"
                >

                  {/* USER HEADER */}
                  <div className="flex items-center justify-between mb-3 md:px-[0px] px-[10px]">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">

                        <img
                          src={reel.foodpartner?.profile}
                          className="w-full h-full rounded-full object-cover"
                        />

                      </div>

                      <div>
                        <p className="font-semibold text-sm">
                          {reel.foodpartner?.name || "foodwalaa"}
                        </p>

                        <p className="text-xs text-gray-500">
                         {reel.name}
                        </p>
                      </div>

                    </div>

                    <span className="material-symbols-outlined cursor-pointer !text-[20px] sm:!text-[24px] md:!text-[28px]">
                      more_horiz
                    </span>

                  </div>


                  {/* VIDEO */}
                  <div className="w-full aspect-[4/5]  bg-black rounded-[7px] overflow-hidden flex justify-center">

                    <video
                      src={reel.vedio}
                      className="w-[90%] h-full object-cover rounded-2xl"
                      controls
                      playsInline
                    />

                  </div>


                  {/* ACTIONS */}
                  <div className="flex items-center justify-between mt-3 px-[1rem]">

                    <div className="flex gap-4">

                      <button>
                        <span
                          className="material-symbols-outlined !text-[20px] sm:!text-[24px] md:!text-[28px]"
                          style={{
                            fontVariationSettings:
                              like.find((item) => item.id == reel._id)
                                ? "'FILL' 1"
                                : "'FILL' 0",
                          }}
                        >
                          favorite
                        </span>
                      </button>

                      <button>
                        <span className="material-symbols-outlined  !text-[20px] sm:!text-[24px] md:!text-[28px]">
                          chat_bubble
                        </span>
                      </button>

                      <button>
                        <span className="material-symbols-outlined  !text-[20px] sm:!text-[24px] md:!text-[28px]">
                          send
                        </span>
                      </button>

                    </div>

                    <button>
                      <span className="material-symbols-outlined  !text-[20px] sm:!text-[24px] md:!text-[28px]">
                        bookmark
                      </span>
                    </button>

                  </div>
                  {/* LIKES */}
                  <p className="font-semibold text-sm mt-2 pl-[5px]">
                   {like.find((item) => item.id === reel._id)?.count ?? 0} likes
                  </p>


                  {/* CAPTION */}
                  <p className="text-sm mt-1 text-[15px] md:text-[20px] px-[5px]">

                    <span className="font-semibold mr-2">
                      {reel.foodpartner?.name || "foodwala"}
                    </span>

                    {reel.description}

                  </p>


                  {/* COMMENTS */}
                  <p className="text-sm text-gray-500 mt-2 cursor-pointer pl-[6px]">
                    View all comments
                  </p>

                </article>

              ))}

            </div>

          </section>


          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block w-[300px] pt-5 sticky top-[75px] h-fit " >

            {/* <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <img
                  src=""
                  className="w-11 h-11 rounded-full"
                />

                <div>
                  <p className="font-semibold text-sm">
                    adarsh
                  </p>

                  <p className="text-sm text-gray-500">
                    Adarsh Mirkale
                  </p>
                </div>

              </div>

              <button className="text-blue-500 text-xs font-semibold">
                Switch
              </button>

            </div> */}


            <div className="flex justify-between mt-6 mb-4">

              <span className="text-sm font-semibold text-gray-500">
                Suggested for you
              </span>

              <span className="text-xs font-semibold">
                See All
              </span>

            </div>


            {reels.map((item) => (

              <div
                key={item._id}
                className="flex items-center justify-between mb-4"
              >

                <div className="flex items-center gap-3">
                  <div className="w-fit h-fit rounded-full p-[2px] bg-red-400">

                  <img
                    src={item.foodpartner?.profile || "./download.png"}
                    className="w-9 h-9 rounded-full object-cover"
                    />
                    </div>

                  <div>
                    <p className="text-sm font-semibold">
                     {item.foodpartner?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Suggested for you
                    </p>
                  </div>

                </div>

                <button className="text-blue-500 text-xs font-semibold">
                 {following.includes(item.foodpartner?._id) ? "following" : "follow"}
                </button>

              </div>

            ))}

          </aside>

        </div>

      </main>


      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-black  border-t border-t-red-500 z-50 lg:hidden">
      <Tab/>
      </nav>

    </div>
  );
};

export default Page;