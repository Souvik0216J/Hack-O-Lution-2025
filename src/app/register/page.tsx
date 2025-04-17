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
  const [user, setUser] = React.useState({
    teamName : "",
    teamSize : "",
    leaderName : "",
    leaderEmail : "",
    leaderNo : "",
    leaderCity : "",
    leaderClgName : "",
    leaderTshirtSize : "",
    projectIDea : "",
  })

  const onRegister = async () =>{
    try{
      setLoading(true)
      const response = await axios.post("/api/users/register", user)
    }
    catch(error:any){

    }
    finally{
      setLoading(false)
    }
  }

  const [buttonDisable, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  
  return (
    <div className="mt-25 min-h-screen w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">   
    <Spotlight/>
      <div className="shadow-input mx-auto w-full max-w-md rounded bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to HackOLution
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          After registration you recieved login credentials by email.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname"><span className="text-red-400 mr-0.5">*</span>First name</Label>
              <Input id="firstname" placeholder="Your first name" type="text" required/>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname"><span className="text-red-400 mr-0.5">*</span>Last name</Label>
              <Input id="lastname" placeholder="Your last name" type="text" required/>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email"><span className="text-red-400 mr-0.5">*</span>Email Address</Label>
            <Input id="email" placeholder="abc@gmail.com" type="email" required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password"><span className="text-red-400 mr-0.5">*</span>Password</Label>
            <Input id="password" placeholder="Enter password" type="password" required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirmpassword"><span className="text-red-400 mr-0.5">*</span>Confirm password</Label>
            <Input
              id="password"
              placeholder="Re-enter password"
              type="password"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="tshirtsize"><span className="text-red-400 mr-0.5">*</span>Size of T-shirt</Label>
            <Input
               dropdown 
               options={[
                 { value: "S - Size", label: "S - Size" },
                 { value: "M - Size", label: "M - Size" },
                 { value: "L - Size", label: "L - Size" },
                 { value: "XL - Size", label: "XL - Size" },
                 { value: "XXL - Size", label: "XXL - Size" },
               ]} 
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
            />
          </LabelInputContainer>
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:cursor-pointer"
            type="submit"
            >
            Submit &rarr;
            <BottomGradient />
          </button>
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
