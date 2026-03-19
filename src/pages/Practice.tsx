import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Clock, Hash, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sampleQuestion = {
  id: 1,
  subject: "Mathematics",
  topic: "Quadratic Equations",
  difficulty: "Medium",
  text: "Solve for x: x² - 5x + 6 = 0",
  options: ["x = 2, x = 3", "x = -2, x = -3", "x = 1, x = 6", "x = -1, x = -6"],
  correct: 0,
};

export default function Practice() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => navigate("/feedback"), 1500);
  };

  return (
    <div className="min-h-screen gradient-surface pt-24 pb-12 px-6 flex items-start justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{sampleQuestion.subject}</span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">{sampleQuestion.topic}</span>
          <span className="ml-auto flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3.5 h-3.5" /> 2:30
          </span>
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Hash className="w-3.5 h-3.5" /> Q1 / 10
          </span>
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-6"
        >
          <h2 className="font-display text-2xl font-bold mb-2">Question 1</h2>
          <p className="text-lg text-foreground leading-relaxed">{sampleQuestion.text}</p>
        </motion.div>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          {sampleQuestion.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = submitted && i === sampleQuestion.correct;
            const isWrong = submitted && isSelected && i !== sampleQuestion.correct;

            return (
              <motion.button
                key={i}
                whileHover={{ scale: submitted ? 1 : 1.01 }}
                whileTap={{ scale: submitted ? 1 : 0.99 }}
                onClick={() => !submitted && setSelected(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isCorrect
                    ? "border-success bg-success/10"
                    : isWrong
                    ? "border-destructive bg-destructive/10"
                    : isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                    isCorrect
                      ? "bg-success text-success-foreground"
                      : isWrong
                      ? "bg-destructive text-destructive-foreground"
                      : isSelected
                      ? "gradient-bg text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium">{opt}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Mic className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {selected !== null && !submitted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleSubmit}
                className="flex-1 gradient-bg text-primary-foreground py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-glow"
              >
                Submit Answer
                <Send className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex-1 py-3.5 rounded-full font-semibold text-center ${
                selected === sampleQuestion.correct
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {selected === sampleQuestion.correct ? "✅ Correct!" : "❌ Incorrect — Analyzing..."}
            </motion.div>
          )}

          {!submitted && selected === null && (
            <div className="flex-1 py-3.5 rounded-full text-center text-muted-foreground text-sm">
              Select an answer to continue
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
