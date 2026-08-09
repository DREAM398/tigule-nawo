type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}