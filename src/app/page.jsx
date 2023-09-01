import {prisma} from '@/libs/prisma.js'
import TaskCard  from '@/components/TaskCard'
async function loadTask(){
  // const res = await fetch('http://localhost:3000/api/tasks')
  // const {tasks} = await res.json()

  const tasks = await prisma.task.findMany()
  return tasks
}

async function HomePage(){
  const tasks = await loadTask()
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}

export default HomePage