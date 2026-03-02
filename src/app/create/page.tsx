import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Training",
  description: "Create a new training session",
};

export default function CreatePage() {
  return redirect("/create/training");
}
