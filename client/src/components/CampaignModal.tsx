import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { format, differenceInDays, addDays, eachDayOfInterval, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import StepIndicator from "./StepIndicator";
import type { Campaign, ContentBlock } from "@/data/mockData";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCampaign: (campaign: Campaign, blocks: ContentBlock[]) => void;
}

const purposeOptions = [
  "Product Launch",
  "Event Promotion",
  "Brand Awareness",
  "Engagement Campaign",
  "Seasonal Campaign",
  "Other"
];

export default function CampaignModal({ isOpen, onClose, onCreateCampaign }: CampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    description: "",
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    numPosts: 5,
    numReels: 3,
    additionalRequirements: "",
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedStep1 = formData.purpose && formData.description.length >= 10;
  const canProceedStep2 = formData.startDate && formData.endDate;
  const canProceedStep3 = formData.numPosts >= 1 && formData.numReels >= 1;

  const handleCreate = () => {
    const campaign: Campaign = {
      id: `campaign-${Date.now()}`,
      title: `${formData.purpose} Campaign`,
      purpose: formData.purpose,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      numPosts: formData.numPosts,
      numReels: formData.numReels,
      additionalRequirements: formData.additionalRequirements,
    };

    const totalContent = formData.numPosts + formData.numReels;
    const days = eachDayOfInterval({
      start: parseISO(formData.startDate),
      end: parseISO(formData.endDate)
    });

    const blocks: ContentBlock[] = [];
    let blockIndex = 0;

    for (let i = 0; i < totalContent; i++) {
      const isPost = i < formData.numPosts;
      const dayIndex = Math.floor((i / totalContent) * days.length);
      const day = days[Math.min(dayIndex, days.length - 1)];
      const hour = i % 2 === 0 ? 10 : 18;

      blocks.push({
        id: `block-${Date.now()}-${i}`,
        type: isPost ? 'post' : 'reel',
        title: `${isPost ? 'Post' : 'Reel'} ${i + 1}: Content Placeholder`,
        description: `Add description for this ${isPost ? 'post' : 'reel'}`,
        scheduledDate: new Date(day.setHours(hour, 0, 0, 0)).toISOString(),
        canvaLink: "",
        status: "draft",
        orderIndex: blockIndex++,
      });
    }

    onCreateCampaign(campaign, blocks);
    onClose();
  };

  const duration = differenceInDays(parseISO(formData.endDate), parseISO(formData.startDate));

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <Card
        className="w-full max-w-2xl bg-card p-6 relative"
        onClick={(e) => e.stopPropagation()}
        data-testid="campaign-modal"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
          data-testid="button-close-modal"
        >
          <X className="w-5 h-5" />
        </Button>

        <h2 className="text-2xl font-semibold mb-6 text-foreground">Create Campaign</h2>

        <StepIndicator currentStep={currentStep} totalSteps={4} />

        {/* Step 1: Purpose */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="purpose">Campaign Purpose</Label>
              <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                <SelectTrigger id="purpose" data-testid="select-purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {purposeOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value.slice(0, 500) })}
                className="min-h-32"
                data-testid="textarea-description"
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/500 characters</p>
            </div>
          </div>
        )}

        {/* Step 2: Timeline */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                value={formData.startDate}
                min={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                data-testid="input-start-date"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                value={formData.endDate}
                min={formData.startDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                data-testid="input-end-date"
              />
            </div>
            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Campaign duration: <span className="font-semibold text-foreground">{duration} days</span>
              </p>
            </Card>
          </div>
        )}

        {/* Step 3: Content Volume */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="numPosts">Number of Posts</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, numPosts: Math.max(1, formData.numPosts - 1) })}
                  data-testid="button-decrease-posts"
                >
                  -
                </Button>
                <Input
                  type="number"
                  id="numPosts"
                  value={formData.numPosts}
                  onChange={(e) => setFormData({ ...formData, numPosts: Math.min(50, Math.max(1, parseInt(e.target.value) || 1)) })}
                  min={1}
                  max={50}
                  className="text-center"
                  data-testid="input-num-posts"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, numPosts: Math.min(50, formData.numPosts + 1) })}
                  data-testid="button-increase-posts"
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="numReels">Number of Reels</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, numReels: Math.max(1, formData.numReels - 1) })}
                  data-testid="button-decrease-reels"
                >
                  -
                </Button>
                <Input
                  type="number"
                  id="numReels"
                  value={formData.numReels}
                  onChange={(e) => setFormData({ ...formData, numReels: Math.min(30, Math.max(1, parseInt(e.target.value) || 1)) })}
                  min={1}
                  max={30}
                  className="text-center"
                  data-testid="input-num-reels"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, numReels: Math.min(30, formData.numReels + 1) })}
                  data-testid="button-increase-reels"
                >
                  +
                </Button>
              </div>
            </div>
            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Total content pieces: <span className="font-semibold text-foreground">{formData.numPosts + formData.numReels}</span>
              </p>
            </Card>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <Card className="p-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Purpose:</p>
                <p className="text-sm text-muted-foreground">{formData.purpose}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Description:</p>
                <p className="text-sm text-muted-foreground">{formData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Timeline:</p>
                  <p className="text-sm text-muted-foreground">{format(parseISO(formData.startDate), 'MMM d')} - {format(parseISO(formData.endDate), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Content:</p>
                  <p className="text-sm text-muted-foreground">{formData.numPosts} posts, {formData.numReels} reels</p>
                </div>
              </div>
            </Card>
            <div>
              <Label htmlFor="requirements">Additional Requirements (Optional)</Label>
              <Textarea
                id="requirements"
                placeholder="Any special requirements or notes..."
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                className="min-h-24"
                data-testid="textarea-requirements"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3)
              }
              data-testid="button-next"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleCreate} data-testid="button-create-campaign">
              Create Campaign
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
