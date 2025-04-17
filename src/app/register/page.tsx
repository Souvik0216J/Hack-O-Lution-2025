"use client";
import { Label } from "@/components/ui/labels";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import React from "react";

function Page() {
  const router = useRouter()
  const [submitDone, setSubmitDone] = React.useState(false)
  const [user, setUser] = React.useState({
    teamName: "",
    teamSize: "",
    leaderName: "",
    leaderEmail: "",
    leaderNo: "",
    leaderCity: "",
    leaderClgName: "",
    leaderTshirtSize: "",
    projectIDea: "",
  })

  const onRegister = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/register", user)
      setSubmitDone(true)
      console.log("Signup success", response.data)
      setTimeout(() => { router.push("/login") }, 3000);
    }
    catch (error: any) {
      console.log("Signup failed", error)
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="mt-25 min-h-screen w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <Spotlight />
      <div className="shadow-input mx-auto w-full max-w-md rounded bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to HackOLution
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          After registration you recieved login credentials by email.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="team name"><span className="text-red-400 mr-0.5">*</span>Team Name</Label>
            <Input id="text" placeholder="Enter your team name" type="text" required value={user.teamName}
              onChange={(e) => setUser({
                ...user, teamName: e.target.value
              })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="teamsize"><span className="text-red-400 mr-0.5">*</span>Team Size</Label>
            <Input
              dropdown
              options={[
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
              ]}

              onChange={(e) => setUser({
                ...user, teamSize: e.target.value
              })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="leader name"><span className="text-red-400 mr-0.5">*</span>Leader&apos;s Name</Label>
            <Input id="text" placeholder="Enter your name" type="text" required value={user.leaderName}
              onChange={(e) => setUser({
                ...user, leaderName: e.target.value
              })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email"><span className="text-red-400 mr-0.5">*</span>Leader&apos;s Email</Label>
            <Input id="email" placeholder="abc@gmail.com" type="email" required
              onChange={(e) => setUser({
                ...user, leaderEmail: e.target.value
              })}
            />

          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone"><span className="text-red-400 mr-0.5">*</span>Leader&apos;s WhatApp No</Label>
            <Input id="phone" placeholder="Enter phone number" type="text" required
              onChange={(e) => setUser({
                ...user, leaderNo: e.target.value
              })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="city"><span className="text-red-400 mr-0.5">*</span>Leader&apos;s City</Label>
            <Input id="city" placeholder="Enter your city name" type="text" required
              onChange={(e) => setUser({
                ...user, leaderCity: e.target.value
              })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="collegename"><span className="text-red-400 mr-0.5">*</span>Leader&apos;s College Name</Label>
            <Input id="phone" placeholder="Enter phone number" type="text" required
              onChange={(e) => setUser({
                ...user, leaderClgName: e.target.value
              })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="tshirtsize"><span className="text-red-400 mr-0.5">*</span>Leader&apos;s Size of T-shirt</Label>
            <Input
              dropdown
              options={[
                { value: "S - Size", label: "S - Size" },
                { value: "M - Size", label: "M - Size" },
                { value: "L - Size", label: "L - Size" },
                { value: "XL - Size", label: "XL - Size" },
                { value: "XXL - Size", label: "XXL - Size" },
              ]}
              onChange={(e) => setUser({
                ...user, leaderTshirtSize: e.target.value
              })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="project"><span className="text-red-400 mr-0.5">*</span>Project idea</Label>
            <Input
              multiline
              id="text"
              placeholder="Enter project idea"
              type="text"
              required
              onChange={(e) => setUser({
                ...user, projectIDea: e.target.value
              })}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:cursor-pointer"
            type="submit"
            onClick={onRegister}
          >
            {loading ? "Waiting a while" : "Register"} &rarr;
            <BottomGradient />
          </button>
          <br />
          <h2 className="text-xl text-green-500">{submitDone ? "Register Successfully\nWait a sec, redirecting to login page" : ""}</h2>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default Page
