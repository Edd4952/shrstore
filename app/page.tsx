import Image from "next/image";
import Link from "next/link";
import StoreHeader from "./components/StoreHeader";
import TextPressure from "./components/TextPressure";

export default function Home() {
  return (
      <main
        className="flex min-h-screen w-full flex-col items-center justify-start gap-8 py-16 px-16 sm:items-start text-white"
      >
        <StoreHeader />
        <div
          className="flex flex-col items-center gap-6 border-2 border-[var(--color-bluepurple-50)] p-4 text-center sm:items-start sm:text-left"
        >
          <TextPressure
            text="Shroons"
            flex={false}
            alpha={false}
            stroke={true}
            width={true}
            weight={false}
            italic={false}
            textColor="#ffffff"
            strokeColor="#5d00ffff"
            minFontSize={96}
          />
          <h2
            className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white"
          >
            Your place for legal Shrooms
          </h2>
        </div>
        <div
          className="flex w-full flex-col items-center justify-center gap-4 border-2 border-[var(--color-green-30)] p-8 text-center"
        >
          <p className="max-w-3xl text-lg leading-relaxed text-white">
            At ShrStore, we&apos;re passionate about bringing you the finest selection of legal, sustainably-sourced mushrooms from around the world. Whether you&apos;re a culinary enthusiast looking for gourmet varieties, a health-conscious individual seeking medicinal mushrooms, or simply curious about the fascinating world of fungi, we&apos;ve got you covered.
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-white">
            Our commitment to quality means every product is carefully vetted, ethically harvested, and shipped fresh to your door. From lion&apos;s mane to shiitake, reishi to oyster mushrooms, explore our diverse catalog and discover the incredible benefits these natural wonders have to offer. Join our growing community of mushroom lovers today!
          </p>
        </div>
      </main>
  );
}