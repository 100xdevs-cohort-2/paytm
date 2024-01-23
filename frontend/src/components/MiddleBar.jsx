export function MiddleBar() {
    return(
        <div className="h-[25%] pt-10 px-5">
            <div className="flex items-center">
                <div className="text-2xl font-bold pr-4">Your Balance  </div>
                <div className="font-semibold text-xl">$5000</div>
            </div>
            <div className="pt-5 pb-5 font-bold text-2xl">Users</div>
            <input placeholder="Search users..." type="text" className="border-2 w-full rounded-md p-2"></input>
        </div>
    )
}