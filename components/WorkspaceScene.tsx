"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AccessorySlot } from "@/models/types";
import { Product } from "@/models/types";

interface WorkspaceSceneProps {
  desk: Product | null;
  chair: Product | null;
  accessories: { slot: AccessorySlot; product: Product }[];
}

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const DeskSvg = ({ desk }: { desk: Product | null }) => {
  const color = desk?.color ?? "#d4a574";
  const isWhite = desk?.id === "desk-white-floating";
  const isStanding = desk?.id === "desk-bamboo-standing";

  return (
    <g transform="translate(180, 260)">
      {/* Back legs / supports */}
      {!isWhite && (
        <>
          <rect x="20" y="40" width="14" height="110" rx="3" fill="#5a4632" />
          <rect x="366" y="40" width="14" height="110" rx="3" fill="#5a4632" />
        </>
      )}

      {/* Standing desk base */}
      {isStanding && (
        <>
          <rect x="12" y="130" width="30" height="16" rx="3" fill="#3d2f22" />
          <rect x="358" y="130" width="30" height="16" rx="3" fill="#3d2f22" />
          <rect x="24" y="40" width="6" height="96" fill="#4a3b2a" />
          <rect x="370" y="40" width="6" height="96" fill="#4a3b2a" />
        </>
      )}

      {/* Desktop surface */}
      <rect
        x="0"
        y={isStanding ? "30" : "35"}
        width="400"
        height="24"
        rx="4"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <rect
        x="0"
        y={isStanding ? "54" : "59"}
        width="400"
        height="8"
        rx="2"
        fill={hexToRgba(color, 0.7)}
      />

      {/* Drawers for non-floating desks */}
      {!isWhite && (
        <>
          <rect x="30" y="67" width="70" height="75" rx="4" fill={hexToRgba(color, 0.85)} />
          <rect x="42" y="78" width="46" height="6" rx="3" fill="rgba(0,0,0,0.12)" />
          <rect x="42" y="100" width="46" height="6" rx="3" fill="rgba(0,0,0,0.12)" />
          <rect x="300" y="67" width="70" height="75" rx="4" fill={hexToRgba(color, 0.85)} />
          <rect x="312" y="78" width="46" height="6" rx="3" fill="rgba(0,0,0,0.12)" />
          <rect x="312" y="100" width="46" height="6" rx="3" fill="rgba(0,0,0,0.12)" />
        </>
      )}

      {isWhite && (
        <>
          <rect x="40" y="59" width="320" height="6" rx="3" fill="rgba(0,0,0,0.06)" />
        </>
      )}
    </g>
  );
};

const ChairSvg = ({ chair }: { chair: Product | null }) => {
  const color = chair?.color ?? "#2d3748";
  const isKneeling = chair?.id === "chair-wooden-kneeling";
  const isLounge = chair?.id === "chair-terracotta-lounge";

  return (
    <g transform="translate(310, 320)">
      {/* Wheels / base */}
      {!isLounge && (
        <>
          <ellipse cx="60" cy="118" rx="45" ry="10" fill="#2d3748" opacity="0.2" />
          <rect x="56" y="70" width="8" height="45" rx="2" fill="#4a5568" />
          <path d="M20 110 L100 110 M35 95 L85 95 M60 70 L60 115" stroke="#4a5568" strokeWidth="5" strokeLinecap="round" />
          <circle cx="20" cy="110" r="4" fill="#2d3748" />
          <circle cx="100" cy="110" r="4" fill="#2d3748" />
          <circle cx="35" cy="95" r="4" fill="#2d3748" />
          <circle cx="85" cy="95" r="4" fill="#2d3748" />
        </>
      )}

      {isLounge && (
        <>
          <ellipse cx="60" cy="118" rx="55" ry="12" fill="#2d3748" opacity="0.2" />
          <path d="M20 110 Q60 130 100 110" stroke="#4a5568" strokeWidth="6" fill="none" />
        </>
      )}

      {/* Seat */}
      {isKneeling ? (
        <>
          <rect x="15" y="65" width="60" height="16" rx="6" fill={color} />
          <rect x="45" y="85" width="40" height="14" rx="5" fill={hexToRgba(color, 0.8)} />
          <rect x="30" y="30" width="10" height="40" rx="3" fill="#8b6f4e" />
          <rect x="60" y="48" width="10" height="40" rx="3" fill="#8b6f4e" />
          <path d="M25 25 Q20 15 35 15 Q50 15 45 25" fill={color} />
          <path d="M55 43 Q50 33 65 33 Q80 33 75 43" fill={hexToRgba(color, 0.8)} />
        </>
      ) : (
        <>
          <rect x="25" y="60" width="70" height="20" rx="10" fill={color} />
          <rect x="32" y="5" width="56" height="65" rx="14" fill={color} />
          <rect x="37" y="10" width="46" height="45" rx="10" fill="rgba(255,255,255,0.1)" />
          {/* Armrests */}
          {!isLounge && (
            <>
              <path d="M25 30 Q10 30 10 50 L10 60" stroke="#2d3748" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M95 30 Q110 30 110 50 L110 60" stroke="#2d3748" strokeWidth="5" fill="none" strokeLinecap="round" />
            </>
          )}
        </>
      )}
    </g>
  );
};

const MonitorSvg = ({
  x,
  y,
  color,
  size = "normal",
  rotate = 0,
}: {
  x: number;
  y: number;
  color: string;
  size?: "normal" | "ultrawide";
  rotate?: number;
}) => {
  const width = size === "ultrawide" ? 110 : 80;
  const height = size === "ultrawide" ? 52 : 52;
  const centerX = width / 2;
  const centerY = height / 2;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}, ${centerX}, ${centerY})`}>
      <rect x={width / 2 - 8} y={height} width="16" height="14" fill="#2d3748" />
      <rect x={width / 2 - 22} y={height + 12} width="44" height="5" rx="2" fill="#2d3748" />
      <rect x="0" y="0" width={width} height={height} rx="4" fill={color} stroke="#1a202c" strokeWidth="2" />
      <rect x="6" y="6" width={width - 12} height={height - 12} rx="2" fill="#1a202c" opacity="0.9" />
      <rect x="10" y="10" width={width - 20} height={height - 20} rx="1" fill="#4fd1c5" opacity="0.15" />
      <rect x="14" y="14" width="30" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="14" y="22" width="20" height="3" rx="1" fill="rgba(255,255,255,0.15)" />
    </g>
  );
};

const LaptopSvg = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 50 L70 50 L80 62 L-10 62 Z" fill="#9ca3af" />
    <rect x="5" y="0" width="60" height="40" rx="3" fill="#4b5563" />
    <rect x="9" y="4" width="52" height="32" rx="1" fill="#1a202c" />
    <rect x="12" y="8" width="35" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
    <rect x="12" y="14" width="25" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
    <rect x="28" y="52" width="14" height="3" rx="1" fill="rgba(0,0,0,0.3)" />
  </g>
);

const LampSvg = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <ellipse cx="20" cy="95" rx="18" ry="5" fill="#2d3748" opacity="0.2" />
    <rect x="15" y="75" width="10" height="18" rx="2" fill="#5a4632" />
    <path d="M20 75 L20 35" stroke="#5a4632" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 35 Q20 15 45 25" stroke="#5a4632" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M42 15 L62 32 L38 38 Z" fill={color} stroke="#b7791f" strokeWidth="1" />
    <ellipse cx="50" cy="35" rx="18" ry="10" fill="#fffbeb" opacity="0.4" />
  </g>
);

const PlantSvg = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <ellipse cx="25" cy="85" rx="22" ry="6" fill="#2d3748" opacity="0.2" />
    <path d="M10 85 Q8 50 25 30 Q42 50 40 85 Z" fill="#c05621" />
    <path d="M14 80 Q12 55 25 40 Q38 55 36 80 Z" fill="#dd6b20" opacity="0.3" />
    <path d="M25 35 Q10 15 5 40 Q15 50 25 35" fill={color} />
    <path d="M25 35 Q40 10 48 35 Q38 48 25 35" fill={hexToRgba(color, 0.85)} />
    <path d="M25 40 Q25 15 25 5 Q32 20 25 40" fill={hexToRgba(color, 0.7)} />
    <path d="M25 42 Q5 35 8 55 Q18 55 25 42" fill={hexToRgba(color, 0.9)} />
    <path d="M25 42 Q45 35 42 55 Q32 55 25 42" fill={hexToRgba(color, 0.75)} />
  </g>
);

const KeyboardSvg = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x="0" y="0" width="80" height="28" rx="4" fill="#4a5568" />
    <rect x="4" y="4" width="72" height="20" rx="2" fill="#2d3748" />
    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 10 }).map((_, col) => (
        <rect
          key={`${row}-${col}`}
          x={6 + col * 7}
          y={6 + row * 4.5}
          width="5"
          height="3"
          rx="0.5"
          fill="#718096"
        />
      ))
    )}
  </g>
);

const MouseSvg = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <ellipse cx="13" cy="8" rx="13" ry="9" fill="#edf2f7" stroke="#cbd5e0" strokeWidth="1" />
    <path d="M13 3 L13 8" stroke="#a0aec0" strokeWidth="1.5" />
    <ellipse cx="13" cy="8" rx="13" ry="9" fill="url(#mouseShadow)" opacity="0.2" />
  </g>
);

const CoffeeStationSvg = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x="0" y="20" width="50" height="32" rx="3" fill="#744210" />
    <rect x="4" y="24" width="42" height="20" rx="2" fill="#975a16" />
    <rect x="18" y="10" width="14" height="16" rx="2" fill="#f6e05e" />
    <rect x="20" y="8" width="10" height="4" rx="1" fill="#2d3748" />
    <rect x="6" y="28" width="8" height="8" rx="1" fill="#d69e2e" />
    <circle cx="38" cy="32" r="5" fill="#c05621" />
  </g>
);

const BeanBagSvg = () => (
  <g transform="translate(600, 360)">
    <ellipse cx="50" cy="85" rx="55" ry="14" fill="#2d3748" opacity="0.2" />
    <path d="M10 80 Q-5 40 25 20 Q55 5 80 25 Q110 50 95 80 Q70 100 10 80" fill="#dd6b20" />
    <path d="M25 70 Q20 40 45 30 Q70 25 80 50 Q85 75 55 80 Q35 82 25 70" fill="#ed8936" opacity="0.4" />
  </g>
);

const SurfboardSvg = () => (
  <g transform="translate(40, 280)">
    <ellipse cx="20" cy="120" rx="18" ry="6" fill="#2d3748" opacity="0.2" />
    <path d="M20 0 Q45 60 35 120 Q20 130 5 120 Q-5 60 20 0" fill="#3182ce" />
    <path d="M20 10 Q38 60 30 110 Q20 118 10 110 Q2 60 20 10" fill="#63b3ed" opacity="0.35" />
    <rect x="12" y="70" width="16" height="4" rx="1" fill="#fff" opacity="0.5" />
  </g>
);

const ScooterSvg = () => (
  <g transform="translate(60, 350)">
    <ellipse cx="30" cy="95" rx="28" ry="7" fill="#2d3748" opacity="0.2" />
    <circle cx="15" cy="80" r="16" fill="#2d3748" />
    <circle cx="15" cy="80" r="9" fill="#a0aec0" />
    <circle cx="75" cy="80" r="16" fill="#2d3748" />
    <circle cx="75" cy="80" r="9" fill="#a0aec0" />
    <path d="M15 80 L45 40 L75 80" stroke="#e53e3e" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="40" y="35" width="24" height="10" rx="3" fill="#e53e3e" />
    <path d="M52 35 L52 15" stroke="#2d3748" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 20 L64 20" stroke="#2d3748" strokeWidth="3" strokeLinecap="round" />
  </g>
);

const WindowSvg = () => (
  <g transform="translate(540, 40)">
    <rect x="0" y="0" width="200" height="160" rx="8" fill="#e6fffa" stroke="#b2f5ea" strokeWidth="4" />
    <circle cx="160" cy="40" r="18" fill="#f6e05e" opacity="0.9" />
    <path d="M-10 120 Q30 90 70 110 T150 105 T220 120 V170 H-10 Z" fill="#48bb78" opacity="0.5" />
    <path d="M-10 135 Q40 115 90 130 T180 125 T220 135 V170 H-10 Z" fill="#38a169" opacity="0.6" />
    <rect x="96" y="0" width="8" height="160" fill="#fff" opacity="0.7" />
    <rect x="0" y="76" width="200" height="8" fill="#fff" opacity="0.7" />
  </g>
);

export default function WorkspaceScene({ desk, chair, accessories }: WorkspaceSceneProps) {
  const bySlot = Object.fromEntries(
    accessories.map((a) => [a.slot, a.product])
  ) as Record<AccessorySlot, Product | undefined>;

  const monitorCenter = bySlot.monitorCenter;
  const monitorLeft = bySlot.monitorLeft;
  const monitorRight = bySlot.monitorRight;
  const laptop = bySlot.laptop;
  const keyboard = bySlot.keyboard;
  const mouse = bySlot.mouse;
  const lamp = bySlot.lamp;
  const plantLeft = bySlot.plantLeft;
  const plantRight = bySlot.plantRight;
  const coffeeStation = bySlot.coffeeStation;

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="floorGradient" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#f7f1e3" />
          <stop offset="100%" stopColor="#eaddcf" />
        </radialGradient>
        <linearGradient id="wallGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="100%" stopColor="#f5e6d3" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wall */}
      <rect x="0" y="0" width="800" height="500" fill="url(#wallGradient)" />

      {/* Decorative wall elements */}
      <circle cx="120" cy="100" r="45" fill="#fed7aa" opacity="0.4" />
      <circle cx="160" cy="140" r="25" fill="#fecaca" opacity="0.3" />
      <rect x="80" y="60" width="6" height="120" rx="3" fill="#fbd38d" opacity="0.4" />
      <rect x="180" y="60" width="6" height="120" rx="3" fill="#fbd38d" opacity="0.4" />
      <rect x="92" y="110" width="82" height="6" rx="3" fill="#fbd38d" opacity="0.4" />

      {/* Floor */}
      <path d="M0 350 Q400 330 800 350 V500 H0 Z" fill="url(#floorGradient)" />

      {/* Window */}
      <WindowSvg />

      {/* Rug */}
      <ellipse cx="400" cy="430" rx="320" ry="50" fill="#fed7aa" opacity="0.35" />

      {/* Lifestyle items (background) */}
      <SurfboardSvg />
      <BeanBagSvg />
      <ScooterSvg />

      {/* Desk */}
      {desk && <DeskSvg desk={desk} />}

      {/* Chair */}
      {chair && <ChairSvg chair={chair} />}

      {/* Accessories on desk */}
      <AnimatePresence>
        {coffeeStation && (
          <g transform="translate(500, 238)">
            <motion.g
              key="coffeeStation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CoffeeStationSvg x={0} y={0} />
            </motion.g>
          </g>
        )}

        {plantLeft && (
          <g transform="translate(190, 205)">
            <motion.g
              key="plantLeft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PlantSvg x={0} y={0} color={plantLeft.color} />
            </motion.g>
          </g>
        )}

        {plantRight && (
          <g transform="translate(530, 205)">
            <motion.g
              key="plantRight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PlantSvg x={0} y={0} color={plantRight.color} />
            </motion.g>
          </g>
        )}

        {lamp && (
          <g transform="translate(525, 205)">
            <motion.g
              key="lamp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LampSvg x={0} y={0} color={lamp.color} />
            </motion.g>
          </g>
        )}

        {monitorCenter && (
          <g transform="translate(360, 221)">
            <motion.g
              key="monitorCenter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MonitorSvg
                x={0}
                y={0}
                color={monitorCenter.color}
                size={monitorCenter.id === "monitor-32-ultrawide" ? "ultrawide" : "normal"}
              />
            </motion.g>
          </g>
        )}

        {monitorLeft && (
          <g transform="translate(285, 224)">
            <motion.g
              key="monitorLeft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MonitorSvg
                x={0}
                y={0}
                color={monitorLeft.color}
                size={monitorLeft.id === "monitor-32-ultrawide" ? "ultrawide" : "normal"}
                rotate={8}
              />
            </motion.g>
          </g>
        )}

        {monitorRight && (
          <g transform="translate(455, 224)">
            <motion.g
              key="monitorRight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MonitorSvg
                x={0}
                y={0}
                color={monitorRight.color}
                size={monitorRight.id === "monitor-32-ultrawide" ? "ultrawide" : "normal"}
                rotate={-8}
              />
            </motion.g>
          </g>
        )}

        {laptop && (
          <g transform="translate(430, 240)">
            <motion.g
              key="laptop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LaptopSvg x={0} y={0} />
            </motion.g>
          </g>
        )}

        {keyboard && (
          <g transform="translate(340, 277)">
            <motion.g
              key="keyboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <KeyboardSvg x={0} y={0} />
            </motion.g>
          </g>
        )}

        {mouse && (
          <g transform="translate(435, 285)">
            <motion.g
              key="mouse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MouseSvg x={0} y={0} />
            </motion.g>
          </g>
        )}
      </AnimatePresence>
    </svg>
  );
}
