import { useState } from 'react';
import ContentSidebar from '../ContentSidebar';
import { mockContentBlocks } from '@/data/mockData';

export default function ContentSidebarExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [blocks, setBlocks] = useState(mockContentBlocks);

  return (
    <div className="h-screen flex">
      <div className="flex-1 bg-background" />
      <ContentSidebar
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        blocks={blocks}
        onCanvaLinkChange={(id, link) => {
          setBlocks(blocks.map(b => b.id === id ? { ...b, canvaLink: link } : b));
        }}
        onDeleteBlock={(id) => {
          setBlocks(blocks.filter(b => b.id !== id));
        }}
      />
    </div>
  );
}
