import { Switch as SwitchPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/utils/cn';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'inline-flex h-7 w-14 shrink-0 items-center rounded-full bg-grand-prix-row p-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-grand-prix-info data-[state=checked]:bg-grand-prix-warning',
        className
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="block size-5 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-7"
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
