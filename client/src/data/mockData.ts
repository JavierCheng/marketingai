export interface Campaign {
  id: string;
  title: string;
  purpose: string;
  description: string;
  startDate: string;
  endDate: string;
  numPosts: number;
  numReels: number;
  additionalRequirements: string;
}

export interface ContentBlock {
  id: string;
  type: 'post' | 'reel';
  title: string;
  description: string;
  scheduledDate: string;
  canvaLink: string;
  status: 'draft' | 'scheduled' | 'published';
  orderIndex: number;
}

export const mockCampaign: Campaign = {
  id: "campaign-1",
  title: "Summer Product Launch 2025",
  purpose: "Product Launch",
  description: "Launching new summer collection focused on sustainability",
  startDate: "2025-11-10",
  endDate: "2025-11-24",
  numPosts: 8,
  numReels: 4,
  additionalRequirements: "Use #SustainableFashion. Posting times: 10 AM, 6 PM EST"
};

export const mockContentBlocks: ContentBlock[] = [
  {
    id: "block-1",
    type: "post",
    title: "Teaser: New Collection Sneak Peek",
    description: "Build anticipation with behind-the-scenes look",
    scheduledDate: "2025-11-10T10:00:00Z",
    canvaLink: "https://canva.com/design/example1",
    status: "draft",
    orderIndex: 0
  },
  {
    id: "block-2",
    type: "reel",
    title: "Meet the Designer",
    description: "15-second intro video featuring lead designer",
    scheduledDate: "2025-11-10T18:00:00Z",
    canvaLink: "",
    status: "draft",
    orderIndex: 1
  },
  {
    id: "block-3",
    type: "post",
    title: "Product Spotlight: Organic Cotton Tee",
    description: "Highlight key product with sustainability stats",
    scheduledDate: "2025-11-12T10:00:00Z",
    canvaLink: "",
    status: "scheduled",
    orderIndex: 2
  },
  {
    id: "block-4",
    type: "reel",
    title: "Behind the Scenes: Production",
    description: "Show eco-friendly manufacturing process",
    scheduledDate: "2025-11-13T18:00:00Z",
    canvaLink: "https://canva.com/design/example2",
    status: "scheduled",
    orderIndex: 3
  },
  {
    id: "block-5",
    type: "post",
    title: "Customer Testimonial Feature",
    description: "Share early adopter reviews",
    scheduledDate: "2025-11-15T10:00:00Z",
    canvaLink: "",
    status: "draft",
    orderIndex: 4
  },
  {
    id: "block-6",
    type: "post",
    title: "Sustainability Stats Infographic",
    description: "Data visualization of environmental impact",
    scheduledDate: "2025-11-16T10:00:00Z",
    canvaLink: "https://canva.com/design/example3",
    status: "scheduled",
    orderIndex: 5
  },
  {
    id: "block-7",
    type: "reel",
    title: "Styling Guide: 5 Looks",
    description: "Quick styling inspiration reel",
    scheduledDate: "2025-11-17T18:00:00Z",
    canvaLink: "",
    status: "draft",
    orderIndex: 6
  },
  {
    id: "block-8",
    type: "post",
    title: "Limited Edition Announcement",
    description: "Reveal exclusive colorway",
    scheduledDate: "2025-11-19T10:00:00Z",
    canvaLink: "",
    status: "scheduled",
    orderIndex: 7
  },
  {
    id: "block-9",
    type: "reel",
    title: "Launch Day Countdown",
    description: "24-hour countdown to official launch",
    scheduledDate: "2025-11-20T18:00:00Z",
    canvaLink: "https://canva.com/design/example4",
    status: "scheduled",
    orderIndex: 8
  },
  {
    id: "block-10",
    type: "post",
    title: "Official Launch Post",
    description: "Main launch announcement with shop link",
    scheduledDate: "2025-11-21T10:00:00Z",
    canvaLink: "",
    status: "published",
    orderIndex: 9
  },
  {
    id: "block-11",
    type: "post",
    title: "Collection Lookbook",
    description: "Full collection carousel post",
    scheduledDate: "2025-11-22T10:00:00Z",
    canvaLink: "https://canva.com/design/example5",
    status: "draft",
    orderIndex: 10
  },
  {
    id: "block-12",
    type: "post",
    title: "Thank You & Recap",
    description: "Campaign wrap-up with community highlights",
    scheduledDate: "2025-11-24T18:00:00Z",
    canvaLink: "",
    status: "draft",
    orderIndex: 11
  }
];
