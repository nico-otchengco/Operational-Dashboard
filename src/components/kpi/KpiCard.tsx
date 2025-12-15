interface KpiCardProps {
  label: string;
  value: string | number;
}

export const KpiCard = ({ label, value }: KpiCardProps) => {
  return (
    <div className="bg-neutral-950 rounded-lg p-4 flex flex-col items-center justify-center">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
};
