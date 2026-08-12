import { PuffLoader } from "react-spinners";

export default function WallpaperLoader() {
  return (
    <section className="fixed bg-foreground/50 inset-0 z-50 ">
      <div className="flex min-h-full items-center justify-center">
        <div>
          {/* Logo mark */}
          <div className="w-12 h-12 bg-(--primary-color) rounded-2xl flex items-center justify-center text-white text-xl font-black mb-2 shadow-lg">
            E
          </div>
          <PuffLoader color="var(--primary-color)" size={60} />
          <p className="text-sm text-(--text-muted) font-semibold tracking-widest uppercase animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </section>
  );
}
