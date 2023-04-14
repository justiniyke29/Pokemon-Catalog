import Post from "@/components/Post/Post";
export default function Home() {
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-4">
      <Post items={1000} />
    </div>
  );
}
