export function Input({placeholder,label,type,refrence}){

    return(
       <div className="flex flex-col mx-3 gap-y-2">
         <span className="text-black font-medium text-md">{label}</span>
         <input type={type} placeholder={placeholder} 
         className="bg-inherit border-2 py-1 px-2 rounded-md placeholder-zinc-600"
         ref={refrence}
         />
       </div>
    )
}