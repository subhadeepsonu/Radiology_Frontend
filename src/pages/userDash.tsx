import { Component } from "@/components/charts/dashChart";
import PerformanceCard from "@/components/home/performanceCard";
import CategoryPage from "@/components/userDash/category";
import { Graph2 } from "@/components/userDash/graph2";
import { Graph3 } from "@/components/userDash/graph3";
import MoreQuizs from "@/components/userDash/morequiz";
import RecommendedQuizs from "@/components/userDash/recommendedQuestions";


export default function Userdash() {

    return (
        <div className="pt-20 min-h-screen w-full flex flex-col justify-around items-center ">
        <PerformanceCard></PerformanceCard>
        <Graph2></Graph2>
        <RecommendedQuizs></RecommendedQuizs>
        <div className="flex h-96 justify-around items-center w-10/12">
        <Component></Component>
        <Graph3></Graph3>
        </div>
        
        <CategoryPage></CategoryPage>
        <MoreQuizs></MoreQuizs>
    </div>
    )
}