import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim() !== '' && newTaskDescription.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          name: newTaskName,
          description: newTaskDescription
        }
      ]);
      setNewTaskName('');
      setNewTaskDescription('');
    }
  };

  const handleEditTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          name: editedTaskName,
          description: editedTaskDescription
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditTaskId(null);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <h1 className="mt-3">Task Manager</h1>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="taskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddTask}>Create Task</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        {tasks.map(task => (
          <Col key={task.id} md={4}>
            <div className="border p-3">
              {editTaskId === task.id ? (
                <>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Enter task description"
                    value={editedTaskDescription}
                    onChange={(e) => setEditedTaskDescription(e.target.value)}
                    className="mt-2"
                  />
                  <Button variant="success" className="mt-2" onClick={() => handleEditTask(task.id)}>Save</Button>
                </>
              ) : (
                <>
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                  <Button variant="info" onClick={() => {
                    setEditTaskId(task.id);
                    setEditedTaskName(task.name);
                    setEditedTaskDescription(task.description);
                  }}>Edit Task</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>Delete Task</Button>
                </>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskManager;
