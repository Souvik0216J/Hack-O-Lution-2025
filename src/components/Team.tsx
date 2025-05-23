import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  image: string | null;
  designation: string;
  linkedin?: string;
}

interface TeamData {
  admin: TeamMember[];
  coAdmins: TeamMember[];
  // teamMembers: TeamMember[];
}

interface ModalPosition {
  left: number;
  top: number;
}

export default function TeamMembers(): React.ReactElement {
  const teamData: TeamData = {
    admin: [
      {
        name: "Souvik Ghosh",
        image: "/team/souvik.jpg",
        designation: "ORGANIZER",
        linkedin: "https://www.linkedin.com/in/souvik-ghosh-1bb26a282",
      },
      {
        name: "Soumodip Das",
        image: "/team/soumodip.jpg",
        designation: "ORGANIZER",
        linkedin: "https://www.linkedin.com/in/itssoumodip",
      },
      {
        name: "Rohan Sinha",
        image: "/team/rohan.jpg",
        designation: "ORGANIZER",
        linkedin: "https://www.linkedin.com/in/rohan-sinha-0b926225a",
      }
    ],
    coAdmins: [
      {
        name: "Aniket Chakraborty",
        image: "/team/aniket.jpg",
        designation: "CORE",
        linkedin: "https://www.linkedin.com/in/aniket-chakraborty-666319284",
      },
      {
        name: "Srijan Ray",
        image: "/team/srijan.jpg",
        designation: "CORE",
        linkedin: "https://www.linkedin.com/in/srijan-ray-5b1967282",
      },
      {
        name: "Subhradeep Roy Chowdhury",
        image: "/team/src.jpg",
        designation: "MARKETING",
        linkedin: "https://www.linkedin.com/in/subhradeep-roy-chowdhury-715264318",
      },
      {
        name: "Aniya Agarwal",
        image: "/team/aniya.jpg",
        designation: "DESIGNER LEAD",
        linkedin: "https://www.linkedin.com/in/aniya-agarwal-0b45a631b",
      },
      {
        name: "Asad Hussain",
        image: "/team/assad.jpg",
        designation: "MARKETING",
        linkedin: "https://www.linkedin.com/in/asad-hussain-765502319",
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalPosition, setModalPosition] = useState<ModalPosition>({ left: 0, top: 0 });
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  //  screen size part
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768); //  <= 768px for mobile
    };

    checkMobileView();

    // size listener
    window.addEventListener('resize', checkMobileView);

    // Clean up
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleAvatarClick = (member: TeamMember, event: React.MouseEvent) => {
    // For mobile redirect to LinkedIn directly
    if (isMobileView && member.linkedin) {
      window.open(member.linkedin, '_blank');
      return;
    }

    setSelectedMember(member);

    // Calculate position for big screen
    const avatarRect = event.currentTarget.getBoundingClientRect();
    const modalWidth = 320; // Approx width of modal
    const modalHeight = 320; // Approx height of modal

    // centered above the avatar
    const left = avatarRect.left + (avatarRect.width / 1.2) - (modalWidth / 1.2);
    const top = avatarRect.top - modalHeight - 15; // 15px gap 

    setModalPosition({
      left: Math.max(10, left), // Ensure modal doesn't go off-screen to the left
      top: Math.max(10, top) // Ensure modal doesn't go off-screen to the top
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  const renderAvatar = (member: TeamMember, colorClass: string): React.ReactElement => {
    if (member.image) {
      return (
        <div
          className="h-18 w-18 rounded-full overflow-hidden shadow-lg cursor-pointer"
          onClick={(e) => handleAvatarClick(member, e)} onContextMenu={(e) => e.preventDefault()}
        >
          <Image
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover"
            width={100}
            height={100}
          />
        </div>
      );
    } else {
      return (
        <div
          className={`h-16 w-16 rounded-full ${colorClass} flex items-center justify-center text-lg font-bold text-white shadow-md cursor-pointer`}
          onClick={(e) => handleAvatarClick(member, e)}
        >
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
    <div className="bg-[#0a0a0a] p-8 rounded-2xl max-w-3xl mx-auto">
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

      {/* Member Modal - Only for desktop */}
      {!isMobileView && modalOpen && selectedMember && (
        <div
          className="fixed inset-0 bg-opacity-50 z-50 overflow-hidden"
          onClick={closeModal}
        >
          <div
            className="bg-zinc-900 rounded-xl p-6 max-w-md w-full shadow-xl absolute"
            style={{
              left: `${modalPosition.left}px`,
              top: `${modalPosition.top}px`,
              transform: modalPosition.top < 20 ? 'translateY(100px)' : 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                className="text-gray-400 hover:text-red-500 text-xl cursor-pointer"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            <div className="flex flex-col items-center">
              {/* Display large avatar */}
              <div className="h-34 w-34 rounded-full overflow-hidden mb-4 border-4 border-blue-500" onContextMenu={(e) => e.preventDefault()}>

                {selectedMember.image ? (
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="h-full w-full object-cover"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
                    {selectedMember.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{selectedMember.name}</h3>
              <p className="text-blue-400 mb-4">{selectedMember.designation}</p>

              {/* LinkedIn Button */}
              {selectedMember.linkedin && (
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}