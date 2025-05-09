import { HoverEffect } from "./ui/card-hover-effect";
import { Clock, Code, Cpu, Zap, Users, Handshake } from "lucide-react";
import { MarqueImg } from "./MarqueImg";

export function AboutCard() {
  return (
    <div className="max-w-[84rem] mx-auto px-8 py-12">
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm" data-text="STORY OF HACKOLUTION">
          STORY OF HACK&#123;<span className="text-green-400">0</span>&#125;LUTION
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          HACK&#123;<span className="text-green-400">0</span>&#125;LUTION is an open theme hackathon at IEM, Ashram Campus, offering tech enthusiasts
          a 36-hour marathon of creativity, innovation, coding and collaboration.
        </p>
      </div>
      <HoverEffect items={aboutItems} />
      <MarqueImg/>
    </div>
  );
}


export const aboutItems = [
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "36 Hours",
    description: "Immerse yourself in a 36-hour coding marathon at the Institute of Engineering and Management, Kolkata on 26th June 2025.",
  },
  {

    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Open Theme",
    description: "Perfect for all skill levels, challenge yourself with real-world problems and learn new skills in this collaborative environment.",

  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: "Multiple Domains",
    description: "Showcase your talent in Web Development, App Development, Web3, Blockchain, AI, ML, Cloud Computing and many more.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Exciting Prizes",
    description: "Compete for incredible rewards and valuable networking opportunities to kickstart your tech career.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Team Collaboration",
    description: "Form teams of up to 4 members and collaborate to build innovative solutions while learning from each other.",
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary" />,
    title: "Offline Hackathon",
    description: "Engage in an electrifying offline hackathon setting that fosters face-to-face collaboration, live mentoring, and real-time problem-solving.",
  }
];

export default AboutCard;
