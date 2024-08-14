import { ReactNode } from 'react';
export default function Layout(props : { children: ReactNode }){
    return(
        <form action="">
            <h2>Create</h2>
            {props.children}
        </form>
    )
}