"use client"

import { headers } from "next/headers";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Update(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(()=>{
        fetch(`http://localhost:9999/topics/`+id)
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            setTitle(result.title);
            setBody(result.body);
        });
    },[]);
    return(
        <form onSubmit={(e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title') as string;
            const body = formData.get('body') as string;
            const options ={
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({title,body}),
            }
            fetch(`http://localhost:9999/topics/`+id,options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastId = result.id;
                
                router.push(`/read/${lastId}`);
                router.refresh();
            });
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} 
                onChange={e=>setTitle(e.target.value)}/>
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body}
                onChange={e=>setBody(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    );
}