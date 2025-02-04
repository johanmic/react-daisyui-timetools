import React from "react"
import Link from "@docusaurus/Link"
import { useThemeConfig } from "@docusaurus/theme-common"

interface FooterLinkItem {
  label: string
  href?: string
  to?: string
}

interface FooterLinkGroup {
  items: FooterLinkItem[]
}

interface FooterConfig {
  links: FooterLinkGroup[]
  copyright?: string
}

export default function Footer(): JSX.Element {
  const { footer } = useThemeConfig() as { footer: FooterConfig }
  if (!footer) return null
  const { links, copyright } = footer

  // Flatten all link groups so the links appear in a single horizontal row.
  const allItems = links.reduce(
    (acc, linkGroup) => [...acc, ...linkGroup.items],
    [] as FooterLinkItem[]
  )

  return (
    <footer className="bg-neutral text-neutral-content py-6">
      <div className="container mx-auto text-center">
        {allItems.length > 0 && (
          <ul className="flex flex-row justify-center space-x-6 mb-2">
            {allItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href ?? item.to ?? "#"}
                  className="hover:underline"
                  {...(item.href
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {copyright && (
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: copyright }}
          />
        )}
      </div>
    </footer>
  )
}
