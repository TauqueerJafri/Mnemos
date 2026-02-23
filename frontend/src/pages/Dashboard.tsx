import { useState } from 'react';
import { FileText, Youtube, Twitter, Share2, X } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { ShareModal } from '../components/ui/ShareModal';

export default function Dashboard() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] font-sans text-gray-100 selection:bg-blue-500/30 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Background glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <Header onShareClick={() => setIsShareModalOpen(true)} />

        <div className="flex-1 overflow-y-auto p-8 pt-0 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card hoverColor="blueLight">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a1a1a] rounded-lg text-gray-400 group-hover:text-blue-300 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">Project Ideas</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"><Share2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-gray-500 hover:text-blue-300 hover:bg-blue-500/10 rounded-md transition-colors"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-50 transition-colors">Future Projects</h3>
              <ul className="space-y-3 text-gray-400 mb-8">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                  <span>Build a personal knowledge base</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                  <span>Create a habit tracker</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                  <span>Design a minimalist todo app</span>
                </li>
              </ul>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  <Tag color="blueLight">#productivity</Tag>
                  <Tag color="blueLight">#ideas</Tag>
                </div>
                <p className="text-xs text-gray-600">10/03/2024</p>
              </div>
            </Card>

            {/* Card 2 */}
            <Card hoverColor="blueDeep">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a1a1a] rounded-lg text-gray-400 group-hover:text-blue-500 transition-colors">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">How to Build a Second Brain</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"><Share2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-gray-500 hover:text-blue-300 hover:bg-blue-500/10 rounded-md transition-colors"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl h-40 mb-6 flex items-center justify-center border border-gray-800/50 group-hover:border-blue-600/20 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent" />
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-white border-b-[6px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  <Tag color="blueDeep">#productivity</Tag>
                  <Tag color="blueDeep">#learning</Tag>
                </div>
                <p className="text-xs text-gray-600">09/03/2024</p>
              </div>
            </Card>

            {/* Card 3 */}
            <Card hoverColor="blue">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a1a1a] rounded-lg text-gray-400 group-hover:text-blue-400 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">Productivity Tip</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"><Share2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-gray-500 hover:text-blue-300 hover:bg-blue-500/10 rounded-md transition-colors"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-2 -top-2 text-4xl text-gray-800 font-serif">"</div>
                <p className="text-gray-300 mb-8 leading-relaxed relative z-10 pl-4 border-l-2 border-gray-800 group-hover:border-blue-500/50 transition-colors">
                  The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  <Tag color="blue">#productivity</Tag>
                  <Tag color="blue">#learning</Tag>
                </div>
                <p className="text-xs text-gray-600">08/03/2024</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}
