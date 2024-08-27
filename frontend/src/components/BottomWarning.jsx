import { Link } from "react-router-dom";

export default function BottomWarning({warning, buttonText, to}) {
    return(
        <div className="py-2 text-sm flex justify-center">
            <div>
                {warning}
            </div>
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}