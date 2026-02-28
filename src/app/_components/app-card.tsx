"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AppCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.result);
    setLoading(false);
  };
  return (
    <Card className="w-220 h-110">
      <CardHeader>
        <CardTitle className="font-bold text-black text-xl">
          Article Quiz Generator
        </CardTitle>
        <CardDescription>
          Paste your article below to generate a summarize and quiz question.
          Your articles will saved in the sidebar for future reference.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-7">
        <Field>
          <FieldLabel className="font-bold text-xl">Article Title</FieldLabel>
          <Input
            type="text"
            placeholder="Enter a title for your article..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="font-bold text-xl">Article Content</FieldLabel>
          <Textarea
            className="h-30"
            placeholder="Paste your article content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>
      </CardContent>
      <CardFooter className=" justify-end">
        <Button onClick={handleGenerate} disabled={loading} className="">
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
