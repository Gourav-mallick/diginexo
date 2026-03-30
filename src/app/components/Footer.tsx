import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Mail, Heart, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { scrollToSection } from '../../utils/helpers';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Case Studies', href: 'projects' },
    { label: 'Services', href: 'services' },
    { label: 'Proposal', href: 'proposal' },
    { label: 'Contact', href: 'contact' },
  ];

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.social.github, label: 'GitHub' },
    { icon: Linkedin, href: PERSONAL_INFO.social.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: PERSONAL_INFO.social.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            {/* diginexo.in logo */}
            <a
              href="https://diginexo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mb-3 group"
            >
              <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                diginexo
              </span>
              <span className="text-2xl font-extrabold text-gray-500 group-hover:text-cyan-400 transition-colors duration-200">
                .in
              </span>
            </a>
            <p className="text-gray-400 mb-3 text-sm">
              {PERSONAL_INFO.tagline}
            </p>
            <p className="text-sm text-gray-500">
              Building exceptional digital experiences with clean code and modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            {/* Also available at diginexo.in */}
            <a
              href="https://diginexo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-cyan-500/50 rounded-lg transition-all duration-200 group"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors">
                Also available at
              </span>
              <span className="text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                diginexo.in
              </span>
              <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-cyan-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-500">
              © {currentYear}{' '}
              <a
                href="https://diginexo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                diginexo.in
              </a>
              {' '}· All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a
                href="https://diginexo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                diginexo.in
              </a>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> in India
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}