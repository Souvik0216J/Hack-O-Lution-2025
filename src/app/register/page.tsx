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
  const [userExist, setUserExist] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState(false)
  
  type Member = {
    name: string;
    email: string;
    tshirtSize: string;
  };

  const [user, setUser] = React.useState<{
    teamName: string;
    teamSize: string;
    leaderName: string;
    leaderEmail: string;
    leaderNo: string;
    leaderCity: string;
    leaderClgName: string;
    leaderTshirtSize: string;
    projectIDea: string;
    members: Member[];
  }>({
    teamName: "",
    teamSize: "2",
    leaderName: "",
    leaderEmail: "",
    leaderNo: "",
    leaderCity: "",
    leaderClgName: "",
    leaderTshirtSize: "S - Size",
    projectIDea: "",
    // Initialize one member everytime 
    members: [{ name: "", email: "", tshirtSize: "S - Size" }],
  });

  // Initialize members based on default team size on component mount
  React.useEffect(() => {
    const size = parseInt(user.teamSize);
    setUser(prev => ({
      ...prev,
      members: Array.from({ length: size - 1 }, (_, i) => 
        prev.members[i] || { name: "", email: "", tshirtSize: "S - Size" }
      ),
    }));
  }, []);

  const onRegister = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/register", user)
      if(response.status === 201){
        setUserExist(false)
        setSubmitError(false)
        
        // Sending email 
        await axios.post("/api/send", {
          leaderName: user.leaderName,
          leaderEmail: user.leaderEmail,
          teamName: user.teamName,
          leaderNo : user.leaderNo,
          members: user.members, // array of { name, email }
        });
        
        setSubmitDone(true)
        setTimeout(() => { router.push("/login") }, 3000);
      }
    }
    catch (error: any) {
      console.log("Signup failed", error)
      if (error.response && error.response.status === 400) {
        setUserExist(true)
      }
      else{
        setSubmitError(true)
      }
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onRegister();
  };

  return (
    <div className="mt-25 min-h-screen w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <Spotlight />
      <div className="shadow-input mx-auto w-full max-w-md rounded bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Hack&#123;0&#125;Lution
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
              value={user.teamSize}
              onChange={(e) => {
                const selectedSize = e.target.value;
                const size = parseInt(selectedSize);

                setUser((prev) => ({
                  ...prev,
                  teamSize: selectedSize,
                  members: Array.from({ length: size - 1 }, (_, i) => prev.members?.[i] || { name: "", email: "", tshirtSize: "" }),
                }));
              }}
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
            <Input id="phone" placeholder="Enter phone number" type="tel" required maxLength={10} minLength={10}
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
            <Input id="phone" placeholder="Enter college name" type="text" required
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
                ...user, leaderTshirtSize: e.target.value,
              })}
            />
          </LabelInputContainer>


          {user.members.map((member, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-semibold mb-2">Member {index + 1} </h4>

              <LabelInputContainer className="mb-4">
                <Label><span className="text-red-400 mr-0.5">*</span>Member {index + 1} Name</Label>
                <Input
                  type="text"
                  value={member.name}
                  required
                  placeholder={`Member-${index + 1} name`}
                  onChange={(e) => {
                    const newMembers = [...user.members];
                    newMembers[index].name = e.target.value;
                    setUser({ ...user, members: newMembers });
                  }}
                />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label><span className="text-red-400 mr-0.5">*</span>Member {index + 1} Email</Label>
                <Input
                  type="email"
                  value={member.email}
                  required
                  placeholder={`Member-${index + 1} email`}
                  onChange={(e) => {
                    const newMembers = [...user.members];
                    newMembers[index].email = e.target.value;
                    setUser({ ...user, members: newMembers });
                  }}
                />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label><span className="text-red-400 mr-0.5">*</span>Member {index + 1} T-Shirt Size</Label>
                <Input
                  dropdown
                  required
                  options={[
                    { value: "S - Size", label: "S - Size" },
                    { value: "M - Size", label: "M - Size" },
                    { value: "L - Size", label: "L - Size" },
                    { value: "XL - Size", label: "XL - Size" },
                    { value: "XXL - Size", label: "XXL - Size" },
                  ]}
                  value={member.tshirtSize}
                  onChange={(e) => {
                    const newMembers = [...user.members];
                    newMembers[index].tshirtSize = e.target.value;
                    setUser({ ...user, members: newMembers });
                  }}
                />
              </LabelInputContainer>
            </div>
          ))}

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
          >
            {loading ? (
              <>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </>
            ) : (
              <>
                Register &rarr;
              </>
            )
            }

            <BottomGradient />
          </button>
          <br />
          <h2 className="text-red-500 text-xl">{userExist ? "User Already Exists" : ""}</h2>
          <h2 className="text-red-500 text-xl">{submitError ? "Something went wrong! Please try again some time later" : ""}</h2>
          <h2 className="text-xl text-green-500">{submitDone ? "Register Successfully, Wait a sec." : ""}</h2>
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