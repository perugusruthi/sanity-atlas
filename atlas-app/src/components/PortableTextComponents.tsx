import React from 'react'
import {PortableTextReactComponents} from '@portabletext/react'

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
    h4: ({children}) => <h4 className="text-lg font-semibold mt-3 mb-2">{children}</h4>,
    normal: ({children}) => <p className="mb-4">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-1">{children}</li>,
    number: ({children}) => <li className="mb-1">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({children, value}) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
}

// Variant for compact display (used in smaller sections)
export const compactPortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>,
    h2: ({children}) => <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>,
    h3: ({children}) => <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>,
    normal: ({children}) => <p className="mb-3">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-300 pl-3 italic my-3 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc ml-4 mb-3">{children}</ul>,
    number: ({children}) => <ol className="list-decimal ml-4 mb-3">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-1">{children}</li>,
    number: ({children}) => <li className="mb-1">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({children, value}) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
}
