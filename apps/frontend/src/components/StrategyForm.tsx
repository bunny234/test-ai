import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/Form";

const strategySchema = z.object({
  symbol: z.string().min(1, { message: "Symbol is required" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  risk: z.string().min(1, { message: "Risk is required" }),
});

interface Strategy {
  id?: number;
  symbol: string;
  condition: string;
  quantity: string;
  risk: string;
}

interface StrategyFormProps {
  addStrategy: (strategy: Omit<Strategy, "id">) => void;
  editing: Strategy | null;
  updateStrategy: (strategy: Strategy) => void;
  setEditing: (strategy: Strategy | null) => void;
}

const StrategyForm: React.FC<StrategyFormProps> = ({
  addStrategy,
  editing,
  updateStrategy,
  setEditing,
}) => {
  const form = useForm<z.infer<typeof strategySchema>>({
    resolver: zodResolver(strategySchema),
    defaultValues: {
      symbol: "",
      condition: "",
      quantity: "",
      risk: "",
    },
  });

  useEffect(() => {
    if (editing) {
      form.reset(editing);
    } else {
      form.reset({
        symbol: "",
        condition: "",
        quantity: "",
        risk: "",
      });
    }
  }, [editing, form]);

  const onSubmit = (values: z.infer<typeof strategySchema>) => {
    if (editing) {
      updateStrategy({ ...editing, ...values });
    } else {
      addStrategy(values);
    }
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? "Edit Strategy" : "Add Strategy"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. NIFTY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry/Exit Condition (JSON)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. {"type": "indicator", "name": "SMA", "period": 14}'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the JSON logic for your strategy's entry and exit
                    conditions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="risk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Limit</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button type="submit" className="hover:scale-105">
                {editing ? "Update Strategy" : "Add Strategy"}
              </Button>
              {editing && (
                <Button
                  variant="ghost"
                  onClick={() => setEditing(null)}
                  className="hover:scale-105"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StrategyForm;
