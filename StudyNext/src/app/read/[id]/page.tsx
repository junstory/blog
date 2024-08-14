import { ReactNode } from "react";
type pathVar = {
    id: number,
    name: string
  }
export default function Read(props:{params: pathVar}){
    return (
        <>
            <h2>Read</h2>
            parameters : {props.params && props.params.id}
        </>
    );
}