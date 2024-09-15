import AdminCategoryPage from "@/components/Admin/Categories";
import Quizs from "@/components/Admin/Quizs";
import Questions from "@/components/Admin/questions";
// import SideBar from "@/components/Admin/sideBar";

export default function AdminDash() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-start pt-20">
            {/* <SideBar /> */}
            <Quizs />
            <AdminCategoryPage />
            <Questions />   
        </div>
    )
}