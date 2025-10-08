"use client"
import { PortableText } from "@portabletext/react"

export default function RichText({ value }: { value: any }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <PortableText value={value} />
    </div>
  )
}
