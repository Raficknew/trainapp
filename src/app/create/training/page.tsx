import type { Metadata } from "next";
import { TopBar } from "@/components/molecules/TopBar";
import { TrainingForm } from "@/features/training/components/TrainingForm";

export const metadata: Metadata = {
  title: "Create Training",
  description: "Create a new training session",
};

export default function CreateTrainingPage() {
  return (
    <>
      <TopBar title="Create Training" />
      <TrainingForm />
    </>
  );
}
