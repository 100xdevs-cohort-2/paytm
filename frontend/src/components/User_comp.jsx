export function User_comp() {
    return (
        <div className="flex px-5 h-[15%] justify-between items-center pb-16">
            <div className="flex justify-center items-center">
                <div className="bg-gray-200 px-4 text-lg p-2 rounded-full">U</div>
                <div className="text-2xl font-bold px-5">User 1</div>
            </div>
            <button className="bg-black text-white rounded-md px-4 py-2">Send Money</button>
        </div>
    )
}