"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isOnCard, setIsOnCard] = useState(false);

  // Custom cursor - faster spring config
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Custom cursor - only visible on card */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-lime-400 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: isHovering ? 32 : 24,
          height: isHovering ? 32 : 24,
          opacity: isOnCard ? 1 : 0,
          scale: isOnCard ? 1 : 0.5,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Background image */}
      <Image
        src="/background.jpg"
        alt=""
        fill
        priority
        className="object-cover object-right scale-135 sm:scale-100"
        sizes="100vw"
      />

      {/* Light card */}
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mx-12 flex w-full max-w-sm cursor-none flex-col items-center bg-white/95 px-6 py-10 shadow-2xl backdrop-blur-sm sm:mx-0 sm:max-w-md sm:px-12 sm:py-12 md:aspect-square md:justify-center"
        onMouseEnter={() => setIsOnCard(true)}
        onMouseLeave={() => setIsOnCard(false)}
      >
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-(family-name:--font-bebas) text-6xl tracking-wide text-black sm:text-7xl md:text-8xl">
            Marc
            <br />
            van de Haar
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-black/70 text-center"
        >
          Trusted, tailor made advice that drives clarity
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center text-xs md:text-sm font-medium text-black/50"
        >
          Something new is coming. Be the first to know.
        </motion.p>

        {/* Newsletter Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 w-full"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div
                className="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.label
                  className="absolute left-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-black/40"
                  animate={{
                    color:
                      focused === "name"
                        ? "rgba(0,0,0,0.8)"
                        : "rgba(0,0,0,0.4)",
                    y: focused === "name" || name ? -18 : 0,
                    fontSize: focused === "name" || name ? "10px" : "11px",
                  }}
                >
                  Name
                </motion.label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full cursor-none border-b-2 border-black/10 bg-transparent pb-2 pt-4 text-sm font-semibold text-black outline-none transition-colors focus:border-black"
                />
              </div>

              <div
                className="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.label
                  className="absolute left-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-black/40"
                  animate={{
                    color:
                      focused === "email"
                        ? "rgba(0,0,0,0.8)"
                        : "rgba(0,0,0,0.4)",
                    y: focused === "email" || email ? -18 : 0,
                    fontSize: focused === "email" || email ? "10px" : "11px",
                  }}
                >
                  Email
                </motion.label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full cursor-none border-b-2 border-black/10 bg-transparent pb-2 pt-4 text-sm font-semibold text-black outline-none transition-colors focus:border-black"
                />
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-600">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="mt-2 cursor-none bg-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={loading ? undefined : { scale: 1.02 }}
                whileTap={loading ? undefined : { scale: 0.98 }}
              >
                {loading ? "Subscribing..." : "Notify Me"}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="font-(family-name:--font-bebas) text-3xl tracking-wide text-black">
                Thank you
              </p>
              <p className="mt-2 text-sm font-medium text-black/50">
                We&apos;ll be in touch.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.main>
    </div>
  );
}
