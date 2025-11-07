import { useState } from "react";
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  parseISO,
  isSameDay,
  isWeekend
} from "date-fns";
import { ChevronLeft, ChevronRight, GripVertical, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import type { ContentBlock as ContentBlockType } from "@/data/mockData";

interface CalendarViewProps {
  blocks: ContentBlockType[];
  onBlockMove: (blockId: string, newDate: Date) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DraggableBlock({ block }: { block: ContentBlockType }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
  });

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
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        bg-card rounded-lg border-l-4 ${typeColor} p-3 cursor-grab active:cursor-grabbing
        transition-all
        ${isDragging ? 'opacity-50' : 'hover:scale-[1.02] hover:shadow-md'}
      `}
      data-testid={`content-block-${block.id}`}
    >
      <div className="flex items-start gap-2 mb-1">
        <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <TypeIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${block.type === 'post' ? 'text-primary' : 'text-reel'}`} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">{block.title}</h4>
        </div>
        <Badge 
          variant={status.variant}
          className={'className' in status ? status.className : undefined}
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
      </div>
    </div>
  );
}

function DroppableDay({ 
  date, 
  isCurrentMonth, 
  isToday, 
  blocks,
  isOver
}: {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  blocks: ContentBlockType[];
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: format(date, 'yyyy-MM-dd'),
  });

  const isWeekendDay = isWeekend(date);

  return (
    <div
      ref={setNodeRef}
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
          <DraggableBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}

export default function CalendarView({ blocks, onBlockMove }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeBlock, setActiveBlock] = useState<ContentBlockType | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => setCurrentMonth(new Date());

  const getBlocksForDay = (date: Date) => {
    return blocks.filter(block => 
      isSameDay(parseISO(block.scheduledDate), date)
    ).sort((a, b) => a.orderIndex - b.orderIndex);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const block = blocks.find(b => b.id === event.active.id);
    setActiveBlock(block || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const targetDate = parseISO(over.id as string);
      onBlockMove(active.id as string, targetDate);
    }

    setActiveBlock(null);
    setOverId(null);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              data-testid="button-prev-month"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={handleToday}
              data-testid="button-today"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              data-testid="button-next-month"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const dayBlocks = getBlocksForDay(day);
              const dateKey = format(day, 'yyyy-MM-dd');
              
              return (
                <DroppableDay
                  key={dateKey}
                  date={day}
                  isCurrentMonth={isSameMonth(day, currentMonth)}
                  isToday={isToday(day)}
                  blocks={dayBlocks}
                  isOver={overId === dateKey}
                />
              );
            })}
          </div>
        </div>

        <DragOverlay>
          {activeBlock ? (
            <div className="opacity-80 max-w-xs">
              <DraggableBlock block={activeBlock} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
