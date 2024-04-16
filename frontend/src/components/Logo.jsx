export function Logo({label}){
    const randomColorClass = `bg-${Math.floor(Math.random() * 10) + 1}00`;
    return <div>
        
        <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{label[0].toUpperCase()}</span>
                    </div>
    </div>
}