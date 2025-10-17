import React, { useState, useMemo } from "react";

// Modern 20-Year Calendar Component
export default function ModernCalendar20Year() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const startYear = today.getFullYear();
  const years = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => startYear + i);
  }, [startYear]);

  const [expandedYear, setExpandedYear] = useState(null);
  const [openMonth, setOpenMonth] = useState({ year: null, monthIndex: null });
  const [selectedDate, setSelectedDate] = useState(null);
  const [jumpValue, setJumpValue] = useState("");

  function toggleYear(y) {
    setExpandedYear((prev) => (prev === y ? null : y));
    setOpenMonth({ year: null, monthIndex: null });
  }

  function openMonthView(year, monthIndex) {
    setOpenMonth({ year, monthIndex });
  }

  function selectDate(year, monthIndex, day) {
    const d = new Date(year, monthIndex, day);
    setSelectedDate(d);
    console.log("Selected date:", d.toISOString().slice(0, 10));
  }

  function jumpToYear() {
    const y = parseInt(jumpValue, 10);
    if (!Number.isFinite(y)) return;
    if (y < startYear || y > startYear + 19) {
      alert(`Please enter a year between ${startYear} and ${startYear + 19}`);
      return;
    }
    setExpandedYear(y);
    setOpenMonth({ year: null, monthIndex: null });
  }

  function goToToday() {
    const y = today.getFullYear();
    const m = today.getMonth();
    setExpandedYear(y);
    setOpenMonth({ year: y, monthIndex: m });
    setSelectedDate(today);
  }

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold">20-Year Calendar</h2>
          <p className="text-sm text-gray-500">
            Showing {startYear} — {startYear + 19}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={goToToday}
            className="px-3 py-1 rounded-lg shadow-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow"
          >
            Today
          </button>

          <input
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            placeholder={`Jump to year (${startYear}-${startYear + 19})`}
            className="w-40 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm"
          />
          <button
            onClick={jumpToYear}
            className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm shadow"
          >
            Jump
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {years.map((y) => (
          <article
            key={y}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{y}</h3>
              <button
                onClick={() => toggleYear(y)}
                className="px-2 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              >
                {expandedYear === y ? "Collapse" : "Open"}
              </button>
            </div>

            {expandedYear === y && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {monthNames.map((m, mi) => (
                  <button
                    key={m}
                    onClick={() => openMonthView(y, mi)}
                    className={`text-xs p-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      openMonth.year === y && openMonth.monthIndex === mi
                        ? "ring-2 ring-indigo-400"
                        : ""
                    }`}
                  >
                    <div className="font-medium">{m}</div>
                    <div className="text-[11px] text-gray-500">
                      {new Date(y, mi, 1).toLocaleString(undefined, {
                        month: "long",
                      })}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {openMonth.year === y && openMonth.monthIndex !== null && (
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <MonthView
                  year={y}
                  monthIndex={openMonth.monthIndex}
                  today={today}
                  selectedDate={selectedDate}
                  onSelect={selectDate}
                />
              </div>
            )}
          </article>
        ))}
      </section>

      <footer className="mt-6 text-sm text-gray-500">
        Selected date:{" "}
        {selectedDate ? selectedDate.toISOString().slice(0, 10) : "None"}
      </footer>
    </div>
  );
}

// Month view subcomponent
function MonthView({ year, monthIndex, today, selectedDate, onSelect }) {
  const monthName = new Date(year, monthIndex, 1).toLocaleString(undefined, {
    month: "long",
  });
  const dim = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = new Date(year, monthIndex, 1).getDay();

  const weeks = [];
  let current = 1 - startDay;

  while (current <= dim) {
    const week = Array.from({ length: 7 }, () => {
      const day = current;
      current += 1;
      return day;
    });
    weeks.push(week);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">
          {monthName} {year}
        </h4>
        <div className="text-sm text-gray-500">Sun — Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="text-center text-gray-500">
            {d}
          </div>
        ))}

        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const isValid = day >= 1 && day <= dim;
            const dateObj = isValid ? new Date(year, monthIndex, day) : null;
            const isToday = dateObj && sameDay(dateObj, today);
            const isSelected = dateObj && selectedDate && sameDay(dateObj, selectedDate);

            return (
              <button
                key={`${wi}-${di}`}
                disabled={!isValid}
                onClick={() => isValid && onSelect(year, monthIndex, day)}
                className={`h-10 rounded-md flex items-center justify-center transition ${
                  isValid ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""
                } ${isToday ? "ring-2 ring-green-400" : ""} ${
                  isSelected ? "bg-indigo-600 text-white" : ""
                }`}
              >
                {isValid ? day : ""}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// Helper
function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

