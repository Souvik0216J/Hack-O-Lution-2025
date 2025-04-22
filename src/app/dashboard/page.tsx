"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { User, Users, FileCheck, Clock } from "lucide-react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Define types for your data structure
interface TeamMember {
  name: string;
  email: string;
  tshirtSize: string;
}

interface TeamData {
  teamId: string;
  teamName: string;
  status: string;
  leaderName: string;
  leaderEmail: String;
  leaderTshirtSize: String;
  members: TeamMember[];
}

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [teamData, setTeamData] = useState<TeamData>({
    teamId: "",
    teamName: "",
    status: "",
    leaderName: "",
    leaderEmail: "",
    leaderTshirtSize: "",
    members: [],
  });

  // Function to poll for updates every 30 seconds
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
          teamId: "HACK-2025-" + userData.teamId || "",
          teamName: userData.teamName || "",
          status: (userData.selectionInfo[0].isSelected as "Pending" | "Approved" | "Rejected"),
          leaderName: userData.leaderName || "",
          leaderEmail: userData.leaderEmail || "",
          leaderTshirtSize: userData.leaderTshirtSize || "",
          members: userData.members || []
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
    const intervalId = setInterval(fetchUserData, 30000); // Poll every 30 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [router]);

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
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const totalTeamSize = teamData.members.length + 1; // +1 for the leader

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Hack&#123;0&#125;Lution</h1>
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
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg font-bold mr-4">
                    {teamData.leaderName ? teamData.leaderName.charAt(0) : 'L'}
                  </div>
                  <div>
                    <h4 className="font-medium">{teamData.leaderName} <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Leader</span></h4>
                    <p className="text-zinc-400 text-sm">{teamData.leaderEmail}</p>
                    <p className="text-zinc-500 text-xs">{teamData.leaderTshirtSize}</p>
                  </div>
                </div>

                {/* Regular members */}
                {teamData.members.map((member, index) => (
                  <div key={index} className="bg-zinc-900 rounded-lg p-4 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold mr-4">
                      {member.name ? member.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-zinc-400 text-sm">{member.email}</p>
                      <p className="text-zinc-500 text-xs">{member.tshirtSize}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Submission Section */}
        {teamData.status === "Approved" && (
          <div className="w-full bg-black rounded-xl border border-zinc-800 overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Project Submission</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Please submit your project links below. Make sure your project is properly hosted and the repository is accessible.
              </p>
              <div className="bg-zinc-900 p-4 rounded-lg mb-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="projectLink" className="block text-medium font-medium mb-2 text-blue-400">
                      Project Hosted Link
                    </label>
                    <input
                      type="url"
                      id="projectLink"
                      // value={projectLink}
                      // onChange={(e) => setProjectLink(e.target.value)}
                      placeholder="https://your-project.com"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="githubLink" className="block text-medium font-medium mb-2 text-blue-400">
                      GitHub Repository Link
                    </label>
                    <input
                      type="url"
                      id="githubLink"
                      // value={githubLink}
                      // onChange={(e) => setGithubLink(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium"
                  // onClick={handleProjectSubmission}
                  >
                    Submit Project
                  </button>
                </div>
              </div>
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
                  "We regret to inform you that your application has not been approved. Please contact support for more information."
                )}
              </p>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-400">Need Help?</h4>
              <p className="text-zinc-400 text-sm">
                If you have any questions or need assistance, please contact us at <span className="text-blue-400">Discord.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;