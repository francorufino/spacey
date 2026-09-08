const comparisonRows = [
  ["Destinations", "Anywhere worth posting about", "Wherever science demands", "Wherever Mars is"],
  ["Booking", "3 clicks", "10 years of training", "10 figures in your bank account"],
  ["Travel Style", "First-class interplanetary", "Government business trip", "Tech-bro expedition"],
  ["Food", "Actual meals", "Dehydrated cubes", "Probably protein bars"],
  ["Wi-Fi", "Yes", "You’re working, not scrolling", "Depends how close Starlink is"],
  ["Hotels", "Of course", "Absolutely not", "You brought a sleeping bag, right?"],
  ["Customer Service", "“How was Saturn?”", "“Please follow protocol.”", "“Have you read the manual?”"],
  ["Vacation Photos", "Guaranteed", "Classified-looking", "Mostly rockets"],
  ["Training Required", "Watch a 4-minute safety video", "Years", "Sign something terrifying"],
  ["Mars", "Weekend escape", "Scientific mission", "Life goal"],
  ["Moon", "Romantic getaway", "Research destination", "Stop on the way"],
  ["Saturn", "Best views", "Fascinating data", "Not on the roadmap"],
  ["Return Ticket", "Included", "Mission dependent", "Let’s not ruin the mood"],
  ["Overall Experience", "5-star space travel", "Incredible science, terrible vacation", "Great rockets, questionable hospitality"]
];

const ComparisonTable = () => {
  return (
    <section className="container mx-auto mt-20 px-4 text-white">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Choose wisely
        </p>
        <h2 className="mt-3 text-4xl font-bold">Space travel, compared</h2>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950 shadow-[0_20px_55px_rgba(0,0,0,0.35)]">
        <table className="w-full min-w-[960px] table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-white/15 bg-slate-900">
              <th scope="col" className="w-1/5 px-6 py-5 text-sm uppercase tracking-wider text-slate-400">
                Feature
              </th>
              <th scope="col" className="w-[26.66%] bg-white px-6 py-5 text-xl font-bold text-black">
                SpaceY
              </th>
              <th scope="col" className="w-[26.66%] px-6 py-5 text-xl font-bold">
                NASA
              </th>
              <th scope="col" className="w-[26.66%] px-6 py-5 text-xl font-bold">
                SpaceX
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([feature, spaceY, nasa, spaceX], index) => (
              <tr
                key={feature}
                className={index < comparisonRows.length - 1 ? "border-b border-white/10" : ""}
              >
                <th scope="row" className="px-6 py-4 text-sm font-semibold text-slate-300">
                  {feature}
                </th>
                <td className={`bg-white px-6 py-4 text-black ${feature === "Overall Experience" ? "font-bold" : "font-medium"}`}>
                  {spaceY}
                </td>
                <td className="px-6 py-4 text-sm leading-relaxed text-slate-300">{nasa}</td>
                <td className="px-6 py-4 text-sm leading-relaxed text-slate-300">{spaceX}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 md:hidden">
        Swipe sideways to compare all companies.
      </p>
    </section>
  );
};

export default ComparisonTable;
