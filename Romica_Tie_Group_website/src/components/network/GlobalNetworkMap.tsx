import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

// Since this project has Supabase enabled, we'll use environment variables from Supabase secrets
// For now, we'll show an input field for the user to enter their Mapbox token temporarily
const GlobalNetworkMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  // Sample agent data - in production this would come from your database
  const agents = [
    {
      id: 1,
      name: 'North Atlantic Marine Solutions',
      region: 'United Kingdom & Ireland',
      coordinates: [-3.4360, 55.3781],
      contact: {
        email: 'info@nams.co.uk',
        phone: '+44 (0) 131 555 0123',
        address: 'Edinburgh, Scotland'
      },
      services: ['A-Frames', 'Winches', 'LARS'],
      established: '2018'
    },
    {
      id: 2,
      name: 'Nordic Marine Engineering',
      region: 'Scandinavia',
      coordinates: [10.7522, 59.9139],
      contact: {
        email: 'contact@nordicmarine.no',
        phone: '+47 22 12 34 56',
        address: 'Oslo, Norway'
      },
      services: ['Oceanographic Equipment', 'Survey Systems'],
      established: '2020'
    },
    {
      id: 3,
      name: 'Pacific Marine Technologies',
      region: 'Asia Pacific',
      coordinates: [151.2093, -33.8688],
      contact: {
        email: 'info@pacificmarine.com.au',
        phone: '+61 2 9876 5432',
        address: 'Sydney, Australia'
      },
      services: ['ROV Systems', 'Deep Water Equipment'],
      established: '2019'
    },
    {
      id: 4,
      name: 'Gulf Marine Solutions',
      region: 'Middle East',
      coordinates: [55.2708, 25.2048],
      contact: {
        email: 'sales@gulfmarine.ae',
        phone: '+971 4 123 4567',
        address: 'Dubai, UAE'
      },
      services: ['Offshore Systems', 'Marine Handling'],
      established: '2021'
    },
    {
      id: 5,
      name: 'Americas Marine Engineering',
      region: 'North America',
      coordinates: [-74.0060, 40.7128],
      contact: {
        email: 'info@americasmarine.com',
        phone: '+1 (555) 123-4567',
        address: 'New York, USA'
      },
      services: ['Research Vessels', 'Commercial Systems'],
      established: '2017'
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        projection: 'globe' as any,
        zoom: 1.5,
        center: [30, 15],
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere effects
      map.current.on('style.load', () => {
        if (!map.current) return;
        
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });

        // Add markers for each agent
        agents.forEach((agent) => {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'custom-marker';
          markerEl.style.cssText = `
            width: 40px;
            height: 40px;
            background: hsl(var(--primary));
            border: 3px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
          `;
          
          const icon = document.createElement('div');
          icon.innerHTML = '📍';
          icon.style.fontSize = '16px';
          markerEl.appendChild(icon);

          // Add hover effect
          markerEl.addEventListener('mouseenter', () => {
            markerEl.style.transform = 'scale(1.2)';
          });
          markerEl.addEventListener('mouseleave', () => {
            markerEl.style.transform = 'scale(1)';
          });

          // Create marker
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat(agent.coordinates as [number, number])
            .addTo(map.current!);

          // Add click handler
          markerEl.addEventListener('click', () => {
            setSelectedAgent(agent);
          });
        });
      });

      setMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    if (mapboxToken && !mapInitialized) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        setMapInitialized(false);
      }
    };
  }, [mapboxToken]);

  return (
    <div className="space-y-6">
      {/* Mapbox Token Input */}
      {!mapInitialized && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Configure Map Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To display the interactive map, please enter your Mapbox public token. 
              You can get a free token at{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter your Mapbox public token..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={initializeMap} disabled={!mapboxToken.trim()}>
                Load Map
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div 
            ref={mapContainer} 
            className="w-full h-[500px] rounded-lg shadow-lg bg-muted flex items-center justify-center"
          >
            {!mapInitialized && (
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p>Interactive map will appear here once configured</p>
              </div>
            )}
          </div>
        </div>

        {/* Agent Information Panel */}
        <div className="space-y-4">
          {selectedAgent ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedAgent.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedAgent.region}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a 
                        href={`mailto:${selectedAgent.contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {selectedAgent.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{selectedAgent.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{selectedAgent.contact.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedAgent.services.map((service: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Partner since {selectedAgent.established}
                </div>

                <Button className="w-full" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Agent
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Select a Location
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click on any marker on the map to view detailed information about 
                  our local representatives in that region.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Direct Support?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Can't find a representative in your area? Contact our global team directly.
              </p>
              <Button variant="outline" className="w-full" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                global@romica.com
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GlobalNetworkMap;