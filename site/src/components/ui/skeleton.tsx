import { cn } from '@/lib/utils';

/**
 * shadcn/ui Skeleton primitive, restyled to the brand loading surface
 * (replaces the old Astro ui/Skeleton component 1:1).
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-[var(--color-cream-dark)]', className)}
      {...props}
    />
  );
}

export { Skeleton };
