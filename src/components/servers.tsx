import React from "react";

interface Partner {
  name: string;
  description: string;
  verified: string;
  image: string;
}

const partners: Partner[] = [
  {
    name: "Muzzle",
    description: "1000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/PIocjRb.png",
  },
  {
    name: "ModBot",
    description: "1000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/StNQM37.jpeg",
  },
  {
    name: "RadioWave",
    description: "125,000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/EQDld3c.jpeg",
  },
  {
    name: "GameNight",
    description: "500,000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/IFTbObi.jpeg",
  },
  {
    name: "NotesKeeper",
    description: "400,000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/wth6zpW.png",
  },
  {
    name: "WorldBot",
    description: "100,000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/AcRUF4m.png",
  },
  {
    name: "KataBump",
    description: "18115 Members",
    verified: "https://i.imgur.com/DPjR1iG.png",
    image: "https://i.imgur.com/Ee8BiZq.png",
  },
  {
    name: "Lofi Girl",
    description: "70,000 Members",
    verified: "https://i.imgur.com/QqQ4GCd.png",
    image: "https://i.imgur.com/wSxTw5g.png",
  },
];

const TrustedServers = () => {
  return (
    <section className="py-12 w-full overflow-hidden text-white" style={{ background: '#000000' }}>
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Trusted by over <span className="font-bold text-base">1,000</span> Discord servers, including
          </p>
        </div>
        <div className="relative w-full max-w-[110rem] mx-auto">
          {/* Gradient fade on sides */}
          <div className="pointer-events-none absolute left-0 top-0 w-16 h-full z-10" style={{ background: 'linear-gradient(to right, #000000, transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 w-16 h-full z-10" style={{ background: 'linear-gradient(to left, #000000, transparent)' }} />
          <div className="marquee-outer overflow-hidden w-full">
            <div className="marquee-inner flex" style={{ width: 'max-content' }}>
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center w-[220px] min-w-[220px] px-4 py-3 rounded-xl shadow-lg border hover:scale-105 hover:shadow-2xl hover:border-indigo-500 transition-transform duration-300 mx-2"
                  style={{ background: '#000000', borderColor: '#181e2a' }}
                >
                  <img
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    className="h-10 w-10 rounded-lg object-cover bg-[#23232b] mr-3 flex-shrink-0 border-2 border-[#23232b] shadow-sm"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-white font-semibold text-base leading-tight whitespace-nowrap font-sans tracking-tight drop-shadow-sm">
                        {partner.name}
                      </span>
                      <img
                        src={partner.verified}
                        alt="Verified Badge"
                        className="h-4 w-4 ml-1 animate-glow"
                      />
                    </div>
                    <span className="text-xs text-gray-400 mt-0.5 whitespace-nowrap font-medium tracking-wide">
                      {partner.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
            {/* Glowing badge animation and marquee keyframes */}
            <style>{`
        .animate-glow {
          animation: glow 1.8s infinite alternate;
        }
        .marquee-outer {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-outer:hover .marquee-inner {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TrustedServers;