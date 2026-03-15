"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
  createdAt: string;
};

export function AppSidebar() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => setArticles(data.articles ?? []));
  }, []);

  return (
    <Sidebar className="pt-16">
      <SidebarHeader>
        <span className="font-bold text-black">History</span>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col gap-1">
        {articles.length === 0 ? (
          <p className="text-sm text-gray-400">No articles yet</p>
        ) : (
          articles.map((a) => (
            <div
              key={a.id}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer text-sm truncate"
            >
              {a.title}
            </div>
          ))
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
