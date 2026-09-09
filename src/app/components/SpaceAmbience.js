const stars = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 11) % 100}%`,
  top: `${(index * 83 + 7) % 100}%`,
  size: `${1 + (index % 3)}px`,
  delay: `${-(index % 11) * 0.7}s`,
  duration: `${3 + (index % 7) * 0.65}s`
}));

const debris = [
  { id: "solar-panel", kind: "panel", top: "12%", delay: "-8s", duration: "52s" },
  { id: "cubesat", kind: "cubesat", top: "63%", delay: "-27s", duration: "61s" },
  { id: "starlink", kind: "starlink", top: "34%", delay: "-42s", duration: "68s", reverse: true },
  { id: "satellite", kind: "satellite", top: "78%", delay: "-18s", duration: "73s", reverse: true },
  { id: "goes", kind: "goes", top: "47%", delay: "-57s", duration: "81s" },
  { id: "upper-stage", kind: "stage", top: "22%", delay: "-69s", duration: "88s", reverse: true },
  { id: "payload-adapter", kind: "adapter", top: "71%", delay: "-36s", duration: "76s" },
  { id: "tdrs", kind: "tdrs", top: "42%", delay: "-74s", duration: "96s", reverse: true },
  { id: "dragon", kind: "dragon", top: "88%", delay: "-51s", duration: "92s" },
  { id: "deep-space-probe", kind: "probe", top: "29%", delay: "-83s", duration: "105s", reverse: true }
];

const Hardware = ({ kind }) => {
  const line = { stroke: "#9ba7b5", strokeWidth: 2, strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" };
  if (kind === "panel") return <><rect x="5" y="16" width="50" height="25" rx="2" fill="#244d7e" {...line} /><path d="M17 16v25m13-25v25m13-25v25M5 28h50M30 8v41" {...line} /></>;
  if (kind === "cubesat") return <><rect x="20" y="14" width="20" height="30" rx="3" fill="#c4cbd2" {...line} /><rect x="3" y="20" width="14" height="18" fill="#244d7e" {...line} /><rect x="43" y="20" width="14" height="18" fill="#244d7e" {...line} /><path d="M24 20h12m-12 7h12m-12 7h12" stroke="#596573" strokeWidth="2" /></>;
  if (kind === "starlink") return <><rect x="4" y="19" width="52" height="22" rx="3" fill="#244d7e" {...line} /><path d="M14 19v22m11-22v22m11-22v22m11-22v22M4 30h52" {...line} /><rect x="25" y="9" width="10" height="9" rx="2" fill="#d0d5da" {...line} /></>;
  if (kind === "satellite") return <><rect x="23" y="18" width="15" height="20" rx="3" fill="#c4cbd2" {...line} /><rect x="2" y="21" width="18" height="14" fill="#244d7e" {...line} /><rect x="41" y="21" width="18" height="14" fill="#244d7e" {...line} /><path d="M30 18V7m-5 2 5-3 5 3" {...line} /></>;
  if (kind === "goes") return <><rect x="22" y="19" width="17" height="22" rx="3" fill="#c6cdd4" {...line} /><rect x="2" y="22" width="17" height="15" fill="#244d7e" {...line} /><path d="M41 29h15M46 15c9 2 10 10 10 14m-10-14 7 15" fill="none" {...line} /><circle cx="46" cy="15" r="2" fill="#d7dde3" /></>;
  if (kind === "stage") return <><path d="M20 8h20l4 9v27l-6 8H22l-6-8V17z" fill="url(#hardware-metal)" {...line} /><path d="M16 21h28M16 41h28m-20 11-3 6m15-6 3 6" {...line} /></>;
  if (kind === "adapter") return <><path d="m17 46 6-33h14l6 33z" fill="#aeb7c1" {...line} /><ellipse cx="30" cy="46" rx="13" ry="5" fill="#626e7b" {...line} /><path d="M22 22h16m-18 10h20" stroke="#697684" strokeWidth="2" /></>;
  if (kind === "tdrs") return <><rect x="25" y="24" width="12" height="17" rx="2" fill="#c5ccd3" {...line} /><ellipse cx="13" cy="20" rx="10" ry="6" fill="none" {...line} /><ellipse cx="49" cy="20" rx="10" ry="6" fill="none" {...line} /><path d="m21 25-8-5m24 5 12-5M31 24V8" {...line} /></>;
  if (kind === "dragon") return <><path d="M21 45h18l4-9-5-23-8-7-8 7-5 23z" fill="#c8ced4" {...line} /><path d="M22 22h16" stroke="#303b47" strokeWidth="5" /><path d="M20 42h20m-15 3-3 8m13-8 3 8" {...line} /></>;
  return <><rect x="20" y="20" width="21" height="20" rx="4" fill="#b8c0c8" {...line} /><path d="M20 30H8m33 0h12M30 20V8" {...line} /><ellipse cx="8" cy="30" rx="7" ry="3" fill="none" {...line} /><path d="m30 8 4-5m7 20 12-9" {...line} /></>;
};

export default function SpaceAmbience() {
  return (
    <div aria-hidden="true" className="space-ambience">
      {stars.map((star) => (
        <span
          key={star.id}
          className="ambient-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}
      {debris.map((item) => (
        <svg key={item.id} viewBox="0 0 60 60" className={`space-debris space-hardware space-hardware-${item.kind}`} style={{ top: item.top, animationDelay: item.delay, animationDuration: item.duration, animationDirection: item.reverse ? "reverse" : "normal" }}>
          <defs><linearGradient id="hardware-metal"><stop stopColor="#596572" /><stop offset=".5" stopColor="#e0e4e8" /><stop offset="1" stopColor="#687481" /></linearGradient></defs>
          <Hardware kind={item.kind} />
        </svg>
      ))}
    </div>
  );
}
