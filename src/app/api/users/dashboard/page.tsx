"use client";
import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { User, Users, FileCheck, Clock } from "lucide-react";

function Dashboard() {
  // This would normally come from your API/backend
  const [teamData, setTeamData] = React.useState({
    teamId: "509040",
    teamName: "4Bits",
    status: "Pending", // "Pending", "Approved", "Rejected"
    leaderName: "Souvik Das",
    members: [
      { name: "Souvik Das", email: "souvik@example.com", tshirtSize: "M - Size", avatar: "S" },
      { name: "Rahul Sharma", email: "rahul@example.com", tshirtSize: "L - Size", avatar: "R" },
    ]
  });

  // Function to get status badge styling
  const getStatusBadge = (status:string) => {
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

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Hack&#123;0&#125;Lution</h1>
          <button className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-red-500 transition hover:cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Team Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                    <p className="font-medium">{teamData.members.length} Members</p>
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
                {teamData.members.map((member, index) => (
                  <div key={index} className="bg-zinc-900 rounded-lg p-4 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold mr-4">
                      {member.avatar}
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
        </motion.div>

        {/* Additional Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-black rounded-xl border border-zinc-800 overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Important Information</h3>
            <div className="bg-zinc-900 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-2 text-blue-400">Next Steps</h4>
              <p className="text-zinc-400 text-sm">
                Your application is currently being reviewed by our team. You will receive an email once the status changes.
                Please make sure to check your email regularly for updates.
              </p>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-400">Need Help?</h4>
              <p className="text-zinc-400 text-sm">
                If you have any questions or need assistance, please contact us at <span className="text-blue-400">support@hack0lution.dev</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;