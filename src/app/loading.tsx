export default function Loading() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-20 min-h-screen">
      <div className="space-y-8 animate-pulse">
       
        <div className="space-y-4">
          <div className="h-10 bg-black/5 rounded w-3/4"></div>
          <div className="h-4 bg-black/5 rounded w-1/2"></div>
        </div>

       
        <div className="space-y-4 pt-8 border-t border-black/10">
          <div className="h-4 bg-black/5 rounded w-full"></div>
          <div className="h-4 bg-black/5 rounded w-full"></div>
          <div className="h-4 bg-black/5 rounded w-5/6"></div>
        </div>

        <div className="space-y-4">
          <div className="h-4 bg-black/5 rounded w-full"></div>
          <div className="h-4 bg-black/5 rounded w-full"></div>
          <div className="h-4 bg-black/5 rounded w-4/6"></div>
        </div>
      </div>
    </main>
  );
}