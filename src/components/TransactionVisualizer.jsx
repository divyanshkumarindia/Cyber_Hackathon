import React, { useState } from 'react';
import Papa from 'papaparse';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Upload, Play, AlertTriangle, Database, Table, Network } from 'lucide-react';

const CustomNode = ({ data }) => {
  return (
    <div className={`custom-node layer-${data.layer}`}>
      <Handle type="target" position={Position.Left} style={{ background: '#38bdf8', width: 6, height: 6 }} />
      <div className="node-header">
        {data.layer === 1 && <AlertTriangle size={13} color="#f43f5e" />}
        {data.label}
      </div>
      <div className="node-sub">{data.id}</div>
      <div className="node-sub" style={{ fontSize: '10px', marginTop: '3px', color: data.layer === 1 ? '#f43f5e' : data.layer === 2 ? '#f59e0b' : '#10b981' }}>
        Layer {data.layer} Account
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#38bdf8', width: 6, height: 6 }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function TransactionVisualizer() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rawTransactions, setRawTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'graph', 'table'

  const processCSV = (csvText) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const transactions = results.data;
        setRawTransactions(transactions);
        buildGraph(transactions);
      }
    });
  };

  const buildGraph = (transactions) => {
    const newNodes = [];
    const newEdges = [];
    const accountMap = new Map();

    const layerX = { 1: 40, 2: 360, 3: 680 };
    const layerYCounts = { 1: 0, 2: 0, 3: 0 };

    transactions.forEach((txn, index) => {
      const { SenderAccount, SenderName, ReceiverAccount, ReceiverName, Amount, Date: txDate, Layer } = txn;
      const layerNum = parseInt(Layer, 10) || 1;

      // Sender Node
      if (!accountMap.has(SenderAccount)) {
        accountMap.set(SenderAccount, true);
        const yPos = (layerYCounts[layerNum] * 105) + 30;
        layerYCounts[layerNum]++;
        
        newNodes.push({
          id: SenderAccount,
          type: 'custom',
          position: { x: layerX[layerNum] || 40, y: yPos },
          data: { label: SenderName || SenderAccount, id: SenderAccount, layer: layerNum }
        });
      }

      // Receiver Node
      if (!accountMap.has(ReceiverAccount)) {
        accountMap.set(ReceiverAccount, true);
        const nextLayer = Math.min(layerNum + 1, 3);
        const yPos = (layerYCounts[nextLayer] * 105) + 30;
        layerYCounts[nextLayer]++;
        
        newNodes.push({
          id: ReceiverAccount,
          type: 'custom',
          position: { x: layerX[nextLayer] || 680, y: yPos },
          data: { label: ReceiverName || ReceiverAccount, id: ReceiverAccount, layer: nextLayer }
        });
      }

      // Edge Connection
      const formattedDate = txDate ? ` • ${txDate}` : '';
      newEdges.push({
        id: `e-${SenderAccount}-${ReceiverAccount}-${index}`,
        source: SenderAccount,
        target: ReceiverAccount,
        label: `₹${parseInt(Amount || 0).toLocaleString()}${formattedDate}`,
        animated: true,
        style: { stroke: '#38bdf8', strokeWidth: 1.5 },
        labelStyle: { fill: '#38bdf8', fontWeight: 600, fontSize: '10px' },
        labelBgStyle: { fill: '#0d0e12', fillOpacity: 0.9, rx: 4, ry: 4 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#38bdf8',
          width: 15,
          height: 15
        },
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
    setIsLoading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      processCSV(event.target.result);
    };
    reader.readAsText(file);
  };

  const loadMockData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/mock_transactions.csv');
      const csvText = await response.text();
      processCSV(csvText);
    } catch (err) {
      console.error("Failed to load mock data:", err);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      {/* Action Bar */}
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', padding: '0.9rem 1.1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Financial Transaction Matrix</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Map bank CSV statements into an automated account flow matrix.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '3px', borderRadius: '6px', border: 'var(--glass-border)' }}>
            <button 
              className="btn-primary" 
              style={{ 
                background: viewMode === 'split' ? 'var(--accent-blue)' : 'transparent', 
                boxShadow: 'none', padding: '5px 8px', fontSize: '0.75rem' 
              }}
              onClick={() => setViewMode('split')}
            >
              Split View
            </button>
            <button 
              className="btn-primary" 
              style={{ 
                background: viewMode === 'graph' ? 'var(--accent-blue)' : 'transparent', 
                boxShadow: 'none', padding: '5px 8px', fontSize: '0.75rem' 
              }}
              onClick={() => setViewMode('graph')}
            >
              <Network size={12} /> Graph
            </button>
            <button 
              className="btn-primary" 
              style={{ 
                background: viewMode === 'table' ? 'var(--accent-blue)' : 'transparent', 
                boxShadow: 'none', padding: '5px 8px', fontSize: '0.75rem' 
              }}
              onClick={() => setViewMode('table')}
            >
              <Table size={12} /> Table
            </button>
          </div>

          <button className="btn-primary" onClick={loadMockData} style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', boxShadow: 'none', padding: '5px 10px', fontSize: '0.75rem' }}>
            <Play size={13} /> Demo CSV
          </button>
          
          <label className="btn-primary" style={{ cursor: 'pointer', padding: '5px 10px', fontSize: '0.75rem' }}>
            <Upload size={13} /> Upload CSV
            <input 
              type="file" 
              accept=".csv" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload} 
            />
          </label>
        </div>
      </div>

      {/* Content Area using responsive split-view-grid */}
      <div className={viewMode === 'split' ? 'split-view-grid' : ''} style={{ flex: 1, display: viewMode !== 'split' ? 'flex' : undefined, minHeight: 0 }}>
        
        {/* Left Side: Table */}
        {(viewMode === 'split' || viewMode === 'table') && (
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '0.9rem', minHeight: '220px', flex: viewMode === 'table' ? 1 : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Table size={14} /> Bank Statement Records
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                {rawTransactions.length} Transactions
              </span>
            </div>

            {rawTransactions.length > 0 ? (
              <div style={{ overflowY: 'auto', flex: 1, maxHeight: '350px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '4px', width: '25%' }}>Date</th>
                      <th style={{ padding: '4px', width: '25%' }}>Sender</th>
                      <th style={{ padding: '4px', width: '25%' }}>Receiver</th>
                      <th style={{ padding: '4px', width: '25%', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawTransactions.map((tx, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '6px 4px', color: 'var(--text-muted)', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                          {tx.Date || '14 Sep 2023'}
                        </td>
                        <td style={{ padding: '6px 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 500 }}>{tx.SenderName}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{tx.SenderAccount}</div>
                        </td>
                        <td style={{ padding: '6px 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 500 }}>{tx.ReceiverName}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{tx.ReceiverAccount}</div>
                        </td>
                        <td style={{ padding: '6px 4px', textAlign: 'right', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                          ₹{parseInt(tx.Amount || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', minHeight: '100px' }}>
                Load demo data or upload a bank CSV file to inspect transactions.
              </div>
            )}
          </div>
        )}

        {/* Right Side: Graph */}
        {(viewMode === 'split' || viewMode === 'graph') && (
          <div className="glass-panel flow-graph-container" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', position: 'relative', flex: viewMode === 'graph' ? 1 : undefined, minHeight: '350px' }}>
            {isLoading ? (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
                Analyzing Account Flow Matrix...
              </div>
            ) : nodes.length > 0 ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
              >
                <Background color="#1b1e24" gap={16} />
                <Controls position="top-right" />
              </ReactFlow>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', minHeight: '150px' }}>
                <div style={{ textAlign: 'center' }}>
                  <Database size={32} style={{ opacity: 0.2, margin: '0 auto 0.5rem' }} />
                  <p>Click "Demo CSV" to render the Money Trail Flowchart.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
