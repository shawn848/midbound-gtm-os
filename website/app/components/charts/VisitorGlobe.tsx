'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useByCountry, useFilterStore } from '@/lib/filterStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Globe = dynamic(() => import('react-globe.gl').then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] flex items-center justify-center text-muted-foreground text-sm">
      Loading globe…
    </div>
  ),
});

interface PinPoint {
  lat: number;
  lng: number;
  count: number;
  country: string;
  country_code: string;
  size: number;
  color: string;
}

interface GlobeControls {
  autoRotate: boolean;
  autoRotateSpeed: number;
}
interface GlobeInstance {
  controls: () => GlobeControls;
}

export default function VisitorGlobe() {
  const byCountry = useByCountry();
  const countries = useFilterStore((s) => s.countries);
  const toggleCountry = useFilterStore((s) => s.toggleCountry);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [dims, setDims] = useState({ width: 420, height: 420 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      setDims({ width: w, height: Math.min(420, w) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (g?.controls) {
      const c = g.controls();
      c.autoRotate = true;
      c.autoRotateSpeed = 0.35;
    }
  }, [dims]);

  const maxCount = byCountry[0]?.count ?? 1;
  const pins: PinPoint[] = byCountry.map((row) => {
    const isActive = countries.length === 0 || countries.includes(row.country_code);
    return {
      lat: row.lat,
      lng: row.lng,
      count: row.count,
      country: row.country,
      country_code: row.country_code,
      size: 0.35 + (row.count / maxCount) * 1.6,
      color: isActive ? '#E8772E' : '#64748B',
    };
  });

  return (
    <Card className="bg-card border-border overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Where visitors are</CardTitle>
        <CardDescription className="text-xs">
          Click a pin to filter every chart below to that country. Drag to rotate.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          ref={containerRef}
          className="w-full min-h-[360px] h-[420px] rounded-lg overflow-hidden bg-[#06080F] cursor-grab active:cursor-grabbing"
        >
          <Globe
            ref={globeRef as unknown as React.MutableRefObject<undefined>}
            width={dims.width}
            height={dims.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(6, 8, 15, 0)"
            atmosphereColor="rgba(232,119,46,0.4)"
            atmosphereAltitude={0.18}
            pointsData={pins}
            pointLat={(d: object) => (d as PinPoint).lat}
            pointLng={(d: object) => (d as PinPoint).lng}
            pointAltitude={(d: object) => (d as PinPoint).size * 0.12}
            pointRadius={(d: object) => (d as PinPoint).size * 0.55}
            pointColor={(d: object) => (d as PinPoint).color}
            pointLabel={(d: object) => {
              const p = d as PinPoint;
              return `<div style="font:600 12px system-ui;color:#fff;background:rgba(10,12,18,0.92);padding:6px 10px;border-radius:6px;border:1px solid rgba(232,119,46,0.5);">${p.country} · ${p.count} visits</div>`;
            }}
            onPointClick={(d: object) => {
              toggleCountry((d as PinPoint).country_code);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
