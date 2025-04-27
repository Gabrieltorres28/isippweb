"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ScheduleCalendar, { ScheduleEvent } from "@/components/ScheduleCalendar";
import Image from "next/image";

interface SeguridadScheduleFragmentProps {
  className?: string;
}

export default function SeguridadScheduleFragment({ className }: SeguridadScheduleFragmentProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<{ startHour: number; endHour: number }>({ 
    startHour: 8, 
    endHour: 22 
  });
  const [showCustomImage, setShowCustomImage] = useState(false);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableDivisions, setAvailableDivisions] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("-");
  const [selectedDivision, setSelectedDivision] = useState<string>("-");

  useEffect(() => {
    const scanHorarios = async () => {
      try {
        setLoading(true);
        const files = await fetchAvailableFiles("seguridad");
        
        const years = new Set<string>();
        const divisions = new Set<string>();

        files.forEach(file => {
          const [_, año, division] = file.replace('.xlsx', '').split('-');
          years.add(año);
          divisions.add(division);
        });

        setAvailableYears(Array.from(years).sort());
        setAvailableDivisions(Array.from(divisions).sort());
        
        if (years.size > 0 && divisions.size > 0) {
          setSelectedYear(Array.from(years)[0]);
          setSelectedDivision(Array.from(divisions)[0]);
        }
        
      } catch (err) {
        console.error("Error escaneando horarios:", err);
        setError("No se pudieron cargar los horarios disponibles");
      } finally {
        setLoading(false);
      }
    };

    scanHorarios();
  }, []);

  useEffect(() => {
    if (selectedYear !== "-" && selectedDivision !== "-") {
      loadSchedule();
    }
  }, [selectedYear, selectedDivision]);

  const fetchAvailableFiles = async (carrera: string): Promise<string[]> => {
    try {
      const res = await fetch('/api/horarios/list');
      const data = await res.json();
      return data.files.filter((file: string) => file.startsWith(`${carrera}-`));
    } catch {
      return [
        "seguridad-1ero-a.xlsx",
        "seguridad-2do-a.xlsx",
        "seguridad-3ero-a.xlsx",
      ];
    }
  };

  const loadSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowCustomImage(false);
      setEvents([]);
      
      const filename = `seguridad-${selectedYear.toLowerCase()}-${selectedDivision.toLowerCase()}.xlsx`;
      const resp = await fetch(`/horarios/${filename}`);
      
      if (!resp.ok) {
        setShowCustomImage(true);
        return;
      }

      const arrayBuffer = await resp.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

      if (rows.length < 2) {
        setShowCustomImage(true);
        return;
      }

      const header = rows[0] as string[];
      const parsedEvents: ScheduleEvent[] = [];
      let minHour = 22;
      let maxHour = 8;

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || !row[0]) continue;

        const timeMatch = String(row[0]).match(/(\d{1,2}[,:]\d{2})\s*a\s*(\d{1,2}[,:]\d{2})/);
        if (!timeMatch) continue;

        const [inicio, fin] = [timeMatch[1], timeMatch[2]].map(time => {
          const [h, m] = time.replace(',', ':').split(':');
          return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
        });

        const startHour = parseInt(inicio.split(':')[0]);
        const endHour = parseInt(fin.split(':')[0]);
        
        minHour = Math.min(minHour, startHour);
        maxHour = Math.max(maxHour, endHour);

        for (let col = 1; col <= 5 && col < header.length; col++) {
          const cellContent = String(row[col] || "").trim();
          if (!cellContent) continue;

          const dia = header[col] as ScheduleEvent["dia"];
          const aulaMatch = cellContent.match(/\(([^)]+)\)$/);
          const materia = aulaMatch 
            ? cellContent.replace(aulaMatch[0], "").trim() 
            : cellContent;
          const aula = aulaMatch?.[1].trim();

          parsedEvents.push({
            materia,
            dia,
            inicio,
            fin,
            aula,
            sistema: `Higiene y Seguridad ${selectedYear} ${selectedDivision}`
          });
        }
      }

      setEvents(parsedEvents);
      setTimeRange({
        startHour: Math.max(7, minHour ),
        endHour: Math.min(22, maxHour )
      });
    } catch (err) {
      console.error("❌ Error:", err);
      setShowCustomImage(true);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`p-4 md:p-8 max-w-7xl mx-auto section-gradient-2 ${className || ""}`}>
      <div className="bg-card rounded-xl shadow-lg p-6 glow-border">
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-3xl font-bold text-center md:text-left text-primary font-playfair">
            🛡️ Horario de Higiene y Seguridad
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Año:</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-2"
                disabled={loading}
              >
                <option value="-">- Seleccione -</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">División:</label>
              <select 
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-2"
                disabled={loading || selectedYear === "-"}
              >
                <option value="-">- Seleccione -</option>
                {availableDivisions.map(division => (
                  <option key={division} value={division}>{division.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 mb-6 rounded">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-lg text-muted-foreground">
              {selectedYear === "-" ? "Cargando opciones..." : `Cargando horario ${selectedYear} ${selectedDivision}...`}
            </p>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            {showCustomImage ? (
              <div className="flex flex-col items-center justify-center p-8">
                <Image
                  src="/seguridad-horario-no-disponible.png"
                  alt="Horario no disponible"
                  width={500}
                  height={375}
                  className="mb-4 rounded-lg shadow-md"
                />
                <p className="text-lg text-muted-foreground text-center">
                  El horario para {selectedYear}° año - División {selectedDivision.toUpperCase()} se encuentra en preparación
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Consulta en secretaría para más información
                </p>
              </div>
            ) : events.length > 0 ? (
              <ScheduleCalendar 
                events={events} 
                startHour={timeRange.startHour}
                endHour={timeRange.endHour}
                hourHeight={120}
                className="bg-background"
              />
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                {selectedYear === "-" ? "Seleccione año y división" : "No se encontraron horarios"}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}