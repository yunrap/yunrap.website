import Link from "next/link";

export default async function Post() {
  return (
    <li key={1}>
      <Link href={`/blog/2`}>테스트</Link>
    </li>
  );
}
