import { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function ScrollArea(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx('overflow-auto', props.className)} />
}

