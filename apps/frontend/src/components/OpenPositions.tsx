import React from "react";
import type { Position } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

interface Props {
  positions: Position[];
}

const OpenPositions: React.FC<Props> = ({ positions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Average Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell>{position.symbol}</TableCell>
                <TableCell>{position.quantity}</TableCell>
                <TableCell>{position.averagePrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OpenPositions;
