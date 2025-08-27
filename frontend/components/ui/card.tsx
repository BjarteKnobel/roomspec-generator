import { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx('rounded-lg border bg-card text-card-foreground shadow-sm', props.className)} />
}
export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx('flex flex-col space-y-1.5 p-6', props.className)} />
}
export function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={clsx('text-2xl font-semibold leading-none tracking-tight', props.className)} />
}
export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx('p-6 pt-0', props.className)} />
}

