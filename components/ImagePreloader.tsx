import React, { useEffect } from 'react';

// All images used throughout the app that should be preloaded
const PRELOAD_IMAGES = [
  // Product images
  '/Crispy (Male).jpeg',
  '/crispy2.jpeg',
  '/crispy3.png',
  '/Eyes (female).jpeg',
  '/vibe (unisex).jpeg',
  '/vibe2.jpeg',
  '/vibe3.jpg',
  
  // Ingredient images
  '/mint.png',
  '/lavender.png',
  '/musk.png',
  '/vanilla.png',
  '/jasmine.png',
  '/saffron.png',
  
  // ScentDNA images from Google Cloud
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCL3FKky7tCHnriZXe3EQfQSxLElL6VdHgb8pVXSpg1JqMiR2T16KIp9NMqmihTrxXIVjQ7ZoFutAHnmpMbykyiEmWcskQTCixmZ-SE5pAqQCWjvNVmeOA7yWiK3BMHuEZthZBbcxIQ5sf6zcWGsKt4H_rmzYiosmvsffGYntKLFRJ73zKYA12ydQdXyXV6kOkfV016yv8qr_NH4F0E-TxNIExSbZja6TM9TbDK0Eo5vsefSd6J7HuLNVpJi2KN-ctdit2beMXafDYy',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBl6aDPt2A0RmwXN57Qxz8rckV0m4V-Obwx9pxLydr-M4cIk8SnpoNheFyI11GaGxXRRNjX0I71EgP6nmhN0B7cj2OJVOXOEOP0yD1JYH9wuWKfP4a2WjfLjBx-mEMDbnNA0FRBiOdoC884vIdKAz9-XBaZj8KrMGgCPvk0ESFz2DFcJPD8kZ3SlhoasEzoUQVy5JgoQiutfCm9hLVTXYTlbdsNFAPd4OaM-0SvsB-v_-oCvuYK2gvAn82Zgbal9hYO7kax36SRtBaI',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCiYsPMNKtiDTifeo9wVIHHXzBfTsG1ajpCNamUdUGCv9Wv8nDdYE7U9ICa_u_2emePXLYycm1taPQfPebrrpH7QXyvoAaMTbftiZOrwo-mUuiPi5KsxcBVM_todI12zyoa_S5eVXck2ETseUqmJ2NyJofRw8jPGSEfCTxG_OLsQtKDC1XaijOa4Rjcq6asxP7On0x3ooV7V-bweAjlMojWuUUlhyvZWUP_U-hD72PM9H1ZUeySVkZzG_GSbs-gEUcD54dVgARp65CJ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAN9zN7RAAElkiM5gsoYCv4tc_VUY9Gps1PHtqfxKL5tTjScHwq1RAAXzLd4dE4SSpTHpTolSfKPWyymwKeuZhP7DIr-W8nMGjUPcKu6E-nQOarn7oHEmjqwl-7iMZ6fXgQZcZcFcXFafLEOQs03xHl3a9DIYBV6Kyuiu5elXmSDodCQvPeZ16E8a5Tbmythb7xOu8thb4lb0srA7202zwKPLYb_7UFyGfOvbIs5P5VSFwSepgUKhKO-nutRGpF9YeSaML3qttFbOgr',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCCX7ih7ZA1koCFdfnYrydE-_xMMEb1_KkYpDAerY-79Wqk_8uE5CyUcQt0WolML_8LQMbJ9Ivb3V78pi3z7VHi7BmE1F1tpGFzP8NpHfUYRAD0rTZUUKF9tvxi6ben2cJaZfDd4n-4Mdh2__JsJGcWgq5SphGt8fpf8gzLRGY_hdQXzjdWJx6go8fq0OmEkvSlV2tdXOxcGXWoAf-_dDqTEs-bikajSGK6iK1DoqAkNpxZNNwDAFONDYoYuKueM8kQRvijetrCJ3L1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNckOdSQu8ju0IzDKnRHO825vt1oMHZ0AT3oxrU_hh0cphkObs1Q9UXwZHRwgevw0pNqDZIlFWQAn8qQSOnIDXt_ewVeTZLAL8rG9BlA_JUvAAuC79AlKZlru6tnVPkD1kkiZDlg6Udyz38gPTyihlGFMn77e0ZruW0ie0hGrxUJzEIxZa3iSc5hYklTZwTkm4rc2RfAvc2LUqG02O2Mad7W9m3aTzrlYDfEO3peIYUWoUCPf7dQflyYeICn8i_Bv2i-cNhDy2CUPf',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC0oH31zx_Va0T9NOKoAAmsxcma0zzRulAQoxTF9n9hd5wJe5OK27Adj1CdJaMOBcAgiCdVypl5dteeL7oUsRk46kq4rkkH_FkBPy8EKd1eKOYqXxqGp_70nruKl1dD63X08i-4vVvf2UBHzNrzY-lDdC4skBQuCJEVpPsHu6xxOFVH2yu8GvxGaTSRxjFhl3EH24ihfdDJ1R84C_Xtz_Pu4cvMmOLdbTPyZLlWK1gWSPq9N-NKgzZpvfFTe94Mzf6Og2m_352Zq2Ir',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAGWgX9fio4pBrJDC9vSb3NiHQ-U8W7jZ04PQ9kAKWLPPbDi_6MDBFiD4Irb48zk4sLjT-U20mJn497zB2v5IhlAjMbNoweZoLbY3NwKhV5OE-Lr-9iQXG1Q1N7ar9Pgje8KdpqBFExKhiZxiFHH_oV_kIsb_vzcPPERqsSwAQV51UopsgtQzz_QaRH4CSgw6rXz3Z5d7b9EdVuGWcFepIRrNAgd6VLDfcgf5BxPMDSiLzPoDm3hcPNr0sFVWIFp-oQEk-yPQLn8XBy',
  
  // Popular view background
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC64hixjz0u6HEJg-BnSLgBDpQYbLm6kHhB25D2vM5lxZJCxg8LDxcLzBJVaJHfpyMWBR55jXKfG3fhYiJq3X6bWU99ug6bNIJLphV2R7cC-hVTbSMFkpJMzaivPDRVNwTRGLEtmGlKojWAuITzG0CYr1v2HWLsn-SbXKIqH0aAJj9qLchvnWNhcaGgVxXkFjKoS8zKMZJvlsVYqeHuQfNhSMAJ94qZPEWDGz_AqIyqtZgfQeM5uvP_JeT8VPZuBG-s9l5rXp5DcXYO',
  
  // Unsplash images used in products
  'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1623157879673-81e5b5c900e5?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80',
];

// Preload images in batches to avoid overwhelming the browser
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't fail on error, just continue
    img.src = src;
  });
};

const preloadInBatches = async (urls: string[], batchSize: number = 4) => {
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await Promise.all(batch.map(preloadImage));
  }
};

export const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // Start preloading after a short delay to not block initial render
    const timer = setTimeout(() => {
      preloadInBatches(PRELOAD_IMAGES, 4);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything
  return null;
};

// Hook for components to trigger preloading of specific images
export const useImagePreload = (urls: string[]) => {
  useEffect(() => {
    urls.forEach(preloadImage);
  }, [urls]);
};
