import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tab from "./Tab";
const Home = () => {
  const navigate=useNavigate();

  
  const [reels, setReels] = useState([]);
  const [save, setsave] = useState([])
  const [, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [, setIsLoadingPage] = useState(false);
  const [like, setLike] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [following, setFollowing] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const loadingPageRef = useRef(false);
  const pageRef = useRef(1);
  
  const handleLike = async (id) => {
   console.log("handlelike",id);
   try {
     const response = await axios.post(
          `http://localhost:3000/api/food/like/${id}`,{},
          {
            withCredentials: true,
          }
        );
        console.log(response);
        console.log("like response",response.data.totalLikes)
         setLike((prev) => [
      ...prev.filter((item) => item.id !== id),
      {
        id,
        liked: response.data.liked,
        totalLikes: response.data.totalLikes,
      },
    ]);
   } catch (error) {
    console.log(error)
   }
  };


  
  useEffect(() => {
    const fetchReels = async (pageNumber) => {
      loadingPageRef.current = true;
      setIsLoadingPage(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food/reels",
          {
            params: { page: pageNumber, limit: 5 },
            withCredentials: true,
          }
        );

        setReels((prev) =>
          pageNumber === 1
            ? response.data.data || []
            : [...prev, ...(response.data.data || [])]
        );
        setHasNextPage(response.data.pagination?.hasNextPage ?? false);
        setPage(pageNumber);
        pageRef.current = pageNumber;

        if (pageNumber !== 1) {
          return;
        }

        const respo = await axios.get("http://localhost:3000/api/user/getuser",{
           withCredentials: true,
        });
        
      const followlist = respo.data.data;   
setFollowing(followlist);

 const likes = await axios.get(
          `http://localhost:3000/api/food/like`,
          {
            withCredentials: true,
          }
        );
      const likesByReel = (likes.data.data || []).map((item) => ({
        id: item._id,
          liked: item.liked,
          totalLikes: item.count || 0,
      }));
      setLike(likesByReel);
      } catch (err) {
        console.log(
          "ERROR:",
          err.response?.data || err.message
        );
      } finally {
        loadingPageRef.current = false;
        setIsLoadingPage(false);
      }

      const savedata = await axios.get(
        "http://localhost:3000/api/food/getsave",
        { withCredentials: true }
      );
      const savedReels = (savedata.data.find || []).map((item) => item.reel);
      setsave(savedReels);
};

fetchReels(1);
}, []);
const sample = () =>{
  
  };
  sample();
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) {
        video
          .play()
          .catch((error) => {
            console.log("Video play error:", error);
          });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, reels]);

const follow = async (ele) => {
  try {
    console.log("ele",ele)
    const partnerId = ele?.foodpartner?._id || ele?.foodpartner;

    if (!partnerId) {
      console.log("No food partner id found for follow request");
      return;
    };

    
    const response = await axios.get(
      `http://localhost:3000/api/user/follow/${partnerId}`,
      { withCredentials: true }
    );
   
 setFollowing((prev) => {
      if (prev.includes(partnerId)){
        return prev.filter((id) => id !== partnerId);
      } else {
        return [...prev, partnerId];
      }
    });
   
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
  
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = window.innerHeight;

    const newIndex = Math.round(
      scrollTop / itemHeight
    );

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }

    if (
      newIndex >= reels.length - 2 &&
      hasNextPage &&
      !loadingPageRef.current
    ) {
      const nextPage = pageRef.current + 1;
      loadingPageRef.current = true;
      setIsLoadingPage(true);

      axios
        .get("http://localhost:3000/api/food/reels", {
          params: { page: nextPage, limit: 5 },
          withCredentials: true,
        })
        .then((response) => {
          setReels((prev) => [...prev, ...(response.data.data || [])]);
          setHasNextPage(response.data.pagination?.hasNextPage ?? false);
          setPage(nextPage);
          pageRef.current = nextPage;
        })
        .catch((error) => {
          console.log(error.response?.data || error.message);
        })
        .finally(() => {
          loadingPageRef.current = false;
          setIsLoadingPage(false);
        });
    }
  };
const visit = (reel)=>{
 const foodPartnerId = reel.foodpartner._id;
navigate(`/account/${foodPartnerId}`);
};
const handlesave = async (reelId,food) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/food/save",
      {
        params: { reel: reelId,food:food},
        withCredentials: true,
      }
    );
    console.log(response.data);
    setsave((prev) =>
      prev.includes(reelId)
        ? prev.filter((id) => id !== reelId)
        : [...prev, reelId]
    );
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-screen h-screen bg-[#121212] overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {reels.length > 0 ? (
        reels.map((ele, index) => {
          return (
           
          <div
            key={ele._id || index}
            className="lg:w-[450px] mx-auto h-screen flex-shrink-0 snap-start relative bg-black flex items-center justify-center"
          >
            {/* 
                VIDEO */}
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={ele.vedio}
              className="w-full h-full object-cover"
              muted
               loop
              playsInline
              preload="none"
            />

           
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

          
            <div className="absolute bottom-25 md:bottom-15 left-0 right-0 px-4 z-10">
              <div className="flex items-center gap-3 mb-4">
                
                {/* PROFILE */}
                 <img  onClick={() => visit(ele)}   onDoubleClick={() => visit(ele)}
              className=" w-[60px] md:w-[50px]  h-[60px]  md:h-[50px] rounded-full object-cover border-2 border-white/20"
              src={ele.foodpartner?.profile || "./download.png" }
              alt="Account profile"
              />

                {/* NAME */}
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg">
                    {ele.foodpartner?.name || "Food Partner"}
                  </p>
                  <p id="follow" onClick={()=> follow(ele)} className="text-gray-300 rounded-[12px] cursor-pointer active:scale-95 transition duration-75 text-sm bg-gradient-to-r from-pink-400 to-purple-300 w-fit px-[0.5rem] py-[0.2rem] md:px-[1rem] md:py-[0.3rem]">
                  {following.includes(ele.foodpartner?._id) ? "following" : "follow"}
                  </p>
                </div>
              </div>
                <button  onClick={() => visit(ele)} className="py-[4px] md:py-[10px] px-[8px] rounded-2xl active:text-red-400 bg-gradient-to-t from-pink-500 to-purple-500 text-sm md:text-[18px] text-white">visit store</button>
              {/* DESCRIPTION */}
              <p className="text-white  text-[12px] md:text-[16px] mt-[15px]  line-clamp-2">
                {ele.description || "Amazing Reel"}
              </p>
            </div>

            
            <div className="absolute bottom-25 md:bottom-15  right-4 flex flex-col gap-4 z-20">

              
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => handleLike(ele._id)}
                  className=" bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full py-2 px-3 flex items-center transition-all"
                >
                  <i
                    className={`!text-[16px] sm:!text-[24px] md:!text-[28px]  cursor-pointer ${
                      like.find((item) => item.id === ele._id)?.liked
                        ? "ri-heart-fill text-red-500"
                        : "ri-heart-line  text-black"
                    }`}
                  ></i>
                </button>

                <p className="text-white text-xs font-semibold">
                {like.find((item) => item.id === ele._id)?.totalLikes ?? 0}
                </p>
              </div>

             
              <div className="flex flex-col items-center gap-1">
                <button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 flex items-center transition-all"
                  >
                  <span className="!text-[16px] sm:!text-[24px] md:!text-[28px]  material-symbols-outlined text-black text-2xl">
                    chat_bubble
                  </span>
                </button>

                <p className="text-white text-xs font-semibold">
                  0
                </p>
              </div>

             
              <div className="flex flex-col items-center gap-1">
                <button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-2 py-2 flex items-center transition-all"
                >
                  <span className="!text-[16px] sm:!text-[24px] md:!text-[28px]  material-symbols-outlined text-black text-2xl">
                    share
                  </span>
                </button>

                <p className="text-white text-xs font-semibold">
                  0
                </p>
              </div>

             
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => handlesave(ele._id, ele.foodpartner?._id)}
                   className=" bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 flex items-center transition-all"
                >
                  <span className="!text-[16px] sm:!text-[24px] md:!text-[28px]   material-symbols-outlined text-black text-2xl " style={{fontVariationSettings: save.some((savedReel) => (savedReel?._id || savedReel) === ele._id) ? "'FILL' 1" : "'FILL' 0"}}>
                    bookmark
                  </span>
                </button>
              </div>

            </div>
          {/* tab */}
          <Tab />
         
          </div>
                  
                );
              })
            ) : (
              <div className="w-full h-screen flex items-center justify-center text-white">
          No reels found
        </div>
      )}
    </div>
  );
};

export default Home;