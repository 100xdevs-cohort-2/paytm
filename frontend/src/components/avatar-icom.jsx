const AvatarIcon = ({username}) => {
  return (
    <div className="bg-zinc-400 w-10 h-10 rounded-full flex items-center justify-center">
    <span className="text-xl font-medium">
        {username[0].toUpperCase()}
    </span>
   </div>
  )
};

export default AvatarIcon;
