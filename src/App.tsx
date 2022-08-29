import React, { useState } from 'react';
import {
  Card,
  Navbar,
  Text,
  Grid,
  Input,
  FormElement,
  Button,
  Spacer
} from '@nextui-org/react'

type Todo = {
  id: number
  tasks: string[]
}

export default function App() {

  const [task, setTask] = useState('')
  const [oTodoId, setOtodoId] = useState(-1)
  const [oTask, setOTask] = useState('')
  const [tasks, setTasks] = useState([] as string[])
  const [todos, setTodos] = useState([] as Todo[])

  const handleChangeTaskName = (e: React.ChangeEvent<FormElement>) => {
    setTask(e.target.value)
  }

  const handleInsertTaskName = () => {
    
    if (task.length > 0 && oTask.length === 0 && oTodoId === -1) {
      setTasks([...tasks, task])
      setTask('')
    }
    else if (oTask.length !== 0 && oTodoId !== -1) {
      handleUpdateTaskNameInTodo(task)
    }
  }

  const handleInsertTodos = () => {
    setTodos([...todos, {
      id: todos.length,
      tasks: tasks
    }])
    setTask('')
    setTasks([])
  }

  const handleDeleteTaskNameByName = (task: string) => {
    setTasks(tasks.filter(t => t !== task))
  }

  const handleDeleteTodoById = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const handleDeleteTaskNameInTodo = (task: string, todoId: number) => {
    const td = todos.filter(tds => tds.id === todoId)[0]
    const t  = td.tasks.filter(ts => ts !== task)
    td.tasks = t
    setTodos([...todos])
  }

  const handleUpdateTaskNameInTodo = (task: string) => {
    const td = todos.filter(tds => tds.id === oTodoId)[0]
    const t  = td.tasks.indexOf(oTask)
    td.tasks[t] = task
    console.log(todos)
    setTodos([...todos])
    setTask('')
    setOTask('')
    setOtodoId(-1)
  }

  const handleSelctOleTaskName = (task: string, todoId: number) => {
    setTask(task)
    setOTask(task)
    setOtodoId(todoId)
    setTasks([])
  }

  const taskItems = tasks.map((t, index) => {
    return <>
      <Card>
        <Card.Header>
          <Grid.Container justify="center" alignItems='center'>
            <Grid xs={9}>
              <Text b> {t} </Text>
            </Grid>
            <Button auto color="error" size="sm" onClick={() => handleDeleteTaskNameByName(t)}>
              delete
            </Button>
          </Grid.Container>
        </Card.Header>
      </Card>
      <Spacer y={0.5} />
    </>
  }).reverse()

  const todoItems = todos.map((td, index) => {
    return <>

      <Grid xs={6}>
        <Card isHoverable>
          <Card.Header>
            <Grid.Container justify="flex-start" alignItems='center'>
              <Grid xs={9}>
                <Text b> #Todo : {td.id} </Text>
              </Grid>
              <Grid xs={3}>
                <Button auto color="error" onClick={() => handleDeleteTodoById(td.id)}>
                  Delete
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Grid.Container gap={2} justify="center" alignItems='center'>
            {td.tasks.map((t, i) => {
              return <>
                <Grid xs={12}>
                  <Card isPressable onClick={() => handleSelctOleTaskName(t, td.id)}>
                    <Card.Header>
                    <Grid.Container justify="flex-start" alignItems='center'>
                      <Grid xs={9}>
                      <Text b> {t} </Text>
                      </Grid>
                      <Grid xs={3}>
                      <Button auto color="error" onClick={() => handleDeleteTaskNameInTodo(t, td.id)}>
                        Delete
                      </Button>
                      </Grid>
                      </Grid.Container>
                    </Card.Header>
                  </Card>
                </Grid>
              </>
            })}
          </Grid.Container>
        </Card>
      </Grid>
    </>
  })

  return (
    <>
      <Navbar variant={'sticky'}>
        <Navbar.Content >
          <Text b > Todo List </Text>
        </Navbar.Content>
      </Navbar>
      <Grid.Container gap={5} justify="center">
        <Grid xs={6}>
          <Card isHoverable >
            <Card.Header>
              <Text b>{ oTask.length > 0 ? `Edit Todo : ${oTodoId}` : `Create new Todo`}</Text>
            </Card.Header>
            <Card.Body>
              <Grid.Container justify="center">
                <Grid xs={9}>
                  <Input clearable labelLeft="Task Name" onChange={handleChangeTaskName} value={task} />
                </Grid>
                <Grid xs={3}>
                  <Button auto shadow onClick={handleInsertTaskName}>save task</Button>
                </Grid>
              </Grid.Container>
            </Card.Body>
            <Card.Body>
              {taskItems}
            </Card.Body>
            <Card.Divider />
            {
              oTask.length > 0 ? <></> :
              <Card.Footer>
              <Grid.Container justify="center">
                <Button auto shadow color="success" onClick={handleInsertTodos}>
                  create new todos
                </Button>
              </Grid.Container>
            </Card.Footer>
            
            }
          </Card>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={5} justify='flex-start' alignItems='center' >
        {todoItems}
      </Grid.Container>
    </>
  )
}