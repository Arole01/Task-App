import { Lightbulb } from "lucide-react";

const motivationMessages = [
  {
    quote: "Small progress is still progress. Keep moving forward.",
    author: "Daily Reminder",
  },
  {
    quote:
      "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "Your future is created by what you do today, not tomorrow.",
    author: "Daily Reminder",
  },
  {
    quote: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
];

function DailyMotivation() {
  const today = new Date();

  const dayNumber = Math.floor(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() /
      (1000 * 60 * 60 * 24),
  );

  const message = motivationMessages[dayNumber % motivationMessages.length];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-indigo-700 p-4 text-white shadow-sm sm:p-5">
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <div className="rounded-lg bg-white/15 p-2">
            <Lightbulb size={20} />
          </div>

          <p className="text-sm font-semibold text-indigo-100">
            Daily Motivation
          </p>
        </div>

        <blockquote className="max-w-2xl text-base font-semibold leading-relaxed sm:text-lg">
          "{message.quote}"
        </blockquote>

        <p className="mt-2 text-sm text-indigo-200">— {message.author}</p>
      </div>

      <div className="pointer-events-none absolute -right-8 -bottom-12 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -top-12 -right-4 h-32 w-32 rounded-full bg-white/5" />
    </section>
  );
}

export default DailyMotivation;
