"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { User, Users, FileCheck, Clock, Loader2Icon, ExternalLink, Github, FileCode, Calendar, Presentation, Video } from "lucide-react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input"

// Define types for your data structure
interface TeamMember {
  name: string;
  email: string;
  tshirtSize: string;
}

interface ProjectInfo {
  isSubmit: boolean;
  projectLink: string;
  pptLink: string
  hostedLink: string;
  projectVideo: string;
}

interface TeamData {
  teamId: string;
  teamName: string;
  status: string;
  leaderName: string;
  leaderEmail: String;
  leaderTshirtSize: String;
  members: TeamMember[];
  projectSubmit: ProjectInfo[];
}

// hackathon timeline events
interface TimelineEvent {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  isActive: boolean;
  isPast: boolean;
  startDate?: Date; // multi-day events
  endDate?: Date;   // multi-day events
}


function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [Btnloading, setBtnLoading] = React.useState(false)
  const [pLink, setPLink] = useState<string>("");
  const [gLink, setGLink] = useState<string>("");
  const [ppLink, setPptLink] = useState<string>("");
  const [tStack, setTechStack] = useState<string>("");
  const [difi, setDifi] = useState<string>("");
  const [vid, setVid] = useState<string>("");

  const [project, setProject] = useState<{
    projectLink: string;
    githubLink: string;
    pptLink: string;
    techStack: string;
    difficulty: string;
    projectVideo: string;
  }>({
    projectLink: "",
    githubLink: "",
    pptLink: "",
    techStack: "",
    difficulty: "",
    projectVideo: "",
  })

  const [teamData, setTeamData] = useState<TeamData>({
    teamId: "",
    teamName: "",
    status: "",
    leaderName: "",
    leaderEmail: "",
    leaderTshirtSize: "",
    members: [],
    projectSubmit: [],
  });

  // Get current date for timeline comparison
  const currentDate = new Date();

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      date: "June 26, 2025",
      startTime: "07:30", // Beginning of day
      endTime: "08:30",   // End of day
      title: "Reporting & Check In",
      description: "Test",
      isActive: false,
      isPast: false // calculate this in the useEffect
    },
    {
      date: "June 26, 2025",
      startTime: "08:30",
      endTime: "09:00",
      title: "Opening Ceremony",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 26-27, 2025",
      startTime: "09:00", // Beginning of day
      endTime: "14:30",   // End of day
      title: "Hacking Start & End",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 26, 2025",
      startTime: "13:00",
      endTime: "14:30",
      title: "Lunch Time",
      description: "Test",
      isActive: false,
      isPast: false
    },
    // {
    //   date: "June 26, 2025",
    //   startTime: "18:00",
    //   endTime: "19:00",
    //   title: "Evening Snacks",
    //   description: "Test",
    //   isActive: false,
    //   isPast: false
    // },
    {
      date: "June 26, 2025",
      startTime: "20:00",
      endTime: "20:30",
      // title: "Mini Event 1 - Fast Typing",
      title: "Mini Event 1",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 26, 2025",
      startTime: "21:00",
      endTime: "22:30",
      title: "Dinner Time",
      description: "Winners announced and prizes awarded",
      isActive: false,
      isPast: false
    },
    {
      date: "June 26-27, 2025",
      startTime: "23:30",
      endTime: "00:30",
      // title: "Mini Event 2 - Build Your AI Website",
      title: "Mini Event 2",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 27, 2025",
      startTime: "01:30",
      endTime: "02:00",
      // title: "Mini Event 3 - Gaming Tournament",
      title: "Mini Event 3",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 27, 2025",
      startTime: "08:00",
      endTime: "10:00",
      title: "Breakfast Time",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 27, 2025",
      startTime: "12:00",
      endTime: "13:30",
      title: "Lunch Time",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 27, 2025",
      startTime: "14:45",
      endTime: "16:30",
      title: "Evaluation",
      description: "Test",
      isActive: false,
      isPast: false
    },
    {
      date: "June 27, 2025",
      startTime: "16:30",
      endTime: "17:00",
      title: "Closing Ceremony",
      description: "Test",
      isActive: false,
      isPast: false
    },
  ]);

  const parseDateTime = (dateStr: string, timeStr: string = "00:00") => {
    let datePart = dateStr;

    // Handle ranges like "May 27-28, 2025"
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      const month = parts[0].split(" ")[0]; // May
      const startDay = parts[0].split(" ")[1]; // 27
      const year = parts[1].split(",")[1]?.trim() || "2025"; // get 2025 from end
      datePart = `${month} ${startDay}, ${year}`;
    }

    const [hours, minutes] = timeStr.split(":").map(Number);
    const result = new Date(datePart);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  const parseEndDateTime = (dateStr: string, timeStr: string = "23:59") => {
    let datePart = dateStr;

    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      const month = parts[0].split(" ")[0]; // May
      const endDay = parts[1].split(",")[0].trim(); // 28
      const year = parts[1].split(",")[1]?.trim() || "2025";
      datePart = `${month} ${endDay}, ${year}`;
    }

    const [hours, minutes] = timeStr.split(":").map(Number);
    const result = new Date(datePart);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };


  // create a new one to update the status of events
  useEffect(() => {
    // Update event status based on current time
    const updateEventStatus = () => {
      const now = new Date();

      setTimelineEvents(prevEvents =>
        prevEvents.map(event => {
          const startDateTime = parseDateTime(event.date, event.startTime);
          const endDateTime = parseEndDateTime(event.date, event.endTime);

          // Check if event is active (current time is between start and end)
          const isActive = now >= startDateTime && now <= endDateTime;

          // Check if event is in the past (current time is after end time)
          const isPast = now > endDateTime;

          return { ...event, isActive, isPast };
        })
      );
    };

    // Initial update
    updateEventStatus();

    // Set up a timer to update every minute
    const intervalId = setInterval(updateEventStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserData();

        if (!userData) {
          // If no user data, redirect to login
          router.push("/login");
          return;
        }

        // Format the data for the dashboard
        setTeamData({
          teamId: userData.teamId || "",
          teamName: userData.teamName || "",
          status: (userData.selectionInfo[0].isSelected as "Pending" | "Approved" | "Rejected"),
          leaderName: userData.leaderName || "",
          leaderEmail: userData.leaderEmail || "",
          leaderTshirtSize: userData.leaderTshirtSize || "",
          members: userData.members || [],
          projectSubmit: userData.projectSubmit || []
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading user data:", error);
        setLoading(false);
      }
    }

    // Fetch data immediately when component mounts
    fetchUserData();

    // Set up periodic polling for updates
    const intervalId = setInterval(fetchUserData, 30000); // refresh data every 30 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [router]);


  const handleProjectSubmission = async () => {
    if (!pLink || !gLink || !ppLink || !difi || !tStack) {
      alert("Please make sure all project details are filled out before submitting.")
      return;
    }

    try {
      setBtnLoading(true)
      // Update project state
      const updatedProject = {
        projectLink: pLink,
        githubLink: gLink,
        pptLink: ppLink,
        techStack: tStack,
        projectVideo: vid,
        difficulty: difi,
      };

      setProject(updatedProject);

      const response = await axios.post("/api/users/submit-project", {
        teamId: teamData.teamId,
        projectLink: updatedProject.projectLink,
        githubLink: updatedProject.githubLink,
        pptLink: updatedProject.pptLink,
        techStack: updatedProject.techStack,
        projectVideo: updatedProject.projectVideo,
        difficulty: updatedProject.difficulty,
      });

      if (response.data.success) {
        // Refresh user data to update the UI
        const userData = await getUserData();
        setTeamData(prevData => ({
          ...prevData,
          projectSubmit: userData.projectSubmit || []
        }));
      } else {
        alert(`Error: ${response.data.message}`);
      }
      setBtnLoading(false)
    } catch (error: any) {
      setBtnLoading(false)
      console.error("Submission error:", error);
      alert("Something went wrong while submitting the project.");
    }
    setBtnLoading(false)
  };


  // Function to get status badge styling
  const getStatusBadge = (status: string): string => {
    switch (status) {
      case "Approved":
        return "bg-green-500/10 text-green-500 border border-green-500/20";
      case "Rejected":
        return "bg-red-500/10 text-red-500 border border-red-500/20";
      case "Pending":
      default:
        return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/")
      router.refresh();
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const totalTeamSize = teamData.members.length + 1; // +1 for the leader

  // Check if project has been submitted
  const isProjectSubmitted = teamData.projectSubmit &&
    teamData.projectSubmit.length > 0 &&
    teamData.projectSubmit[0].isSubmit;

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-xl">Welcome...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">HACK&#123;<span className="text-green-400">0</span>&#125;LUTION 2<span className="text-green-400">K</span>25</h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-red-500 transition hover:cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Team Info Card */}
        <div
          className="w-full bg-black rounded-xl border border-zinc-800 overflow-hidden mb-8"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">{teamData.teamName}</h2>
                <p className="text-zinc-400 text-sm">Team ID: {teamData.teamId}</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0",
                getStatusBadge(teamData.status)
              )}>
                {teamData.status === "Pending" && <Clock className="inline-block mr-1 h-4 w-4" />}
                {teamData.status === "Approved" && <FileCheck className="inline-block mr-1 h-4 w-4" />}
                Status: {teamData.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Team Leader</p>
                    <p className="font-medium">{teamData.leaderName}</p>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Team Size</p>
                    <p className="font-medium">{totalTeamSize} Members</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Application Status</h3>
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${teamData.status ? "bg-blue-500" : "bg-zinc-700"}`}>
                  <FileCheck className="h-4 w-4" />
                </div>
                <div className={`h-1 flex-grow ${teamData.status === "Approved" || teamData.status === "Rejected" ? "bg-blue-500" : "bg-zinc-700"}`}></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${teamData.status === "Approved" || teamData.status === "Rejected" ? "bg-blue-500" : "bg-zinc-700"}`}>
                  <Clock className="h-4 w-4" />
                </div>
                <div className={`h-1 flex-grow ${teamData.status === "Approved" ? "bg-blue-500" : "bg-zinc-700"}`}></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${teamData.status === "Approved" ? "bg-green-500" : "bg-zinc-700"}`}>
                  <FileCheck className="h-4 w-4" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                <span>Registered</span>
                <span>Under Review</span>
                <span>Approved</span>
              </div>
            </div>

            {/* Team members */}
            <div>
              <h3 className="text-lg font-medium mb-4">Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Leader card */}
                <div className="bg-zinc-900 rounded-lg p-4 flex items-center">
                  <div className="h-12 w-12 aspect-square rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg font-bold mr-4">
                    {teamData.leaderName ? teamData.leaderName.charAt(0) : 'L'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium">{teamData.leaderName} <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Leader</span></h4>
                    <p className="text-zinc-400 text-sm truncate">{teamData.leaderEmail}</p>
                    <p className="text-zinc-500 text-xs">{teamData.leaderTshirtSize}</p>
                  </div>
                </div>

                {/* Regular members */}
                {teamData.members.map((member, index) => (
                  <div key={index} className="bg-zinc-900 rounded-lg p-4 flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold mr-4">
                      {member.name ? member.name.charAt(0) : '?'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{member.name}</h4>
                      <p className="text-zinc-400 text-sm truncate">{member.email}</p>
                      <p className="text-zinc-500 text-xs">{member.tshirtSize}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon Timeline Section - Only visible after approval */}
        {teamData.status === "Approved" && (
          <div className="w-full bg-black rounded-xl border border-zinc-800 overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Hackathon Timeline</h3>
                  <p className="text-zinc-400 text-sm">Keep track of important dates and deadlines</p>
                </div>
              </div>

              {/* Currently Running Event Highlight */}
              {timelineEvents.filter(event => event.isActive).length > 0 && (
                <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-1">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center mr-4 animate-pulse">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-500/30 text-blue-300 inline-flex items-center mr-2">
                            <span className="h-2 w-2 bg-blue-400 rounded-full mr-1 animate-ping"></span>
                            IN PROGRESS
                          </span>
                          <span className="text-xs text-blue-400 font-mono">{timelineEvents.find(event => event.isActive)?.date}</span>
                        </div>
                        <h4 className="text-xl font-bold mt-1 text-blue-300">{timelineEvents.find(event => event.isActive)?.title}</h4>
                        <p className="text-blue-200/70 font-mono">
                          {timelineEvents.find(event => event.isActive)?.startTime} - {timelineEvents.find(event => event.isActive)?.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 relative">
                {/* Timeline connector */}
                <div className="absolute top-6 left-8 right-8 h-2 bg-zinc-800 rounded-full"></div>
                <div className="absolute top-6 left-8 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
                  style={{
                    width: `${Math.max(
                      5,
                      (timelineEvents.filter(e => e.isPast || e.isActive).length / timelineEvents.length) * 100
                    )}%`
                  }}>
                </div>

                {/* Timeline events */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {timelineEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`relative pt-12 transform transition-all duration-500 ${event.isActive ? "scale-105 z-10" : ""
                        }`}
                    >
                      {/* Timeline node */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-0.5">
                        {/* <div className={`
                  w-5 h-5 rounded-full border-4 border-black relative z-10
                  ${event.isActive ? "bg-blue-500" : event.isPast ? "bg-green-500" : "bg-zinc-600"}
                `}>
                          {event.isActive && (
                            <div className="absolute -inset-2 rounded-full bg-blue-500/30 animate-pulse"></div>
                          )}
                        </div> */}
                      </div>

                      {/* Card */}
                      <div className={`
                group hover:scale-105 transition-all duration-300 hover:shadow-lg
                rounded-xl overflow-hidden h-full border bg-gradient-to-b
                ${event.isActive
                          ? "from-blue-900/40 to-indigo-900/20 border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : event.isPast
                            ? "from-green-900/30 to-green-900/5 border-green-500/30"
                            : "from-zinc-800/50 to-zinc-900/50 border-zinc-700"}
              `}>
                        {/* Top bar indicator */}
                        <div className={`
                  h-1.5
                  ${event.isActive
                            ? "bg-gradient-to-r from-blue-400 to-indigo-600"
                            : event.isPast
                              ? "bg-green-500"
                              : "bg-zinc-700"}
                `}></div>

                        <div className="p-4">
                          {/* Status indicator */}
                          <div className="flex justify-between items-center mb-3">
                            <span className={`
                      text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center
                      ${event.isActive
                                ? "bg-blue-500/20 text-blue-300"
                                : event.isPast
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-zinc-800 text-zinc-400"}
                    `}>
                              {event.isPast && !event.isActive && (
                                <FileCheck className="mr-1 h-3 w-3" />
                              )}
                              {event.isActive && (
                                <Clock className="mr-1 h-3 w-3 animate-pulse" />
                              )}
                              {event.isActive ? "In Progress" : event.isPast ? "Completed" : "Upcoming"}
                            </span>
                          </div>

                          {/* Date pill */}
                          <div className={`
                    inline-block mb-2 px-2 py-1 rounded-md text-xs font-mono
                    ${event.isActive
                              ? "bg-blue-500/30 text-blue-200"
                              : event.isPast
                                ? "bg-green-500/20 text-green-200"
                                : "bg-zinc-800 text-zinc-400"}
                  `}>
                            {event.date}
                          </div>
                          <div className={`text-xs font-mono ${event.isActive
                            ? "text-blue-300"
                            : event.isPast
                              ? "text-green-300"
                              : "text-zinc-400"}`}>
                            {event.startTime} - {event.endTime}
                          </div>

                          {/* Content */}
                          <h4 className={`
                    font-bold text-base mb-2
                    ${event.isActive ? "text-blue-300" : event.isPast ? "text-green-200" : "text-white"}
                  `}>
                            {event.title}
                          </h4>
                          <p className={`
                    text-xs
                    ${event.isActive ? "text-blue-100/80" : event.isPast ? "text-green-100/80" : "text-zinc-400"}
                  `}>
                            {/* {event.description} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Submission Section */}
        {teamData.status === "Approved" && (
          <div className="w-full bg-black rounded-xl border border-zinc-800 overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Project Submission</h3>

              {isProjectSubmitted ? (
                // Project already submitted section
                <div className="bg-zinc-900 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 aspect-square rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <FileCode className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-green-400">Project Submitted</p>
                      <p className="text-zinc-400 text-sm">Your project has been successfully submitted for the HACK&#123;<span className="text-green-400">0</span>&#125;LUTION 2<span className="text-green-400">K</span>25.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-blue-400 mb-2 font-medium">Submitted Links</h4>
                      <div className="space-y-3">
                        <a
                          href={teamData.projectSubmit[0].projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Project Repository
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>

                        {teamData.projectSubmit[0].hostedLink !== "null" &&
                          teamData.projectSubmit[0].hostedLink !== "Null" &&
                          teamData.projectSubmit[0].hostedLink !== "NULL" ? (
                          <a
                            href={teamData.projectSubmit[0].hostedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-400 hover:text-blue-300"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Hosted Application
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : null}

                        <a
                          href={teamData.projectSubmit[0].pptLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <Presentation className="h-4 w-4 mr-2" />
                          Submitted PPT
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>

                        <a
                          href={teamData.projectSubmit[0].projectVideo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Submitted Project Video
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-blue-400 mb-2 font-medium">Submission Status</h4>
                      <p className="text-zinc-400 text-sm">
                        Your project has been submitted for judging. Please make sure all links remain accessible throughout the judging period.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Submission form
                <div className="bg-zinc-900 p-4 rounded-lg mb-4">
                  <p className="text-zinc-400 text-sm mb-4">
                    Please submit your project links below. Make sure your project is properly hosted and the repository is accessible.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label htmlFor="projectLink" className="block text-medium font-medium mb-2 text-blue-400">
                          *Project Hosted Link
                        </label>
                        <Input
                          type="url"
                          id="projectLink"
                          value={pLink}
                          onChange={(e) => setPLink(e.target.value)}
                          placeholder="Your project hosted link (if available)"
                        />
                      </div>

                      <div className="flex-1">
                        <label htmlFor="githubLink" className="block text-medium font-medium mb-2 text-blue-400">
                          *GitHub Repository Link
                        </label>
                        <Input
                          type="url"
                          id="githubLink"
                          value={gLink}
                          onChange={(e) => setGLink(e.target.value)}
                          placeholder="Your project github repository link"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pptLink" className="block text-medium font-medium mb-2 text-blue-400">
                        *Project PPT Link
                      </label>
                      <Input
                        type="url"
                        id="pptLink"
                        value={ppLink}
                        onChange={(e) => setPptLink(e.target.value)}
                        placeholder="Project details presentation link"
                      />
                    </div>

                    <div>
                      <label htmlFor="videoLink" className="block text-medium font-medium mb-2 text-blue-400">
                        *Project Video Link
                      </label>
                      <Input
                        type="url"
                        id="vidLink"
                        value={vid}
                        onChange={(e) => setVid(e.target.value)}
                        placeholder="Youtube video link preferred"
                      />
                    </div>

                    <div>
                      <label htmlFor="tech stack" className="block text-medium font-medium mb-2 text-blue-400">
                        *Used Tech Stacks In Your Project
                      </label>
                      <Input
                        type="text"
                        id="techStack"
                        value={tStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        placeholder="Python, Flask, MongoDB"
                      />
                    </div>

                    <div>
                      <label htmlFor="difficulty" className="block text-medium font-medium mb-2 text-blue-400">
                        *Challenges Encountered In The Project
                      </label>
                      <Input
                        type="text"
                        id="difficulty"
                        value={difi}
                        onChange={(e) => setDifi(e.target.value)}
                        placeholder="Describe the challenges encountered during the project"
                      />
                    </div>
                  </div>

                  {/* Project Submit button */}

                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium hover:cursor-pointer"
                      onClick={handleProjectSubmission}
                    >
                      {Btnloading ? (
                        <>
                          <Loader2Icon className="inline w-6 h-6 text-blue-400 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          Submit Project &rarr;
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Info Section */}
        <div
          className="w-full bg-black rounded-xl border border-zinc-800 overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Important Information</h3>
            <div className="bg-zinc-900 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-2 text-blue-400">Next Steps</h4>
              <p className="text-zinc-400 text-sm">
                {teamData.status === "Pending" ? (
                  "Your application is currently being reviewed by our team. You will receive an email once the status changes. Please make sure to check your email regularly for updates."
                ) : teamData.status === "Approved" ? (
                  "Congratulations! Your team has been approved to participate. Please check your email and discord announcements for further instructions and details about the event."
                ) : (
                  "We regret to inform you that your application has not been approved."
                )}
              </p>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-400">Need Help?</h4>
              <p className="text-zinc-400 text-sm">
                If you have any questions or need assistance, please contact us at <span className="text-blue-400"><a target="_blank" href="https://discord.gg/hjxtZZXsD4 ">Discord.</a></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Dashboard;