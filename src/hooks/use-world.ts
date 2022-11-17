import { useEffect, useState } from 'react';
import { useHydraAPIClient } from '../contexts';
import { World } from '../types';
import type * as HydraAPI from '../lib/hydra-api';

interface UseWorldProps {
  autoRefresh: boolean;
}
interface UseWorld {
  (props: UseWorldProps): World;
}

const initialWorld: World = {
  width: 0,
  height: 0,
  players: [],
  foods: [],
};

const playerColor = (player: HydraAPI.World.Player): World.Player.Color => {
  const rgb: [number, number, number] = (() => {
    const charCodeSum = Array.from(`${player.name}+${player.id / 7.0}`)
      .reduce((sum, c) => sum + c.charCodeAt(0), 0);

    return [
      Math.floor(Math.pow(charCodeSum, 3) / Math.pow(256, 2)) % 256,
      Math.floor(Math.pow(charCodeSum, 3) / Math.pow(256, 1)) % 256,
      Math.floor(Math.pow(charCodeSum, 3) / Math.pow(256, 0)) % 256,
    ];
  })()
  return `#${rgb.map(n => n.toString(16).padStart(2, '0')).join('')}`;
};
const playerHeadChar = (player: HydraAPI.World.Player): World.Player.Head['value'] => {
  const map: Record<HydraAPI.World.Player.HeadDirection, World.Player.Head['value']> = {
    'North': '^',
    'East': '>',
    'South': 'v',
    'West': '<',
  };
  return map[player.headDirection];
};
const playerBodyChar = (player: HydraAPI.World.Player): World.Player.Body['value'] => {
  // NOTE: world.json からは mark が取れないので適当に name[0] を使う
  return player.name[0];
};
const convertPlayer = (rawPlayer: HydraAPI.World.Player): World.Player => {
  const [rawHead, ...rawBodies] = rawPlayer.bodies;

  const color = playerColor(rawPlayer);
  const head = { value: playerHeadChar(rawPlayer), point: rawHead };
  const bodies = rawBodies.map(rawBody => {
    return { value: playerBodyChar(rawPlayer), point: rawBody };
  });

  return {
    id: rawPlayer.id,
    name: rawPlayer.name,
    color,
    head,
    bodies,
  };
};
const convertFood = (rawFood: HydraAPI.World.Food): World.Food => {
  return {
    value: rawFood.value.toString(),
    point: rawFood.point,
  };
};
const convert = (rawWorld: HydraAPI.World): World => {
  return {
    width: rawWorld.width,
    height: rawWorld.height,
    players: rawWorld.players.map(convertPlayer),
    foods: rawWorld.foods.map(convertFood),
  };
};

const useWorld: UseWorld = ({ autoRefresh }) => {
  const refreshInterval = 0.5; // sec
  const [world, setWorld] = useState<World>(initialWorld);
  const hydraAPIClient = useHydraAPIClient();

  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(
      async () => {
        const rawWorld = await hydraAPIClient.getWorld()
        setWorld(convert(rawWorld));
      },
      refreshInterval * 1000,
    )
    return () => clearInterval(timer);
  }, [hydraAPIClient, autoRefresh]);

  return world;
};

export { useWorld };
