import { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({ onCheckedChange, ...props }: Props) {
  return (
    <input
      type="checkbox"
      {...props}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-4 w-4 rounded border border-border"
    />
  )
}

