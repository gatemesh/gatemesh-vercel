interface LogoProps {
  variant?: 'primary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 40,
  md: 50,
  lg: 70,
};

export function Logo({ variant = 'primary', size = 'md' }: LogoProps) {
  const hexSize = sizeMap[size];
  
  return (
    <div className="flex items-center gap-2">
      {/* Badge Authority hexagon with corn icon */}
      <svg width={hexSize} height={hexSize} viewBox="0 0 64 64">
        {/* Hexagon mesh background */}
        <path 
          d="M32 2L54 16L54 48L32 62L10 48L10 16Z" 
          fill={variant === 'dark' ? '#fff' : '#6B8E23'} 
          stroke={variant === 'dark' ? '#6B8E23' : '#8B7355'}
          strokeWidth="1"
        />
        {/* Inner hexagon pattern */}
        <path 
          d="M32 12L44 20L44 44L32 52L20 44L20 20Z" 
          fill="none"
          stroke={variant === 'dark' ? '#6B8E23' : '#fff'}
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Corn/agriculture icon - simplified */}
        <circle 
          cx="32" 
          cy="32" 
          r="8" 
          fill={variant === 'dark' ? '#6B8E23' : '#DAA520'} 
        />
        <circle 
          cx="32" 
          cy="28" 
          r="3" 
          fill={variant === 'dark' ? '#DAA520' : '#fff'} 
        />
        <circle 
          cx="32" 
          cy="36" 
          r="3" 
          fill={variant === 'dark' ? '#DAA520' : '#fff'} 
        />
      </svg>
      <span className={`font-bold tracking-tight ${
        variant === 'dark' ? 'text-white' : 'text-earth-800'
      } ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl'}`}>
        GATEMESH
      </span>
    </div>
  );
}