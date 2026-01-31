export default function ErrorState({ message }) {
  return (
    <div className="text-center text-red-600 font-semibold">
      {message || "Something went wrong"}
    </div>
  );
}
