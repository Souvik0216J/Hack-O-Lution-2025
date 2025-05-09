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
          Welcome to Hack&#123;0&#125;Lution Login
        </h2>
        {/* <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        
        </p> */}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="abc@gmail.com" type="email"
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
                {/* <svg aria-hidden="true" className="inline w-8 h-8 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg> */}
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
