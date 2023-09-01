"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function NewPage({params}){
    const router = useRouter()
    const [title, setTitle] =  useState("")
    const [description, setDescription] = useState("")

    const buttonText = () => {
        if (params.taskid){
            return "Editar"
        }else {
            return "Crear"
        }
    }

    useEffect(() => {
        if(params.taskid){
            fetch(`/api/tasks/${params.taskid}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.task.title)
                setDescription(data.task.description)
            })
        }
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        if(params.taskid){
            await fetch(`/api/tasks/${params.taskid}`, {
                method: 'PUT',
                body: JSON.stringify({title, description}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }else {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({title, description})
            })
    
            const data = await res.json()
            console.log(data)
        }
        router.refresh()
        router.push('/')
    }

    const onDelete = async () => {
        await fetch(`/api/tasks/${params.taskid}`, {
            method: 'DELETE'
        })
        router.refresh()
        router.push('/')
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="bg-slate-700 p-10 sm:w-1/4 w-full"
            onSubmit={onSubmit}>

                <label className="font-bold text-sm"htmlFor="title">Taskt Tile</label>
                <input id="title" type="text" placeholder="Title" className="border border-gray-400 p-2 mb-4 w-full text-black"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}/>

                <label className="font-bold text-sm" htmlFor="descrition">Task Description</label>
                <textarea id="description" rows='3' className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Describe your task"
                onChange={(e) => setDescription(e.target.value)}
                value={description}></textarea>
                
                <div className="flex align-middle gap-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">{buttonText()}</button>
                {
                    params.taskid && (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onDelete}
                        type="button">Eliminar</button>
                    )
                }
                </div>
            </form>
        </div>
    )
}

export default NewPage