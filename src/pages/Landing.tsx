import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Lightbulb, TrendingUp, Zap, Target, BarChart3 } from "lucide-react";
import heroBrain from "@/assets/hero-brain.png";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";

const features = [
  {
    icon: Brain,
    title: "AI Mistake Analysis",
    description: "Our AI instantly detects what went wrong and explains the correct concept clearly.",
  },
  {
    icon: Lightbulb,
    title: "Smart Explanations",
    description: "Get personalized, simple explanations tailored to your learning style.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visual dashboards show your improvement over time with actionable insights.",
  },
  {
    icon: Target,
    title: "Personalized Roadmap",
    description: "A step-by-step plan that adapts to your weak spots and accelerates learning.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "No waiting. Get real-time corrections and tips as you practice.",
  },
  {
    icon: BarChart3,
    title: "Gamified Learning",
    description: "Earn points, badges, and maintain streaks to stay motivated.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Landing() {
  const { userName, setUserName } = useUser();
  const navigate = useNavigate();
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameValue, setNameValue] = useState("");

  const handleStartLearning = () => {
    if (userName) {
      navigate("/dashboard");
    } else {
      setShowNameInput(true);
    }
  };

  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameValue.trim()) {
      setUserName(nameValue.trim());
      navigate("/dashboard");
    }
  };

  return (
    <div className="gradient-surface min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Learning
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Turn Mistakes into{" "}
              <span className="gradient-text">Mastery</span> with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              MistakeMind analyzes your incorrect answers, provides smart explanations, and creates a personalized learning roadmap so you never repeat the same mistake.
            </p>
            <AnimatePresence mode="wait">
              {showNameInput && !userName ? (
                <motion.form
                  key="name-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmitName}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                >
                  <input
                    autoFocus
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    placeholder="Enter your name..."
                    className="px-6 py-3.5 rounded-full bg-card border border-border text-foreground text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                  />
                  <button
                    type="submit"
                    disabled={!nameValue.trim()}
                    className="gradient-bg text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2 shadow-glow card-hover disabled:opacity-50"
                  >
                    Let's Go
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="cta-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <button
                    onClick={handleStartLearning}
                    className="gradient-bg text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2 shadow-glow card-hover"
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/dashboard"
                    className="bg-card border border-border px-8 py-3.5 rounded-full font-semibold text-base text-foreground flex items-center justify-center gap-2 card-hover"
                  >
                    View Dashboard
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-full blur-3xl opacity-20 animate-pulse-glow" />
              <img
                src={heroBrain}
                alt="AI-powered learning brain visualization"
                className="relative w-80 h-80 lg:w-96 lg:h-96 object-contain animate-float"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything you need to <span className="gradient-text">learn smarter</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI to transform every mistake into a learning opportunity.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                className="glass rounded-2xl p-6 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto gradient-bg rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(200_80%_55%/0.3),transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to learn from your mistakes?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of learners who are accelerating their progress with AI-powered feedback.
            </p>
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-3.5 rounded-full font-semibold card-hover"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
