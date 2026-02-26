interface WaveDividerProps {
  flip?: boolean;
  color?: string;
}

export default function WaveDivider({ flip = false, color = "#ffffff" }: WaveDividerProps) {
  
  return (
    <div
      className={`absolute ${flip ? "-top-1 rotate-180" : "-bottom-1"} left-0 w-full overflow-hidden leading-none`}
    >
      <svg
        viewBox="0 0 1440 320"
        className="relative block w-full h-24"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,160L80,144C160,128,320,96,480,112C640,128,800,192,960,192C1120,192,1280,128,1360,96L1440,64V320H0Z"
        />
      </svg>
    </div>
  );
}