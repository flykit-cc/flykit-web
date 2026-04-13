type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 20 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M2 20 L11 11 L11 13.5 L5 20 Z" />
      <path d="M7 20 L17 9 L17 11.5 L10.5 20 Z" />
      <path d="M12 20 L22 7 L22 9.5 L15 20 Z" />
    </svg>
  );
}
