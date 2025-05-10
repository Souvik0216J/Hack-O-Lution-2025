"use client";
import { Label } from "@/components/ui/labels";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import React from "react";
import { Geist } from "next/font/google";
import { LoaderIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

function Page() {
  const router = useRouter()
  const [submitDone, setSubmitDone] = React.useState(false)
  const [userExist, setUserExist] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState(false)
  const [EmailError, setEmailError] = React.useState(false)

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
    // Initialize with an empty array
    members: [],
  });

  // Initialize members based on team size on component mount and when team size changes
  React.useEffect(() => {
    const size = parseInt(user.teamSize);
    setUser(prev => {
      const updatedMembers = Array(size - 1).fill(null).map((_, i) =>
        prev.members[i] || { name: "", email: "", tshirtSize: "S - Size" }
      );

      return {
        ...prev,
        members: updatedMembers,
      };
    });
  }, [user.teamSize]); // This will run when component mounts AND when team size changes

  const onRegister = async () => {
    try {
      setLoading(true)
      // handle registration
      const response = await axios.post("/api/users/register", user)

      if (response.status === 201) {
        setUserExist(false)
        setSubmitError(false)
        setEmailError(false)

        // Registration successful
        try {
          // Sending email 
          await axios.post("/api/send", {
            leaderName: user.leaderName,
            leaderEmail: user.leaderEmail,
            teamName: user.teamName,
            leaderNo: user.leaderNo,
            members: user.members, // array of { name, email }
          });

          // both registration and email sending were successful
          setSubmitDone(true)
          setTimeout(() => { router.push("/login") }, 3000);
        } catch (emailError) {
          // Registration succeeded but email sending failed
          console.error("Email sending failed", emailError)
          toast.success("Registration successful, but we couldn't send confirmation emails.")
          setSubmitDone(true)
          setEmailError(true)
          setTimeout(() => { router.push("/login") }, 3000);
        }
      }
    }
    catch (error: any) {
      console.log("Registration failed", error)
      if (error.response && error.response.status === 400) {
        setUserExist(true)
      }
      else {
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
    <div className={`${geistSans.className} mt-25 min-h-screen w-full rounded-md flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8`}>
      <Spotlight />
      <div className="shadow-input mx-auto w-full max-w-md rounded p-4 md:rounded-2xl md:p-8 bg-black">
        <h2 className="text-xl font-bold text-neutral-200">
          Welcome to HACK&#123;<span className="text-green-400">0</span>&#125;LUTION
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-300">
          After registration you will recieve login credentials by email.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>

          <LabelInputContainer className="mb-4 ">
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
                setUser(prev => ({
                  ...prev,
                  teamSize: selectedSize,
                }));
                // The useEffect will handle updating the members array
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
            <Input id="email" placeholder="Enter your email" type="email" required
              onChange={(e) => setUser({
                ...user, leaderEmail: e.target.value
              })}
            />

          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">
              <span className="text-red-400 mr-0.5">*</span>Leader&apos;s WhatsApp Number
            </Label>
            <Input id="phone" placeholder="Enter your phone number" type="tel" required maxLength={10} minLength={10}
              value={user.leaderNo || ''}
              onKeyPress={(e) => {
                // Prevent non-numeric input
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                // Additional validation to ensure only numbers
                if (value === '' || /^[0-9]+$/.test(value)) {
                  setUser({
                    ...user,
                    leaderNo: value
                  });
                }
              }}
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
            <Input id="phone" placeholder="Enter your college name" type="text" required
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
              value={user.leaderTshirtSize}
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
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-medium text-white  bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:cursor-pointer"
            type="submit"
          >
            {loading ? (
              <>
                <LoaderIcon className="inline w-6 h-6 text-blue-400 animate-spin" /> Processing...
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
          <h2 className="text-xl text-orange-400">{EmailError ? "Register Successfully, But Failed to send email." : ""}</h2>
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