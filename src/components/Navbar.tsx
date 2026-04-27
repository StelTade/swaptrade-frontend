"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";
import { useI18n } from "@/i18n/context";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useI18n();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.markets"), path: "/markets" },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.about"), path: "/about" },
  ];

  return (
    <nav
      className="bg-[var(--background)] shadow-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
              SwapTrade
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium ${
                  currentPath === link.path
                    ? "border-b-2 border-[var(--primary)]"
                    : ""
                }`}
                aria-current={currentPath === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Sign In Button and Dark Mode Toggle (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => (window.location.href = "/signin")}
              className="text-[var(--foreground)] border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
              aria-label={t("nav.signIn")}
            >
              {t("nav.signIn")}
            </button>
            <button
              onClick={toggleDarkMode}
              className="text-[var(--foreground)] hover:text-[var(--primary)] focus:outline-none"
              aria-label={t("nav.toggleDark")}
            >
              {isDarkMode ? (
                <BsSun className="h-6 w-6" />
              ) : (
                <BsMoon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[var(--foreground)] hover:text-[var(--primary)] focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label={t("nav.toggleMenu")}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={toggleDarkMode}
              className="text-[var(--foreground)] hover:text-[var(--primary)] focus:outline-none ml-2"
              aria-label={t("nav.toggleDark")}
            >
              {isDarkMode ? (
                <BsSun className="h-6 w-6" />
              ) : (
                <BsMoon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-[var(--background)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-[var(--foreground)] hover:text-[var(--primary)] block px-3 py-2 rounded-md text-base font-medium ${
                  currentPath === link.path ? "bg-gray-100" : ""
                }`}
                aria-current={currentPath === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                window.location.href = "/signin";
                setIsMenuOpen(false);
              }}
              className="text-[var(--foreground)] border border-gray-300 hover:bg-gray-100 w-full text-left px-3 py-2 rounded-md text-base font-medium"
              aria-label={t("nav.signIn")}
            >
              {t("nav.signIn")}
            </button>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
