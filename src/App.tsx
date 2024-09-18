import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Userdash from "./pages/user/userDash";
import AdminDash from "./pages/admin/adminDash";
import UserRouteProtect from "./routeprotection/userRoute";
import AdminRouteProtect from "./routeprotection/adminRoute";
import AdminQuestionPage from "./pages/admin/adminQuestionPage";
import AdminQuizPage from "./pages/admin/adminQuizPage";
import AdminCategoryPage from "./pages/admin/adminCategory";
import AdminFashCards from "./pages/admin/AdminFashCards";
import AdminUserPage from "./pages/admin/adminUserPage";
import UserFlashCardsPage from "./pages/user/UserFlashCards";
import UserQuestionPage from "./pages/user/userQuestionPage";
import UserCategoryPage from "./pages/user/userCategoryPage";
import UserQuizPage from "./pages/user/userQuizPage";
import ScrollToTop from "./utills/scrolltotop";

export default function App() {
  
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/userdash" element={<UserRouteProtect><Userdash /></UserRouteProtect>} />
      <Route path="/admin" element={<AdminRouteProtect><AdminDash /></AdminRouteProtect>} />
      <Route path="/admin/category" element={<AdminRouteProtect><AdminCategoryPage /></AdminRouteProtect>} />
      <Route path="/admin/quiz" element={<AdminRouteProtect><AdminQuizPage /></AdminRouteProtect>} />
      <Route path="/admin/questions" element={<AdminRouteProtect><AdminQuestionPage /></AdminRouteProtect>} />
      <Route path="/admin/flashcards"element={<AdminRouteProtect><AdminFashCards /></AdminRouteProtect>} />
      <Route path="/admin/users"element={<AdminRouteProtect><AdminUserPage /></AdminRouteProtect>} />
      <Route path="/userdash/category" element={<UserRouteProtect><UserCategoryPage /></UserRouteProtect>} />
      <Route path="/userdash/quiz" element={<UserRouteProtect><UserQuizPage /></UserRouteProtect>} />
      <Route path="/userdash/flashcards" element={<UserRouteProtect><UserFlashCardsPage /></UserRouteProtect>} />
      <Route path="/userdash/questions" element={<UserRouteProtect><UserQuestionPage /></UserRouteProtect>} />
      <Route path="*" element={<div className="h-screen w-full flex  justify-center items-center">404 Not Found</div>} />
    </Routes>
    </>
  )
}