import { Card, CardContent } from "@/src/components/ui/card";
import React, { ReactNode } from "react";

export interface CardProps {
  label: string;
  icon: ReactNode;
  data: string | number;
}

export default function CardInfo({ label, icon, data }: CardProps) {
  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{data}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
