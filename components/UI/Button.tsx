// Interface
interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2 ${
        fullWidth ? `w-full` : `w-fit`
      } ${secondary ? `bg-white` : `bg-lime-500`} 
        ${secondary ? `text-black` : `text-white`}
        ${secondary ? `border-black` : `border-lime-500`}
        ${large ? `text-xl` : `text-md`}
        ${large ? `px-5` : `px-4`}
        ${large ? `py-3` : `py-2`}
        ${outline ? `bg-transparent` : ``}
        ${outline ? `bg-white` : ``}
        ${outline ? `text-white` : ``}
      `}
    >
      {label}
    </button>
  );
};