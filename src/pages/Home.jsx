import React, { useEffect, useState, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [reels, setReels] = useState([]);
  const [like, setLike] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const videoRefs = useRef([]);
const navigate=useNavigate();
  
  const handleLike = (id) => {
    setLike((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food/reels",
          {
            withCredentials: true,
          }
        );

        console.log("REELS RESPONSE:", response.data);

        setReels(response.data.data || []);
      } catch (err) {
        console.log(
          "ERROR:",
          err.response?.data || err.message
        );
      }
    };

    fetchReels();
  }, []);

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

  
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = window.innerHeight;

    const newIndex = Math.round(
      scrollTop / itemHeight
    );

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };
const visit = (e)=>{
console.log(e);
navigate("/account");
}
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-screen h-screen bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {reels.length > 0 ? (
        reels.map((ele, index) => {
          console.log("VIDEO URL:", ele.vedio);
          return (
          <div
            key={ele._id || index}
            className="lg:w-[500px] mx-auto h-screen flex-shrink-0 snap-start relative bg-black flex items-center justify-center"
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

          
            <div className="absolute bottom-15 left-0 right-0 px-4 z-10">
              <div className="flex items-center gap-3 mb-4">
                
                {/* PROFILE */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  FP
                </div>

                {/* NAME */}
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">
                    {ele.foodpartner?.name || "Food Partner"}
                  </p>

                  <p className="text-gray-300 text-xs">
                    Tap to follow
                  </p>
                </div>
              </div>
                <button  onClick={() => visit(ele)} className="py-[5px] px-[8px] rounded-2xl active:text-red-400 bg-gradient-to-t from-pink-500 to-purple-500  text-white">visit store</button>
              {/* DESCRIPTION */}
              <p className="text-white text-sm line-clamp-2">
                {ele.description || "Amazing Reel"}
              </p>
            </div>

            
            <div className="absolute bottom-20 right-4 flex flex-col gap-4 z-20">

              
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => handleLike(ele._id)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full py-2 px-3 flex items-center transition-all"
                >
                  <i
                    className={`text-2xl cursor-pointer ${
                      like[ele._id]
                        ? "ri-heart-fill text-red-500"
                        : "ri-heart-line  text-white"
                    }`}
                  ></i>
                </button>

                <p className="text-white text-xs font-semibold">
                  {like[ele._id] ? "1" : "0"}
                </p>
              </div>

             
              <div className="flex flex-col items-center gap-1">
                <button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 flex items-center transition-all"
                >
                  <span className="material-symbols-outlined text-white text-2xl">
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
                  <span className="material-symbols-outlined text-white text-2xl">
                    share
                  </span>
                </button>

                <p className="text-white text-xs font-semibold">
                  0
                </p>
              </div>

             
              <div className="flex flex-col items-center gap-1">
                <button 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 flex items-center transition-all"
                >
                  <span className="material-symbols-outlined text-white text-2xl " style={{ fontVariationSettings: `'FILL' ${0}`}}>
                    bookmark
                  </span>
                </button>
              </div>

            </div>
            <div className="a absolute w-full h-[40px] bg-transparent backdrop-blur-2xl  z-100 bottom-0 flex ">
              <div className="w-[50%] flex items-center justify-center h-full">
              <span class="material-symbols-outlined text-[2rem] text-white cursor-pointer">home</span>
              </div>
              <div className="w-[50%] flex items-center justify-center h-full">
              <span class="material-symbols-outlined text-[2rem] text-white cursor-pointer">bookmarks</span>
              </div>
            </div>
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