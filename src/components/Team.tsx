import React, { useState } from 'react';

// Define interfaces for our data types
interface TeamMember {
  name: string;
  image: string | null;
  designation: string;
}

interface TeamData {
  admin: TeamMember[];
  coAdmins: TeamMember[];
  // teamMembers: TeamMember[];
}

export default function TeamMembers(): React.ReactElement {
  // Sample team data - replace with your actual data
  const teamData: TeamData = {
    admin: [
      {
        name: "Souvik Ghosh",
        image: null,
        designation: "FullStack, AI ML",
      },
      {
        name: "Soumodip Das",
        image: null,
        designation: "FullStack",
      },
      {
        name: "Rohan Sinha",
        image: null,
        designation: "Logistic",
      }
    ],
    coAdmins: [
      {
        name: "Aniket Chakraborty",
        image: null, // No image available
        designation: "Co-Admin",
      },
      {
        name: "Srijan Ray",
        image: null, 
        designation: "Co-Admin",
      },
      {
        name: "Subhradeep Roy Chaoudhury",
        image: null, 
        designation: "Co-Admin",
      },
      {
        name: "Aniya Agarwal",
        image: null, 
        designation: "Designer Lead",
      },
      {
        name: "Assad Haussain",
        image: null, 
        designation: "Co-Admin",
      }
    ],
    // teamMembers: [
    //   {
    //     name: "Jordan Lee",
    //     image: null,
    //     designation: "Developer",
    //   },
    //   {
    //     name: "Taylor Smith",
    //     image: null,
    //     designation: "Designer",
    //   },
    //   {
    //     name: "Pat Chen",
    //     image: null,
    //     designation: "Marketing",
    //   }
    // ]
  };


const [hoveredMember, setHoveredMember] = useState<string | null>(null);

const renderAvatar = (member: TeamMember, colorClass: string): React.ReactElement => {
  if (member.image) {
    return (
      <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg">
        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
      </div>
    );
  } else {
    return (
      <div className={`h-16 w-16 rounded-full ${colorClass} flex items-center justify-center text-lg font-bold text-white shadow-md`}>
        {member.name.charAt(0)}
      </div>
    );
  }
};

const renderMember = (member: TeamMember, type: "admin" | "coAdmin" | "member"): React.ReactElement => {
  let colorClass = "bg-gradient-to-br from-gray-600 to-gray-800";

  if (type === "admin") {
    colorClass = "bg-gradient-to-br from-purple-500 to-indigo-600";
  } else if (type === "coAdmin") {
    colorClass = "bg-gradient-to-br from-blue-400 to-blue-600";
  }

  const isHovered = hoveredMember === `${member.name}-${type}`;

  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setHoveredMember(`${member.name}-${type}`)}
      onMouseLeave={() => setHoveredMember(null)}
    >
      {renderAvatar(member, colorClass)}

      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute -top-20 w-40 p-2 bg-zinc-800 rounded-lg shadow-lg text-center transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <p className="text-sm font-semibold text-white">{member.name}</p>
          <p className="text-xs text-blue-400">{member.designation}</p>
        </div>
      )}
    </div>
  );
};

return (
  <div className="bg-[#0a0a0a]  p-8 rounded-2xl max-w-6xl mx-auto">
    <h2 className="text-3xl font-extrabold text-center text-white mb-10">Meet Our Team</h2>

    {/* Admins */}
    {teamData.admin.length > 0 && (
      <div className="mb-10">
        <h3 className="text-lg text-zinc-400 mb-4 text-center uppercase tracking-widest">Admins</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {teamData.admin.map((admin, idx) => (
            <div key={`admin-${idx}`}>
              {renderMember(admin, "admin")}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Co-Admins */}
    {teamData.coAdmins.length > 0 && (
      <div className="mb-10">
        <h3 className="text-lg text-zinc-400 mb-4 text-center uppercase tracking-widest">Co-Admins</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {teamData.coAdmins.map((coAdmin, idx) => (
            <div key={`coAdmin-${idx}`}>
              {renderMember(coAdmin, "coAdmin")}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Team Members */}
    {/* {teamData.teamMembers.length > 0 && (
      <div>
        <h3 className="text-lg text-zinc-400 mb-4 text-center uppercase tracking-widest">Team Members</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {teamData.teamMembers.map((member, idx) => (
            <div key={`member-${idx}`}>
              {renderMember(member, "member")}
            </div>
          ))}
        </div>
      </div>
    )} */}
  </div>
);
}