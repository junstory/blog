import { ReactNode } from "react";
type pathVar = {
    id: number,
    name: string
  }
export default async function Read(props:{params: pathVar}){
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${props.params.id}`
        , {cache: "no-store"});
    const topic = await res.json();
    return (
        <>
            <h2>{topic.title}</h2>
            {topic.body}<br/><br/>
            parameters : {props.params && props.params.id}
            
        </>
    );
}