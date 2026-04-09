import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
  name: string;
  values: Record<string, boolean | string>;
}

interface ComparisonTableProps {
  title: string;
  description?: string;
  columns: string[];
  features: Feature[];
  highlightColumn?: string;
}

export default function ComparisonTable({
  title,
  description,
  columns,
  features,
  highlightColumn,
}: ComparisonTableProps) {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0 px-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Feature</th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`text-center p-3 text-xs font-medium ${
                      col === highlightColumn
                        ? 'text-primary bg-primary/5'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {col === highlightColumn && (
                      <Badge variant="default" className="mb-1 text-[10px]">Best</Badge>
                    )}
                    <div>{col}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr
                  key={feature.name}
                  className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-muted/30'}`}
                >
                  <td className="p-3 text-xs text-foreground font-medium">{feature.name}</td>
                  {columns.map((col) => {
                    const val = feature.values[col];
                    const isHighlight = col === highlightColumn;
                    return (
                      <td
                        key={col}
                        className={`text-center p-3 text-xs ${isHighlight ? 'bg-primary/5' : ''}`}
                      >
                        {typeof val === 'boolean' ? (
                          val ? (
                            <span className="text-primary font-bold">&#10003;</span>
                          ) : (
                            <span className="text-muted-foreground">&#8212;</span>
                          )
                        ) : (
                          <span className={isHighlight ? 'text-primary font-medium' : 'text-muted-foreground'}>
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
