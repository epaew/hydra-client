import { Direction } from './direction';

interface Point {
  x: number;
  y: number;
}

namespace World {
  export interface Player {
    id: number;
    name: string;
    mark: string;
    headDirection: Direction;
    bodies: Array<Point>;
  }
  export interface Food {
    value: number;
    point: Point;
  }
}

interface World {
  width: number;
  height: number;
  players: Array<World.Player>;
  foods: Array<World.Food>;
}

export type { World };
