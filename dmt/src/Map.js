import { useEffect, useRef } from 'react';

function Map({ apiKey, center, zoom }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    return () => {
      map.setMap(null);
    };
  }, [apiKey, center, zoom]);

  return (<div ref={mapRef} style={{ height: '500px' }}/>);
}

export default Map;
