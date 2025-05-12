"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Users, Search, X, Check, Linkedin, Filter, ArrowUpDown, Mail, Phone, Lightbulb, ExternalLink, Clock, Github, Globe, Loader2 } from "lucide-react";

type Member = {
  name: string;
  email: string;
  linkedin: string;
  tshirtSize: string;
  phone?: string;
  _id: string;
};

type SelectionInfo = {
  isSelected: "Pending" | "Approved" | "Rejected";
};

type ProjectSubmit = {
  isSubmit: boolean;
  projectLink: string;
  hostedLink: string;
};

type Registration = {
  teamId: string;
  teamName: string;
  teamSize: string;
  leaderName: string;
  leaderEmail: string;
  leaderLinkedin: string;
  leaderNo: string;
  leaderCity: string;
  leaderClgName: string;
  leaderTshirtSize: string;
  projectIDea: string;
  members: Member[];
  date: string;
  selectionInfo: SelectionInfo[];
  projectSubmit: ProjectSubmit[];
  lastLogin: string;
};

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const [selectedTeam, setSelectedTeam] = useState<Registration | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [sortBy, setSortBy] = useState<"submittedAt" | "teamName" | "membersCount">("submittedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [loadingTeamId, setLoadingTeamId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<"Approved" | "Rejected" | null>(null);

  // Add this to your existing useState imports
  const [confirmAction, setConfirmAction] = useState<{
    teamId: string;
    action: "Approved" | "Rejected";
  } | null>(null);

  // Fetch registrations data
  React.useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/admin-user-data");

        if (response.data && Array.isArray(response.data.users)) {
          setRegistrations(response.data.users);
        }

        setLoading(false);

      } catch (error: any) {
        console.error("Error fetching registration data:", error);
        toast.error("Failed to load registrations data");
        // setLoading(false);
      }
    }

    fetchRegistrations();

  }, []);

  // handle team status changes
  const updateTeamStatus = async (teamId: string, newStatus: "Pending" | "Approved" | "Rejected") => {
    try {

      setLoadingTeamId(teamId);
      setLoadingAction(newStatus === "Pending" ? null : newStatus);

      // API call 
      const response = await axios.post("/api/admin/change-team-status", {
        teamId: teamId,
        status: newStatus
      });

      if (response.data && response.data.success) {
        toast.success(`Team status updated to ${newStatus}`);
        // change ui
        setRegistrations(registrations.map(team => {
          if (team.teamId === teamId) {
            const updatedTeam = {
              ...team,
              selectionInfo: [{
                ...team.selectionInfo[0],
                isSelected: newStatus
              }]
            };
            return updatedTeam;
          }
          return team;
        }));

        if (selectedTeam && selectedTeam.teamId === teamId) {
          setSelectedTeam({
            ...selectedTeam,
            selectionInfo: [{
              ...selectedTeam.selectionInfo[0],
              isSelected: newStatus
            }]
          });
        }

      } else {
        throw new Error(response.data?.message || "Failed to update status");
      }
    } catch (error: any) {
      console.error("Error updating team status:", error);
      toast.error(error.message || "Failed to update team status");

      // Rollback UI changes on error
      setRegistrations(prev => [...prev]);
      if (selectedTeam) {
        setSelectedTeam({ ...selectedTeam });
      }
    }
    finally {
      setLoadingTeamId(null);
      setLoadingAction(null);
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

  // Function to get team status from selectionInfo
  const getTeamStatus = (team: Registration): "Pending" | "Approved" | "Rejected" => {
    return team.selectionInfo && team.selectionInfo.length > 0
      ? team.selectionInfo[0].isSelected as "Pending" | "Approved" | "Rejected"
      : "Pending";
  };

  // Function to get project submission status
  const getProjectSubmissionStatus = (team: Registration): boolean => {
    return team.projectSubmit && team.projectSubmit.length > 0
      ? team.projectSubmit[0].isSubmit
      : false;
  };

  // date convert helper function
  const parseDate = (dateString: string) => {
    // Convert date strings like "29/4/2025, 16:34:15" 
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  // Apply filters and sorting
  const filteredTeams = registrations
    .filter((team) => {
      const teamStatus = getTeamStatus(team);
      return (statusFilter === "All" || teamStatus === statusFilter) &&
        (team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.leaderName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    .sort((a, b) => {
      if (sortBy === "submittedAt") {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else if (sortBy === "teamName") {
        return sortOrder === "asc"
          ? a.teamName.localeCompare(b.teamName)
          : b.teamName.localeCompare(a.teamName);
      } else if (sortBy === "membersCount") {
        const aCount = a.members.length + 1; // +1 for leader
        const bCount = b.members.length + 1; // +1 for leader
        return sortOrder === "asc"
          ? aCount - bCount
          : bCount - aCount;
      }
      return 0;
    })

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
    pending: registrations.filter((r) => getTeamStatus(r) === "Pending").length,
    approved: registrations.filter((r) => getTeamStatus(r) === "Approved").length,
    rejected: registrations.filter((r) => getTeamStatus(r) === "Rejected").length,
  };

  const logout = async () => {
    try {
      await axios.get("/api/admin/logout")
      toast.success("Logout successful")
      router.push("/")
      router.refresh();
    } catch (error: any) {
      toast.error(error.message)
    }
  }

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
      <div className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-2">Hack&#123;0&#125;Lution</h1>
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs font-medium">
              Admin Panel
            </span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-red-500 transition hover:cursor-pointer">
            Logout
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
                      <td className="px-4 py-4">{team.teamSize}</td>
                      <td className="px-4 py-4 text-zinc-400 text-sm">{team.date}</td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getStatusBadge(getTeamStatus(team))
                        )}>
                          {getTeamStatus(team)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          {getTeamStatus(team) !== "Approved" && (
                            <button
                              onClick={() => {
                                setSelectedTeam(team);
                                setConfirmAction({ teamId: team.teamId, action: "Approved" });
                              }}
                              className="p-1 bg-green-500/10 border border-green-500/20 rounded hover:bg-green-500/20"
                              title="Approve Team"
                              disabled={loadingTeamId === team.teamId}
                            >
                              {loadingTeamId === team.teamId && loadingAction === "Approved" ? (
                                <Loader2 className="h-4 w-4 text-green-500 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </button>
                          )}
                          {getTeamStatus(team) !== "Rejected" && (
                            <button
                              onClick={() => {
                                setSelectedTeam(team);
                                setConfirmAction({ teamId: team.teamId, action: "Rejected" });
                              }}
                              className="p-1 bg-red-500/10 border border-red-500/20 rounded hover:bg-red-500/20"
                              title="Reject Team"
                              disabled={loadingTeamId === team.teamId}
                            >
                              {loadingTeamId === team.teamId && loadingAction === "Rejected" ? (
                                <Loader2 className="h-4 w-4 text-red-500 animate-spin" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 hover:cursor-pointer" />
                              )}
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
                    getStatusBadge(getTeamStatus(selectedTeam))
                  )}>
                    {getTeamStatus(selectedTeam)}
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
                        <p className="text-sm">{selectedTeam.date}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Last login</p>
                        <p className="text-sm">{selectedTeam.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Team Size</p>
                        <p className="text-sm">{selectedTeam.teamSize} Members</p>
                      </div>
                    </div>

                    {/* Project Submission Status */}
                    <div className="mb-4 p-3 border border-zinc-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Project Submission</h3>
                        {getProjectSubmissionStatus(selectedTeam) ? (
                          <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Submitted
                          </span>
                        ) : (
                          <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </span>
                        )}
                      </div>

                      {getProjectSubmissionStatus(selectedTeam) && selectedTeam.projectSubmit && selectedTeam.projectSubmit.length > 0 ? (
                        <div className="space-y-2 text-sm">
                          {selectedTeam.projectSubmit[0].projectLink && selectedTeam.projectSubmit[0].projectLink !== "null" && (
                            <a
                              href={selectedTeam.projectSubmit[0].projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-400 hover:text-blue-300"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Project Repository
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}

                          {selectedTeam.projectSubmit[0].hostedLink && selectedTeam.projectSubmit[0].hostedLink !== "null" && (
                            <a
                              href={selectedTeam.projectSubmit[0].hostedLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-400 hover:text-blue-300"
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              Hosted Application
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <p className="text-zinc-400 text-xs">No project submissions yet.</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {getTeamStatus(selectedTeam) !== "Approved" && (
                        <button
                          onClick={() => setConfirmAction({ teamId: selectedTeam.teamId, action: "Approved" })}
                          className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-lg text-green-500 hover:bg-green-500/20 flex-grow cursor-pointer"
                          disabled={loadingTeamId === selectedTeam.teamId}
                        >
                          {loadingTeamId === selectedTeam.teamId && loadingAction === "Approved" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4" /> Approve Team
                            </>
                          )}
                        </button>
                      )}
                      {getTeamStatus(selectedTeam) !== "Rejected" && (
                        <button
                          onClick={() => setConfirmAction({ teamId: selectedTeam.teamId, action: "Rejected" })}
                          className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/20 flex-grow cursor-pointer"
                          disabled={loadingTeamId === selectedTeam.teamId}
                        >
                          {loadingTeamId === selectedTeam.teamId && loadingAction === "Rejected" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4" /> Reject Team
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="font-medium mb-3">Team Members</h3>
                  <div className="space-y-3">
                    {/* Leader information */}
                    <div className="bg-zinc-900 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold mr-3">
                          {selectedTeam.leaderName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{selectedTeam.leaderName}</p>
                          <p className="text-zinc-400 text-xs">Team Leader</p>
                        </div>
                      </div>
                      <div className="pl-11 space-y-1">
                        <div className="flex items-center text-zinc-400 text-sm hover:cursor-pointer">
                          <a
                            href={selectedTeam.leaderLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-400 hover:text-blue-300"
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            Linkedin
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                          {/* {selectedTeam.leaderLinkedin} */}
                        </div>
                        <div className="flex items-center text-zinc-400 text-sm">
                          <Mail className="h-3 w-3 mr-2" />
                          {selectedTeam.leaderEmail}
                        </div>
                        <div className="flex items-center text-zinc-400 text-sm">
                          <Phone className="h-3 w-3 mr-2" />
                          {selectedTeam.leaderNo}
                        </div>
                        <div className="text-zinc-500 text-xs">
                          City: {selectedTeam.leaderCity}
                        </div>
                        <div className="text-zinc-500 text-xs">
                          College: {selectedTeam.leaderClgName}
                        </div>
                        <div className="text-zinc-500 text-xs">
                          T-shirt: {selectedTeam.leaderTshirtSize}
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Modal */}
                    {confirmAction && (
                      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-md w-full mx-4 animate-fadeIn">
                          <h3 className="text-lg font-medium mb-4">Confirm Action</h3>
                          <p className="mb-6">
                            Are you sure to mark {selectedTeam.teamName} as
                            <span className={confirmAction.action === "Approved"
                              ? "text-green-500 font-medium mx-1"
                              : "text-red-500 font-medium mx-1"
                            }>
                              {confirmAction.action}
                            </span>?
                          </p>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => setConfirmAction(null)}
                              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                if (confirmAction) {
                                  updateTeamStatus(confirmAction.teamId, confirmAction.action);
                                  setConfirmAction(null);
                                }
                              }}
                              className={`px-4 py-2 rounded-lg ${confirmAction.action === "Approved"
                                ? "bg-green-500/20 text-green-500 hover:bg-green-500/30 cursor-pointer"
                                : "bg-red-500/20 text-red-500 hover:bg-red-500/30 cursor-pointer"
                                }`}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Members information */}
                    {selectedTeam.members.map((member, index) => (
                      <div key={member._id} className="bg-zinc-900 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold mr-3">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-zinc-400 text-xs">Member</p>
                          </div>
                        </div>
                        <div className="pl-11 space-y-1">
                          <div className="flex items-center text-zinc-400 text-sm hover:cursor-pointer">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-400 hover:text-blue-300"
                            >
                              <Linkedin className="h-4 w-4 mr-2" />
                              Linkedin
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                            {/* {member.linkedin} */}
                          </div>

                          <div className="flex items-center text-zinc-400 text-sm">
                            <Mail className="h-3 w-3 mr-2" />
                            {member.email}
                          </div>

                          {member.phone && (
                            <div className="flex items-center text-zinc-400 text-sm">
                              <Phone className="h-3 w-3 mr-2" />
                              {member.phone}
                            </div>
                          )}
                          <div className="text-zinc-500 text-xs">
                            T-shirt: {member.tshirtSize}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-3">
                        <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                        <h3 className="font-medium text-blue-300">Project Idea</h3>
                      </div>

                      <p className="text-zinc-300 text-sm mb-3">
                        {selectedTeam.projectIDea !== "NULL" ? selectedTeam.projectIDea : "No project idea submitted yet"}
                      </p>
                    </div>
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