export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center border-t border-petrol-500 py-10 bg-petrol-400">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 lg:flex-row">
        <img className="h-8 w-auto" src="/Cosmo_white.png" alt="Cosmo Logo" />

        <p className="text-center text-petrol-50">
          Aviso legal: esta web no recopila datos personales ni cookies de
          terceros | Cosmo Studio © {currentYear}
        </p>
      </div>
    </footer>
  );
}
