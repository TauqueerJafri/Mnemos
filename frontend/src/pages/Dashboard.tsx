import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ShareModal } from '../components/features/ShareModal';
import { AddContentModal } from '../components/features/AddContentModal';

export default function Dashboard() {
  // State to control the share modal visibility
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] font-sans text-gray-100 selection:bg-blue-500/30 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Background glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <Header 
          onShareClick={() => setIsShareModalOpen(true)} 
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-8 pt-0 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card 
              title="Future Projects"
              link="https://docs.google.com/document/d/1..."
              type="documents"
              tags={['productivity', 'ideas']}
              date="10/03/2024"
              onShare={() => setIsShareModalOpen(true)}
              onDelete={() => console.log('Delete')}
            />

            {/* Card 2 */}
            <Card 
              title="How to Build a Second Brain"
              link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              type="videos"
              tags={['productivity', 'learning']}
              date="09/03/2024"
              onShare={() => setIsShareModalOpen(true)}
              onDelete={() => console.log('Delete')}
            />

            {/* Card 3 */}
            <Card 
              title="Productivity Tip"
              link="https://twitter.com/user/status/123..."
              type="tweets"
              tags={['productivity', 'learning']}
              date="08/03/2024"
              onShare={() => setIsShareModalOpen(true)}
              onDelete={() => console.log('Delete')}
            />

            {/* Card 4 */}
            <Card 
              title="Useful Resource"
              link="https://example.com/useful-resource"
              type="links"
              tags={['resource', 'web']}
              date="07/03/2024"
              onShare={() => setIsShareModalOpen(true)}
              onDelete={() => console.log('Delete')}
            />
          </div>
        </div>
      </main>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      <AddContentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
