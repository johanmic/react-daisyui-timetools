import React from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral text-neutral-content py-6">
      <div className="container mx-auto text-center">
        <ul className="flex justify-center space-x-6 mb-2">
          <li>
            <a
              href="https://github.com/johanmic/react-daisyui-timetools"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.npmjs.com/package/react-daisyui-timetools"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              NPM
            </a>
          </li>
          <li>
            <a
              href="https://bsky.app/profile/jojomic.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Bluesky
            </a>
          </li>
        </ul>
        <p className="text-sm">&copy; {currentYear} Built with Docusaurus.</p>
      </div>
    </footer>
  )
}
