export interface Stage {
  id: number;
  title: string;
  description: string;
  docLink: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}
