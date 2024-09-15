import SideBarBUtton from "../Admin/sidebarButton";
import { IoHomeOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdGridOn } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { IoIosFlash } from "react-icons/io";
export default function UserSideBar() {
    return <div className="h-screen w-44 bg-white  pt-16 fixed top-0 left-0 border-r-2 border-gray-200">
        <SideBarBUtton href="/userdash" path="Dashboard" icon={<IoHomeOutline className="text-2xl" />} />
        <SideBarBUtton href="/userdash/questions" path="Questions" icon={<LuBookOpen className="text-2xl" />} />
        <SideBarBUtton href="/userdash/category" path="Categories" icon={<MdGridOn className="text-2xl"/>} />
        <SideBarBUtton href="/userdash/quiz" path="Quizzes" icon={<RxHamburgerMenu className="text-xl" />} />
        <SideBarBUtton href="/userdash/flashcards" path="Flashcards" icon={<IoIosFlash className="text-2xl" />} />
    </div>
}