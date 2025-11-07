import { useState } from 'react';
import CalendarView from '../CalendarView';
import { mockContentBlocks } from '@/data/mockData';

export default function CalendarViewExample() {
  const [blocks, setBlocks] = useState(mockContentBlocks);

  return (
    <div className="h-screen bg-background">
      <CalendarView
        blocks={blocks}
        onBlockMove={(blockId, newDate) => {
          setBlocks(blocks.map(b => {
            if (b.id === blockId) {
              const oldDate = new Date(b.scheduledDate);
              const scheduledDate = new Date(newDate);
              scheduledDate.setHours(oldDate.getHours(), oldDate.getMinutes(), 0, 0);
              return { ...b, scheduledDate: scheduledDate.toISOString() };
            }
            return b;
          }));
          console.log('Block moved:', blockId, 'to', newDate);
        }}
      />
    </div>
  );
}
