import ContentBlock from '../ContentBlock';
import { mockContentBlocks } from '@/data/mockData';

export default function ContentBlockExample() {
  return (
    <div className="p-6 bg-background space-y-4 max-w-md">
      <ContentBlock block={mockContentBlocks[0]} showActions={false} />
      <ContentBlock block={mockContentBlocks[1]} showActions={true} />
    </div>
  );
}
