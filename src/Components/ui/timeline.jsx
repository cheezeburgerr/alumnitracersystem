import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const Timeline = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={className} {...rest} />;
});
Timeline.displayName = 'Timeline';

// export const TimelineItem = React.forwardRef((props, ref) => {
//   const { className, ...rest } = props;
//   return (
//     <div
//       ref={ref}
//       className={cn('group relative pb-8 pl-8 sm:pl-44', className)}
//       {...rest}
//     />
//   );
// });
// TimelineItem.displayName = 'TimelineItem';

export const TimelineItem = React.forwardRef((props, ref) => {
  const { className, isFirst, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        'group relative pb-8 pl-8 sm:pl-44',
        !isFirst && 'opacity-50 text-muted-foreground', // Apply muted styles to non-first items
        className
      )}
      {...rest}
    />
  );
});
TimelineItem.displayName = 'TimelineItem';


export const TimelineHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        'mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-slate-300 before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-primary-foreground/95 after:bg-foreground group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[10rem] sm:after:left-0 sm:after:ml-[10rem]',
        className
      )}
      {...rest}
    />
  );
});
TimelineHeader.displayName = 'TimelineHeader';

export const TimelineTitle = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn('text-xl font-bold text-primary', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
TimelineTitle.displayName = 'TimelineTitle';

export const TimelineTime = (props) => {
  const { className, variant = 'default', ...rest } = props;
  return (
    <Badge
      className={cn(
        'left-0 mb-3 inline-flex h-6 w-36 translate-y-0.5 items-center justify-center text-xs font-semibold uppercase sm:absolute sm:mb-0',
        className
      )}
      variant={variant}
      {...rest}
    >
      {props.children}
    </Badge>
  );
};
TimelineTime.displayName = 'TimelineTime';

export const TimelineDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn('text-muted-foreground', className)}
      {...rest}
    />
  );
});
TimelineDescription.displayName = 'TimelineDescription';
