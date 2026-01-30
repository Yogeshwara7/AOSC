import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Github, Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/ao-sc', label: 'GitHub' },
  // { icon: Twitter, href: 'https://twitter.com/aosc_dev', label: 'Twitter' },
  // { icon: Linkedin, href: 'https://linkedin.com/company/aosc', label: 'LinkedIn' },
  // { icon: Instagram, href: 'https://instagram.com/aosc_dev', label: 'Instagram' },
  
];

const quickLinks = [
  { name: 'Projects', page: 'Projects' },
  { name: 'Team', page: 'Team' },
  { name: 'Events', page: 'Events' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10"
                fill="none"
              >
                <path
                  d="M8 20C8 12 14 8 20 8C26 8 32 12 32 20C32 28 26 32 20 32"
                  stroke="url(#footerGradient1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M16 20C16 16 18 14 20 14C22 14 24 16 24 20C24 24 22 26 20 26"
                  stroke="url(#footerGradient2)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="footerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="footerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                AOSC
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A students led open-source community for building, learning, and sharing through projects and workshops.
            </p>
            <p className="text-slate-500 text-xs mt-4 font-mono">
              Mangalore, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-300"></h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    to={createPageUrl(link.page)}
                    className="text-slate-400 hover:text-white transition-colors text-sm cursor-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-300">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-500 transition-all duration-300 cursor-hover"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
              {/* <Mail className="w-4 h-4" />
              <a href="mailto:hello@aosc.org.in" className="hover:text-white transition-colors cursor-hover">
                hello@aosc.org.in
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Alva's Open Source Community. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
           COMMIT. MERGE. EVOLVE
          </p>
        </div>
     </div>
    </footer>
  );
}