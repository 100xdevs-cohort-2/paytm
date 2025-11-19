export function InputBox({label, placeholder, onChange, type = "text", value, onKeyPress}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input 
        onChange={onChange} 
        placeholder={placeholder} 
        type={type}
        value={value}
        onKeyPress={onKeyPress}
        className="w-full px-2 py-1 border rounded border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
      />
    </div>
}