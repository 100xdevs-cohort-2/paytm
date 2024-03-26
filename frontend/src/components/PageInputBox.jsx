const PageInputBox = ({ name, placeholder, onChange }) => {
  return (
    <>
      <div className="flex flex-col text-left pt-3">
        <label htmlFor="name">{name}</label>
        <input
          type="text"
          id="name"
          placeholder={placeholder}
          onChange={onChange}
          className="border border-slate-400 rounded"
        />
      </div>
    </>
  );
};

export default PageInputBox;
