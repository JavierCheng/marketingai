import { useState, useEffect } from "react";
import { format } from "date-fns";
import NavSidebar from "@/components/NavSidebar";
import CalendarView from "@/components/CalendarView";
import ContentSidebar from "@/components/ContentSidebar";
import CampaignModal from "@/components/CampaignModal";
import { useToast } from "@/hooks/use-toast";
import type { Campaign, ContentBlock } from "@/data/mockData";
import { mockCampaign, mockContentBlocks } from "@/data/mockData";

export default function CampaignPlanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [campaign, setCampaign] = useState<Campaign>(mockCampaign);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(mockContentBlocks);
  const { toast } = useToast();

  const handleCreateCampaign = (newCampaign: Campaign, newBlocks: ContentBlock[]) => {
    setCampaign(newCampaign);
    setContentBlocks(newBlocks);
    toast({
      title: "Campaign created!",
      description: `${newCampaign.title} has been created with ${newBlocks.length} content pieces.`,
    });
  };

  const handleBlockMove = (blockId: string, newDate: Date) => {
    setContentBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        const oldDate = new Date(block.scheduledDate);
        const scheduledDate = new Date(newDate);
        scheduledDate.setHours(oldDate.getHours(), oldDate.getMinutes(), 0, 0);
        
        toast({
          title: "Content moved",
          description: `Moved to ${format(scheduledDate, 'MMM d, yyyy')}`,
        });
        
        return { ...block, scheduledDate: scheduledDate.toISOString() };
      }
      return block;
    }));
  };

  const handleCanvaLinkChange = (id: string, link: string) => {
    setContentBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, canvaLink: link } : block
    ));
  };

  const handleDeleteBlock = (id: string) => {
    if (confirm('Are you sure you want to delete this content block?')) {
      setContentBlocks(prev => prev.filter(block => block.id !== id));
      toast({
        title: "Content deleted",
        description: "The content block has been removed.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <NavSidebar onCreateCampaign={() => setIsModalOpen(true)} />
      
      <CalendarView 
        blocks={contentBlocks}
        onBlockMove={handleBlockMove}
      />
      
      <ContentSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        blocks={contentBlocks}
        onCanvaLinkChange={handleCanvaLinkChange}
        onDeleteBlock={handleDeleteBlock}
      />

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  );
}
