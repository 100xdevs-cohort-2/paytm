import { Link } from "react-router-dom";

const BottomWarn = ({ para, to, linkName }) => {
  return (
    <>
      <div className="flex justify-center pt-3">
        <p>{para}</p>
        <Link to={to} className=" pl-2 underline">
          {linkName}
        </Link>
      </div>
    </>
  );
};

export default BottomWarn;
