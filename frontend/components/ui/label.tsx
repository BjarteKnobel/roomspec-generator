import { LabelHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={clsx('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.className)} />
}

