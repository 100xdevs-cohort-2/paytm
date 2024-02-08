import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Appbar pic="U" />
      <Balance label="5000" />
      <Users />
    </div>
  );
};
