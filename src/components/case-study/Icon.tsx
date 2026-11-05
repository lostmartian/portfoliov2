import {
  BadgeCheck,
  CircleAlert,
  CircleCheck,
  Clock,
  Cpu,
  Database,
  FileDown,
  FlaskConical,
  GitCompareArrows,
  Globe,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Scale,
  Send,
  Server,
  ShieldAlert,
  ShieldCheck,
  Users,
  ScanText,
  GitMerge,
  Gavel,
  FileSearch,
  Network,
  MessagesSquare,
  ListChecks,
  Languages,
  Target,
  Equal,
  Vote,
  Ruler,
  UserCheck,
  BrainCircuit,
  Stethoscope,
  Route,
  FileHeart,
  MessageCircle,
  Siren,
  Coins,
  Braces,
  Timer,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  layers: Layers,
  alert: ShieldAlert,
  ingest: FileDown,
  validate: ShieldCheck,
  reconcile: GitCompareArrows,
  allot: Scale,
  approve: BadgeCheck,
  publish: Send,
  engine: Cpu,
  api: Server,
  portal: LayoutDashboard,
  globe: Globe,
  lab: FlaskConical,
  database: Database,
  problem: CircleAlert,
  decision: Lightbulb,
  outcome: CircleCheck,
  users: Users,
  annotate: ScanText,
  consensus: GitMerge,
  arbitrate: Gavel,
  extract: FileSearch,
  graph: Network,
  ask: MessagesSquare,
  rules: ListChecks,
  languages: Languages,
  target: Target,
  unanimous: Equal,
  majority: Vote,
  distance: Ruler,
  human: UserCheck,
  ai: BrainCircuit,
  stethoscope: Stethoscope,
  route: Route,
  report: FileHeart,
  chat: MessageCircle,
  siren: Siren,
  coins: Coins,
  contract: Braces,
  timer: Timer,
  phone: Smartphone,
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const Component = ICONS[name] ?? CircleAlert;
  return <Component aria-hidden className={className} strokeWidth={1.5} />;
}

/** Icon in a white disc, used as the visual anchor for list items. */
export function IconBadge({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-2xl bg-card text-fg ring-1 ring-line shadow-[0_1px_2px_rgb(var(--shadow)/0.04),0_4px_12px_-4px_rgb(var(--shadow)/0.08)]`}
    >
      <Icon name={name} className={size === "lg" ? "h-[22px] w-[22px]" : "h-5 w-5"} />
    </span>
  );
}
