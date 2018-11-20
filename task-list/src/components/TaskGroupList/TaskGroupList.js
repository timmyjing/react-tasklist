import React from 'react';
import TaskItem from './TaskItem';


const TaskGroupList = ({group, tasks, byId, toggleTask}) => {
  return (<div>
      <div onClick={() => this.setState({showGroup: false})}>All Groups</div>
      <h2>{group}</h2>
      {tasks.map(task => <TaskItem task={task} byId={byId} toggleTask={toggleTask}/>)}
    </div>)
}


export default TaskGroupList;