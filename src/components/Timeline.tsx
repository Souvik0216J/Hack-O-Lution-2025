import React from 'react';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

const Timeline = () => {
  const timelineData = [
    {
      title: "Registration",
      date: "May 25th - June 10th, 2025",
      icon: <Users className="w-6 h-6" />,
      items: [
        "Apply with your team",
        "Team members 2-4",
      ]
    },
    {
      title: "Hack{o}lution",
      date: "June 26 - June 27, 2025",
      icon: <MapPin className="w-6 h-6" />,
      items: [
        "Reporting time: 07:30 - 08:30 AM",
        "Hacking Starts 09:00 AM",
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm" data-text="STORY OF HACKOLUTION">
            TIMELINE OF HACK&#123;<span className="text-green-400">0</span>&#125;LUTION
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            From team formation to the final code here&apos;s the road to innovation at HACK&#123;<span className="text-green-400">0</span>&#125;LUTION
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {timelineData.map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline connector for desktop */}
                {index === 0 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-green-400 to-green-600 transform -translate-y-1/2 z-0"></div>
                )}

                {/* Card */}
                <div className="bg-gradient-to-br bg-black border-gray-800 rounded-2xl p-8 hover:border-green-500/50 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 group">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br bg-black border-3 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-green-50 transition-colors">
                    {item.title}
                  </h2>

                  {/* Date */}
                  <div className="flex items-center text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{item.date}</span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {item.items.map((listItem, itemIndex) => (
                      <div key={itemIndex} className="flex items-start group/item">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:bg-green-400 transition-colors"></div>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors">
                          {listItem}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile connector */}
                {index === 0 && (
                  <div className="md:hidden flex justify-center my-8">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;