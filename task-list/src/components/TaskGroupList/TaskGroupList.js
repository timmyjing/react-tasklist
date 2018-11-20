import React from 'react';
import TaskItem from './TaskItem';


const TaskGroupList = ({group, allTasks, toggleTask, toggleShow}) => {

  const tasks = allTasks.filter( task => task.group === group);
  const byId = {};
  allTasks.forEach( task => byId[task.id] = task);

  return (
    <div>
      <div className="task-group">
        <h2>{group}</h2>
        <div className="index-link" onClick={() => toggleShow()}>All Groups</div>
      </div>
      {tasks.map(task => <TaskItem task={task} key={task.id} byId={byId} toggleTask={toggleTask}/>)}
    </div>);
}


export default TaskGroupList;