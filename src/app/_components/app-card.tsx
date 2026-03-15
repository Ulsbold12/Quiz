"use client";

import {
  Card,
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

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export function AppCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleGenerate = async () => {
    if (!title || !content) return;
    setLoading(true);
    setQuizzes([]);
    setSelected({});

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.article?.quizzes) {
      setQuizzes(data.article.quizzes);
    }
    setLoading(false);
  };

  if (quizzes.length > 0) {
    return (
      <div className="w-220 flex flex-col gap-4">
        <h2 className="font-bold text-xl text-black">Quiz: {title}</h2>
        {quizzes.map((q, i) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {i + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = selected[q.id] === opt;
                const isAnswered = !!selected[q.id];
                const isCorrect = opt === q.answer;
                let className =
                  "p-2 rounded border cursor-pointer text-sm transition-colors ";
                if (isAnswered) {
                  if (isCorrect)
                    className += "bg-green-100 border-green-500 text-green-800";
                  else if (isSelected)
                    className += "bg-red-100 border-red-500 text-red-800";
                  else className += "border-gray-200 text-gray-500";
                } else {
                  className += "border-gray-200 hover:bg-gray-50";
                }
                return (
                  <div
                    key={opt}
                    className={className}
                    onClick={() =>
                      !isAnswered &&
                      setSelected((prev) => ({ ...prev, [q.id]: opt }))
                    }
                  >
                    {opt}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setQuizzes([]);
            setTitle("");
            setContent("");
          }}
        >
          New Article
        </Button>
      </div>
    );
  }

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
      <CardFooter className="justify-end">
        <Button
          onClick={handleGenerate}
          disabled={loading || !title || !content}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
