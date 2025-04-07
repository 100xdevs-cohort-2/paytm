export function SearchBox({placeholder,label,type,refrence,onchangeFun}){

    return(
       <div className="flex flex-col  gap-y-2">
         <span className="text-black font-medium text-md">{label}</span>
         <input type={type} placeholder={placeholder} 
         className="bg-inherit border-2 py-1 px-2 rounded-md placeholder-zinc-600"
         ref={refrence}
         onChange={onchangeFun}
         />
       </div>
    )
}