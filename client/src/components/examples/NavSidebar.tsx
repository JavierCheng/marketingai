import NavSidebar from '../NavSidebar';

export default function NavSidebarExample() {
  return (
    <div className="h-screen">
      <NavSidebar onCreateCampaign={() => console.log('Create campaign clicked')} />
    </div>
  );
}
