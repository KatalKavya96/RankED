import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format, isSameDay, parseISO } from 'date-fns';
import "../index.css"



const calculateStreak = () => {
  
    const log = JSON.parse(localStorage.getItem('submissionLog') || '{}');
    const dates = Object.keys(log).filter(date => log[date] > 0).map(d => parseISO(d));
    dates.sort((a, b) => b - a); // Descending
  
    let streak = 0;
    let day = new Date(); // Start from today
  
    for (let i = 0; i < 366; i++) {
      const found = dates.find(d => isSameDay(d, day));
      if (found) {
        streak++;
        day = subDays(day, 1); // Move to previous day
      } else {
        break; // streak breaks
      }
    }
  
    return streak;
  };

const getSubmissionHeatmapData = () => {
  const log = JSON.parse(localStorage.getItem('submissionLog') || '{}');
  return Object.entries(log).map(([date, count]) => ({ date, count }));
};

const Heatmap = () => {
  const [data, setData] = useState(getSubmissionHeatmapData());
  const [streak, setStreak] = useState(calculateStreak());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getSubmissionHeatmapData());
      setStreak(calculateStreak());
    }, 2000); // live update
    return () => clearInterval(interval);
  }, []);

  
  return (
    <section className="h-auto w-full max-w-[950px] border border-black/25 rounded-xl text-black bg-white  px-5 py-5 shadow-xl">
      <div className="flex justify-between items-center px-2 pb-4">
        <h1 className="text-lg text-black/70 font-semibold">{data.reduce((a, b) => a + b.count, 0)} submissions in the past one year</h1>
        <div className="flex gap-8 text-xs text-black/70">
          <p>Total active days: {data.filter(d => d.count > 0).length}</p>
          <p>Current Streak: {streak}</p>
          <div>
            <label htmlFor="Current" className="mr-1">Current</label>
            <select id="Current" name="Current" className="text-black border border-black px-1 py-0.5 rounded">
              <option>2024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={subDays(new Date(), 365)}
          endDate={new Date()}
          values={data}
          gutterSize={4}
          showMonthLabels={true}
          showWeekdayLabels={false}
          horizontal={true}
          classForValue={(value) => {
            if (!value || !value.count) return 'color-empty';
            if (value.count >= 10) return 'color-scale-4';
            if (value.count >= 7) return 'color-scale-3';
            if (value.count >= 4) return 'color-scale-2';
            if (value.count >= 1) return 'color-scale-1';
            return 'color-empty';
          }}
          tooltipDataAttrs={value => {
            if (!value || !value.date) return null;
            return {
              'data-tip': `${value.date}: ${value.count} submissions`
            };
          }}
          titleForValue={value => value ? `${value.date}: ${value.count} submissions` : null}
        />
      </div>

      <style>{`
        .react-calendar-heatmap text.month-label {
          fill: rgba(0,0,0,1);
          font-size: 15px;
          font-weight: 500;
        }
        .react-calendar-heatmap .color-empty {
          fill: rgba(230,230,230);
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-1 {
          fill: #B8D6FF;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-2 {
          fill: #93c5fd;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-3 {
          fill: #93c5fd;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-4 {
          fill: #2563eb;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .react-calendar-heatmap-month {
          margin-right: 15px;
        }
        .react-calendar-heatmap rect:hover {
          stroke: rgba(0,0,0,0.2);
          stroke-width: 2px;
        }
        @media (max-width: 640px) {
        .react-calendar-heatmap text.month-label {
          font-size: 10px;
        }
        .react-calendar-heatmap .react-calendar-heatmap-month {
          margin-right: 15px;
        }
      `}</style>
      
    </section>
  );
};

export default Heatmap;
