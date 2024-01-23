import { MiddleBar } from "../components/MiddleBar";
import { TopBar } from "../components/TopBar";
import { User_comp } from "../components/User_comp";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

export function Dashboard() {
    let amount = "";
    useEffect(() => {
        return;
    }, []);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col h-full w-full">
                <TopBar/>
                <MiddleBar/>
                <div>
                    <User_comp/>
                    <User_comp/>
                    <User_comp/>
                </div>
            </div>
        </div>
    )
}