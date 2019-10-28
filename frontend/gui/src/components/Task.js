import React from 'react';

import { List, Avatar } from 'antd';

const Task = (props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{item.taskid}. {item.tasktype}</a>}
            description={item.status}
          />
          {item.taskduedate}
        </List.Item>

      )}
    />
  )
}

export default Task;