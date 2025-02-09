import { IconBrandGithub, IconBrandLinkedin, IconLink, IconMail } from "@tabler/icons-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-background text-white mt-auto py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-2">
          {/* Social Icons */}
          <Link
            href="https://github.com/AchrefHASNI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 text-black dark:text-white dark:hover:text-purple-400 transition duration-300"
          >
            <IconBrandGithub size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/achref-hasni-688b4b230/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 text-black dark:text-white dark:hover:text-purple-400 transition duration-300"
          >
            <IconBrandLinkedin size={24} />
          </Link>
          <Link
            href="https://www.achrefhasni.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 text-black dark:text-white dark:hover:text-purple-400 transition duration-300"
          >
            <IconLink size={24} />
          </Link>
          <Link
            href="mailto:achref11hasni@gmail.com"
            className="hover:text-purple-400 text-black dark:text-white dark:hover:text-purple-400 transition duration-300"
          >
            <IconMail size={24} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Achref Hasni. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

