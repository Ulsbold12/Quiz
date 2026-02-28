import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppCard } from "./_components/app-card";

export default function Home() {
  return (
    <>
      <div className="relative flex ">
        <SidebarTrigger className="absolute top-1 s" />
      </div>
      <div className="w-screen flex justify-center">
        <AppCard />
      </div>
    </>
  );
}
