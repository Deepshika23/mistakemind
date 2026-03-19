import { motion } from "framer-motion";
import { Check, Lock, Play, Star, AlertTriangle, BookOpen, Brain } from "lucide-react";

const roadmapSteps = [
  { title: "Basic Algebra", status: "completed" as const, score: 92, topics: 8, icon: Check },
  { title: "Linear Equations", status: "completed" as const, score: 85, topics: 6, icon: Check },
  { title: "Quadratic Equations", status: "current" as const, score: 45, topics: 10, icon: Play, weak: true },
  { title: "Polynomials", status: "locked" as const, score: 0, topics: 7, icon: Lock },
  { title: "Probability & Stats", status: "locked" as const, score: 0, topics: 9, icon: Lock },
  { title: "Calculus Basics", status: "locked" as const, score: 0, topics: 12, icon: Lock },
];

const suggestedTopics = [
  { title: "Factoring Quadratics", priority: "High", icon: AlertTriangle, color: "text-destructive" },
  { title: "Completing the Square", priority: "Medium", icon: BookOpen, color: "text-warning" },
  { title: "Quadratic Formula", priority: "Medium", icon: Brain, color: "text-warning" },
  { title: "Word Problems", priority: "Low", icon: Star, color: "text-accent" },
];

export default function Roadmap() {
  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl font-bold mb-1">Your Learning Roadmap</h1>
          <p className="text-muted-foreground">A personalized path based on your performance and AI analysis.</p>
        </motion.div>

        {/* Path */}
        <div className="relative mb-12">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {roadmapSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-5"
              >
                {/* Node */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  step.status === "completed"
                    ? "bg-success text-success-foreground"
                    : step.status === "current"
                    ? "gradient-bg text-primary-foreground animate-pulse-glow"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Card */}
                <div className={`flex-1 glass rounded-2xl p-5 card-hover ${
                  step.status === "current" ? "ring-2 ring-primary/20" : ""
                } ${step.status === "locked" ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold">{step.title}</h3>
                    {step.weak && (
                      <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                        Needs Work
                      </span>
                    )}
                    {step.status === "completed" && (
                      <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-semibold">
                        {step.score}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.topics} topics</p>
                  {step.status === "current" && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-primary">{step.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${step.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full gradient-bg rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Suggested Next Topics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-display text-xl font-bold mb-4">📌 Suggested Next Topics</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {suggestedTopics.map((t) => (
              <div key={t.title} className="glass rounded-2xl p-5 card-hover flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <t.icon className={`w-5 h-5 ${t.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t.title}</h3>
                  <p className="text-xs text-muted-foreground">Priority: <span className={`font-semibold ${t.color}`}>{t.priority}</span></p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
