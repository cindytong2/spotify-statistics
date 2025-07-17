"use client";

import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AudioFeatures {
  energy: number;
  danceability: number;
  loudness: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
}

interface AudioFeaturesData {
  features: AudioFeatures;
  trackCount: number;
  timeRange: string;
}

interface AudioFeaturesRadarProps {
  timeRange: string;
}

export default function AudioFeaturesRadar({ timeRange }: AudioFeaturesRadarProps) {
  const [data, setData] = useState<AudioFeaturesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/me/top/tracks/audio-features?time_range=${timeRange}&limit=20`);
        if (!response.ok) throw new Error("Failed to fetch audio features");
        const audioFeaturesData = await response.json();
        setData(audioFeaturesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load audio features");
      } finally {
        setLoading(false);
      }
    };
    fetchAudioFeatures();
  }, [timeRange]);

  // Prepare data for the radar chart
  const chartData = data
    ? [
        { feature: "Energy", value: data.features.energy },
        { feature: "Danceability", value: data.features.danceability },
        { feature: "Loudness", value: data.features.loudness },
        { feature: "Speechiness", value: data.features.speechiness },
        { feature: "Acousticness", value: data.features.acousticness },
        { feature: "Instrumentalness", value: data.features.instrumentalness },
        { feature: "Liveness", value: data.features.liveness },
        { feature: "Valence", value: data.features.valence },
      ]
    : [];

  if (loading) {
    return (
      <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold text-white">Audio Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[hsl(263,83%,70%)] animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold text-white">Audio Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-[hsl(260,10%,60%)] text-center">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold text-white">Audio Features</CardTitle>
          </div>
          <span className="text-xs text-[hsl(260,10%,60%)]">
            {data?.trackCount || 0} tracks
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius="80%">
              <PolarGrid stroke="hsl(260,15%,25%)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="feature"
                tick={{ fill: "hsl(260,10%,70%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(260,15%,25%)" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 1]}
                tick={{ fill: "hsl(260,10%,60%)", fontSize: 10 }}
                axisLine={{ stroke: "hsl(260,15%,25%)" }}
              />
              <Radar
                name="Audio Features"
                dataKey="value"
                stroke="hsl(263,83%,70%)"
                fill="hsl(263,83%,60%)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {/* Feature descriptions */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Energy:</span> Intensity and activity
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Danceability:</span> How suitable for dancing
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Loudness:</span> Overall loudness level
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Speechiness:</span> Presence of spoken words
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Acousticness:</span> Acoustic vs electronic
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Instrumentalness:</span> Lack of vocals
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Liveness:</span> Presence of audience
          </div>
          <div className="text-[hsl(260,10%,60%)]">
            <span className="text-[hsl(263,83%,70%)] font-medium">Valence:</span> Musical positivity
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 