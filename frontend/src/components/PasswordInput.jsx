const PasswordInput = ({label, placeholder, value, setValue}) => {
    return (
        <div className="textInputDiv flex flex-col space-y-2 w-full">
            <label for={label} className="font-semibold">{label}</label>
            <input id={label} value = {value} onChange = {(e) => { setValue(e.target.value);}} type="password" placeholder={placeholder} className="p-2 border border-gray-400 border-solid rounded placeholder-gray-500 text-black"/>
        </div>
        
    ) 
    
};

export default PasswordInput;