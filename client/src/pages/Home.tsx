import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Factory, Sparkles, Truck } from "lucide-react";
import { PublicLayout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const HERO_IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQseVPWNUrxVD3NNUSUKpwp2mts58zhzmtUQ&s";
const EXISTING_IMAGE_URL = "https://woolandwaves.com/cdn/shop/articles/yarn-review-2021.jpg?v=1626293464&width=1600";
const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "Combed Cotton Yarn": "https://5.imimg.com/data5/UW/MN/MY-3474667/combed-cotton-yarn.jpg",
  "Carded Cotton Yarn": "https://5.imimg.com/data5/OA/CP/MY-198030/carded-cotton-yarns-500x500.jpg",
  "Polyester Blend": "https://5.imimg.com/data5/LW/YD/MY-16992/polyester-viscose-blended-yarn.jpg",
  "Open-End Yarn": "https://5.imimg.com/data5/TI/WH/US/SELLER-54848766/open-end-yarn-500x500.jpg",
  "Mélange Yarn": "https://saanikaindustries.com/wp-content/uploads/2022/11/Melange-Yarn-1024x1024.webp",
  "Compact Yarn": "https://5.imimg.com/data5/BK/AG/MY-10499989/cotton-100-25-compact-yarn.jpg",
  "Slub Yarn": "https://3.imimg.com/data3/RL/KR/MY-7973967/cotton-slub-yarn-500x500.jpg",
  "Core-Spun Yarn": "https://www.roundbarnfiber.com/uploads/1/2/7/7/12776064/20190903-152705_orig.jpg",
};

const carouselImages = [
  "https://drive.google.com/file/d/1x3H40j7UUqaqFGpjttSp9RgFnXPD7Hra/view?usp=sharing",
  "https://drive.google.com/file/d/1XLq2FEPZcgZegDH_S4QDRRRvHAmLDrft/view?usp=sharing",
  EXISTING_IMAGE_URL,
];

const products = [
  { name: "Combed Cotton Yarn", image: PRODUCT_IMAGE_MAP["Combed Cotton Yarn"], desc: "Premium ring-spun combed cotton — 20s to 60s counts." },
  { name: "Carded Cotton Yarn", image: PRODUCT_IMAGE_MAP["Carded Cotton Yarn"], desc: "Reliable everyday yarn for weaving and knitting." },
  { name: "Polyester Blend", image: PRODUCT_IMAGE_MAP["Polyester Blend"], desc: "PC and CVC blends engineered for durability." },
  { name: "Open-End Yarn", image: PRODUCT_IMAGE_MAP["Open-End Yarn"], desc: "High-volume rotor-spun yarn for denim and home textiles." },
  { name: "Mélange Yarn", image: PRODUCT_IMAGE_MAP["Mélange Yarn"], desc: "Pre-dyed fiber blends with consistent shade quality." },
  { name: "Compact Yarn", image: PRODUCT_IMAGE_MAP["Compact Yarn"], desc: "Low-hairiness compact yarn for premium fabrics." },
  { name: "Slub Yarn", image: PRODUCT_IMAGE_MAP["Slub Yarn"], desc: "Designer slub yarn for fashion fabrics." },
  { name: "Core-Spun Yarn", image: PRODUCT_IMAGE_MAP["Core-Spun Yarn"], desc: "Strength-enhanced yarn for sewing threads." },
];

const Home = () => {
  const [slide, setSlide] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(
      () => setSlide((s) => (s + 1) % carouselImages.length),
      4500
    );
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const scrollToContact = () => {
    window.location.assign("/contact");
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE_URL}
            alt="Mittal Spinners yarn manufacturing facility"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        <div className="container relative grid min-h-[80vh] items-center py-20">
          <div className="max-w-2xl text-brand-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-950/40 px-3 py-1 text-xs uppercase tracking-wider text-brand-300">
              <Sparkles className="h-3 w-3" /> Yarn Manufacturing • Est. 1998
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-background md:text-6xl">
              Mittal Spinners
            </h1>
            <p className="mt-4 max-w-xl text-lg text-brand-100/85">
              Precision-spun cotton, blends and specialty yarns — engineered for
              consistency, delivered at scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={scrollToContact} className="gap-2">
                Make Inquiry <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-brand-300/40 bg-brand-950/30 text-background hover:bg-brand-950/60">
                  Explore Products
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 text-brand-100">
              <Stat icon={<Factory className="h-4 w-4" />} k="25+" l="Years" />
              <Stat icon={<Sparkles className="h-4 w-4" />} k="40t" l="Daily output" />
              <Stat icon={<Truck className="h-4 w-4" />} k="12+" l="Countries" />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="container py-16">
        <SectionHeader eyebrow="Featured" title="Recent yarn lots" />
        <div className="relative mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <div className="aspect-[16/7] w-full bg-secondary">
            <img
              src={carouselImages[slide]}
              alt={`Featured ${slide + 1}`}
              className="h-full w-full object-cover transition-opacity duration-500"
              onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.2")}
            />
          </div>
          <button
            onClick={() => setSlide((s) => (s - 1 + carouselImages.length) % carouselImages.length)}
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setSlide((s) => (s + 1) % carouselImages.length)}
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {carouselImages.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-background" : "w-1.5 bg-background/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product gallery */}
      <section className="container py-16">
        <SectionHeader eyebrow="Catalogue" title="Our yarn range" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="overflow-hidden rounded-xl bg-gradient-hero p-10 text-center shadow-elevated md:p-16">
          <h2 className="text-3xl font-semibold text-background md:text-4xl">
            Need a custom yarn specification?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100/85">
            Share your count, blend and volume — our team will respond within 24 hours.
          </p>
          <div className="mt-6">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="gap-2">
                Make Inquiry <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

const Stat = ({ icon, k, l }: { icon: React.ReactNode; k: string; l: string }) => (
  <div>
    <div className="flex items-center gap-1.5 text-brand-300">{icon}<span className="text-xs uppercase tracking-wider">{l}</span></div>
    <div className="mt-1 text-2xl font-semibold text-background">{k}</div>
  </div>
);

const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
    <h2 className="mt-1 text-3xl font-semibold text-foreground">{title}</h2>
  </div>
);

export default Home;
