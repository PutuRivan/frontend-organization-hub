"use client"

import { useState } from "react"

export function useCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }

  const handleToday = () => {
    setCurrentDate(new Date());
  }

  const handleDateChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month, 1));
  }

  return {
    currentDate,
    handleNextMonth,
    handlePreviousMonth,
    handleToday,
    handleDateChange,
  }
}