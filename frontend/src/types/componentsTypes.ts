type Legend = {
  color: string;
  name: string;
};

export type LegendProps = {
  item: Legend[];
  orientation: "horizontal" | "vertical";
};
