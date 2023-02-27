
interface IInputProps {
    label?: string;
    placeholder?: string;
    message?: string;
  }
  
  const CommonTextArea = (props: IInputProps) => {
    return (
      <div className={`text-sm font-normal lg:pr-30 flex flex-col md:flex-row justify-between items-start mt-6 ${props?.message && "mb-10"}`}>
        <label className="pr-6 text-black">{props?.label}</label>
        <div className="relative">
        <textarea
          placeholder={props?.placeholder}
          className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text min-w-[290px] lg:min-w-[360px]`}
        />
        <p className="absolute text-secondary-text text-xs font-normal pt-1">{props?.message}</p>
        </div>
      </div>
    );
  };
  
  export default CommonTextArea;
  