import { Logo } from "./Logo"

export const Appbar = () => {
    return <div className="shadow h-16 flex justify-between border">
        <div className="flex flex-col justify-center h-full ml-4">
            Payments App
        </div>
        <div className="flex px-3 pt-3 pb-1">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello 
            </div>
     <Logo label = {"a"} />
            </div>
        </div>
    // </div>
}