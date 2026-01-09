
import React, { useState, useMemo } from 'react';
import { SalesItem, SalesStatus, SalesSummary } from './types';
import { INITIAL_DATA, STATUS_CONFIG, CATEGORY_COLORS } from './constants';
import StatCard from './components/StatCard';
import SalesChart from './components/SalesChart';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [items, setItems] = useState<SalesItem[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<SalesStatus | 'All'>('All');
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const summaries: SalesSummary[] = useMemo(() => {
    return Object.values(SalesStatus).map(status => ({
      status,
      count: items.filter(item => item.status === status).length,
      color: STATUS_CONFIG[status].color,
      icon: STATUS_CONFIG[status].icon
    }));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return items;
    return items.filter(item => item.status === activeTab);
  }, [items, activeTab]);

  // Group items by category if we are in a specific tab that uses categories (like F/U)
  const groupedItems = useMemo(() => {
    if (activeTab !== SalesStatus.FOLLOW_UP) return null;
    
    const groups: Record<string, SalesItem[]> = {};
    filteredItems.forEach(item => {
      const cat = item.category || 'Uncategorized';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [filteredItems, activeTab]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const insight = await geminiService.analyzeReport(items);
      setAiInsight(insight);
    } catch (err) {
      setAiInsight("Error generating analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportToSheets = () => {
    const headers = ['ID', 'Status', 'Name', 'Category', 'Details'];
    const rows = items.map(item => [
      item.id,
      item.status,
      item.name,
      item.category || '-',
      item.details || '-'
    ].join('\t'));
    
    const tsvContent = [headers.join('\t'), ...rows].join('\n');

    navigator.clipboard.writeText(tsvContent).then(() => {
      const confirmOpen = window.confirm(
        "데이터가 클립보드에 복사되었습니다!\n\n'확인'을 누르면 새 구글 시트가 열립니다.\n[Ctrl+V]를 눌러 데이터를 붙여넣으세요."
      );
      if (confirmOpen) {
        window.open('https://sheets.new', '_blank');
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert("클립보드 복사에 실패했습니다.");
    });
  };

  const renderItemCard = (item: SalesItem) => (
    <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${STATUS_CONFIG[item.status].bg.replace('bg-', 'bg-opacity-50 ')}`} style={{ backgroundColor: STATUS_CONFIG[item.status].color }}></div>
      <div className="flex justify-between items-start mb-2 pl-2">
        <div className="flex flex-col gap-1">
           {item.category && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit ${CATEGORY_COLORS[item.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
              {item.category}
            </span>
          )}
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {item.status}
          </span>
        </div>
      </div>
      <h4 className="font-bold text-slate-800 text-lg mb-2 pl-2">{item.name}</h4>
      {item.details && (
        <div className="pl-2 mt-2 pt-2 border-t border-slate-50">
          <p className="text-sm text-slate-600 leading-relaxed">{item.details}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">SalesPro Dashboard</h1>
              <p className="text-xs text-slate-500">Weekly Performance Tracker</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleExportToSheets}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium text-sm"
              title="Copy data and open Google Sheets"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Google Sheets
            </button>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 font-medium text-sm"
            >
              {isAnalyzing ? 'Analyzing...' : 'Generate AI Insights'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {summaries.map(summary => (
            <StatCard 
              key={summary.status}
              label={summary.status}
              value={summary.count}
              icon={summary.icon}
              color={summary.color}
              bgColor={STATUS_CONFIG[summary.status].bg}
            />
          ))}
        </div>

        {/* Charts Section */}
        {/* Removed grid container so SalesChart takes full width and manages its own internal grid */}
        <div className="w-full">
           <SalesChart data={summaries} />
        </div>
           
        {/* AI Insight Display - Moved below charts as a full-width section if active */}
        {aiInsight && (
             <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/></svg>
               </div>
               <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <span className="text-indigo-600">✨</span> Strategy & Insights
               </h3>
               <div className="prose prose-sm prose-indigo max-w-none text-slate-600 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                 <div dangerouslySetInnerHTML={{ __html: aiInsight.replace(/\n/g, '<br/>') }} />
               </div>
             </div>
        )}

        {/* List Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
             <h2 className="text-xl font-bold text-slate-800">Pipeline Details</h2>
             <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('All')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  View All
                </button>
                {Object.values(SalesStatus).map(status => (
                  <button 
                    key={status}
                    onClick={() => setActiveTab(status)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === status ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {status}
                  </button>
                ))}
             </div>
          </div>

          {/* Conditional Rendering: Grouped or Flat List */}
          {groupedItems ? (
            <div className="space-y-8 animate-fadeIn">
              {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-700 bg-slate-200 px-3 py-1 rounded-full">{category}</h3>
                    <span className="text-xs text-slate-400">({(catItems as SalesItem[]).length} items)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(catItems as SalesItem[]).map(renderItemCard)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
              {filteredItems.map(renderItemCard)}
            </div>
          )}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-slate-500 font-medium">No items found for this category.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
