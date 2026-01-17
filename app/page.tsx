"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

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
      {/* Background image */}
      <Image
        src="/background.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Light card */}
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mx-4 flex w-full max-w-md flex-col items-center bg-white/95 px-8 py-12 shadow-2xl backdrop-blur-sm sm:mx-0 sm:aspect-square sm:justify-center sm:px-12"
      >
        {/* Name - BOLD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black uppercase tracking-tighter text-black sm:text-6xl md:text-7xl">
            Marc
            <br />
            van de Haar
          </h1>
        </motion.div>

        {/* Tagline - confident */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-black/60"
        >
          Fitness Entrepreneur
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center text-sm text-black/50"
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
              <div className="relative">
                <motion.label
                  className="absolute left-0 text-xs font-bold uppercase tracking-[0.2em] text-black/30 transition-colors"
                  animate={{
                    color: focused === "name" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)",
                    y: focused === "name" || name ? -18 : 0,
                    fontSize: focused === "name" || name ? "10px" : "12px"
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
                  className="w-full border-b-2 border-black/10 bg-transparent pb-2 pt-4 text-sm font-medium text-black outline-none transition-colors focus:border-black"
                />
              </div>

              <div className="relative">
                <motion.label
                  className="absolute left-0 text-xs font-bold uppercase tracking-[0.2em] text-black/30 transition-colors"
                  animate={{
                    color: focused === "email" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)",
                    y: focused === "email" || email ? -18 : 0,
                    fontSize: focused === "email" || email ? "10px" : "12px"
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
                  className="w-full border-b-2 border-black/10 bg-transparent pb-2 pt-4 text-sm font-medium text-black outline-none transition-colors focus:border-black"
                />
              </div>

              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="group relative mt-2 overflow-hidden bg-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
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
              <p className="text-lg font-black uppercase text-black">Thank you</p>
              <p className="mt-2 text-sm text-black/50">
                We&apos;ll be in touch.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.main>
    </div>
  );
}
