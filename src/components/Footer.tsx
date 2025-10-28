'use client';

import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // 30 Computer Science Puns - one for each day of the month
  const csPuns = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "I would tell you a UDP joke, but you might not get it. 📡",
    "There are 10 types of people: those who understand binary and those who don't. 💻",
    "Why do Java developers wear glasses? Because they can't C#! 👓",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I JOIN you?' 🍺",
    "Why did the programmer quit? They didn't get arrays! 📊",
    "What's a pirate's favorite programming language? Arrr! (R) 🏴‍☠️",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25! 🎃",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
    "Why was the JavaScript developer sad? They didn't know how to 'null' their feelings. 😢",
    "What did the router say to the doctor? It hurts when IP! 🏥",
    "Why do programmers hate nature? It has too many bugs! 🌳",
    "A programmer's spouse: 'Go to the store and get a gallon of milk, if they have eggs, get 12.' Returns with 12 gallons of milk. 🥛",
    "Why did the developer go broke? They used up all their cache! 💸",
    "What's a programmer's favorite hangout? The Foo Bar! 🍹",
    "Why do Python programmers prefer snakes? They're always in sync! 🐍",
    "How do you comfort a JavaScript bug? You console it! 🎮",
    "Why did the CSS file break up with HTML? It wanted more class! 💔",
    "What do you call 8 hobbits? A hobbyte! 🧙",
    "Why do programmers prefer iOS development? Because on Android, there are too many activities! 📱",
    "What's a database admin's favorite band? The Tables! 🎸",
    "Why was the function sad? It had no class! 📚",
    "What do you call a programmer from Finland? Nerdic! 🇫🇮",
    "Why do programmers get confused between Halloween and Christmas? Because Oct 31 = Dec 25! 🎅",
    "How do you generate a random string? Put a Windows user in front of vim! ⌨️",
    "Why did the developer stay calm? They knew how to handle exceptions! 🧘",
    "What's an algorithm's favorite dance? The log-rhythm! 💃",
    "Why don't programmers like to go outside? The graphics are great, but the gameplay is terrible! 🎮",
    "What do you call a programmer who doesn't comment their code? An enemy of future you! 📝",
    "Why did the data scientist get a pet? They needed more pandas! 🐼"
  ];
  
  // Get day of month (1-30, if day is 31, show day 30's pun)
  const dayOfMonth = new Date().getDate();
  const punIndex = Math.min(dayOfMonth, 30) - 1;
  const todaysPun = csPuns[punIndex];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/lostmartian', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lostmartian/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sahilgangurde08@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 dark:from-black dark:via-[#0a0a0f] dark:to-[#0f0f17] text-white overflow-hidden">
      {/* Glass orbs background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="glass-orb w-64 h-64 top-10 left-10 float-animation" style={{ animationDelay: '0s' }}></div>
        <div className="glass-orb w-48 h-48 bottom-20 right-20 float-animation" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-elegant font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Sahil
            </h3>
            <p className="text-gray-300 font-body leading-relaxed">
              Crafting elegant digital solutions with modern technologies and timeless design principles.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold text-blue-300">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/experience', label: 'Experience' },
                { href: '/projects', label: 'Projects' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 font-body hover:translate-x-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold text-blue-300">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl transition-all duration-300 group hover:scale-110 border border-white/10"
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 font-body text-sm">
              © {currentYear} Sahil. All rights reserved.
            </p>
            <div className="flex items-center justify-center text-gray-300 font-body text-sm italic">
              <span className="text-center">{todaysPun}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
