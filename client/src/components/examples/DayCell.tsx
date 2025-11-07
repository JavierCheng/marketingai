import DayCell from '../DayCell';
import { mockContentBlocks } from '@/data/mockData';

export default function DayCellExample() {
  const today = new Date();
  const blocksForToday = mockContentBlocks.slice(0, 2);

  return (
    <div className="p-6 bg-background">
      <div className="max-w-xs">
        <DayCell
          date={today}
          isCurrentMonth={true}
          isToday={true}
          blocks={blocksForToday}
        />
      </div>
    </div>
  );
}
