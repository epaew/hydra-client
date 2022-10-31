import { useEffect, useState } from 'react';
import { useHTTPClient } from '../contexts';

type World = string;
interface UseTextWorldProps {
  autoRefresh: boolean;
  refreshInterval: number;
}
interface UseTextWorld {
  (props: UseTextWorldProps): World;
}

const useTextWorld: UseTextWorld = ({ autoRefresh, refreshInterval }) => {
  const [world, setWorld] = useState<World>('');
  const httpClient = useHTTPClient();

  useEffect(() => {
    if (!(autoRefresh && refreshInterval)) return;

    const timer = setInterval(
      async () => {
        const res = await httpClient.get('/api/world.text', { headers: { Accept: 'text/plain' } });
        setWorld(await res.text());
      },
      refreshInterval * 1000,
    )
    return () => clearInterval(timer);
  }, [httpClient, autoRefresh, refreshInterval]);

  return world;
};

export { useTextWorld };
