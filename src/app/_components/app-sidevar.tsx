import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="pt-16">
      <SidebarHeader className="">
        <span className="font-bold text-black">History</span>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {Mock.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

const Mock = [
  {
    id: 1,
    text: "asasas",
  },
  {
    id: 2,
    text: "asasas",
  },
  {
    id: 3,
    text: "asasas",
  },
];
