import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Userdash from "./pages/userDash";
import AdminDash from "./pages/adminDash";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import QuizById from "./pages/Quiz.id";
import Question from "./pages/Question";
import Submission from "./pages/Submission";
import ViewQuizById from "./pages/ViewQuizByid";
import UserRouteProtect from "./routeprotection/userRoute";
import AdminRouteProtect from "./routeprotection/adminRoute";
import SubmissionByID from "./pages/SubmissionByid";
import AdminQuestionPage from "./pages/adminQuestionPage";
import AdminQuizPage from "./pages/adminQuizPage";
import AdminCategoryPage from "./pages/adminCategory";
import AdminFashCards from "./pages/AdminFashCards";
import AdminUserPage from "./pages/adminUserPage";
import UserFlashCardsPage from "./pages/UserFlashCards";
import UserQuestionPage from "./pages/userQuestionPage";
import UserCategoryPage from "./pages/userCategoryPage";
import UserQuizPage from "./pages/userQuizPage";

export default function App() {
  
  return (
    
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
      <Route path="/userdash/category/:id" element={<UserRouteProtect><Category /></UserRouteProtect>} />
      <Route path="/userdash/quiz" element={<UserRouteProtect><UserQuizPage /></UserRouteProtect>} />
      <Route path="/userdash/quiz/:id" element={<UserRouteProtect><QuizById /></UserRouteProtect>} />
      <Route path="/userdash/question/:id" element={<UserRouteProtect><Question /></UserRouteProtect>} />
      <Route path="/userdash/Submissions" element={<UserRouteProtect><Submission /></UserRouteProtect>} />
      <Route path="/admin/quiz/:id" element={<AdminRouteProtect><ViewQuizById /></AdminRouteProtect>} />
      <Route path="/userdash/flashcards" element={<UserRouteProtect><UserFlashCardsPage /></UserRouteProtect>} />
      <Route path="/userdash/Submissions/:id" element={<UserRouteProtect><SubmissionByID /></UserRouteProtect>} />
      <Route path="/userdash/questions" element={<UserRouteProtect><UserQuestionPage /></UserRouteProtect>} />
    </Routes>
  )
}