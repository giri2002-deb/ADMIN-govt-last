import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FinanceCardProps {
  title: string;
  tamilTitle: string;
  description?: string;
  icon: React.ReactNode;
  variant: "gold" | "crops" | "animal";
  onClick: () => void;
  className?: string;
}

const variantStyles = {
  gold: {
    card: "border-gold/20 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10",
    header: "text-gold",
    button: "bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/90 hover:to-yellow-500/90 text-gold-foreground"
  },
  crops: {
    card: "border-crops/20 hover:border-crops/40 hover:shadow-lg hover:shadow-crops/10",
    header: "text-crops",
    button: "bg-gradient-to-r from-crops to-green-600 hover:from-crops/90 hover:to-green-600/90 text-crops-foreground"
  },
  animal: {
    card: "border-animal/20 hover:border-animal/40 hover:shadow-lg hover:shadow-animal/10",
    header: "text-animal",
    button: "bg-gradient-to-r from-animal to-blue-600 hover:from-animal/90 hover:to-blue-600/90 text-animal-foreground"
  }
};

export function FinanceCard({ 
  title, 
  tamilTitle, 
  description, 
  icon, 
  variant, 
  onClick, 
  className 
}: FinanceCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105",
        styles.card,
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
        <CardTitle className={cn("text-xl font-semibold", styles.header)}>
          {title}
        </CardTitle>
        <CardDescription className="text-lg font-medium text-foreground/80">
          {tamilTitle}
        </CardDescription>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          className={cn(
            "w-full font-semibold transition-all duration-300",
            styles.button
          )}
          size="lg"
        >
          தொடங்கு / Start
        </Button>
      </CardContent>
    </Card>
  );
}