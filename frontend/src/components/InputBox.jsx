export default function InputBox({label, placeholder, onChange}){
    return(
        <div className="m-2">
            <div className="text-sm font-medium text-left py-2">{label}</div>
            <input onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" placeholder={placeholder}></input>
        </div>
    )
}