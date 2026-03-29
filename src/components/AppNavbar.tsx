import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, LayoutDashboard, Target, Route, User, Moon, Sun, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

const navItems = [
  { label: "Home", path: "/", icon: Brain },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Practice", path: "/practice", icon: Target },
  { label: "Roadmap", path: "/roadmap", icon: Route },
  { label: "Profile", path: "/profile", icon: User },
];

export function AppNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, logout } = useUser();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">MistakeMind</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full p-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 gradient-bg rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {userName && (
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
