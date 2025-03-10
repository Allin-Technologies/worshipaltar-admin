import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/dashbaord");

  return <div>Redirecting...</div>;
}
