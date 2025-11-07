import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import ContentBlock from "./ContentBlock";
import type { ContentBlock as ContentBlockType } from "@/data/mockData";

interface ContentSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  blocks: ContentBlockType[];
  onCanvaLinkChange: (id: string, link: string) => void;
  onDeleteBlock: (id: string) => void;
}

export default function ContentSidebar({
  isOpen,
  onToggle,
  blocks,
  onCanvaLinkChange,
  onDeleteBlock,
}: ContentSidebarProps) {
  const groupedBlocks = blocks.reduce((acc, block) => {
    const date = format(parseISO(block.scheduledDate), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(block);
    return acc;
  }, {} as Record<string, ContentBlockType[]>);

  const sortedDates = Object.keys(groupedBlocks).sort();

  return (
    <div
      className={`
        bg-sidebar border-l border-sidebar-border h-screen transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'w-80' : 'w-0'}
      `}
      data-testid="content-sidebar"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-4 -translate-x-1/2 bg-card border shadow-sm z-10 hover-elevate"
        onClick={onToggle}
        data-testid="button-toggle-sidebar"
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      {isOpen && (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-semibold text-sidebar-foreground">All Content</h2>
            <p className="text-sm text-muted-foreground">{blocks.length} items</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {sortedDates.map((date) => (
              <div key={date} className="mb-6">
                <div className="sticky top-0 bg-sidebar py-2 mb-3 z-10">
                  <h3 className="text-sm font-semibold text-sidebar-foreground">
                    {format(parseISO(date), 'EEEE, MMM d')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {groupedBlocks[date]
                    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
                    .map((block) => (
                      <ContentBlock
                        key={block.id}
                        block={block}
                        showActions={true}
                        onCanvaLinkChange={onCanvaLinkChange}
                        onDelete={onDeleteBlock}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
