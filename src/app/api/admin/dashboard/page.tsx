"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { 
  User, 
  Users, 
  Search, 
  FileCheck, 
  Clock, 
  X, 
  Check, 
  Filter, 
  ArrowUpDown, 
  LogOut,
  Mail,
  Phone,
  Lightbulb,
  Code
} from "lucide-react";

type Member = {
  name: string;
  email: string;
  tshirtSize: string;
  phone: string;
};

type Registration = {
  teamId: string;
  teamName: string;
  status: "Pending" | "Approved" | "Rejected";
  leaderName: string;
  membersCount: number;
  submittedAt: string;
  members: Member[];
  projectIdea: string;
};

const AdminDashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      teamId: "HACK-2025-0042",
      teamName: "Souvik_05",
      status: "Pending",
      leaderName: "Souvik Das",
      membersCount: 2,
      submittedAt: "2025-04-15T14:30:00",
      members: [
        {
          name: "Souvik Das",
          email: "souvik@example.com",
          tshirtSize: "M - Size",
          phone: "00000000000",
        },
        {
          name: "abc",
          email: "abc@example.com",
          tshirtSize: "L - Size",
          phone: "00000000000",
        },
      ],
      projectIdea: "This is our project idea",
    },
    {
      teamId: "HACK-2025-0051",
      teamName: "CodeWarriors",
      status: "Approved",
      leaderName: "Souvik",
      membersCount: 3,
      submittedAt: "2025-04-14T10:15:00",
      members: [
        {
          name: "xyz",
          email: "xyz@example.com",
          tshirtSize: "S - Size",
          phone: "00000000000",
        },
        {
          name: "abc",
          email: "abc@example.com",
          tshirtSize: "M - Size",
          phone: "00000000000",
        },
        {
          name: "abc",
          email: "abc@example.com",
          tshirtSize: "S - Size",
          phone: "00000000000",
        },
      ],
      projectIdea: "This is our project idea",
    },
  ]);

  const [selectedTeam, setSelectedTeam] = useState<Registration | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [sortBy, setSortBy] = useState<"submittedAt" | "teamName" | "membersCount">("submittedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Function to handle team status changes
  const updateTeamStatus = (teamId: string, newStatus: "Pending" | "Approved" | "Rejected") => {
    setRegistrations(registrations.map(team =>
      team.teamId === teamId ? { ...team, status: newStatus } : team
    ));

    if (selectedTeam && selectedTeam.teamId === teamId) {
      setSelectedTeam({ ...selectedTeam, status: newStatus });
    }
  };

  // Function to get status badge styling
  const getStatusBadge = (status: "Pending" | "Approved" | "Rejected"): string => {
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

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Apply filters and sorting
  const filteredTeams = registrations
    .filter((team) =>
      (statusFilter === "All" || team.status === statusFilter) &&
      (team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.leaderName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "submittedAt") {
        return sortOrder === "asc"
          ? new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
          : new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      } else if (sortBy === "teamName") {
        return sortOrder === "asc"
          ? a.teamName.localeCompare(b.teamName)
          : b.teamName.localeCompare(a.teamName);
      } else if (sortBy === "membersCount") {
        return sortOrder === "asc"
          ? a.membersCount - b.membersCount
          : b.membersCount - a.membersCount;
      }
      return 0;
    });

  // Toggle sort order
  const toggleSort = (field: "submittedAt" | "teamName" | "membersCount") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Dashboard statistics
  const stats = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "Pending").length,
    approved: registrations.filter((r) => r.status === "Approved").length,
    rejected: registrations.filter((r) => r.status === "Rejected").length,
  };


  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-2">Hack&#123;0&#125;Lution</h1>
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs font-medium">
              Admin Panel
            </span>
          </div>
          <button className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition flex items-center">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-black p-4 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-1">Total Registrations</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-black p-4 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-1">Pending Review</h3>
            <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-black p-4 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-1">Approved</h3>
            <p className="text-2xl font-bold text-green-500">{stats.approved}</p>
          </div>
          <div className="bg-black p-4 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-1">Rejected</h3>
            <p className="text-2xl font-bold text-red-500">{stats.rejected}</p>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-black rounded-xl border border-zinc-800 p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by team name, ID or leader..."
                className="bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <select
                  className="bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 appearance-none focus:outline-none focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "Pending" | "Approved" | "Rejected" | "All")}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Registrations Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-black rounded-xl border border-zinc-800 overflow-hidden w-full lg:w-3/5"
          >
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-lg font-medium">Team Registrations</h2>
              <p className="text-zinc-400 text-sm">
                Showing {filteredTeams.length} of {registrations.length} teams
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                      <button 
                        onClick={() => toggleSort("teamName")} 
                        className="flex items-center hover:text-white"
                      >
                        Team Name
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Team Leader</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                      <button 
                        onClick={() => toggleSort("membersCount")} 
                        className="flex items-center hover:text-white"
                      >
                        Members
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                      <button 
                        onClick={() => toggleSort("submittedAt")} 
                        className="flex items-center hover:text-white"
                      >
                        Submitted
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team) => (
                    <tr 
                      key={team.teamId} 
                      className="border-b border-zinc-800 hover:bg-zinc-900/50 cursor-pointer"
                      onClick={() => setSelectedTeam(team)}
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium">{team.teamName}</p>
                          <p className="text-zinc-400 text-xs">{team.teamId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">{team.leaderName}</td>
                      <td className="px-4 py-4">{team.membersCount}</td>
                      <td className="px-4 py-4 text-zinc-400 text-sm">{formatDate(team.submittedAt)}</td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getStatusBadge(team.status)
                        )}>
                          {team.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          {team.status !== "Approved" && (
                            <button 
                              onClick={() => updateTeamStatus(team.teamId, "Approved")}
                              className="p-1 bg-green-500/10 border border-green-500/20 rounded hover:bg-green-500/20"
                              title="Approve Team"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </button>
                          )}
                          {team.status !== "Rejected" && (
                            <button 
                              onClick={() => updateTeamStatus(team.teamId, "Rejected")}
                              className="p-1 bg-red-500/10 border border-red-500/20 rounded hover:bg-red-500/20"
                              title="Reject Team"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredTeams.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                        No teams found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Team Details Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-black rounded-xl border border-zinc-800 overflow-hidden w-full lg:w-2/5 h-fit sticky top-24"
          >
            {selectedTeam ? (
              <div>
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Team Details</h2>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    getStatusBadge(selectedTeam.status)
                  )}>
                    {selectedTeam.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="bg-zinc-900 p-4 rounded-lg mb-4">
                    <div className="flex gap-4 mb-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedTeam.teamName}</h3>
                        <p className="text-zinc-400 text-sm">{selectedTeam.teamId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-zinc-400 text-xs">Submission Date</p>
                        <p className="text-sm">{formatDate(selectedTeam.submittedAt)}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Team Size</p>
                        <p className="text-sm">{selectedTeam.membersCount} Members</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedTeam.status !== "Approved" && (
                        <button 
                          onClick={() => updateTeamStatus(selectedTeam.teamId, "Approved")}
                          className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-lg text-green-500 hover:bg-green-500/20 flex-grow"
                        >
                          <Check className="h-4 w-4" /> Approve Team
                        </button>
                      )}
                      {selectedTeam.status !== "Rejected" && (
                        <button 
                          onClick={() => updateTeamStatus(selectedTeam.teamId, "Rejected")}
                          className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/20 flex-grow"
                        >
                          <X className="h-4 w-4" /> Reject Team
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                      <h3 className="font-medium text-blue-300">Project Idea</h3>
                    </div>
                    
                    <p className="text-zinc-300 text-sm mb-3">
                      {selectedTeam.projectIdea}
                    </p>
                  </div>  

                  <h3 className="font-medium mb-3">Team Members</h3>
                  <div className="space-y-3">
                    {selectedTeam.members.map((member, index) => (
                      <div key={index} className="bg-zinc-900 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold mr-3">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-zinc-400 text-xs">
                              {index === 0 ? "Team Leader" : "Member"}
                            </p>
                          </div>
                        </div>
                        <div className="pl-11 space-y-1">
                          <div className="flex items-center text-zinc-400 text-sm">
                            <Mail className="h-3 w-3 mr-2" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-zinc-400 text-sm">
                            <Phone className="h-3 w-3 mr-2" />
                            {member.phone}
                          </div>
                          <div className="text-zinc-500 text-xs">
                            T-shirt: {member.tshirtSize}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-400">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <h3 className="font-medium mb-2">No Team Selected</h3>
                <p className="text-sm">Click on a team from the list to view details</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;