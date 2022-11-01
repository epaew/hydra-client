namespace World {
  export namespace Player {
    export type HeadDirection = 'North' | 'East' | 'South' | 'West';
  }

  export interface Point {
    x: number;
    y: number;
  }
  export interface Player {
    id: number;
    name: string;
    headDirection: Player.HeadDirection;
    bodies: Array<Point>;
  }
  export interface Food {
    value: number;
    point: Point;
  }
}

interface Player {
  id: number;
  name: string;
  password: string;
  mark: string;
}

interface World {
  width: number;
  height: number;
  players: Array<World.Player>;
  foods: Array<World.Food>;
}

export type { Player, World };
