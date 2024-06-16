export default function CustomInput({
  type = text,
  placeholder,
  name,
  value,
  className,
  ...props
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        className={`w-full py-2 px-5 rounded border border-gray-200 text-base font-normal ${className}`}
        {...props}
      />
    </>
  );
}
