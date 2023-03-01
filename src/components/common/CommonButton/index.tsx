
interface IInputProps {
    label?: string;
    placeholder?: string;
    message?: string;
  }
  
  const CommonButton = (props: IInputProps) => {
    return (
      <div className={`text-sm font-normal sm:pr-20 lg:pr-40 flex flex-col sm:flex-row justify-between items-start mt-3 ${props?.message && "mb-10"}`}>
        <label className="pr-6 text-black hidden sm:block sm:invisible">{props?.label}</label>
        <div className="flex min-w-[200px] justify-start">
        <button className="bg-primary-blue text-white px-8 py-2 text-sm font-semibold rounded">{props?.label}</button>
        </div>
      </div>
    );
  };
  
  export default CommonButton;
  