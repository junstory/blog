"use client"

import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Create(){
    const router = useRouter();
    return(
        <form onSubmit={(e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title') as string;
            const body = formData.get('body') as string;
            const options ={
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({title,body}),
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`,options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastId = result.id;
                
                router.push(`/read/${lastId}`);
                router.refresh();
            });
        }}>
            <p>
                <input type="text" name="title" placeholder="title"id="" />
            </p>
            <p>
                <textarea name="body" placeholder="body"id=""></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    );
}