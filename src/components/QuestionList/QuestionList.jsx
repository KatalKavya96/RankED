import React from "react";
import QuestionRow from "../QuestionRow/QuestionRow";

export default function QuestionList({ items }) {
  return (
    <div className="space-y-3 mt-4">
      {items.map((q) => <QuestionRow key={q.id} q={q} />)}
    </div>
  );
}
