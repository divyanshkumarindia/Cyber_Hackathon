import React from 'react';
import { ExternalLink, Shield, Cpu, Lock, Search, FileCode } from 'lucide-react';

export default function OSINTHub() {
  const osintTools = [
    {
      title: 'VirusTotal & APK Certificate Extraction',
      category: 'APK & Mobile Fraud',
      desc: 'Upload suspicious WhatsApp APK files. Extract the Developer Signing Certificate MD5/SHA256 fingerprint to map all fake apps built by the same fraudster.',
      link: 'https://www.virustotal.com',
      badge: 'Case 1 Solution',
      guide: 'Police Guide: Upload APK -> View "Details" tab -> Copy "Signature SHA256". Match this against national cybercrime databases to find repeat offenders.'
    },
    {
      title: 'URLScan.io - Phishing Sandbox',
      category: 'Link Forensics',
      desc: 'Safely open suspicious links in a sandboxed cloud browser without risking police devices. Takes screenshots and captures network traffic.',
      link: 'https://urlscan.io',
      badge: 'Case 2 Solution',
      guide: 'Police Guide: Enter link -> Run scan -> View DOM snapshot & IP Connections -> Identify backend C2 server.'
    },
    {
      title: 'Shodan Cyber Intelligence',
      category: 'Infrastructure Tracing',
      desc: 'Search for servers, routers, and IP addresses used by cybercriminals. Finds open ports, database leaks, and server hostnames.',
      link: 'https://www.shodan.io',
      badge: 'OSINT Advanced',
      guide: 'Police Guide: Search offender IP address -> View open ports (e.g. Port 80, 22, 3389) -> Determine server operating system.'
    },
    {
      title: 'IPinfo & Geolocation Engine',
      category: 'IP Tracing',
      desc: 'Find the exact Internet Service Provider (ISP), ASN, and location details for any IP address involved in financial fraud.',
      link: 'https://ipinfo.io',
      badge: 'IP Lookup',
      guide: 'Police Guide: Paste IP -> Extract ISP details -> Issue Section 91 CrPC notice to ISP for subscriber details.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', overflowY: 'auto' }}>
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Haryana Police OSINT Intelligence Directory</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Curated reference hub of open-source intelligence tools tailored for investigating APK malware, phishing links, and money laundering.
        </p>
      </div>

      {/* Grid of Tools */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {osintTools.map((tool, index) => (
          <div key={index} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--accent-cyan)' }}>
                  {tool.badge}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tool.category}</span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'white' }}>{tool.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>{tool.desc}</p>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-main)', border: 'var(--glass-border)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--accent-purple)' }}>Investigation Steps: </strong>
                {tool.guide}
              </div>
            </div>

            <a 
              href={tool.link} 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary" 
              style={{ textDecoration: 'none', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: 'var(--glass-border)' }}
            >
              Access Resource <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
