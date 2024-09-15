import AdminQuizCard from "../cards/admin/AdminQuizCard";
export default function Quizs(){
    return <div className="w-full h-fit p-2 flex justify-center items-start pl-20 flex-col">
        
        <div className="grid grid-cols-4 gap-5">
                <AdminQuizCard imgurl="https://media.post.rvohealth.io/wp-content/uploads/2017/05/getting-physical-examination_thumb-732x549.jpg" title="Clinical Challenge: Diagnose Like a Pro"></AdminQuizCard>
                <AdminQuizCard imgurl="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201604/medical-647_042016041651.jpg?VersionId=at35BqMne5IWoXMAIqFds_IqXNPd3U_2   " title="Medical Mastery: From Symptoms to Solutions"></AdminQuizCard>
                <AdminQuizCard title="Surgical Savvy: Are You Ready for the OR?" imgurl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSXxBma0eiQOxJ8ov3Gql1ZCztSYepM7RWA&s"></AdminQuizCard>
                
        </div>
    </div>
}