export function PlatypusLoader({ size = 64, className = '' }) {
  return (
    <div className={`platypus-loader ${className}`} aria-label="Loading" role="status">
      <svg
        className="platypus"
        width={size}
        height={size}
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="stroke"
          d="M30 40
             C30 26 42 18 58 18
             C78 18 92 26 92 40
             C92 54 78 62 58 62
             C42 62 30 54 30 40Z"
        />
        <path className="stroke" d="M22 38 C10 34 10 46 22 42" />
        <path className="stroke" d="M92 33 C102 33 108 37 108 40 C108 43 102 47 92 47" />
        <path className="stroke" d="M108 38 C114 38 118 39.5 118 40 C118 40.5 114 42 108 42" />
        <path className="stroke" d="M96 34.5 L96 34.6" />
        <path className="stroke leg leg1" d="M46 60 C44 66 48 68 50 62" />
        <path className="stroke leg leg2" d="M60 60 C58 66 62 68 64 62" />
        <path className="stroke leg leg3" d="M72 58 C70 64 74 66 76 60" />
        <path className="stroke leg leg4" d="M36 58 C34 64 38 66 40 60" />
      </svg>
    </div>
  )
}
