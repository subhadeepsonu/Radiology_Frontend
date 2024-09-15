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

export default function App() {
  
  return (
    
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/userdash" element={<UserRouteProtect><Userdash /></UserRouteProtect>} />
      <Route path="/admin" element={<AdminRouteProtect><AdminDash /></AdminRouteProtect>} />
      <Route path="/admin/category" element={<AdminRouteProtect><div>category</div></AdminRouteProtect>} />
      <Route path="/admin/quiz" element={<AdminRouteProtect><div>quiz</div></AdminRouteProtect>} />
      <Route path="/admin/question" element={<AdminRouteProtect><div>question</div></AdminRouteProtect>} />
      <Route path="/userdash/category/:id" element={<UserRouteProtect><Category /></UserRouteProtect>} />
      <Route path="/userdash/quiz" element={<UserRouteProtect><Quiz /></UserRouteProtect>} />
      <Route path="/userdash/quiz/:id" element={<UserRouteProtect><QuizById /></UserRouteProtect>} />
      <Route path="/userdash/question/:id" element={<UserRouteProtect><Question /></UserRouteProtect>} />
      <Route path="/userdash/Submissions" element={<UserRouteProtect><Submission /></UserRouteProtect>} />
      <Route path="/admin/quiz/:id" element={<AdminRouteProtect><ViewQuizById /></AdminRouteProtect>} />
      <Route path="/userdash/Submissions/:id" element={<UserRouteProtect><SubmissionByID /></UserRouteProtect>} />
    </Routes>
  )
}