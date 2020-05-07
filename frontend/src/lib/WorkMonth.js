//Taken from their pull request, may need some fixing up but logic should work??
import React from 'react'

import MonthView from './Month'
import cn from 'classnames'
import * as dates from '../utils/dates'
import chunk from 'lodash/chunk'
import Header from './Header'

const isWorkDay = date => {
  return date.getDay() !== 6 && date.getDay() !== 0
}

const visibleWorkDays = function(date, localizer) {
  let current = dates.firstVisibleDay(date, localizer),
    last = dates.lastVisibleDay(date, localizer),
    days = []
  while (dates.lte(current, last, 'day')) {
    days.push(current)
    current = dates.add(current, 1, 'day')
  }
  days = days.filter(date => isWorkDay(date))
  return days
}

const workDaysRange = function(start, end, unit = 'day') {
  let current = start,
    days = []
  while (dates.lte(current, end, unit)) {
    days.push(current)
    current = dates.add(current, 1, unit)
  }
  days = days.filter(date => isWorkDay(date))
  return days
}

class WorkMonthView extends MonthView {
  constructor(...args) {
    super(...args)
  }

  render() { //this renders the whole calendar out
    let { date, localizer, className } = this.props,
      month = visibleWorkDays(date, localizer),
      weeks = chunk(month, 5)
    this._weekCount = weeks.length
    return (
      <div className={cn('rbc-month-view', className)}>
        <div className="rbc-row rbc-month-header">
          {this.renderHeaders(weeks[0])}
        </div>
        {weeks.map(this.renderWeek)}
        {this.props.popup && this.renderOverlay()}
      </div>
    )
  }
  
  renderHeaders(row) { //this portion only renders the "mon tues wed..." portion
  //so should i adjust this portion? to add 1 more column?
    let { localizer, components } = this.props
    let first = row[0]
    let last = row[row.length - 1]
    let HeaderComponent = components.header || Header
    return workDaysRange(first, last, 'day').map((day, idx) => ( 
      <div key={'header_' + idx} className="rbc-header" style={{fontFamily: 'Roboto', fontWeight: '400', bottomBorder: '0px solid', padding: '3px'}}>  
        <HeaderComponent
          date={day}
          localizer={localizer}
          label={localizer.format(day, 'weekdayFormat').toUpperCase()}
        />
      </div>
    ))
  }
}
export default WorkMonthView