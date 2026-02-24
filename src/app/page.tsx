import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
