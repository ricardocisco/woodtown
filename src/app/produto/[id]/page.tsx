import { use } from "react";
import DetailsPage from "./DetailsPage";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DetailsPage id={id} />;
}
