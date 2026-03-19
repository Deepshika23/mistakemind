import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Lightbulb, Rocket, MessageSquare, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type ChatMsg = { role: "ai" | "user"; text: string };

const chatMessages: ChatMsg[] = [
  { role: "ai", text: "I see you chose x = -2, x = -3 for the equation x² - 5x + 6 = 0. Let me help you understand why that's incorrect." },
  { role: "ai", text: "When we factor x² - 5x + 6, we need two numbers that multiply to +6 and add to -5. Those numbers are -2 and -3." },
  { role: "ai", text: "So we get (x - 2)(x - 3) = 0, giving us x = 2 and x = 3 (positive values!). The sign flip happens because we set each factor equal to zero." },
];

export default function Feedback() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user" as const, text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Great question! The key insight is that when we factor a quadratic, the signs in the factors are opposite to the signs of the roots. Practice a few more problems and this will become second nature! 🎯" },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">
        {/* Main Feedback */}
        <div className="lg:col-span-3 space-y-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-2xl font-bold mb-1">AI Feedback</h1>
            <p className="text-muted-foreground text-sm">Here's what our AI found about your answer.</p>
          </motion.div>

          {/* What went wrong */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 border-l-4 border-destructive"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              <h3 className="font-display font-semibold">What went wrong</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You selected <strong className="text-foreground">x = -2, x = -3</strong> — these are the factors, not the roots. A common mistake is confusing the numbers used in factoring with the actual solutions.
            </p>
          </motion.div>

          {/* Correct concept */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border-l-4 border-success"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-success" />
              </div>
              <h3 className="font-display font-semibold">Correct concept</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The correct answer is <strong className="text-foreground">x = 2, x = 3</strong>. Factoring gives (x - 2)(x - 3) = 0, so setting each factor to zero: x - 2 = 0 → x = 2, and x - 3 = 0 → x = 3.
            </p>
          </motion.div>

          {/* Simple explanation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border-l-4 border-primary"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Simple explanation</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Think of it this way: if (x - 2) = 0, then x <em>must</em> be 2 to make that true. The minus sign in the factor "flips" to give a positive root. This is the <strong className="text-foreground">Zero Product Property</strong>.
            </p>
          </motion.div>

          {/* Improvement tips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 border-l-4 border-accent"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-accent" />
              </div>
              <h3 className="font-display font-semibold">Improvement tips</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Always verify by substituting your answer back into the original equation.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Remember: factors and roots have opposite signs in (x - a) form.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Practice 3 more quadratic factoring problems to solidify this concept.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <Link to="/practice" className="flex-1 gradient-bg text-primary-foreground py-3 rounded-full font-semibold text-center card-hover">
              Next Question
            </Link>
            <Link to="/roadmap" className="flex-1 border border-border bg-card py-3 rounded-full font-semibold text-center card-hover flex items-center justify-center gap-2">
              View Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* AI Chat Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl flex flex-col h-[calc(100vh-8rem)] sticky top-24"
        >
          <div className="p-4 border-b border-border/50 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Assistant</p>
              <p className="text-xs text-muted-foreground">Ask me anything about this topic</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-bg text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a follow-up question..."
                className="flex-1 bg-muted px-4 py-2.5 rounded-full text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
