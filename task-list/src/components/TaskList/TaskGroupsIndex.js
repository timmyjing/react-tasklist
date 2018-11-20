import React from 'react';
import TaskGroupItem from './TaskGroupItem';


const TaskGroupsIndex = ({groups, count, toggleShow}) => {
  return (
    <div>
      <h2>Things To Do</h2>
      {groups.map( (group,idx) => <TaskGroupItem group={group} key={idx} count={count[group]} toggleShow={toggleShow} />)}
    </div>)
};

export default TaskGroupsIndex;