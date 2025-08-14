import React from "react";
import Sidebar from "../components/PlannerSection/Planner";
import PromoCarousel from "../components/PromoCarousel/PromoCarousel";
import SubjectTabs from "../components/SubjectTabs/SubjectTabs";
import ChipsRow from "../components/ChipsRow/ChipsRow";
import Toolbar from "../components/Toolbar/Toolbar";
import QuestionList from "../components/QuestionList/QuestionList";
import StreakCard from "../components/StreakCard/StreakCard";
import { promoCards, subjects, chapters, questions } from "../components/Data/Data";

export default function DarkHome() {
  const solved = Array.isArray(questions) ? questions.filter((q) => q.solved).length : 0;
  const total = Array.isArray(questions) ? questions.length : 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden flex">
      <div className="w-full flex">
        <Sidebar />

        <main className="w-500">
          <div className="w-200 px-6 py-6 max-w-[1200px] mx-auto">
            <PromoCarousel cards={promoCards} />

            <section className="mt-5">
              <ChipsRow items={chapters} />
              <SubjectTabs items={subjects} />

              <Toolbar
                solved={solved}
                total={total}
                placeholder="Search questions"
                onSearchChange={(v) => console.log("search:", v)}
                onSortClick={() => console.log("sort")}
                onFilterClick={() => console.log("filter")}
              />

              <QuestionList items={questions} />
            </section>
          </div>
        </main>

        
        <div className="mt-6 mr-6">
            <StreakCard/>
        </div>
        
      </div>
    </div>
  );
}
