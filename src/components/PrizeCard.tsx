import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

// Define types for props and color 
type PrizeColor = 'gold' | 'silver' | 'bronze';

interface PrizeCardProps {
  rank: string;
  amount: string;
  color: PrizeColor;
  size?: 'standard' | 'large';
  details?: string[];
}

// Colors for trophy icon
const COLOR_CLASSES: Record<PrizeColor, string> = {
  'gold': 'text-yellow-500',
  'silver': 'text-gray-300',
  'bronze': 'text-orange-600'
};

const COLOR_HEX: Record<PrizeColor, string> = {
  'gold': '#FFD700',
  'silver': '#C0C0C0',
  'bronze': '#CD7F32'
};

// Default prize details
const DEFAULT_PRIZE_DETAILS: Record<string, string[]> = {
  '1st': [
    // "₹15,000 Cash Prize",
    "₹1X,XX Cash Prize",
    "Winner Swags & Certificate"
  ],
  '2nd': [
    // "₹10,000 Cash Prize",
    "₹1X,XX Cash Prize",
    "Exclusive Swags & Certificate",
  ],
  '3rd': [
    // "₹5,000 Cash Prize",
    "₹1X,XX Cash Prize",
    "Exclusive Swags & Certificate",
  ]
};

const PrizeCard: React.FC<PrizeCardProps> = ({
  rank,
  amount,
  color,
  size = "standard",
  details
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get card size classes based on the size prop
  const cardSizeClasses = size === "large" ? "w-64 sm:w-72 h-80 sm:h-96"
    : "w-56 sm:w-64 h-72 sm:h-80";;

  // Get trophy size based on the size prop
  const trophySize = size === "large" ? 120 : 100;

  // Use the provided details or fall back to defaults
  const prizeDetails = details || DEFAULT_PRIZE_DETAILS[rank] || ["Prize Details"];

  return (
    <div
      className={`relative ${cardSizeClasses} bg-black rounded-lg overflow-hidden border border-white/[0.2] transition-transform duration-300 transform hover:scale-105 cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${rank} Prize - ${amount}`}
    >
      <div className="flex flex-col items-center justify-center h-full p-6">
        {/* Trophy Icon */}
        <div className={`mb-4 transition-all duration-300 ${isHovered ? 'scale-90' : 'scale-100'}`}>
          <Trophy
            size={trophySize}
            className={COLOR_CLASSES[color]}
            aria-hidden="true"
          />
        </div>

        {/* Prize Title */}
        <h3 className={`text-xl font-bold mb-2 text-white transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          {rank} Prize
        </h3>

        {/* Prize Amount
        <p
          className={`text-lg font-bold transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          style={{ color: COLOR_HEX[color] }}
        >
          {amount}
        </p> */}
      </div>

      {/* Hover Content */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center p-6 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!isHovered}
      >
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: COLOR_HEX[color] }}
        >
          {/* {rank} Prize - {amount} */}
        </h3>
        <ul className="text-white text-sm space-y-2">
          {prizeDetails.map((detail, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-4 h-4 mr-2 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrizeCard;