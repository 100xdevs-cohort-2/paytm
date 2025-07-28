import { useState,useEffect } from "react";

export function useMousePointer(){
    const [position, setPosition] = useState({x :0, y:0});

    useEffect(()=>{
        function getMousePosition(event){
            const x = event.clientX;
            const y = event.clientY;
            setPosition((prev)=>({x : x, y : y}))
        }
        window.addEventListener("mousemove", getMousePosition)

        return()=>{
            window.removeEventListener("mousemove", getMousePosition)
        }
    },[])
    return position;
}