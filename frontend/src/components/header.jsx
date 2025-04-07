import { RiSecurePaymentLine } from "react-icons/ri";
import AvatarIcon from "./avatar-icom";

const HeaderCompo = ({username}) => {
  return (
    <div className="w-full h-20 px-5 border-b-2 flex items-center justify-between">
     <div className="flex items-center gap-x-3">
     <span className="font-medium text-3xl font-[Roboto] flex " >
        Payments App 
      </span>
      <RiSecurePaymentLine  className="text-3xl"/>
     </div>
      
      <div className="flex items-center gap-x-3">
       <span className="font-medium text-2xl">
       Hello 👋 {username}
       </span>
       <AvatarIcon username={username} />
      </div>
    </div>
  )
};

export default HeaderCompo;
