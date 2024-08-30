import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Need to add auth check!
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    );
};
