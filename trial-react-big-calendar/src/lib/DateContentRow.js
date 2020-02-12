import clsx from 'clsx'
import getHeight from 'dom-helpers/height'
import qsa from 'dom-helpers/querySelectorAll'
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'

import * as dates from '../utils/dates'
import BackgroundCells from './BackgroundCells'
import EventRow from './EventRow'
import EventEndingRow from './EventEndingRow'
import * as DateSlotMetrics from '../utils/DateSlotMetrics'

import axios from 'axios'

class DateContentRow extends React.Component {
  
  state = {
    semesterStartDates: []
  }

  constructor(...args) {
    super(...args)
    this.loadedSemesterStart = false
    this.slotMetrics = DateSlotMetrics.getSlotMetrics()
  }

  handleSelectSlot = slot => {
    const { range, onSelectSlot } = this.props

    onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
  }

  handleShowMore = (slot, target) => {
    const { range, onShowMore } = this.props
    let metrics = this.slotMetrics(this.props)
    let row = qsa(findDOMNode(this), '.rbc-row-bg')[0]

    let cell
    if (row) cell = row.children[slot - 1]

    let events = metrics.getEventsForSlot(slot)
    onShowMore(events, range[slot - 1], cell, slot, target)
  }

  createHeadingRef = r => {
    this.headingRow = r
  }

  createEventRef = r => {
    this.eventRow = r
  }

  getContainer = () => {
    const { container } = this.props
    return container ? container() : findDOMNode(this)
  }

  getRowLimit() {
    let eventHeight = getHeight(this.eventRow)
    let headingHeight = this.headingRow ? getHeight(this.headingRow) : 0
    let eventSpace = getHeight(findDOMNode(this)) - headingHeight

    return Math.max(Math.floor(eventSpace / eventHeight), 1)
  }

  renderHeadingCell = (date, index) => {
    let { renderHeader, getNow } = this.props

    return renderHeader({
      date,
      key: `header_${index}`,
      className: clsx(
        'rbc-date-cell',
        dates.eq(date, getNow(), 'day') && 'rbc-now'
      ),
    })
  }

  getSemesterStart = () => {
    if (this.loadedSemesterStart == false)  {
        axios.get('http://127.0.0.1:8000/api/semesterStart/')
        .then(res => {
          this.setState({
              semesterStartDates: res.data
          })
        console.log(res.data);
      })  
      this.loadedSemesterStart = true
    }
    
  }
  
  renderSemester = (date) => {
<<<<<<< HEAD
    // let sem_start_date = new Date(2020, 0, 13)
    // console.log('renderSemester: ' + date)
    // console.log(new Date(this.state.semesterStartDates[0].start_date))
    for (let i=0; i < this.state.semesterStartDates.length; i++) {
      let sem_start_date = new Date(this.state.semesterStartDates[i].start_date)
      // console.log('sem_start_date: ' + sem_start_date)
      if (date < sem_start_date) {
        break
      }
      
      let week_no = dates.diff(date, sem_start_date, 'day') / 7 + 1
      if (week_no > 13) {
        break
      }
      if (date >= sem_start_date && dates.diff(date, sem_start_date) % 7 == 0) {
        if (week_no == 8) {
          return 'Recess Week'
        } else if (week_no > 8) {
          week_no -= 1
        } 
        return 'Week ' + week_no
      }
=======
    //  console.log(date)
    //  console.log(dates.today())
    let sem_start_date = new Date(2020, 0, 13)
    if (date >= sem_start_date
      && dates.diff(date, sem_start_date) % 7 === 0) {

      let week_no = dates.diff(date, sem_start_date, 'day') / 7 + 1
      // console.log(week_no)
      if (week_no === 8) {
        return 'Recess Week'
      } else if (week_no > 14) {
        return ''
      } else if (week_no > 8) {
        week_no -= 1
      } 
      // console.log(sem_start_date)
      // console.log(dates.diff(dates.yesterday(), date, 'day'))
      return 'Week ' + week_no
>>>>>>> 65e25e8bf34824668646a11123e4317992f29fc8
    }
    
    // return 'week ' + dates.today()
  }

  renderDummy = () => {
    let { className, range, renderHeader } = this.props
    return (
      <div className={className}>
        <div className="rbc-row-content">
          {renderHeader && (
            <div className="rbc-row" ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          <div className="rbc-row" ref={this.createEventRef}>
            <div className="rbc-row-segment">
              <div className="rbc-event">
                <div className="rbc-event-content">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      date,
      rtl,
      range,
      className,
      selected,
      selectable,
      renderForMeasure,

      accessors,
      getters,
      components,

      getNow,
      renderHeader,
      onSelect,
      localizer,
      onSelectStart,
      onSelectEnd,
      onDoubleClick,
      resourceId,
      longPressThreshold,
      isAllDay,
    } = this.props

    if (renderForMeasure) return this.renderDummy()

    let metrics = this.slotMetrics(this.props)
    let { levels, extra } = metrics

    let WeekWrapper = components.weekWrapper

    const eventRowProps = {
      selected,
      accessors,
      getters,
      localizer,
      components,
      onSelect,
      onDoubleClick,
      resourceId,
      slotMetrics: metrics,
    }

    return (
      <div className={className}>
        <BackgroundCells
          date={date}
          getNow={getNow}
          rtl={rtl}
          range={range}
          selectable={selectable}
          container={this.getContainer}
          getters={getters}
          onSelectStart={onSelectStart}
          onSelectEnd={onSelectEnd}
          onSelectSlot={this.handleSelectSlot}
          components={components}
          longPressThreshold={longPressThreshold}
        />
        {this.getSemesterStart()}
        {range.map(this.renderSemester)}
        <div className="rbc-row-content">
          {renderHeader && (
            <div className="rbc-row " ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          <WeekWrapper isAllDay={isAllDay} {...eventRowProps}>
            {levels.map((segs, idx) => (
              <EventRow key={idx} segments={segs} {...eventRowProps} />
            ))}
            {!!extra.length && (
              <EventEndingRow
                segments={extra}
                onShowMore={this.handleShowMore}
                {...eventRowProps}
              />
            )}
          </WeekWrapper>
        </div>
      </div>
    )
  }
}

DateContentRow.propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  range: PropTypes.array.isRequired,

  rtl: PropTypes.bool,
  resourceId: PropTypes.any,
  renderForMeasure: PropTypes.bool,
  renderHeader: PropTypes.func,

  container: PropTypes.func,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onShowMore: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  onDoubleClick: PropTypes.func,
  dayPropGetter: PropTypes.func,

  getNow: PropTypes.func.isRequired,
  isAllDay: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
}

DateContentRow.defaultProps = {
  minRows: 0,
  maxRows: Infinity,
}

export default DateContentRow
