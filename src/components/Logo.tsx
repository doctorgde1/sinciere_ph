import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

interface ILogo extends LinkProps {
  content: string;
  className?: string;
}

const Logo: React.FC<ILogo> = ({ className, content, ...props }) => {
  return (
    <Link
      className={cn(
        "relative h-fit p-1 rounded-xl dark:bg-neutral-950",
        className
      )}
      {...props}
    >
      <span className="flex py-1 px-2 font-bold rounded-lg border-2 border-r-4 border-b-4 transition-all md:block text-inherit flex-shrink-1 border-neutral-950 dark:border-neutral-50 hover:-translate-y-[2px]">
        {content}
      </span>
    </Link>
  );
};

export default Logo;
