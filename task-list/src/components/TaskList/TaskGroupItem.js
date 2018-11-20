import React from 'react';
import Group from '../../Group.svg';


const TaskGroupItem = ({group, count, toggleShow}) => {

  return (
    <div className="task-item" onClick={() => toggleShow(group)}>
      <div>
        <img src={Group} className="logo"/>
      </div>
      <div className="left-align">
        <h2>{group}</h2>
        <p>{count.completed} Of {count.count} Tasks Complete</p>
      </div>
    </div>
  )
};

export default TaskGroupItem;