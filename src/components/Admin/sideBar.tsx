import { IoHomeOutline } from "react-icons/io5";
import SideBarBUtton from "./sidebarButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdGridOn } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { IoIosFlash } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
export default function SideBar(){
    return (
        <div className="h-screen w-44 bg-white  pt-16 fixed top-0 left-0 border-r-2 border-gray-200">
            <SideBarBUtton href="/admin" path="Dashboard" icon={<IoHomeOutline className="text-2xl" />} />
            <SideBarBUtton href="/admin/questions" path="Questions" icon={<LuBookOpen className="text-2xl" />} />
            <SideBarBUtton href="/admin/category" path="Categories" icon={<MdGridOn className="text-2xl"/>} />
            <SideBarBUtton href="/admin/quiz" path="Quizzes" icon={<RxHamburgerMenu className="text-xl" />} />
            <SideBarBUtton href="/admin/flashcards" path="Flashcards" icon={<IoIosFlash className="text-2xl" />} />
            <SideBarBUtton href="/admin/users" path="Users" icon={<FaUserFriends className="text-xl"/>} />
        </div>
    )
}