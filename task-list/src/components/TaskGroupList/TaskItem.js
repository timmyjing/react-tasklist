import React from 'react';
import Locked from '../../Locked.svg';
import Incomplete from '../../Incomplete.svg';
import Completed from '../../Completed.svg';

const TaskItem = ({task, toggleTask, byId}) => {
  let locked = false;
  task.dependencyIds.forEach( id => {
    if (byId[id].completedAt === null) locked = true;
  })

  return (<div onClick={ locked ? null : () => toggleTask(task.id)}>
    <img src={locked ? Locked : (task.completedAt ? Completed : Incomplete)} />
    {task.task}
  </div>);
}

export default TaskItem;