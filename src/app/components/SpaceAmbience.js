const stars = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 11) % 100}%`,
  top: `${(index * 83 + 7) % 100}%`,
  size: `${1 + (index % 3)}px`,
  delay: `${-(index % 11) * 0.7}s`,
  duration: `${3 + (index % 7) * 0.65}s`
}));

const debris = [
  { id: "panel", kind: "space-debris-panel", top: "18%", delay: "-8s", duration: "44s" },
  { id: "bolt", kind: "space-debris-bolt", top: "62%", delay: "-27s", duration: "51s" },
  { id: "fragment", kind: "space-debris-fragment", top: "38%", delay: "-39s", duration: "58s" }
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
          style={{ top: item.top, animationDelay: item.delay, animationDuration: item.duration }}
        />
      ))}
    </div>
  );
}
