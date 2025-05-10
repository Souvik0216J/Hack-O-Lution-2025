"use client";
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/spotlight-new";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";

export default function SignupFormDemo() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false)
  const [usernotexist, setNotUserExist] = React.useState(false)
  const [wrongpass, setWrongPass] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })
  const onLogin = async () => {
    try {
      setLoading(true);
      setNotUserExist(false)
      setWrongPass(false)
      setSuccess(false)

      await axios.post("/api/users/login", user);
      setSuccess(true)
      
      // Small delay to ensure cookies are set before redirecting
      setTimeout(() => {
        toast.success("Login success");
        router.push("/dashboard");
      }, 100);

    } catch (error: any) {
      console.log("Login failed", error.message);
      if(error.response.status === 400){
        setNotUserExist(true)
      }
      else if(error.response.status === 401){
        setWrongPass(true)
      }

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onLogin();
  };

  return (
    <div className="mt-12 min-h-screen w-full rounded-md flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <Spotlight />
      <div className="shadow-input mx-auto w-full max-w-md rounded p-4 md:rounded-2xl md:p-8 bg-black">
        <h2 className="text-xl font-bold text-neutral-200">
          Welcome to HACK&#123;<span className="text-green-400">0</span>&#125;LUTION Login
        </h2>
        {/* <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        
        </p> */}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="Email" type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </LabelInputContainer>


          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:cursor-pointer"
            type="submit"
          >
            {loading ? (
              <>
                <LoaderIcon className="inline w-6 h-6 text-blue-400 animate-spin"/> Processing...
              </>
            ) : (
              <>
                Login &rarr;
              </>
            )
            }
            <BottomGradient />
          </button>
          <br />
          <h2 className="text-red-500 text-xl">{usernotexist ? "User not found" : ""}</h2>
          <h2 className="text-red-500 text-xl">{ wrongpass ? "Wrong password" : ""}</h2>
          <h2 className="text-green-500 text-xl">{ success ? "Login success" : ""}</h2>
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
