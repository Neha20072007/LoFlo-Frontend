import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/leaf3.svg';
import 'animate.css';


// import leavesBackground from '/leaves.svg'; 

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="relative" style={{ 
      // backgroundImage: `url(${leavesBackground})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 relative text-center space-y-12">
        
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-40 w-40 object-cover animate__animated animate__rubberBand"
        />
        {/* Animated Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-merriweather tracking-tight leading-tight text-[#ede267] animate-pulse">
          LoFlow – Chill ,  Focus ,  Achieve
        </h1>
        
        {/* Wavy Divider Line */}
        <div className="w-3/4 lg:w-1/2 my-8">
          <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 10 Q 10 0, 20 10 T 40 10 Q 50 20, 60 10 T 80 10 Q 90 0, 100 10" fill="transparent" stroke="#8bb38d" strokeWidth="4" />
          </svg>
        </div>

        {/* Fun Description */}
        <p className="text-base md:text-lg lg:text-xl text-[#e0e5d3] font-quicksand max-w-3xl leading-relaxed">
          A space to flow through tasks, unwind your mind, and embrace productivity – all in the spirit of lofi 🫧
        </p>

        {/* Fun Sub Description */}
        <p className="text-base md:text-lg lg:text-xl text-[#e0e5d3] font-quicksand max-w-3xl leading-relaxed">
          When You’re Bored, We’ve Got Tasks You’ll Adore 🌿
        </p>

        {/* Register Button */}
        <button
          onClick={handleClick}
          className="mt-6 text-base md:text-lg text-[#f7f5df] font-semibold font-merriweather animate-bounce hover:underline decoration-wavy underline-offset-2"
        >
          🌟 Register to Vibe with LoFlo 🌟
        </button>

        {/* About LoFlow Feature */}
        <div className="bg-[#8bb38d] bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl py-10 px-12 max-w-4xl mx-auto transition-transform transform hover:scale-105 shadow-lg">
          <p className="text-lg md:text-xl lg:text-2xl text-[#e0e5d3] font-quicksand mb-8 leading-relaxed">
            Where we combine <span className="font-bold text-[#8bb38d]">relaxing vibes</span> with 
            <span className="font-bold text-[#e2716d]"> productivity</span>. Whether you're tackling your personal tasks or looking for 
            something new to do when you're bored, we've got you covered.
          </p>
        </div>

        {/* Community ToDos Feature */}
        <div className="bg-[#8bb38d] bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl py-10 px-12 max-w-4xl mx-auto transition-transform transform hover:scale-105 shadow-lg">
          <h3 className="text-2xl font-semibold text-[#ede267] mb-4 animate-bounce">
            🍁Find Something ToDo🍁
          </h3>
          <p className="text-lg text-[#f7f5df] font-quicksand leading-relaxed">
            Explore tasks submitted by others. Perfect for when you're feeling a bit stuck, feel your mind is too cluttered and need some 
            <span className="font-semibold"> inspiration</span> or want to challenge yourself with new ideas. Dive into a space where 
            <span className="font-semibold"> procrastination</span> meets 
            <span className="font-semibold"> productivity</span>, all while keeping the stress low and the vibe chill.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-lg text-[#ede267] font-quicksand italic mb-6">
            “Take a deep breath, relax, and let’s get some tasks done – or find something fun to try!”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
