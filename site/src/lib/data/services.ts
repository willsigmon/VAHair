/** Published menu prices retained from the existing services page. */
export const haircuts = [
  { name: "Women's Haircut", price: '$50' },
  { name: "Men's Haircut", price: '$25+' },
  { name: "Children's Cut (10 & under)", price: '$30' },
  { name: 'Blowdry Style', price: '$45+' },
];

export const colorServices = [
  { name: 'Root Touch Up', price: '$95+' },
  { name: 'All Over Color', price: '$125+' },
  { name: 'Halo Foil', price: '$130+' },
  { name: 'Partial Foil', price: '$150+' },
  { name: 'Full Foil', price: '$180+' },
  { name: 'Color/Foil Combination', price: '$200+' },
  { name: 'Glaze (Toner)', price: '$75+' },
];

export const extras = [
  { name: 'Eyebrow Tint', price: '$45' },
  { name: 'Eyebrow Wax', price: '$20' },
  { name: 'Lip Wax', price: '$25' },
  { name: 'Chin Wax', price: '$25' },
];

// Alyssa's specialty services
export const alyssaLightening = [
  { name: 'Full Lightening w/ Blow Dry', price: '$275' },
  { name: 'Full Lightening w/ Cut', price: '$300' },
  { name: 'Partial Lightening w/ Blow Dry', price: '$250' },
  { name: 'Partial Lightening w/ Cut', price: '$275' },
  { name: 'Face-Frame w/ Blow Dry', price: '$150' },
  { name: 'Face-Frame w/ Cut', price: '$175' },
];

export const alyssaColor = [
  { name: 'Partial Single Process (Roots) w/ Blow Dry', price: '$125' },
  { name: 'Partial Single Process w/ Cut', price: '$150' },
  { name: 'Full Single Process (All-Over) w/ Blow Dry', price: '$150' },
  { name: 'Full Single Process w/ Cut', price: '$175' },
  { name: 'Glaze w/ Blow Dry', price: '$95' },
  { name: 'Glaze w/ Cut', price: '$125' },
  { name: 'Express Roots w/ Blow Dry', price: '$110' },
  { name: 'Express Roots w/ Cut', price: '$135' },
  { name: 'Add-on Root Coverage', price: '$50' },
  { name: 'Additional Color', price: '$20' },
];

export const alyssaHaircuts = [
  { name: 'Haircut (60 min)', price: '$60' },
  { name: 'Haircut (30 min)', price: '$30' },
  { name: 'Bang Trim', price: '$15' },
];

export const alyssaTreatments = [
  { name: 'K18 Treatment', price: '$30' },
  { name: 'Smoothing Treatment', price: '$180+' },
];

export const alyssaExtensions = [
  { name: 'Extension Consultation', price: '$30' },
  { name: 'Move-Up (1 Row)', price: '$150' },
  { name: 'Move-Up (2 Row)', price: '$300' },
];

export const SERVICE_GROUPS = [
  { name: 'Haircuts', services: haircuts },
  { name: 'Hair Color', services: colorServices },
  { name: 'Extras', services: extras },
  { name: 'Alyssa — Lightening', services: alyssaLightening },
  { name: 'Alyssa — Color', services: alyssaColor },
  { name: 'Alyssa — Haircuts', services: alyssaHaircuts },
  { name: 'Alyssa — Treatments', services: alyssaTreatments },
  { name: 'Alyssa — Extensions', services: alyssaExtensions },
];
