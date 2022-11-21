namespace World {
  export namespace Player {
    export type Color = `#${string}`;
    export interface Head {
      value: '<' | 'v' | '^' | '>';
      point: Point;
    }
    export interface Body {
      value: string;
      point: Point;
    }
  }

  export interface Point {
    x: number;
    y: number;
  }
  export interface Player {
    id: number;
    name: string;
    color: Player.Color;
    mark: string;
    head: Player.Head;
    bodies: Array<Player.Body>;
  }
  export interface Food {
    value: string;
    point: Point;
  }
}

type Direction = 'North' | 'East' | 'South' | 'West';

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

export type { Direction, Player, World };
