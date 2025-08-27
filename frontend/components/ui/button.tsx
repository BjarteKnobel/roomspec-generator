import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'outline'
}

export function Button({ className, variant = 'default', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2'
  const styles: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-foreground hover:opacity-90',
    outline: 'border border-border hover:bg-muted'
  }
  return <button className={clsx(base, styles[variant], className)} {...props} />
}

