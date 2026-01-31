import React from 'react';
import { Product } from '../App';

interface ScentDNAProps {
  product: Product;
  price: number;
  onBack: () => void;
  onAddToCollection: () => void;
}

// Extended product data for scent DNA details
interface ScentData {
  sparks: { name: string; description: string; image: string }[];
  souls: { name: string; description: string; icon: string; image: string }[];
  essences: { name: string; label: string; value: string; icon: string; image: string }[];
  structural: { evolution: string; occasion: string; volume: string };
}

// Map product IDs to their scent DNA data
const SCENT_DATA: Record<string, ScentData> = {
  "01": { // CRISP
    sparks: [
      { name: "Mint", description: "Cooling, sharp, instantly refreshing.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL3FKky7tCHnriZXe3EQfQSxLElL6VdHgb8pVXSpg1JqMiR2T16KIp9NMqmihTrxXIVjQ7ZoFutAHnmpMbykyiEmWcskQTCixmZ-SE5pAqQCWjvNVmeOA7yWiK3BMHuEZthZBbcxIQ5sf6zcWGsKt4H_rmzYiosmvsffGYntKLFRJ73zKYA12ydQdXyXV6kOkfV016yv8qr_NH4F0E-TxNIExSbZja6TM9TbDK0Eo5vsefSd6J7HuLNVpJi2KN-ctdit2beMXafDYy" },
      { name: "Lemon", description: "Bright citrus lift that energises the opening.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl6aDPt2A0RmwXN57Qxz8rckV0m4V-Obwx9pxLydr-M4cIk8SnpoNheFyI11GaGxXRRNjX0I71EgP6nmhN0B7cj2OJVOXOEOP0yD1JYH9wuWKfP4a2WjfLjBx-mEMDbnNA0FRBiOdoC884vIdKAz9-XBaZj8KrMGgCPvk0ESFz2DFcJPD8kZ3SlhoasEzoUQVy5JgoQiutfCm9hLVTXYTlbdsNFAPd4OaM-0SvsB-v_-oCvuYK2gvAn82Zgbal9hYO7kax36SRtBaI" }
    ],
    souls: [
      { name: "Lavender", description: "Soft aromatic floral that smooths the freshness.", icon: "eco", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiYsPMNKtiDTifeo9wVIHHXzBfTsG1ajpCNamUdUGCv9Wv8nDdYE7U9ICa_u_2emePXLYycm1taPQfPebrrpH7QXyvoAaMTbftiZOrwo-mUuiPi5KsxcBVM_todI12zyoa_S5eVXck2ETseUqmJ2NyJofRw8jPGSEfCTxG_OLsQtKDC1XaijOa4Rjcq6asxP7On0x3ooV7V-bweAjlMojWuUUlhyvZWUP_U-hD72PM9H1ZUeySVkZzG_GSbs-gEUcD54dVgARp65CJ" },
      { name: "Rosemary & Black Currant", description: "Herbal clarity with a subtle green-fruity edge.", icon: "nutrition", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN9zN7RAAElkiM5gsoYCv4tc_VUY9Gps1PHtqfxKL5tTjScHwq1RAAXzLd4dE4SSpTHpTolSfKPWyymwKeuZhP7DIr-W8nMGjUPcKu6E-nQOarn7oHEmjqwl-7iMZ6fXgQZcZcFcXFafLEOQs03xHl3a9DIYBV6Kyuiu5elXmSDodCQvPeZ16E8a5Tbmythb7xOu8thb4lb0srA7202zwKPLYb_7UFyGfOvbIs5P5VSFwSepgUKhKO-nutRGpF9YeSaML3qttFbOgr" }
    ],
    essences: [
      { name: "Clean Musk", label: "Intensity", value: "Medium", icon: "cloud", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCX7ih7ZA1koCFdfnYrydE-_xMMEb1_KkYpDAerY-79Wqk_8uE5CyUcQt0WolML_8LQMbJ9Ivb3V78pi3z7VHi7BmE1F1tpGFzP8NpHfUYRAD0rTZUUKF9tvxi6ben2cJaZfDd4n-4Mdh2__JsJGcWgq5SphGt8fpf8gzLRGY_hdQXzjdWJx6go8fq0OmEkvSlV2tdXOxcGXWoAf-_dDqTEs-bikajSGK6iK1DoqAkNpxZNNwDAFONDYoYuKueM8kQRvijetrCJ3L1" },
      { name: "Green Vervain", label: "Longevity", value: "8–10h", icon: "cannabis", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNckOdSQu8ju0IzDKnRHO825vt1oMHZ0AT3oxrU_hh0cphkObs1Q9UXwZHRwgevw0pNqDZIlFWQAn8qQSOnIDXt_ewVeTZLAL8rG9BlA_JUvAAuC79AlKZlru6tnVPkD1kkiZDlg6Udyz38gPTyihlGFMn77e0ZruW0ie0hGrxUJzEIxZa3iSc5hYklTZwTkm4rc2RfAvc2LUqG02O2Mad7W9m3aTzrlYDfEO3peIYUWoUCPf7dQflyYeICn8i_Bv2i-cNhDy2CUPf" },
      { name: "Herbal Dry Woods", label: "Aura", value: "Fresh", icon: "forest", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0oH31zx_Va0T9NOKoAAmsxcma0zzRulAQoxTF9n9hd5wJe5OK27Adj1CdJaMOBcAgiCdVypl5dteeL7oUsRk46kq4rkkH_FkBPy8EKd1eKOYqXxqGp_70nruKl1dD63X08i-4vVvf2UBHzNrzY-lDdC4skBQuCJEVpPsHu6xxOFVH2yu8GvxGaTSRxjFhl3EH24ihfdDJ1R84C_Xtz_Pu4cvMmOLdbTPyZLlWK1gWSPq9N-NKgzZpvfFTe94Mzf6Og2m_352Zq2Ir" },
      { name: "Skin Musk", label: "Sillage", value: "Moderate", icon: "airwave", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGWgX9fio4pBrJDC9vSb3NiHQ-U8W7jZ04PQ9kAKWLPPbDi_6MDBFiD4Irb48zk4sLjT-U20mJn497zB2v5IhlAjMbNoweZoLbY3NwKhV5OE-Lr-9iQXG1Q1N7ar9Pgje8KdpqBFExKhiZxiFHH_oV_kIsb_vzcPPERqsSwAQV51UopsgtQzz_QaRH4CSgw6rXz3Z5d7b9EdVuGWcFepIRrNAgd6VLDfcgf5BxPMDSiLzPoDm3hcPNr0sFVWIFp-oQEk-yPQLn8XBy" }
    ],
    structural: { evolution: "Linear", occasion: "Day", volume: "30ml" }
  },
  "03": { // EYES
    sparks: [
      { name: "Vanilla", description: "Creamy sweetness that draws you in instantly.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL3FKky7tCHnriZXe3EQfQSxLElL6VdHgb8pVXSpg1JqMiR2T16KIp9NMqmihTrxXIVjQ7ZoFutAHnmpMbykyiEmWcskQTCixmZ-SE5pAqQCWjvNVmeOA7yWiK3BMHuEZthZBbcxIQ5sf6zcWGsKt4H_rmzYiosmvsffGYntKLFRJ73zKYA12ydQdXyXV6kOkfV016yv8qr_NH4F0E-TxNIExSbZja6TM9TbDK0Eo5vsefSd6J7HuLNVpJi2KN-ctdit2beMXafDYy" },
      { name: "Jasmine", description: "Soft white floral lift adding elegance.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl6aDPt2A0RmwXN57Qxz8rckV0m4V-Obwx9pxLydr-M4cIk8SnpoNheFyI11GaGxXRRNjX0I71EgP6nmhN0B7cj2OJVOXOEOP0yD1JYH9wuWKfP4a2WjfLjBx-mEMDbnNA0FRBiOdoC884vIdKAz9-XBaZj8KrMGgCPvk0ESFz2DFcJPD8kZ3SlhoasEzoUQVy5JgoQiutfCm9hLVTXYTlbdsNFAPd4OaM-0SvsB-v_-oCvuYK2gvAn82Zgbal9hYO7kax36SRtBaI" }
    ],
    souls: [
      { name: "Tonka Bean", description: "Warm, roasted depth with gentle bitterness.", icon: "eco", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiYsPMNKtiDTifeo9wVIHHXzBfTsG1ajpCNamUdUGCv9Wv8nDdYE7U9ICa_u_2emePXLYycm1taPQfPebrrpH7QXyvoAaMTbftiZOrwo-mUuiPi5KsxcBVM_todI12zyoa_S5eVXck2ETseUqmJ2NyJofRw8jPGSEfCTxG_OLsQtKDC1XaijOa4Rjcq6asxP7On0x3ooV7V-bweAjlMojWuUUlhyvZWUP_U-hD72PM9H1ZUeySVkZzG_GSbs-gEUcD54dVgARp65CJ" },
      { name: "Sugar Accord", description: "Edible softness that melts into the skin.", icon: "nutrition", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN9zN7RAAElkiM5gsoYCv4tc_VUY9Gps1PHtqfxKL5tTjScHwq1RAAXzLd4dE4SSpTHpTolSfKPWyymwKeuZhP7DIr-W8nMGjUPcKu6E-nQOarn7oHEmjqwl-7iMZ6fXgQZcZcFcXFafLEOQs03xHl3a9DIYBV6Kyuiu5elXmSDodCQvPeZ16E8a5Tbmythb7xOu8thb4lb0srA7202zwKPLYb_7UFyGfOvbIs5P5VSFwSepgUKhKO-nutRGpF9YeSaML3qttFbOgr" }
    ],
    essences: [
      { name: "Golden Amber", label: "Intensity", value: "Medium–High", icon: "cloud", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCX7ih7ZA1koCFdfnYrydE-_xMMEb1_KkYpDAerY-79Wqk_8uE5CyUcQt0WolML_8LQMbJ9Ivb3V78pi3z7VHi7BmE1F1tpGFzP8NpHfUYRAD0rTZUUKF9tvxi6ben2cJaZfDd4n-4Mdh2__JsJGcWgq5SphGt8fpf8gzLRGY_hdQXzjdWJx6go8fq0OmEkvSlV2tdXOxcGXWoAf-_dDqTEs-bikajSGK6iK1DoqAkNpxZNNwDAFONDYoYuKueM8kQRvijetrCJ3L1" },
      { name: "Earthy Patchouli", label: "Longevity", value: "10–12h", icon: "cannabis", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNckOdSQu8ju0IzDKnRHO825vt1oMHZ0AT3oxrU_hh0cphkObs1Q9UXwZHRwgevw0pNqDZIlFWQAn8qQSOnIDXt_ewVeTZLAL8rG9BlA_JUvAAuC79AlKZlru6tnVPkD1kkiZDlg6Udyz38gPTyihlGFMn77e0ZruW0ie0hGrxUJzEIxZa3iSc5hYklTZwTkm4rc2RfAvc2LUqG02O2Mad7W9m3aTzrlYDfEO3peIYUWoUCPf7dQflyYeICn8i_Bv2i-cNhDy2CUPf" },
      { name: "Soft Resin Glow", label: "Aura", value: "Intimate", icon: "forest", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0oH31zx_Va0T9NOKoAAmsxcma0zzRulAQoxTF9n9hd5wJe5OK27Adj1CdJaMOBcAgiCdVypl5dteeL7oUsRk46kq4rkkH_FkBPy8EKd1eKOYqXxqGp_70nruKl1dD63X08i-4vVvf2UBHzNrzY-lDdC4skBQuCJEVpPsHu6xxOFVH2yu8GvxGaTSRxjFhl3EH24ihfdDJ1R84C_Xtz_Pu4cvMmOLdbTPyZLlWK1gWSPq9N-NKgzZpvfFTe94Mzf6Og2m_352Zq2Ir" },
      { name: "Clean Musk", label: "Sillage", value: "Moderate–Strong", icon: "airwave", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGWgX9fio4pBrJDC9vSb3NiHQ-U8W7jZ04PQ9kAKWLPPbDi_6MDBFiD4Irb48zk4sLjT-U20mJn497zB2v5IhlAjMbNoweZoLbY3NwKhV5OE-Lr-9iQXG1Q1N7ar9Pgje8KdpqBFExKhiZxiFHH_oV_kIsb_vzcPPERqsSwAQV51UopsgtQzz_QaRH4CSgw6rXz3Z5d7b9EdVuGWcFepIRrNAgd6VLDfcgf5BxPMDSiLzPoDm3hcPNr0sFVWIFp-oQEk-yPQLn8XBy" }
    ],
    structural: { evolution: "Radiant", occasion: "Night", volume: "30ml" }
  },
  "04": { // VIBE
    sparks: [
      { name: "Saffron", description: "Warm spice with metallic luxury.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL3FKky7tCHnriZXe3EQfQSxLElL6VdHgb8pVXSpg1JqMiR2T16KIp9NMqmihTrxXIVjQ7ZoFutAHnmpMbykyiEmWcskQTCixmZ-SE5pAqQCWjvNVmeOA7yWiK3BMHuEZthZBbcxIQ5sf6zcWGsKt4H_rmzYiosmvsffGYntKLFRJ73zKYA12ydQdXyXV6kOkfV016yv8qr_NH4F0E-TxNIExSbZja6TM9TbDK0Eo5vsefSd6J7HuLNVpJi2KN-ctdit2beMXafDYy" },
      { name: "Bergamot", description: "Bright citrus flash that sharpens the opening.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl6aDPt2A0RmwXN57Qxz8rckV0m4V-Obwx9pxLydr-M4cIk8SnpoNheFyI11GaGxXRRNjX0I71EgP6nmhN0B7cj2OJVOXOEOP0yD1JYH9wuWKfP4a2WjfLjBx-mEMDbnNA0FRBiOdoC884vIdKAz9-XBaZj8KrMGgCPvk0ESFz2DFcJPD8kZ3SlhoasEzoUQVy5JgoQiutfCm9hLVTXYTlbdsNFAPd4OaM-0SvsB-v_-oCvuYK2gvAn82Zgbal9hYO7kax36SRtBaI" }
    ],
    souls: [
      { name: "Bulgarian Rose", description: "Deep, velvety floral richness.", icon: "eco", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiYsPMNKtiDTifeo9wVIHHXzBfTsG1ajpCNamUdUGCv9Wv8nDdYE7U9ICa_u_2emePXLYycm1taPQfPebrrpH7QXyvoAaMTbftiZOrwo-mUuiPi5KsxcBVM_todI12zyoa_S5eVXck2ETseUqmJ2NyJofRw8jPGSEfCTxG_OLsQtKDC1XaijOa4Rjcq6asxP7On0x3ooV7V-bweAjlMojWuUUlhyvZWUP_U-hD72PM9H1ZUeySVkZzG_GSbs-gEUcD54dVgARp65CJ" },
      { name: "Liquid Oud", description: "Dark, resinous wood with syrupy depth.", icon: "nutrition", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN9zN7RAAElkiM5gsoYCv4tc_VUY9Gps1PHtqfxKL5tTjScHwq1RAAXzLd4dE4SSpTHpTolSfKPWyymwKeuZhP7DIr-W8nMGjUPcKu6E-nQOarn7oHEmjqwl-7iMZ6fXgQZcZcFcXFafLEOQs03xHl3a9DIYBV6Kyuiu5elXmSDodCQvPeZ16E8a5Tbmythb7xOu8thb4lb0srA7202zwKPLYb_7UFyGfOvbIs5P5VSFwSepgUKhKO-nutRGpF9YeSaML3qttFbOgr" }
    ],
    essences: [
      { name: "Roasted Tonka", label: "Intensity", value: "High", icon: "cloud", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCX7ih7ZA1koCFdfnYrydE-_xMMEb1_KkYpDAerY-79Wqk_8uE5CyUcQt0WolML_8LQMbJ9Ivb3V78pi3z7VHi7BmE1F1tpGFzP8NpHfUYRAD0rTZUUKF9tvxi6ben2cJaZfDd4n-4Mdh2__JsJGcWgq5SphGt8fpf8gzLRGY_hdQXzjdWJx6go8fq0OmEkvSlV2tdXOxcGXWoAf-_dDqTEs-bikajSGK6iK1DoqAkNpxZNNwDAFONDYoYuKueM8kQRvijetrCJ3L1" },
      { name: "Earth Oakmoss", label: "Longevity", value: "12h+", icon: "cannabis", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNckOdSQu8ju0IzDKnRHO825vt1oMHZ0AT3oxrU_hh0cphkObs1Q9UXwZHRwgevw0pNqDZIlFWQAn8qQSOnIDXt_ewVeTZLAL8rG9BlA_JUvAAuC79AlKZlru6tnVPkD1kkiZDlg6Udyz38gPTyihlGFMn77e0ZruW0ie0hGrxUJzEIxZa3iSc5hYklTZwTkm4rc2RfAvc2LUqG02O2Mad7W9m3aTzrlYDfEO3peIYUWoUCPf7dQflyYeICn8i_Bv2i-cNhDy2CUPf" },
      { name: "Smokey Amber", label: "Aura", value: "Bold", icon: "forest", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0oH31zx_Va0T9NOKoAAmsxcma0zzRulAQoxTF9n9hd5wJe5OK27Adj1CdJaMOBcAgiCdVypl5dteeL7oUsRk46kq4rkkH_FkBPy8EKd1eKOYqXxqGp_70nruKl1dD63X08i-4vVvf2UBHzNrzY-lDdC4skBQuCJEVpPsHu6xxOFVH2yu8GvxGaTSRxjFhl3EH24ihfdDJ1R84C_Xtz_Pu4cvMmOLdbTPyZLlWK1gWSPq9N-NKgzZpvfFTe94Mzf6Og2m_352Zq2Ir" },
      { name: "Animalic Musk", label: "Sillage", value: "Strong", icon: "airwave", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGWgX9fio4pBrJDC9vSb3NiHQ-U8W7jZ04PQ9kAKWLPPbDi_6MDBFiD4Irb48zk4sLjT-U20mJn497zB2v5IhlAjMbNoweZoLbY3NwKhV5OE-Lr-9iQXG1Q1N7ar9Pgje8KdpqBFExKhiZxiFHH_oV_kIsb_vzcPPERqsSwAQV51UopsgtQzz_QaRH4CSgw6rXz3Z5d7b9EdVuGWcFepIRrNAgd6VLDfcgf5BxPMDSiLzPoDm3hcPNr0sFVWIFp-oQEk-yPQLn8XBy" }
    ],
    structural: { evolution: "Dynamic", occasion: "Evening", volume: "30ml" }
  }
};

export const ScentDNA: React.FC<ScentDNAProps> = ({ product, price, onBack, onAddToCollection }) => {
  const scentData = SCENT_DATA[product.id] || SCENT_DATA["01"];

  return (
    <div className="relative min-h-[100dvh] w-full bg-background-dark">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <button 
            onClick={onBack}
            className="text-white flex size-12 shrink-0 items-center cursor-pointer hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>
          <div className="text-center">
            <h2 className="text-white text-[10px] uppercase tracking-widest font-bold opacity-60">Zuaera Laboratory</h2>
            <h1 className="gold-gradient-text text-lg font-bold leading-tight tracking-[-0.015em]">{product.name} Accurate Scent DNA</h1>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-lg h-12 bg-transparent text-white p-0 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-20 pb-32 overflow-x-hidden">
        {/* Stratum 01 - The Spark */}
        <section className="relative min-h-[400px] flex flex-col">
          <div className="px-4 py-6 text-center">
            <h4 className="text-primary text-[10px] font-bold leading-normal tracking-[0.4em] uppercase mb-1">Stratum 01</h4>
            <h3 className="text-white text-xl font-bold tracking-tight">THE SPARK</h3>
          </div>
          <div className="flex-1 flex items-center justify-center relative px-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              {scentData.sparks.map((spark, index) => (
                <div key={index} className="relative group">
                  <div 
                    className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square border border-primary/20 shadow-[0_0_20px_rgba(242,208,13,0.1)]"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%), url("${spark.image}")` }}
                  >
                    <div>
                      <p className="text-primary text-[10px] uppercase font-bold tracking-widest">Spark {String(index + 1).padStart(2, '0')}</p>
                      <p className="text-white text-lg font-bold leading-tight">{spark.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-24 w-full bg-gradient-to-b from-transparent to-primary/5"></div>
        </section>

        {/* Stratum 02 - The Soul */}
        <section className="relative min-h-[450px] flex flex-col bg-gradient-to-b from-primary/5 via-primary/10 to-transparent">
          <div className="px-4 py-6 text-center">
            <h4 className="text-primary text-[10px] font-bold leading-normal tracking-[0.4em] uppercase mb-1">Stratum 02</h4>
            <h3 className="text-white text-xl font-bold tracking-tight">THE SOUL</h3>
          </div>
          <div className="flex-1 px-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              {scentData.souls.map((soul, index) => (
                <div 
                  key={index}
                  className="relative bg-cover bg-center h-48 rounded-xl overflow-hidden border border-primary/30 flex items-center p-6"
                  style={{ backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 100%), url("${soul.image}")` }}
                >
                  <div className={index === 0 ? "max-w-[60%]" : "max-w-[65%]"}>
                    <h5 className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Soul {String(index + 1).padStart(2, '0')}</h5>
                    <p className={`text-white font-bold mb-2 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>{soul.name}</p>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{soul.description}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                      <span className="material-symbols-outlined text-primary text-3xl">{soul.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stratum 03 - The Essence */}
        <section className="relative bg-black min-h-[500px]">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-40 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -ml-40"></div>
          
          <div className="relative z-10">
            <div className="px-4 py-8 text-center">
              <h4 className="text-primary text-[10px] font-bold leading-normal tracking-[0.4em] uppercase mb-1">Stratum 03</h4>
              <h3 className="text-white text-xl font-bold tracking-tight">THE ESSENCE</h3>
            </div>
            
            <div className="px-4 space-y-4">
              {scentData.essences.map((essence, index) => (
                <div key={index} className="glass-panel p-4 rounded-xl flex items-center gap-4 relative overflow-hidden">
                  <div 
                    className={`absolute inset-0 ${index === 3 ? 'opacity-10' : 'opacity-20'} bg-cover bg-center mix-blend-overlay`}
                    style={{ backgroundImage: `url('${essence.image}')` }}
                  ></div>
                  <div className="size-12 rounded bg-primary/20 flex items-center justify-center border border-primary/30 relative z-10">
                    <span className="material-symbols-outlined text-primary">{essence.icon}</span>
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">Essence {String(index + 1).padStart(2, '0')}</p>
                    <h6 className="text-base font-bold">{essence.name}</h6>
                  </div>
                  <div className="text-right relative z-10">
                    <p className="text-[10px] text-white/40 uppercase">{essence.label}</p>
                    <p className="text-xs font-bold text-primary">{essence.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Structural Analysis */}
            <div className="mt-12 px-6 pb-12 border-t border-primary/10 pt-8">
              <h5 className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mb-6 text-center">Structural Analysis</h5>
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-primary/20 p-3 text-center">
                  <p className="text-[8px] uppercase text-white/40 mb-1 tracking-tighter">Evolution</p>
                  <p className="text-xs font-bold">{scentData.structural.evolution}</p>
                </div>
                <div className="border border-primary/20 p-3 text-center">
                  <p className="text-[8px] uppercase text-white/40 mb-1 tracking-tighter">Occasion</p>
                  <p className="text-xs font-bold">{scentData.structural.occasion}</p>
                </div>
                <div className="border border-primary/20 p-3 text-center">
                  <p className="text-[8px] uppercase text-white/40 mb-1 tracking-tighter">Volume</p>
                  <p className="text-xs font-bold">{scentData.structural.volume}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-xl border-t border-primary/20">
        <div className="max-w-md mx-auto p-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/50">Retail Value</span>
            <span className="text-xl font-bold gold-gradient-text">₹{price.toLocaleString('en-IN')}</span>
          </div>
          <button 
            onClick={onAddToCollection}
            className="flex-1 bg-primary text-black h-12 rounded font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary/90"
          >
            <span>Add to Collection</span>
            <span className="material-symbols-outlined text-sm">lock</span>
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]"></div>
      </div>

      {/* Custom styles for gold gradient */}
      <style>{`
        .gold-gradient-text {
          background: linear-gradient(to bottom, #f2d00d 0%, #a68d06 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-panel {
          background: rgba(17, 17, 17, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(242, 208, 13, 0.1);
        }
      `}</style>
    </div>
  );
};
