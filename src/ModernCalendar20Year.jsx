// import React, { useState, useMemo } from "react";

// // Modern 20-Year Calendar Component
// export default function ModernCalendar20Year() {
//   const today = useMemo(() => {
//     const d = new Date();
//     d.setHours(0, 0, 0, 0);
//     return d;
//   }, []);

//   const startYear = today.getFullYear();
//   const years = useMemo(() => {
//     return Array.from({ length: 20 }, (_, i) => startYear + i);
//   }, [startYear]);

//   const [expandedYear, setExpandedYear] = useState(null);
//   const [openMonth, setOpenMonth] = useState({ year: null, monthIndex: null });
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [jumpValue, setJumpValue] = useState("");

//   function toggleYear(y) {
//     setExpandedYear((prev) => (prev === y ? null : y));
//     setOpenMonth({ year: null, monthIndex: null });
//   }

//   function openMonthView(year, monthIndex) {
//     setOpenMonth({ year, monthIndex });
//   }

//   function selectDate(year, monthIndex, day) {
//     const d = new Date(year, monthIndex, day);
//     setSelectedDate(d);
//     console.log("Selected date:", d.toISOString().slice(0, 10));
//   }

//   function jumpToYear() {
//     const y = parseInt(jumpValue, 10);
//     if (!Number.isFinite(y)) return;
//     if (y < startYear || y > startYear + 19) {
//       alert(`Please enter a year between ${startYear} and ${startYear + 19}`);
//       return;
//     }
//     setExpandedYear(y);
//     setOpenMonth({ year: null, monthIndex: null });
//   }

//   function goToToday() {
//     const y = today.getFullYear();
//     const m = today.getMonth();
//     setExpandedYear(y);
//     setOpenMonth({ year: y, monthIndex: m });
//     setSelectedDate(today);
//   }

//   const monthNames = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//   ];

//   return (
//     <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg">
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <div>
//           <h2 className="text-xl font-semibold">20-Year Calendar</h2>
//           <p className="text-sm text-gray-500">
//             Showing {startYear} — {startYear + 19}
//           </p>
//         </div>

//         <div className="flex gap-2 items-center">
//           <button
//             onClick={goToToday}
//             className="px-3 py-1 rounded-lg shadow-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow"
//           >
//             Today
//           </button>

//           <input
//             value={jumpValue}
//             onChange={(e) => setJumpValue(e.target.value)}
//             placeholder={`Jump to year (${startYear}-${startYear + 19})`}
//             className="w-40 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm"
//           />
//           <button
//             onClick={jumpToYear}
//             className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm shadow"
//           >
//             Jump
//           </button>
//         </div>
//       </div>

//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {years.map((y) => (
//           <article
//             key={y}
//             className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-700"
//           >
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium">{y}</h3>
//               <button
//                 onClick={() => toggleYear(y)}
//                 className="px-2 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
//               >
//                 {expandedYear === y ? "Collapse" : "Open"}
//               </button>
//             </div>

//             {expandedYear === y && (
//               <div className="mt-3 grid grid-cols-3 gap-2">
//                 {monthNames.map((m, mi) => (
//                   <button
//                     key={m}
//                     onClick={() => openMonthView(y, mi)}
//                     className={`text-xs p-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                       openMonth.year === y && openMonth.monthIndex === mi
//                         ? "ring-2 ring-indigo-400"
//                         : ""
//                     }`}
//                   >
//                     <div className="font-medium">{m}</div>
//                     <div className="text-[11px] text-gray-500">
//                       {new Date(y, mi, 1).toLocaleString(undefined, {
//                         month: "long",
//                       })}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {openMonth.year === y && openMonth.monthIndex !== null && (
//               <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
//                 <MonthView
//                   year={y}
//                   monthIndex={openMonth.monthIndex}
//                   today={today}
//                   selectedDate={selectedDate}
//                   onSelect={selectDate}
//                 />
//               </div>
//             )}
//           </article>
//         ))}
//       </section>

//       <footer className="mt-6 text-sm text-gray-500">
//         Selected date:{" "}
//         {selectedDate ? selectedDate.toISOString().slice(0, 10) : "None"}
//       </footer>
//     </div>
//   );
// }

// // Month view subcomponent
// function MonthView({ year, monthIndex, today, selectedDate, onSelect }) {
//   const monthName = new Date(year, monthIndex, 1).toLocaleString(undefined, {
//     month: "long",
//   });
//   const dim = new Date(year, monthIndex + 1, 0).getDate();
//   const startDay = new Date(year, monthIndex, 1).getDay();

//   const weeks = [];
//   let current = 1 - startDay;

//   while (current <= dim) {
//     const week = Array.from({ length: 7 }, () => {
//       const day = current;
//       current += 1;
//       return day;
//     });
//     weeks.push(week);
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-2">
//         <h4 className="font-semibold">
//           {monthName} {year}
//         </h4>
//         <div className="text-sm text-gray-500">Sun — Sat</div>
//       </div>

//       <div className="grid grid-cols-7 gap-1 text-xs">
//         {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
//           <div key={d} className="text-center text-gray-500">
//             {d}
//           </div>
//         ))}

//         {weeks.map((week, wi) =>
//           week.map((day, di) => {
//             const isValid = day >= 1 && day <= dim;
//             const dateObj = isValid ? new Date(year, monthIndex, day) : null;
//             const isToday = dateObj && sameDay(dateObj, today);
//             const isSelected = dateObj && selectedDate && sameDay(dateObj, selectedDate);

//             return (
//               <button
//                 key={`${wi}-${di}`}
//                 disabled={!isValid}
//                 onClick={() => isValid && onSelect(year, monthIndex, day)}
//                 className={`h-10 rounded-md flex items-center justify-center transition ${
//                   isValid ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""
//                 } ${isToday ? "ring-2 ring-green-400" : ""} ${
//                   isSelected ? "bg-indigo-600 text-white" : ""
//                 }`}
//               >
//                 {isValid ? day : ""}
//               </button>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// // Helper
// function sameDay(a, b) {
//   return (
//     a.getFullYear() === b.getFullYear() &&
//     a.getMonth() === b.getMonth() &&
//     a.getDate() === b.getDate()
//   );
// }

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Install via: npm install framer-motion

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SHORT_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function ModernCalendar20Year() {
  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);
  const startYear = today.getFullYear();
  const years = useMemo(() => Array.from({ length: 20 }, (_, i) => startYear + i), [startYear]);

  const [expandedYear, setExpandedYear] = useState(today.getFullYear());
  const [openMonth, setOpenMonth] = useState({ year: today.getFullYear(), monthIndex: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(null);
  const [jumpValue, setJumpValue] = useState("");

  const handleJump = () => {
    const y = parseInt(jumpValue, 10);
    if (years.includes(y)) {
      setExpandedYear(y);
      setJumpValue("");
    } else {
      alert(`Range: ${startYear} - ${startYear + 19}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-slate-500 dark:text-slate-400">Planning from {startYear} to {startYear + 19}</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="YYYY"
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            className="w-24 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <button onClick={handleJump} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
            Jump
          </button>
          <button 
            onClick={() => { setExpandedYear(today.getFullYear()); setOpenMonth({ year: today.getFullYear(), monthIndex: today.getMonth() }); }}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition"
          >
            Today
          </button>
        </div>
      </header>

      {/* YEAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {years.map((year) => (
          <YearCard
            key={year}
            year={year}
            isExpanded={expandedYear === year}
            onToggle={() => setExpandedYear(expandedYear === year ? null : year)}
            openMonth={openMonth}
            setOpenMonth={setOpenMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            today={today}
          />
        ))}
      </div>

      {/* FLOATING SELECTION BAR */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-2xl border border-indigo-100 dark:border-slate-700 flex items-center gap-4"
          >
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Selected</span>
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {selectedDate.toLocaleDateString(undefined, { dateStyle: 'long' })}
            </span>
            <button onClick={() => setSelectedDate(null)} className="text-slate-400 hover:text-red-500">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function YearCard({ year, isExpanded, onToggle, openMonth, setOpenMonth, selectedDate, setSelectedDate, today }) {
  return (
    <motion.div 
      layout
      className={`rounded-2xl border transition-all ${isExpanded ? 'border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 shadow-xl' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'}`}
    >
      <div className="p-5 flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <h2 className={`text-2xl font-bold ${isExpanded ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>{year}</h2>
        <div className="flex items-center gap-2">
           {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 pt-0">
            <div className="grid grid-cols-4 gap-2 mb-6">
              {MONTH_NAMES.map((name, i) => (
                <button
                  key={name}
                  onClick={() => setOpenMonth({ year, monthIndex: i })}
                  className={`py-2 text-xs font-bold rounded-md transition ${openMonth.year === year && openMonth.monthIndex === i ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'}`}
                >
                  {name.slice(0, 3)}
                </button>
              ))}
            </div>

            {openMonth.year === year && (
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <MonthView 
                  year={year} 
                  monthIndex={openMonth.monthIndex} 
                  selectedDate={selectedDate} 
                  setSelectedDate={setSelectedDate}
                  today={today}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MonthView({ year, monthIndex, selectedDate, setSelectedDate, today }) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
      <div className="grid grid-cols-7 gap-1">
        {SHORT_DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-400 mb-2">{d}</div>)}
        {days.map((day, i) => {
          if (day === null && i >= firstDay + daysInMonth) return null; // Clean up trailing empty rows
          const date = day ? new Date(year, monthIndex, day) : null;
          const isSelected = date && selectedDate && date.getTime() === selectedDate.getTime();
          const isToday = date && date.getTime() === today.getTime();

          return (
            <button
              key={i}
              disabled={!day}
              onClick={() => setSelectedDate(date)}
              className={`h-8 w-full text-sm rounded-lg flex items-center justify-center transition-all
                ${!day ? 'opacity-0 cursor-default' : 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}
                ${isSelected ? 'bg-indigo-600 text-white shadow-lg scale-110 z-10' : ''}
                ${isToday && !isSelected ? 'border-2 border-indigo-500 text-indigo-600 font-bold' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Icons
const ChevronDownIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const ChevronUpIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
