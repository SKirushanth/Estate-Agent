import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: "Home", target: "hero" },
      { label: "Properties", target: "properties" },
      { label: "Contact", target: "contact" },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;
  const baseTextColor = isTransparent ? "text-white" : "text-slate-800";

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (targetId) => {
    if (pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        scrollToSection(targetId);
      }, 180);
      return;
    }

    scrollToSection(targetId);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/92 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold transition-colors duration-300 ${baseTextColor}`}
        >
          <Home className="w-8 h-8" />
          <span>Prestige</span>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => handleNavClick(link.target)}
              className={`text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-80 ${baseTextColor}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block w-10" aria-hidden="true" />

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
              isTransparent
                ? "text-white bg-white/15"
                : "text-slate-700 bg-slate-100"
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 p-4 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg border border-slate-100 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => {
                handleNavClick(link.target);
                setIsMenuOpen(false);
              }}
              className="w-full text-left text-sm font-semibold text-slate-700 py-2 px-1 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
