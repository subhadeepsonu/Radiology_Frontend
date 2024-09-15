
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CarouselHome from "@/components/home/corosal"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import AdminDashBoardExample from "@/components/home/adminDashEx";
import UserDashBoardExample from "@/components/home/userDash";
import UserTestExample from "@/components/home/usertest";
import PricingCard from "@/components/home/pricing";
import UserContext from "@/context/user";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function Landing() {
  const auth = useContext(UserContext)
  if(auth?.loading){
      return <div>Loading...</div>
  }
  else{
      if(auth?.user?.role==="user"){
         return <Navigate to="/userdash" />
      }
      if(auth?.user?.role==="admin"){
        return   <Navigate to="/admin" />
      }
  }
  return (
   <div className="min-h-screen  w-full bg-white flex flex-col justify-center items-center">
    <div className="h-screen w-full bg-purple-50 flex justify-center items-center">
      <div className=" flex  justify-around items-center">
      <div className="w-1/2 flex flex-col justify-center items-center">
      <TextGenerateEffect className="text-center"  words="Challenge Your Mind, One Quiz at a Time!"></TextGenerateEffect>
      <motion.p
         initial={{
          opacity:0
        }}
        animate={{
          opacity:1
        }}
        transition={{
          delay:1
        }}
        className="pt-4  text-gray-500 font-medium text-center w-3/4 "
      >Sharpen Your Medical Knowledge and Enhance Your Expertise with Every Quiz, Every Time.</motion.p>
      <motion.div 
      initial={{
        opacity:0
      }}
      animate={{
        opacity:1
      }}
      transition={{
        delay:1.2
      }}
      className="w-1/2 flex justify-around items-center pt-12"><Button  size={"lg"}  variant={"secondary"}>Check trail</Button><Button  className="bg-purple-600 text-white" size={"lg"}>Check Prices</Button></motion.div>

      </div>
      <motion.img initial={{
        opacity:0
      }}
      animate={{
        opacity:1
      }}
      transition={{
        duration:1.5
      }}
      className="rounded-lg object-cover" src="https://img.freepik.com/free-vector/quiz-neon-sign_1262-19629.jpg?semt=ais_hybrid"></motion.img>
      </div>
      </div>
      <AdminDashBoardExample></AdminDashBoardExample>
      <UserDashBoardExample></UserDashBoardExample>
      <UserTestExample></UserTestExample>
      <CarouselHome></CarouselHome>
      <PricingCard></PricingCard>
   </div>
  );
}
