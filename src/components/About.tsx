import React from 'react';

const About: React.FC = () => {
  return (
    <section className="p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-green-300 font-mono tracking-wide">About — CCNA & Security</h1>
          <p className="mt-2 text-sm text-gray-400 font-mono">Network & Security Engineer • Infrastructure Automation • Security Tooling</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: descriptive panel */}
          <div className="md:col-span-2 bg-gradient-to-br from-black/70 to-gray-900/60 border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg text-green-200 font-semibold mb-3 font-mono">Profile</h2>
            <div className="space-y-3 text-gray-200 font-mono text-sm">
              <p className="text-green-100">CCNA-certified Network &amp; Security Engineer</p>

              <p>Expertise in designing and securing enterprise networks using Cisco technologies and Windows Server 2016/2019.</p>

              <p>Proficient in Python scripting for infrastructure automation, bulk user management, and custom security tool development.</p>

              <p>Skilled in network analysis (Wireshark, Nmap), web vulnerability scanning (Burp Suite), and full-stack development (React, Node.js).</p>

              <p>Actively developing skills in AI/ML with TensorFlow and PyTorch to address future security challenges.</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-green-200 font-mono mb-2">Quick Information (developer mode)</h3>
              <pre className="bg-black/80 border border-green-500/20 rounded-md p-3 text-green-300 text-xs font-mono overflow-auto">
{`$credentials
  CCNA-certified Network & Security Engineer(2025)
  Oracle Cloud Data Management Associate & cloud Infrastructure Associate(2023),
  Google Analytic Certification(2023)

$tools
  Cisco  Windows Server 2016/2019  
  Wireshark  Nmap  BurpSuite  
  Express.js  C  Java  Python  React  Node.js  SQL  
  TensorFlow  PyTorch
  `}
              </pre>
            </div>
          </div>

          {/* Right: skills / tools badges */}
          <aside className="bg-black/70 border border-green-500/10 rounded-lg p-4">
            <h3 className="text-sm text-green-200 font-mono mb-3">Tools & Technologies</h3>
            <ul className="flex flex-wrap gap-2">
              {[
                'Cisco',
                'Windows Server 2016/2019',
                'Wireshark',
                'Nmap',
                'Burp Suite',
                'Python',
                'React',
                'Node.js',
                'Express.js',
                'C',
                'Java',
                'SQL',
                'TensorFlow',
                'PyTorch'
              ].map((t) => (
                <li key={t} className="px-3 py-1 bg-green-900/10 border border-green-500/20 text-green-200 text-xs rounded-full font-mono">{t}</li>
              ))}
            </ul>

            <div className="mt-4 text-xs text-gray-400 font-mono">
              <div className="mb-2"><strong className="text-green-200">Primary:</strong> Network Design, Security Hardening, Automation</div>
              <div><strong className="text-green-200">Secondary:</strong> Web Dev, ML experimentation, Tooling</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
