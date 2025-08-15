import React, { useState } from "react";
import Sidebar from "../components/PlannerSection/Planner";
import PromoCarousel from "../components/PromoCarousel/PromoCarousel";
import SubjectTabs from "../components/SubjectTabs/SubjectTabs";
import ChipsRow from "../components/ChipsRow/ChipsRow";
import Toolbar from "../components/Toolbar/Toolbar";
import QuestionList from "../components/QuestionList/QuestionList";
import { promoCards, subjects, chapters, questions } from "../components/Data/Data";
import Navbar from "../components/Navbar";

export default function DarkHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const safeQuestions = Array.isArray(questions) ? questions : [];
  const safeSubjects = Array.isArray(subjects) ? subjects : [];
  const safeChapters = Array.isArray(chapters) ? chapters : [];
  const safeCards = Array.isArray(promoCards) ? promoCards : [];

  const solved = safeQuestions.filter((q) => q?.solved).length;
  const total = safeQuestions.length;

  return (
    <>
      <Navbar />

      {/* Page Shell */}
      <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">

        {/* MOBILE drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <div className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-[#101010] border-r border-white/10 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-sm text-white/80">Menu</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15"
                >
                  Close
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Top bar for mobile to open drawer (if Navbar doesn’t have a hamburger) */}
        <div className="md:hidden sticky top-0 z-30 bg-[#0f0f0f]/85 backdrop-blur border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-base font-semibold">Dashboard</h1>
            <button
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15"
              onClick={() => setSidebarOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>

        {/* GRID LAYOUT:
            - 1 column on mobile
            - 280px sidebar + fluid content from md up
        */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block border-r border-white/10">
            <div className="sticky top-0 h-[100svh] overflow-y-auto">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0"> {/* critical: allows children to shrink instead of forcing overflow */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">

              {/* Promo / Hero */}
              <section className="min-w-0">
                <PromoCarousel cards={safeCards} />
              </section>

              {/* Controls */}
              <section className="mt-6 space-y-4 min-w-0">
                {/* Chips: wrap on small or scroll if long */}
                <div className="min-w-0">
                  <div className="overflow-x-auto">
                    {/* avoid hard min-widths; let content dictate width */}
                    <ChipsRow items={safeChapters} />
                  </div>
                </div>

                {/* Tabs: scrollable on tiny widths */}
                <div className="min-w-0 overflow-x-auto">
                  <SubjectTabs items={safeSubjects} />
                </div>

                {/* Toolbar: will wrap naturally; ensure the component uses flex-wrap or intrinsic sizing */}
                <div className="min-w-0">
                  <Toolbar
                    solved={solved}
                    total={total}
                    placeholder="Search questions"
                    onSearchChange={(v) => console.log("search:", v)}
                    onSortClick={() => console.log("sort")}
                    onFilterClick={() => console.log("filter")}
                  />
                </div>
              </section>

              {/* Questions */}
              <section className="mt-6 min-w-0">
                <QuestionList items={safeQuestions} />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
