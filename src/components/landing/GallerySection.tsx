import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import galleryStage from "@/assets/gallery-stage.jpg";
import galleryCrowd from "@/assets/gallery-crowd.jpg";
import galleryGuitar from "@/assets/gallery-guitar.jpg";

const images = [
  { src: galleryStage, alt: "Trio no palco", span: "col-span-2 row-span-2" },
  { src: galleryCrowd, alt: "Público vibrante", span: "col-span-1 row-span-1" },
  { src: galleryGuitar, alt: "Detalhes musicais", span: "col-span-1 row-span-1" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Galeria</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Momentos <span className="text-gradient-gold">inesquecíveis</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`${img.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="font-heading text-xs tracking-widest uppercase text-foreground">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
