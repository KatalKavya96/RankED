import React from 'react';

const ResetButton = () => {
  
  const resetLocalStorage = () => {
    // Clear all local storage related to submission and stats
    localStorage.removeItem('solvedQuestions');
    localStorage.removeItem('wrongQuestions');
    localStorage.removeItem('submissionLog');
    localStorage.removeItem('allQuestions');
    
    // Optionally, you can add a confirmation message or reset logic here
    console.log("Local storage reset successful.");
    
    // Dispatch the event to update solved stats and heatmap
    window.dispatchEvent(new Event("solvedStatsUpdate"));
    
    // You may also want to refresh the page or re-initialize UI after reset
    // window.location.reload(); // Uncomment if you want to reload the page after reset
  };
  
  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={resetLocalStorage}
        className="p-2 bg-red-500 text-white text-xs rounded-xl hover:bg-red-600"
      >
        Reset Stats
      </button>
    </div>
  );
};

export default ResetButton;
