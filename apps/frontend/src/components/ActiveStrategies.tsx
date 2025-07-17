import React from "react";
import type { Strategy } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

interface Props {
  strategies: Strategy[];
}

const ActiveStrategies: React.FC<Props> = ({ strategies }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Strategies</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {strategies.map((strategy) => (
            <li key={strategy.id} className="flex justify-between">
              <span>{strategy.name}</span>
              <span>{strategy.status}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ActiveStrategies;
