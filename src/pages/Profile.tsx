import { motion } from "framer-motion";
import { Trophy, Flame, Star, Target, Zap, BookOpen, Award, TrendingUp } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const badges = [
  { name: "First Steps", icon: Star, earned: true, desc: "Complete your first question" },
  { name: "Streak Master", icon: Flame, earned: true, desc: "7-day learning streak" },
  { name: "Quick Learner", icon: Zap, earned: true, desc: "3 correct in a row" },
  { name: "Deep Diver", icon: BookOpen, earned: true, desc: "Ask 10 follow-up questions" },
  { name: "Perfectionist", icon: Target, earned: false, desc: "100% accuracy on a topic" },
  { name: "Champion", icon: Trophy, earned: false, desc: "Complete all topics" },
];

const stats = [
  { label: "Total Points", value: "2,450", icon: Star },
  { label: "Current Streak", value: "12 days", icon: Flame },
  { label: "Questions Solved", value: "248", icon: Target },
  { label: "Topics Mastered", value: "6", icon: Award },
];

const performanceBreakdown = [
  { subject: "Algebra", score: 85, total: 50 },
  { subject: "Chemistry", score: 62, total: 35 },
  { subject: "Probability", score: 55, total: 28 },
  { subject: "Physics", score: 78, total: 42 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export default function Profile() {
  const { userName } = useUser();
  const displayName = userName || "Learner";
  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 mb-8"
        >
          <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-3xl font-display font-bold text-primary-foreground">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl font-bold">{displayName}</h1>
            <p className="text-muted-foreground text-sm">Learning since March 2026 • Level 14</p>
            <div className="flex items-center gap-4 mt-2 justify-center sm:justify-start">
              <span className="flex items-center gap-1 text-sm"><Flame className="w-4 h-4 text-warning" /> 12 day streak</span>
              <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-primary" /> 2,450 pts</span>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Level Progress</p>
              <p className="font-display font-bold text-sm">2,450 / 3,000 XP</p>
            </div>
            <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ duration: 1 }}
                className="h-full gradient-bg rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} className="glass rounded-2xl p-5 card-hover text-center">
              <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" /> Badges
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`rounded-xl p-4 text-center transition-all ${
                    b.earned ? "bg-primary/5 border border-primary/20" : "bg-muted/50 opacity-40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    b.earned ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <b.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold">{b.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Performance by Subject
            </h2>
            <div className="space-y-4">
              {performanceBreakdown.map((p) => (
                <div key={p.subject}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{p.subject}</span>
                    <span className="text-muted-foreground">{p.score}% ({p.total} Qs)</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full gradient-bg rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
