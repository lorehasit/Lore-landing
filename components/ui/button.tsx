import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "orange" | "ink" | "plain";
type Size = "md" | "lg" | "sm";

function classesFor(variant: Variant, size: Size, className?: string) {
  const sizeClass = size === "lg" ? " btn-lg" : size === "sm" ? " btn-sm" : "";
  return `btn btn-${variant}${sizeClass}${className ? ` ${className}` : ""}`;
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function LinkButton({
  href,
  variant = "orange",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const isAnchor = href.startsWith("#");
  const cls = classesFor(variant, size, className);
  if (isAnchor) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "orange",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
