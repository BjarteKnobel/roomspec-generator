import { HTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: 'secondary' | 'outline'
}

export function Badge({ className, variant = 'secondary', ...props }: Props) {
  const styles = {
    secondary: 'bg-secondary text-foreground',
    outline: 'border border-border'
  }
  return <div {...props} className={clsx('inline-flex items-center rounded px-2 py-1 text-xs', styles[variant], className)} />
}

