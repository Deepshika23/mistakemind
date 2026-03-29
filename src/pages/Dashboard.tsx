import { motion } from "framer-motion";
import { TrendingUp, Target, Flame, Brain, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const progressData = [
  { day: "Mon", accuracy: 62 },
  { day: "Tue", accuracy: 58 },
  { day: "Wed", accuracy: 71 },
  { day: "Thu", accuracy: 68 },
  { day: "Fri", accuracy: 75 },
  { day: "Sat", accuracy: 82 },
  { day: "Sun", accuracy: 79 },
];

const weakTopics = [
  { topic: "Quadratic Equations", score: 35, color: "bg-destructive" },
  { topic: "Organic Chemistry", score: 42, color: "bg-warning" },
  { topic: "Probability", score: 55, color: "bg-warning" },
  { topic: "Thermodynamics", score: 60, color: "bg-accent" },
];

const recommendations = [
  { title: "Review Quadratic Formula", desc: "You've missed 4 questions on this topic. Let's revisit the basics.", icon: BookOpen },
  { title: "Practice Probability", desc: "Your accuracy improved 12% last week. Keep the momentum going!", icon: Target },
  { title: "Challenge: Chemistry Quiz", desc: "Test your organic chemistry knowledge with 10 curated questions.", icon: Brain },
];

const statCards = [
  { label: "Accuracy", value: "73%", change: "+5%", icon: Target, trend: "up" as const },
  { label: "Weak Topics", value: "4", change: "-1", icon: AlertTriangle, trend: "down" as const },
  { label: "Learning Streak", value: "12 days", change: "Best!", icon: Flame, trend: "up" as const },
  { label: "Questions Solved", value: "248", change: "+23", icon: Brain, trend: "up" as const },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-1">Welcome back, Alex 👋</h1>
          <p className="text-muted-foreground">Here's your learning overview for this week.</p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <motion.div key={s.label} variants={item} className="glass rounded-2xl p-5 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  s.trend === "up" ? "bg-success/10 text-success" : "bg-success/10 text-success"
                }`}>
                  {s.change}
                </span>
              </div>
              <div className="text-2xl font-display font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-semibold text-lg">Accuracy Trend</h2>
                <p className="text-sm text-muted-foreground">Your performance over the last 7 days</p>
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(245, 58%, 51%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(245, 58%, 51%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 45%)" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 15%, 90%)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(245, 58%, 51%)" fill="url(#accGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weak Topics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">Weak Topics</h2>
            <div className="space-y-4">
              {weakTopics.map((t) => (
                <div key={t.topic}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{t.topic}</span>
                    <span className="text-muted-foreground">{t.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${t.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h2 className="font-display font-semibold text-lg mb-4">🤖 AI Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendations.map((r) => (
              <Link
                key={r.title}
                to="/practice"
                className="glass rounded-2xl p-5 card-hover group flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1">{r.desc}</p>
                <div className="flex items-center gap-1 text-primary text-xs font-medium mt-3">
                  Start now <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
