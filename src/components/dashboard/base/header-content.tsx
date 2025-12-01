import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

interface HeaderContentProps
  extends VariantProps<typeof headerContentVariants> {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const headerContentVariants = cva(
  "mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
  {
    variants: {
      size: {
        sm: "mb-4",
        md: "mb-8",
        lg: "mb-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const titleVariants = cva("font-bold text-foreground", {
  variants: {
    size: {
      sm: "text-xl md:text-2xl",
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const descriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs md:text-sm",
      md: "text-sm md:text-base",
      lg: "text-base md:text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default function HeaderContent({
  title,
  description,
  children,
  size,
}: HeaderContentProps) {
  return (
    <div className={cn(headerContentVariants({ size }))}>
      <div className="flex flex-col gap-2">
        <h1 className={cn(titleVariants({ size }))}>{title}</h1>
        <p className={cn(descriptionVariants({ size }))}>{description}</p>
      </div>

      {/* Area untuk button/aksi tambahan */}
      {children && <div className="w-full md:w-auto">{children}</div>}
    </div>
  );
}
