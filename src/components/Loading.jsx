export default function Loading({ text = "Loading…" }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* LOADER */}
        <div className="w-10 h-10 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />

        {/* TEXT */}
        <p className="text-sm text-neutral-500 tracking-wide">
          {text}
        </p>
      </div>
    </div>
  );
}
