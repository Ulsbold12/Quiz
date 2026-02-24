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

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <Card className="w-210 h-110">
        <CardHeader>
          <CardTitle className="font-bold text-black text-xl">
            Article Quiz Generator
          </CardTitle>
          <CardDescription>
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <Field>
            <FieldLabel className="font-bold text-xl">Article Title</FieldLabel>
            <Input
              type="text"
              placeholder="Enter a title for your article..."
            />
          </Field>

          <Field>
            <FieldLabel className="font-bold text-xl">
              Article Content
            </FieldLabel>
            <Textarea
              className="h-30"
              placeholder="Paste your article content here..."
            />
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}
