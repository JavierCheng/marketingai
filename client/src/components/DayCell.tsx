import { format, isSameDay, isWeekend } from "date-fns";
import type { ContentBlock as ContentBlockType } from "@/data/mockData";
import ContentBlock from "./ContentBlock";

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  blocks: ContentBlockType[];
  onBlockClick?: (block: ContentBlockType) => void;
  isOver?: boolean;
}

export default function DayCell({
  date,
  isCurrentMonth,
  isToday,
  blocks,
  onBlockClick,
  isOver = false,
}: DayCellProps) {
  const isWeekendDay = isWeekend(date);

  return (
    <div
      className={`
        min-h-32 p-2 rounded-lg border transition-all
        ${isCurrentMonth ? 'bg-card' : 'bg-muted/30'}
        ${isWeekendDay && isCurrentMonth ? 'bg-muted/50' : ''}
        ${isOver ? 'bg-primary/5 border-primary border-dashed ring-2 ring-primary/20' : ''}
      `}
      data-testid={`day-cell-${format(date, 'yyyy-MM-dd')}`}
    >
      <div className="flex items-center justify-center mb-2">
        <span
          className={`
            text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
            ${!isCurrentMonth ? 'text-muted-foreground' : 'text-foreground'}
            ${isToday ? 'bg-primary text-primary-foreground' : ''}
          `}
          data-testid={isToday ? 'date-today' : undefined}
        >
          {format(date, 'd')}
        </span>
      </div>

      <div className="space-y-2">
        {blocks.map((block) => (
          <div key={block.id} onClick={() => onBlockClick?.(block)}>
            <ContentBlock block={block} />
          </div>
        ))}
      </div>
    </div>
  );
}
