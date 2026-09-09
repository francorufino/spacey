const stars = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 11) % 100}%`,
  top: `${(index * 83 + 7) % 100}%`,
  size: `${1 + (index % 3)}px`,
  delay: `${-(index % 11) * 0.7}s`,
  duration: `${3 + (index % 7) * 0.65}s`
}));

const debris = [
  { id: "solar-panel", kind: "space-debris-panel", top: "12%", delay: "-8s", duration: "52s", reverse: false },
  { id: "bolt", kind: "space-debris-bolt", top: "63%", delay: "-27s", duration: "61s", reverse: false },
  { id: "foil", kind: "space-debris-foil", top: "34%", delay: "-42s", duration: "68s", reverse: true },
  { id: "satellite", kind: "space-debris-satellite", top: "78%", delay: "-18s", duration: "73s", reverse: true },
  { id: "antenna", kind: "space-debris-antenna", top: "47%", delay: "-57s", duration: "81s", reverse: false },
  { id: "tank", kind: "space-debris-tank", top: "22%", delay: "-69s", duration: "88s", reverse: true },
  { id: "wrench", kind: "space-debris-wrench", top: "71%", delay: "-36s", duration: "76s", reverse: false },
  { id: "dish", kind: "space-debris-dish", top: "42%", delay: "-74s", duration: "96s", reverse: true },
  { id: "capsule", kind: "space-debris-capsule", top: "88%", delay: "-51s", duration: "92s", reverse: false },
  { id: "cable", kind: "space-debris-cable", top: "29%", delay: "-83s", duration: "105s", reverse: true }
];

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
        <span
          key={item.id}
          className={`space-debris ${item.kind}`}
          style={{ top: item.top, animationDelay: item.delay, animationDuration: item.duration, animationDirection: item.reverse ? "reverse" : "normal" }}
        />
      ))}
    </div>
  );
}
