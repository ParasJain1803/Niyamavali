import React, { useState, useEffect } from "react";
import { Eye, Heart, Sparkles, RefreshCw } from "lucide-react";

// Niyam data as provided
export const niyamData = [
  { src: "/niyams/niyam1.jpg", alt: "Dev darshan" },
  { src: "/niyams/niyam2.jpg", alt: "Tv ka tyag 6hr ke lie" },
  { src: "/niyams/niyam3.jpg", alt: "Fruits ka tyag" },
  { src: "/niyams/niyam4.jpg", alt: "Ek samayak krne ka niyam" },
  { src: "/niyams/niyam5.jpg", alt: "108 bar Nvakar mantra" },
  { src: "/niyams/niyam6.jpg", alt: "Chawal ka tyag" },
  { src: "/niyams/niyam7.jpg", alt: "Ek stuti krne ka niyam" },
  { src: "/niyams/niyam8.jpg", alt: "Mobile ka tyag 6hr ke lie" },
  { src: "/niyams/niyam9.jpg", alt: "Gai ko roti khilao" },
  { src: "/niyams/niyam10.jpg", alt: "Shakkar ka tyag" },
  { src: "/niyams/niyam11.jpg", alt: "Namak ka tyag" },
  { src: "/niyams/niyam12.jpg", alt: "Ghee ka tyag" },
  { src: "/niyams/niyam13.jpg", alt: "Dahi ka tyag" },
  { src: "/niyams/niyam14.jpg", alt: "Chai ka tyag" },
  { src: "/niyams/niyam15.jpg", alt: "Dont eat & drink while standing" },
  { src: "/niyams/niyam16.jpg", alt: "Restraunt ka tyag" },
  { src: "/niyams/niyam17.jpg", alt: "Gusse ka tyag" },
  { src: "/niyams/niyam18.jpg", alt: "Social media ka tyag" },
];

// Main Niyam of the Day Card Component
const NiyamOfTheDayCard = ({ currentNiyam }) => {
  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/3">
          <div className="h-48 lg:h-full min-h-[200px] rounded-xl overflow-hidden">
            {currentNiyam ? (
              <img
                src={currentNiyam.src}
                alt={currentNiyam.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            {/* <NiyamPlaceholder className="w-full h-full" /> */}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Niyam of the Day
            </h3>
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              {currentNiyam
                ? currentNiyam.alt
                : "Choose your first Niyam to begin your spiritual journey"}
            </h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              {currentNiyam
                ? "Embrace this spiritual practice today and let it guide you towards inner peace and mindfulness."
                : "Click the button above to randomly select a Niyam and start your daily spiritual practice."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Past Niyam Card Component (smaller)
const PastNiyamCard = ({ niyam }) => {
  return (
    <div className="flex-shrink-0 w-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="h-32 rounded-lg overflow-hidden mb-3">
        <img
          src={niyam.src}
          alt={niyam.alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* <NiyamPlaceholder className="w-full h-full" /> */}
      </div>
      <h4 className="text-sm font-semibold text-gray-800 leading-tight">
        {niyam.alt}
      </h4>
    </div>
  );
};

export default function NiyamApp() {
  // State management
  const [currentNiyam, setCurrentNiyam] = useState(null);
  const [pastNiyams, setPastNiyams] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  // Load data from localStorage on component mount
  // NOTE: In your actual deployment, uncomment this useEffect to enable localStorage

  useEffect(() => {
    try {
      const savedCurrentNiyam = localStorage.getItem("currentNiyam");
      const savedPastNiyams = localStorage.getItem("pastNiyams");

      if (savedCurrentNiyam) {
        setCurrentNiyam(JSON.parse(savedCurrentNiyam));
      }

      if (savedPastNiyams) {
        setPastNiyams(JSON.parse(savedPastNiyams));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Function to save data to localStorage
  // NOTE: Replace this with actual localStorage calls in your deployment
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      // console.log(`Would save to localStorage - ${key}:`, data);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Function to randomly select a new Niyam
  const chooseRandomNiyam = () => {
    setIsSelecting(true);

    // Simulate loading/selection animation
    setTimeout(() => {
      // Get a random niyam
      const randomIndex = Math.floor(Math.random() * niyamData.length);
      const selectedNiyam = niyamData[randomIndex];

      // Update current niyam
      setCurrentNiyam(selectedNiyam);
      saveToStorage("currentNiyam", selectedNiyam);

      // Update past niyams history (keep only last 5)
      const updatedPastNiyams = [
        selectedNiyam,
        ...pastNiyams.filter((niyam) => niyam.alt !== selectedNiyam.alt),
      ].slice(0, 5);
      setPastNiyams(updatedPastNiyams);
      saveToStorage("pastNiyams", updatedPastNiyams);

      setIsSelecting(false);
    }, 500); // 1 second delay for better UX
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            {/* Logo/Icon */}
            <div className="mb-8">
              {/* <LotusIcon className="w-20 h-20 mx-auto text-amber-400" /> */}
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Daily Niyam
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Strengthen your spiritual journey with daily practices and mindful
              living
            </p>

            {/* Main CTA Button */}
            <button
              onClick={chooseRandomNiyam}
              disabled={isSelecting}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              {isSelecting ? (
                <>
                  <RefreshCw className="animate-spin" />
                  Choosing Your Niyam...
                </>
              ) : (
                <>
                  <Heart className="fill-current" />
                  Choose My Niyam
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Niyam of the Day Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <NiyamOfTheDayCard currentNiyam={currentNiyam} />
        </div>
      </div>

      {/* Past Niyams Section */}
      {pastNiyams.length > 0 && (
        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Past Niyams
              </span>
            </h2>

            {/* Horizontal scrollable grid */}
            <div className="flex justify-center overflow-x-auto pb-4">
              <div className="flex gap-4 w-max">
                {pastNiyams.map((niyam, index) => (
                  <PastNiyamCard key={`${niyam.alt}-${index}`} niyam={niyam} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state for past niyams */}
      {pastNiyams.length === 0 && currentNiyam && (
        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-lg">
              Choose more Niyams to see your spiritual journey history here
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 flex items-center justify-center gap-2">
            <span>Made with faith</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}
