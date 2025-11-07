import { GripVertical, Camera, Video, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ContentBlock as ContentBlockType } from "@/data/mockData";

interface ContentBlockProps {
  block: ContentBlockType;
  onCanvaLinkChange?: (id: string, link: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  isDragging?: boolean;
}

export default function ContentBlock({
  block,
  onCanvaLinkChange,
  onDelete,
  showActions = false,
  isDragging = false,
}: ContentBlockProps) {
  const typeColor = block.type === 'post' ? 'border-l-primary' : 'border-l-reel';
  const TypeIcon = block.type === 'post' ? Camera : Video;
  
  const statusConfig = {
    draft: { variant: 'secondary' as const, label: 'Draft' },
    scheduled: { variant: 'default' as const, label: 'Scheduled' },
    published: { variant: 'outline' as const, label: 'Published', className: 'bg-success/10 text-success border-success/20' },
  };

  const status = statusConfig[block.status];

  return (
    <div
      className={`
        bg-card rounded-lg border-l-4 ${typeColor} p-3 transition-all
        ${isDragging ? 'opacity-50' : 'hover:scale-[1.02] hover:shadow-md'}
        ${!showActions ? 'cursor-grab active:cursor-grabbing' : ''}
      `}
      data-testid={`content-block-${block.id}`}
    >
      <div className="flex items-start gap-2 mb-2">
        {!showActions && (
          <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        )}
        <TypeIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${block.type === 'post' ? 'text-primary' : 'text-reel'}`} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">{block.title}</h4>
        </div>
        <Badge 
          variant={status.variant}
          className={'className' in status ? status.className : undefined}
          data-testid={`status-${block.status}`}
        >
          {status.label}
        </Badge>
      </div>
      
      <div className="ml-6 space-y-1">
        <p className="text-xs text-muted-foreground">
          {format(new Date(block.scheduledDate), 'p')}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {block.description}
        </p>

        {showActions && (
          <div className="pt-2 space-y-2">
            <Input
              type="url"
              placeholder="Add Canva link…"
              value={block.canvaLink}
              onChange={(e) => onCanvaLinkChange?.(block.id, e.target.value)}
              className="text-xs h-8"
              data-testid="input-canva-link"
            />
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => console.log('Edit', block.id)}
                data-testid="button-edit"
              >
                <Pencil className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-destructive hover:text-destructive"
                onClick={() => onDelete?.(block.id)}
                data-testid="button-delete"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
