import { notFound } from "next/navigation";
import { labsData } from "@/data/labsData";
import LabDetailClient from "./LabDetailClient";

type LabPageProps = {
  params: {
    id: string;
  };
};

const numericLabId = (id: string) => id.replace(/^lab/i, "");

function getLabByRouteId(id: string) {
  return labsData.find((lab) => lab.id === id || numericLabId(lab.id) === id);
}

export function generateStaticParams() {
  return labsData.flatMap((lab) => [
    { id: numericLabId(lab.id) },
    { id: lab.id },
  ]);
}

export default function LabDetailPage({ params }: LabPageProps) {
  const lab = getLabByRouteId(params.id);

  if (!lab) {
    notFound();
  }

  return <LabDetailClient lab={lab} />;
}
