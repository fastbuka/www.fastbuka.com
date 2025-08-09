import Footer from "@/components/Footer";
import TrackOrder from "@/components/TrackOrder";

type Params = Promise<{
  uuid: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { uuid } = await params;

  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <TrackOrder uuid={uuid} />
      <Footer />
    </main>
  );
}
