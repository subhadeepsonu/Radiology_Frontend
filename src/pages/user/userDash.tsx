import PerformanceCard from "@/components/home/performanceCard";
import UserSideBar from "@/components/userDash/userSideBard";


export default function Userdash() {

    return (
        <div className="pt-20 min-h-screen w-full flex flex-col justify-around items-center pl-44">
            <UserSideBar />
        <PerformanceCard></PerformanceCard>
        {/* <Graph2></Graph2>
        <div className="flex h-96 justify-around items-center w-10/12">
        <Component></Component>
        <Graph3></Graph3>
        </div> */}
    </div>
    )
}