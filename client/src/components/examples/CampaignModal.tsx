import { useState } from 'react';
import CampaignModal from '../CampaignModal';
import { Button } from '@/components/ui/button';

export default function CampaignModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-6 bg-background">
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <CampaignModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreateCampaign={(campaign, blocks) => {
          console.log('Campaign created:', campaign, blocks);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
