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

interface World {
  width: number;
  height: number;
  players: Array<World.Player>;
  foods: Array<World.Food>;
}

export type { World };
