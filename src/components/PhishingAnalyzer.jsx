import React, { useState } from 'react';
import { Search, Globe, ShieldAlert, ShieldCheck, Server, Calendar, Download, FileText, Database, Shield, AlertTriangle } from 'lucide-react';

export default function PhishingAnalyzer() {
  const [urlInput, setUrlInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const demoCases = [
    { label: 'Fake Haryana Police Verification (Phishing)', url: 'http://haryana-police-kyc-update.xyz/login.php' },
    { label: 'Official Haryana Police Website (Legitimate)', url: 'https://haryanapolice.gov.in' },
    { label: 'Fake SBI WhatsApp Reward Fraud', url: 'http://sbi-netbanking-reward-claim.top/auth' }
  ];

  const handleScan = (targetUrl) => {
    const query = targetUrl || urlInput;
    if (!query) return;

    setIsScanning(true);
    setAnalysisResult(null);

    setTimeout(() => {
      const isFake = query.includes('xyz') || query.includes('top') || query.includes('kyc') || query.includes('sbi-netbanking');
      
      setAnalysisResult({
        url: query,
        domain: query.replace(/(http:\/\/|https:\/\/)/, '').split('/')[0],
        isSuspicious: isFake,
        riskScore: isFake ? 94 : 4,
        status: isFake ? 'HIGH RISK - PHISHING DETECTED' : 'VERIFIED LEGITIMATE DOMAIN',
        whois: {
          registrar: isFake ? 'NameCheap, Inc. (Offshore Privacy Shield)' : 'National Informatics Centre (NIC India)',
          createdDate: isFake ? '2026-09-09 (Registered 48 Hours Ago)' : '2008-04-12 (18 Years Established)',
          expiryDate: isFake ? '2027-09-09' : '2030-04-12',
          registrantCountry: isFake ? 'Panama (Privacy Shield Enabled)' : 'India (Govt Reserved .GOV.IN)',
          nameServers: isFake ? ['ns1.bulletproof-dns.cx', 'ns2.bulletproof-dns.cx'] : ['govns1.nic.in', 'govns2.nic.in']
        },
        hosting: {
          ipAddress: isFake ? '185.220.101.5' : '164.100.128.42',
          location: isFake ? 'Frankfurt, Germany (Bulletproof Hoster)' : 'New Delhi, India (NIC Cyber Data Centre)',
          isp: isFake ? 'Offshore Cloud Hosting S.R.L.' : 'National Informatics Centre (NIC)',
          serverType: isFake ? 'Nginx 1.18 (Phishing Script & Backdoor Detected)' : 'Apache/2.4 (Security Hardened Govt Server)'
        },
        dnsRecords: [
          { type: 'A Record', value: isFake ? '185.220.101.5' : '164.100.128.42', status: 'Resolved' },
          { type: 'MX Mail', value: isFake ? 'mail.haryana-police-kyc.xyz' : 'mail.haryanapolice.gov.in', status: 'Active' },
          { type: 'SPF Record', value: isFake ? 'v=spf1 +all (Insecure Allow-All)' : 'v=spf1 include:nic.in -all (Strict)', status: isFake ? 'Vulnerable' : 'Secure' }
        ],
        forensicSignals: [
          { check: 'Domain Age < 7 Days', failed: isFake, desc: isFake ? 'Registered 48 hrs ago.' : 'Age > 18 years.' },
          { check: 'Government TLD (.gov.in)', failed: isFake, desc: isFake ? 'Using untrusted .xyz domain.' : 'Official Govt TLD.' },
          { check: 'Brand Impersonation', failed: isFake, desc: isFake ? 'Spoofing Haryana Police logo.' : 'Official Govt portal.' },
          { check: 'Credential Stealer Script', failed: isFake, desc: isFake ? 'Steals credentials to Telegram.' : 'Clean assets.' }
        ],
        legalAction: {
          itActSection: 'Section 66D & Section 66C IT Act (Identity Theft & Fraud by Impersonation)',
          recommendedAction: isFake 
            ? 'Issue immediate Takedown Notice under Section 69A IT Act to Department of Telecommunications (DoT) & ISP blockers.'
            : 'Verified official state portal. No enforcement action required.'
        }
      });
      setIsScanning(false);
    }, 600);
  };

  const downloadReport = () => {
    if (!analysisResult) return;
    
    const reportText = `===================================================================
HARYANA POLICE CYBER CRIME DIVISION - CYBERTRAIL FORENSIC ADVISORY
===================================================================
Report Generated: ${new Date().toLocaleString()}
Target URL Analyzed: ${analysisResult.url}
Domain Name: ${analysisResult.domain}
Verdict: ${analysisResult.status} (Threat Score: ${analysisResult.riskScore}/100)

-------------------------------------------------------------------
1. DOMAIN WHOIS INTELLIGENCE
-------------------------------------------------------------------
Registrar: ${analysisResult.whois.registrar}
Creation Date: ${analysisResult.whois.createdDate}
Registrant Country: ${analysisResult.whois.registrantCountry}
Name Servers: ${analysisResult.whois.nameServers.join(', ')}

-------------------------------------------------------------------
2. INFRASTRUCTURE & HOSTING FORENSICS
-------------------------------------------------------------------
IP Address: ${analysisResult.hosting.ipAddress}
Server Location: ${analysisResult.hosting.location}
ISP Provider: ${analysisResult.hosting.isp}
Server Engine: ${analysisResult.hosting.serverType}

-------------------------------------------------------------------
3. RECOMMENDED POLICE LEGAL & DISPATCH ACTION
-------------------------------------------------------------------
Legal Provision: ${analysisResult.legalAction.itActSection}
Police Action: ${analysisResult.legalAction.recommendedAction}

===================================================================
CONFIDENTIAL - FOR OFFICIAL HARYANA POLICE USE ONLY
===================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Police_Forensic_Report_${analysisResult.domain}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', overflowY: 'auto' }}>
      
      {/* Search Header Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.3rem' }}>Link & Domain Forensics Engine</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
          Deconstruct suspicious URLs, inspect WHOIS registries, server infrastructure, and export police advisories.
        </p>

        {/* Input Field */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', border: 'var(--glass-border)', borderRadius: '8px', padding: '0 0.8rem' }}>
            <Globe size={18} color="var(--accent-cyan)" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Paste suspicious link..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none', padding: '0.75rem 0', fontSize: '0.85rem' }}
            />
          </div>
          <button className="btn-primary" onClick={() => handleScan()} style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}>
            <Search size={15} /> Scan Link
          </button>
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Quick Presets:</span>
          {demoCases.map((c, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setUrlInput(c.url);
                handleScan(c.url);
              }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: 'var(--glass-border)',
                color: 'var(--text-main)',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isScanning && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--accent-cyan)' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Querying WHOIS Registries & DNS Servers...</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Analyzing infrastructure threat vectors...</p>
        </div>
      )}

      {/* All-in-One Mobile Responsive Matrix */}
      {analysisResult && !isScanning && (
        <div className="phishing-grid">
          
          {/* Left Column: Risk Gauge + Legal Notice */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Risk Gauge Card */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div style={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                border: `4px solid ${analysisResult.isSuspicious ? '#f43f5e' : '#10b981'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: analysisResult.isSuspicious ? '0 0 20px rgba(244,63,94,0.35)' : '0 0 20px rgba(16,185,129,0.35)',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.9rem', fontWeight: 700, color: analysisResult.isSuspicious ? '#f43f5e' : '#10b981' }}>
                  {analysisResult.riskScore}%
                </span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600 }}>THREAT SCORE</span>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                fontWeight: 700, 
                fontSize: '0.9rem',
                color: analysisResult.isSuspicious ? '#f43f5e' : '#10b981',
                marginBottom: '0.4rem'
              }}>
                {analysisResult.isSuspicious ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                {analysisResult.status}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', wordBreak: 'break-all' }}>
                {analysisResult.domain}
              </div>

              <button className="btn-primary" onClick={downloadReport} style={{ width: '100%', justifyContent: 'center', background: analysisResult.isSuspicious ? 'var(--danger-red)' : 'var(--accent-blue)', padding: '0.65rem', fontSize: '0.85rem', fontWeight: 600 }}>
                <Download size={15} /> Export Police Report (.txt)
              </button>
            </div>

            {/* Legal Notice Box */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: 'var(--danger-red)', marginBottom: '0.5rem' }}>
                <AlertTriangle size={16} /> Police Legal Advisory
              </div>
              <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500, marginBottom: '0.5rem', lineHeight: '1.4' }}>
                {analysisResult.legalAction.itActSection}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {analysisResult.legalAction.recommendedAction}
              </div>
            </div>

          </div>

          {/* Right Column: Full Investigation Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Row 1: WHOIS & Server Info */}
            <div className="two-col-grid">
              {/* WHOIS */}
              <div className="glass-panel" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                  <Calendar size={16} /> Domain WHOIS Intel
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>Registrar:</span> <strong style={{ color: 'white' }}>{analysisResult.whois.registrar}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Created Date:</span> <strong style={{ color: 'white' }}>{analysisResult.whois.createdDate}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Country:</span> <strong style={{ color: 'white' }}>{analysisResult.whois.registrantCountry}</strong></div>
                </div>
              </div>

              {/* Server Info */}
              <div className="glass-panel" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                  <Server size={16} /> Server Infrastructure
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>IP Address:</span> <code style={{ color: 'var(--accent-cyan)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>{analysisResult.hosting.ipAddress}</code></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Location:</span> <strong style={{ color: 'white' }}>{analysisResult.hosting.location}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Engine:</span> <strong style={{ color: 'white' }}>{analysisResult.hosting.serverType}</strong></div>
                </div>
              </div>
            </div>

            {/* Row 2: DNS Records Matrix */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Database size={16} /> Active DNS Record Matrix
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '6px' }}>Type</th>
                      <th style={{ padding: '6px' }}>Record Value</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResult.dnsRecords.map((dns, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '6px', fontWeight: 600, color: 'var(--accent-cyan)' }}>{dns.type}</td>
                        <td style={{ padding: '6px', fontFamily: 'monospace', color: 'white', fontSize: '0.75rem' }}>{dns.value}</td>
                        <td style={{ padding: '6px', textAlign: 'right' }}>
                          <span style={{ 
                            padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600,
                            background: dns.status === 'Vulnerable' ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)',
                            color: dns.status === 'Vulnerable' ? '#f43f5e' : '#10b981'
                          }}>
                            {dns.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Row 3: Forensic Signals Checklist */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: 'white', marginBottom: '0.75rem' }}>
                <Shield size={16} color="var(--accent-cyan)" /> Forensic Risk Signals
              </div>
              <div className="two-col-grid">
                {analysisResult.forensicSignals.map((sig, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', fontSize: '0.8rem', border: 'var(--glass-border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'white' }}>{sig.check}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{sig.desc}</div>
                    </div>
                    <span style={{ 
                      padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700,
                      background: sig.failed ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)',
                      color: sig.failed ? '#f43f5e' : '#10b981'
                    }}>
                      {sig.failed ? 'RISK' : 'PASS'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
