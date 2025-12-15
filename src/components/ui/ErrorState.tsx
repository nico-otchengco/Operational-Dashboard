export const ErrorState = ({ msg }: { msg: string }) => (
  <div className="text-center text-red-400 py-10">
    ⚠ {msg}
  </div>
);
