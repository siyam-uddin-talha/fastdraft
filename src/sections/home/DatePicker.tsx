"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = "Select date" }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date or default to today
  const parsedDate = value ? new Date(value) : null;
  const [currentMonth, setCurrentMonth] = useState(parsedDate || new Date());

  // Format date for display: e.g. "Jul 16, 2026"
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update currentMonth if value changes from parent (e.g. loading a draft)
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(d);
      }
    }
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const selectDay = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format to YYYY-MM-DD local date
    const offset = selected.getTimezoneOffset();
    const localDate = new Date(selected.getTime() - offset * 60 * 1000);
    const dateStr = localDate.toISOString().split("T")[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  // Generate days grid
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // Day of week (0-6)
  const totalDays = new Date(year, month + 1, 0).getDate(); // Total days in month
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long" });

  const days: { day: number; currentMonth: boolean; key: string }[] = [];

  // Padding days from previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      day: prevMonthTotalDays - i,
      currentMonth: false,
      key: `prev-${prevMonthTotalDays - i}`,
    });
  }

  // Days in current month
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      day: i,
      currentMonth: true,
      key: `curr-${i}`,
    });
  }

  // Padding days for next month to complete the row
  const remaining = 42 - days.length; // 6 rows * 7 days = 42
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      currentMonth: false,
      key: `next-${i}`,
    });
  }

  const isSelected = (day: number, isCurrMonth: boolean) => {
    if (!isCurrMonth || !parsedDate) return false;
    return (
      parsedDate.getDate() === day &&
      parsedDate.getMonth() === month &&
      parsedDate.getFullYear() === year
    );
  };

  const isToday = (day: number, isCurrMonth: boolean) => {
    if (!isCurrMonth) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] hover:border-lime-600 focus:border-lime-700 focus:ring-4 focus:ring-lime-100/50 transition-all duration-300 rounded-2xl outline-none cursor-pointer"
      >
        <span className={value ? "text-[#1e3020]" : "text-emerald-800/40"}>
          {value ? formatDateDisplay(value) : placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-lime-700" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 bg-[#faf8f4] border border-[#d5ded7] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 p-4 font-outfit">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-[#f0f4ee] rounded-xl text-[#1e3020] cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-[#1e3020]">
              {monthName} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-[#f0f4ee] rounded-xl text-[#1e3020] cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[#526354] uppercase tracking-wider mb-2">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {days.map(({ day, currentMonth: isCurr, key }) => {
              const selected = isSelected(day, isCurr);
              const today = isToday(day, isCurr);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={(e) => isCurr && selectDay(day, e)}
                  disabled={!isCurr}
                  className={`py-1.5 rounded-xl font-medium transition-all duration-200 ${
                    !isCurr
                      ? "text-[#d5ded7] cursor-default"
                      : selected
                        ? "bg-lime-700 text-white shadow-sm font-semibold hover:bg-lime-800 cursor-pointer"
                        : today
                          ? "bg-lime-100 text-lime-800 border border-lime-200/50 hover:bg-[#f0f4ee] cursor-pointer"
                          : "text-[#1e3020] hover:bg-[#f0f4ee] cursor-pointer"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
