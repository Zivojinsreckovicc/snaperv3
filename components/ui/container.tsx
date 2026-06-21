import { cn } from "@/lib/utils";

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  size?: keyof typeof sizes;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "size" | "className" | "children">;

/**
 * Horizontal layout wrapper: centers content, caps width and applies the
 * shared responsive gutter. Use inside <Section> for page content.
 */
export function Container<T extends React.ElementType = "div">({
  as,
  size = "xl",
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
