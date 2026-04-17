'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCompanyLocations, useFilterStore, type CompanyLocation } from '@/lib/filterStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { logoUrl, initialsForCompany, gradientForCompany } from '@/lib/companyLogo';

const Globe = dynamic(() => import('react-globe.gl').then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] flex items-center justify-center text-muted-foreground text-sm">
      Loading globe…
    </div>
  ),
});

interface GlobeControls {
  autoRotate: boolean;
  autoRotateSpeed: number;
}
interface GlobeInstance {
  controls: () => GlobeControls;
}

interface PinDatum extends CompanyLocation {
  selected: boolean;
  dimmed: boolean;
  size: number;
}

function buildPinElement(d: PinDatum, onClick: (company: string) => void): HTMLElement {
  const wrapper = document.createElement('button');
  wrapper.type = 'button';
  wrapper.style.cssText = [
    'position:relative',
    'display:inline-flex',
    'align-items:center',
    'justify-content:center',
    'border:0',
    'padding:0',
    'background:transparent',
    'transition:all 200ms ease',
    `width:${d.size}px`,
    `height:${d.size}px`,
    `opacity:${d.dimmed ? 0.38 : 1}`,
    'cursor:pointer',
    d.selected
      ? 'filter: drop-shadow(0 0 10px rgba(232,119,46,0.85)) drop-shadow(0 0 18px rgba(232,119,46,0.4))'
      : 'filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
  ].join(';');
  wrapper.title = `${d.company} · ${d.count} visit${d.count === 1 ? '' : 's'} from ${d.country}`;

  const img = document.createElement('img');
  img.src = logoUrl(d.domain);
  img.alt = d.company;
  img.referrerPolicy = 'no-referrer';
  img.loading = 'lazy';
  img.style.cssText = [
    `width:${d.size}px`,
    `height:${d.size}px`,
    'border-radius:9999px',
    'background:#fafafa',
    'object-fit:cover',
    d.selected
      ? 'box-shadow:0 0 0 2px #E8772E, 0 0 0 4px rgba(232,119,46,0.35)'
      : 'box-shadow:0 0 0 1.5px rgba(255,255,255,0.35)',
  ].join(';');

  img.onerror = () => {
    const { from, to } = gradientForCompany(d.company);
    const fallback = document.createElement('span');
    fallback.textContent = initialsForCompany(d.company);
    fallback.style.cssText = [
      `width:${d.size}px`,
      `height:${d.size}px`,
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'border-radius:9999px',
      'color:#fff',
      'font-weight:600',
      `font-size:${Math.round(d.size * 0.4)}px`,
      `background:linear-gradient(135deg, ${from}, ${to})`,
      d.selected
        ? 'box-shadow:0 0 0 2px #E8772E, 0 0 0 4px rgba(232,119,46,0.35)'
        : 'box-shadow:0 0 0 1.5px rgba(255,255,255,0.35)',
    ].join(';');
    wrapper.replaceChild(fallback, img);
  };

  wrapper.appendChild(img);

  if (d.count > 1) {
    const badge = document.createElement('span');
    badge.textContent = String(d.count);
    badge.style.cssText = [
      'position:absolute',
      'bottom:-4px',
      'right:-4px',
      'background:#E8772E',
      'color:#fff',
      'font-size:10px',
      'font-weight:700',
      'line-height:1',
      'padding:2px 5px',
      'border-radius:9999px',
      'border:1.5px solid #0B0D12',
    ].join(';');
    wrapper.appendChild(badge);
  }

  wrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick(d.company);
  });

  return wrapper;
}

export default function VisitorGlobe() {
  const locations = useCompanyLocations(false);
  const countries = useFilterStore((s) => s.countries);
  const seniorities = useFilterStore((s) => s.seniorities);
  const selectedCompany = useFilterStore((s) => s.selectedCompany);
  const setSelectedCompany = useFilterStore((s) => s.setSelectedCompany);
  const toggleCountry = useFilterStore((s) => s.toggleCountry);

  const globeRef = useRef<GlobeInstance | null>(null);
  const [dims, setDims] = useState({ width: 460, height: 460 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      setDims({ width: w, height: Math.min(500, w) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (g?.controls) {
      const c = g.controls();
      c.autoRotate = true;
      c.autoRotateSpeed = 0.3;
    }
  }, [dims]);

  const pins: PinDatum[] = useMemo(() => {
    if (!locations.length) return [];
    const maxCount = locations[0].count || 1;
    return locations.map((loc) => {
      const countryMatch = countries.length === 0 || countries.includes(loc.country_code);
      const companyMatch = !selectedCompany || selectedCompany === loc.company;
      const seniorityMatch =
        seniorities.length === 0 || loc.seniorities.some((s) => seniorities.includes(s as never));
      const active = countryMatch && companyMatch && seniorityMatch;
      return {
        ...loc,
        selected: selectedCompany === loc.company,
        dimmed: !active,
        size: Math.round(22 + (loc.count / maxCount) * 18),
      };
    });
  }, [locations, countries, selectedCompany, seniorities]);

  const handlePinClick = (company: string) => {
    setSelectedCompany(selectedCompany === company ? null : company);
  };

  return (
    <Card className="bg-card border-border overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Where visitors are</CardTitle>
        <CardDescription className="text-xs">
          Each logo is a company that visited. Click a logo to focus the dashboard on that company;
          pins dim when filtered out.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          ref={containerRef}
          className="w-full min-h-[380px] h-[460px] rounded-lg overflow-hidden bg-[#06080F] cursor-grab active:cursor-grabbing"
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
            htmlElementsData={pins}
            htmlLat={(d: object) => (d as PinDatum).lat}
            htmlLng={(d: object) => (d as PinDatum).lng}
            htmlAltitude={0.008}
            htmlElement={(d: object) => buildPinElement(d as PinDatum, handlePinClick)}
            onGlobeClick={({ lat, lng }: { lat: number; lng: number }) => {
              void lat;
              void lng;
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            filtered / selected
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/50" />
            dimmed (outside filter)
          </span>
          <button
            type="button"
            onClick={() => toggleCountry('US')}
            className="ml-auto inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[11px] hover:text-foreground hover:border-primary/50 transition"
          >
            Quick filter: US
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
