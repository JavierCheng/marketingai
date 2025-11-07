import { Home, Calendar, Instagram, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavSidebarProps {
  onCreateCampaign: () => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Campaigns", path: "/campaigns", active: true },
  { icon: Instagram, label: "Instagram", path: "/instagram" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function NavSidebar({ onCreateCampaign }: NavSidebarProps) {
  return (
    <div className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-semibold text-sidebar-foreground">Campaign Planner</h1>
        </div>

        <Button 
          className="w-full"
          onClick={onCreateCampaign}
          data-testid="button-create-campaign"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={item.active ? "secondary" : "ghost"}
            className={`w-full justify-start mb-1 ${item.active ? 'bg-sidebar-accent' : ''}`}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Marketing Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
