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
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* Full-bleed row: Sidebar | Content | Streak */}
      <div className="w-full flex">
        {/* Left planner flush to edge */}
        <Sidebar />

        {/* Center content with its own max width */}
        <main className="flex-1">
          <div className="px-6 py-6 w-full max-w-[1200px] mx-auto">
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

        {/* Right streak/calendar inside dark row */}
        <aside className="hidden lg:block px-4 py-6">
          {/* Make it sticky so it stays in view; adjust top if your navbar is fixed */}
          <div className="sticky top-24">
            <StreakCard />
          </div>
        </aside>
      </div>
    </div>
  );
}
