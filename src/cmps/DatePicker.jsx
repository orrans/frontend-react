import { useState } from 'react'

const today = new Date()
today.setHours(0, 0, 0, 0) // Normalize to the start of the day

function normalizeDate(date) {
    if (!date) return null
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    return newDate
}

export function DatePicker({ isOpen, onToggle, dateRange, onSetDateRange, currentMonth, onMonthChange, hidePrev, hideNext }) {
    const [internalDate, setInternalDate] = useState(new Date())

    // Use controlled date if provided, otherwise internal state
    const dateToUse = currentMonth || internalDate

    const daysInMonth = getDaysInMonth(dateToUse.getFullYear(), dateToUse.getMonth())
    const monthName = dateToUse.toLocaleString('default', { month: 'long', year: 'numeric' })

    // Get day of week for the 1st of the month (0-6, Sun-Sat)
    const firstDayOfMonth = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), 1).getDay()

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate()
    }

    function handleDaySelect(day) {
        const selectedDate = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), day);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) return;

        if (!dateRange.start || (dateRange.start && dateRange.end)) {
            onSetDateRange({ start: selectedDate, end: null })
        } else {
            if (selectedDate.getTime() === normalizeDate(dateRange.start).getTime()) {
                // User clicked the same day, do nothing.
                return;
            }

            if (selectedDate < dateRange.start) {
                // User selected a date before the start date, so reset and set new start date
                onSetDateRange({ start: selectedDate, end: null })
            } else {
                // Valid end date
                onSetDateRange({ ...dateRange, end: selectedDate });
            }
        }
    }

    function changeMonth(diff) {
        if (onMonthChange) {
            onMonthChange(diff)
        } else {
            const newDate = new Date(internalDate.getFullYear(), internalDate.getMonth() + diff, 1)
            setInternalDate(newDate)
        }
    }

    // Only render if open (though parent usually controls this)
    if (!isOpen) return null;

    const calendarMonthStart = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), 1);
    const todayMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const canGoBack = calendarMonthStart > todayMonthStart;

    return (
        <div className="date-picker-container">
            <div className="date-picker-popup">

                <div className="calendar-header">
                    <button className="nav-btn prev" onClick={(e) => { e.stopPropagation(); changeMonth(-1) }} style={{ visibility: hidePrev ? 'hidden' : 'visible' }} disabled={!canGoBack}>
                        {/* Arrow icon */}
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>
                    </button>
                    <span className="month-label">{monthName}</span>
                    <button className="nav-btn next" onClick={(e) => { e.stopPropagation(); changeMonth(1) }} style={{ visibility: hideNext ? 'hidden' : 'visible' }}>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
                    </button>
                </div>

                {/* Weekday Names */}
                <div className="weekdays-grid">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="weekday-name">{day}</div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {/* Empty cells for offset */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="day-cell empty"></div>
                    ))}

                    {/* Days */}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                        const dateToCheck = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), day);
                        dateToCheck.setHours(0, 0, 0, 0);

                        // Check exact match (ignoring time for comparison safety)
                        const isStart = dateRange.start && dateToCheck.getTime() === normalizeDate(dateRange.start).getTime();
                        const isEnd = dateRange.end && dateToCheck.getTime() === normalizeDate(dateRange.end).getTime();

                        const isInRange =
                            dateRange.start && dateRange.end &&
                            dateToCheck > normalizeDate(dateRange.start) &&
                            dateToCheck < normalizeDate(dateRange.end);

                        const isPast = dateToCheck < today;

                        let className = "day-cell"
                        if (isStart || isEnd) className += " selected"
                        if (isInRange) className += " in-range"
                        if (isPast) className += " disabled"

                        // Edge cases for styling the range background
                        if (isStart && dateRange.end) className += " range-start"
                        if (isEnd && dateRange.start) className += " range-end"

                        return (
                            <div
                                key={day}
                                className={className}
                                onClick={(e) => { e.stopPropagation(); handleDaySelect(day); }}
                            >
                                <div className="day-content">{day}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}