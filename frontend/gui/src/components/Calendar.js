import React from 'react';

import { Calendar, Badge } from 'antd';

// function getListData(value) {
//     let listData;
//     switch (value.date()) {
//       case 8:
//         listData = [
//           { type: 'warning', content: 'This is warning event.' },
//           { type: 'success', content: 'This is usual event.' },
//         ];
//         break;
//       case 10:
//         listData = [
//           { type: 'warning', content: 'This is warning event.' },
//           { type: 'success', content: 'This is usual event.' },
//           { type: 'error', content: 'This is error event.' },
//         ];
//         break;
//       case 15:
//         listData = [
//           { type: 'warning', content: 'This is warning event' },
//           { type: 'success', content: 'This is very long usual event。。....' },
//           { type: 'error', content: 'This is error event 1.' },
//           { type: 'error', content: 'This is error event 2.' },
//           { type: 'error', content: 'This is error event 3.' },
//           { type: 'error', content: 'This is error event 4.' },
//         ];
//         break;
//       default:
//     }
//     return listData || [];
// }



const CalendarView = (props) => {
    
    function getListData(value) {
        var listData = [];
        let dataSource = props.data;
        for (let i=0; i < dataSource.length; i++) {
            let due_date = new Date(dataSource[i].task_due_date); 
            let render_date = value._d;
            
            if (due_date.getFullYear() === render_date.getFullYear()) {
                if (due_date.getMonth() === render_date.getMonth()) {
                    if (due_date.getDate() === render_date.getDate()) {
                        console.log(due_date);
                        console.log(render_date);
                        var currentdate = new Date(); 
                        if ((currentdate > due_date) && (dataSource[i].status === 'Pending')) {
                          dataSource[i].status = 'Late';
                          // Need to update database or smt here maybe? or find a way to automatically update status...
                        }
                        switch(dataSource[i].status) {
                            case 'Pending':
                                dataSource[i].status = 'processing';
                                break;
                            case 'Completed':
                                dataSource[i].status = 'success';
                                break;
                            case 'Late':
                                dataSource[i].status = 'error';
                                break;
                        }
                        listData.push(dataSource[i]);
                        console.log(dataSource[i]);
                    }
                }
            }
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.status} text={item.task_type} />
              </li>
            ))}
          </ul>
        );
    }
      
    function getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
    }
      
    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
    }

    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    )
  }
  
  export default CalendarView;