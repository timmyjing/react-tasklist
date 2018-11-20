import React from 'react';
import Group from '../../Group.svg';


const TaskGroupItem = ({group, count, toggleShow}) => {
  return (
    <div onClick={() => toggleShow(group)}>
      <h3><img src={Group} /> {group}</h3>
      <p>{count.completed} Of {count.count} Tasks Complete</p>
    </div>
  )
};

export default TaskGroupItem;