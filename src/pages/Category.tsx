import QuestionsPage from "@/components/userDash/questions";
import RecommendedQuizs from "@/components/userDash/recommendedQuestions";
import { useParams } from "react-router-dom";

export default function Category(){
    const params = useParams()
    return (
        <div className="w-full min-h-screen pt-24">
        <RecommendedQuizs></RecommendedQuizs>
        <QuestionsPage id={params.id as String}></QuestionsPage>
    </div>
    )
}