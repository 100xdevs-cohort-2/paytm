import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div className="font-medium text-left text-sm py-2">{label}</div>
      <Link
        to={to}
        className="pointer hover:underline pl-1 cursor-pointer pt-2"
      >
        {buttonText}
      </Link>
    </div>
  );
}
