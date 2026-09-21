import Wells from "@/themes/components/pages/wells/List";
import { getWells } from "@/lib/wells";

export default async function Page() {
  const wells = await getWells();

  return <Wells wells={wells} />;
}