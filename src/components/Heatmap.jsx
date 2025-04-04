import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format, isSameDay, parseISO } from 'date-fns';



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
    <section className="h-auto w-full max-w-[950px] border border-black rounded-xl text-white bg-zinc-900 px-5 py-5 ">
      <div className="flex justify-between items-center px-2 pb-4">
        <h1 className="text-lg text-white/90 font-semibold">{data.reduce((a, b) => a + b.count, 0)} submissions in the past one year</h1>
        <div className="flex gap-8 text-xs text-white/90">
          <p>Total active days: {data.filter(d => d.count > 0).length}</p>
          <p>Current Streak: {streak}</p>
          <div>
            <label htmlFor="Current" className="mr-1">Current</label>
            <select id="Current" name="Current" className="bg-black text-white border px-1 py-0.5 rounded">
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
          fill: #bbb;
          font-size: 12px;
          font-weight: 500;
        }
        .react-calendar-heatmap .color-empty {
          fill: #2e2e2e;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-1 {
          fill: #9be9a8;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-2 {
          fill: #40c463;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-3 {
          fill: #30a14e;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .color-scale-4 {
          fill: #216e39;
          transition: fill 0.3s;
        }
        .react-calendar-heatmap .react-calendar-heatmap-month {
          margin-right: 12px;
        }
        .react-calendar-heatmap rect:hover {
          stroke: #fff;
          stroke-width: 1px;
        }
      `}</style>
    </section>
  );
};

export default Heatmap;
