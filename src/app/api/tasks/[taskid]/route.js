import { NextResponse } from 'next/server';
import {prisma} from '@/libs/prisma.js'


export async function GET(request, {params}){

    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.taskid)
        }
    })

    return NextResponse.json({ task: task})
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()
        const updateTask = await prisma.task.update({
            where: {
                id: Number(params.taskid)
            },
            data: data
        })

        return NextResponse.json({ task: updateTask})

    } catch (error) {
        return NextResponse.json({ error: error })
    }
}

export async function DELETE(request, {params}){
    try {
        const task = await prisma.task.delete({
            where: {
                id: Number(params.taskid)
            }
        })
    
        return NextResponse.json({ task: task})
    } catch (error){
        return NextResponse.json({ error: error })
    }
}