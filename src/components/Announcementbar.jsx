import { useState, useEffect } from "react";
import { Sparkles, Truck } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Countdown hook — counts down to a fixed target, loops on a 3-day cycle    */
/* -------------------------------------------------------------------------- */

function useCountdown(hours = 72) {
  const getTarget = () => {
    const stored = sessionStorage.getItem("lb_countdown_target");
    if (stored) return Number(stored);
    const target = Date.now() + hours * 60 * 60 * 1000;
    sessionStorage.setItem("lb_countdown_target", String(target));
    return target;
  };

  const [target, setTarget] = useState(getTarget);
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) {
        const next = Date.now() + hours * 60 * 60 * 1000;
        sessionStorage.setItem("lb_countdown_target", String(next));
        setTarget(next);
      } else {
        setRemaining(diff);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target, hours]);

  const total = Math.max(remaining, 0);
  const h = String(Math.floor(total / 3600000)).padStart(2, "0");
  const m = String(Math.floor((total % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((total % 60000) / 1000)).padStart(2, "0");

  return { h, m, s };
}

/* -------------------------------------------------------------------------- */
/*  Messages — edit freely, the ticker repeats this list forever              */
/* -------------------------------------------------------------------------- */

const messages = [
  { icon: Truck, text: "Congratulations! We're now offering free delivery" },
  { icon: Sparkles, text: "Frost Sale ends in" },
  { icon: Sparkles, text: "New arrivals dropping every Friday" },
  { icon: Truck, text: "Free returns within 14 days, no questions asked" },
];

/* -------------------------------------------------------------------------- */
/*  Timer pill                                                               */
/* -------------------------------------------------------------------------- */

function TimerPill({ h, m, s }) {
  return (
    <span className="mx-3 inline-flex items-center gap-1 align-middle">
      {[h, m, s].map((v, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="rounded-sm bg-[#343B2F]/15 px-2 py-0.5 font-mono text-[13px] font-semibold text-[#F3F1E7]">
            {v}
          </span>
          {i < 2 && <span className="text-[#DCE2CC]">:</span>}
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  One repeating chunk of the ticker (rendered twice for a seamless loop)    */
/* -------------------------------------------------------------------------- */

function TickerContent({ h, m, s }) {
  return (
    <div className="flex shrink-0 items-center">
      {messages.map((msg, i) => {
        const Icon = msg.icon;
        return (
          <span
            key={i}
            className="mx-6 flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold tracking-wide text-[#F3F1E7]"
          >
            <Icon size={14} className="text-[#DCE2CC]" />
            {msg.text}
            {msg.text.toLowerCase().includes("ends in") && (
              <TimerPill h={h} m={m} s={s} />
            )}
            <span className="ml-6 text-[#DCE2CC]/50">•</span>
          </span>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Announcement bar                                                          */
/* -------------------------------------------------------------------------- */

export default function AnnouncementBar() {
  const { h, m, s } = useCountdown(72);

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-[#3A4531] via-[#4A5340] to-[#3A4531] py-2">
      <div className="animate-lb-marquee flex w-max">
        <TickerContent h={h} m={m} s={s} />
        <TickerContent h={h} m={m} s={s} />
      </div>

      {/* edge fades so the loop feels seamless against the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-[#3A4531] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-[#3A4531] to-transparent" />

      <style>{`
        @keyframes lb-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-lb-marquee {
          animation: lb-marquee 28s linear infinite;
        }
        .animate-lb-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}