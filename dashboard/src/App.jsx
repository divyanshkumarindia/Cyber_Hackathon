import { useState } from 'react';
import { Shield, Activity, Globe, Database } from 'lucide-react';
import TransactionVisualizer from './components/TransactionVisualizer';
import PhishingAnalyzer from './components/PhishingAnalyzer';
import OSINTHub from './components/OSINTHub';

function App() {
  const [activeTab, setActiveTab] = useState('financial');

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Shield className="logo-icon" size={24} />
          <span>CyberTrail OS</span>
        </div>
        
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activeTab === 'financial' ? 'active' : ''}`}
            onClick={() => setActiveTab('financial')}
          >
            <Activity size={18} />
            <span>Financial Forensics</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'phishing' ? 'active' : ''}`}
            onClick={() => setActiveTab('phishing')}
          >
            <Globe size={18} />
            <span>Phishing Forensics</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'osint' ? 'active' : ''}`}
            onClick={() => setActiveTab('osint')}
          >
            <Database size={18} />
            <span>OSINT Directory</span>
          </div>
        </nav>

        <div style={{ marginTop: 'auto', padding: '0.75rem 0.5rem', borderTop: 'var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          <div>Haryana Police Cyber Cell</div>
          <div style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem' }}>Portal v1.0 • Hackathon Edition</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <h1>
            {activeTab === 'financial' && 'Financial Transaction Forensics'}
            {activeTab === 'phishing' && 'Phishing Link & Domain Forensics'}
            {activeTab === 'osint' && 'OSINT Resource Directory'}
          </h1>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Haryana Police Cyber Division
          </div>
        </header>

        {/* Dynamic Views */}
        {activeTab === 'financial' && <TransactionVisualizer />}
        {activeTab === 'phishing' && <PhishingAnalyzer />}
        {activeTab === 'osint' && <OSINTHub />}
      </main>
    </div>
  );
}

export default App;
