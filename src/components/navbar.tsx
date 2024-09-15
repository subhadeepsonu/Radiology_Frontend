import { Button } from "./ui/button";
import { useContext, useState } from "react";
import PopupLogin from "@/components/home/PopupLogin";
import PopupSignin from "@/components/home/Popupsignup";
import { Link } from "react-router-dom";
import UserContext from "@/context/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const auth = useContext(UserContext);
    const MutateLogout = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:3000/user/logout", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      return response.data;
    },
    onSuccess(data) {
        if(data.success){
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            localStorage.removeItem("role")
            auth.setUser(null)
            toast.success("Logout Successful")
        }
        else{
            toast.error(data.message)
        }
    },
    onError(data) {
      toast.error(data.message);
    },
    })
  return (
    <div className="h-16 w-full backdrop-blur-sm bg-purple-300 z-10  shadow-purple-200 fixed top-0 flex justify-between items-center px-5">
      {open && <PopupLogin open={open} setOpen={setOpen} />}
      {openSignup && <PopupSignin open={openSignup} setOpen={setOpenSignup} />}
      <Link to="/">
        <div className="flex justify-center items-center text-4xl font-semibold">
          MedQuizPro
        </div>
      </Link>
      <div className=" flex justify-around items-center h-full">
       
        {auth.user ? (
          <Button disabled={MutateLogout.isPending} onClick={() => {
                MutateLogout.mutate()
          }}>Logout</Button>
          
        ) : (
            <div className="w-60 flex justify-around items-center h-full">
          <Button onClick={() => setOpen(true)}>Login</Button>
          <Button onClick={() => setOpenSignup(true)}>Signup</Button>
          </div>
        )}

      </div>
    </div>
  );
}
