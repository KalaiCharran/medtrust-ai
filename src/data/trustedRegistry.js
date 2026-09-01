// Trusted Healthcare Organization Registry Database
// Simulates a verified national registry of accredited medical organizations (Hospitals, Labs, Clinics, Pharmacies)

export const TRUSTED_REGISTRY = [
  {
    id: "REG-APO-8821",
    name: "Apollo Hospitals Enterprise Ltd",
    canonicalName: "Apollo Hospital",
    aliases: ["Apollo Hospitals", "Apollo Heart Centre", "Apollo Emergency Care", "Apollo Medical Centre"],
    type: "Multi-Specialty Hospital Network",
    category: "Hospital",
    accreditations: ["JCI Accredited", "NABH Certified", "ISO 15189"],
    registrationNumber: "MED-REG-IND-882190",
    jurisdiction: "National Healthcare Authority / Delhi / Bangalore",
    publicKeyFingerprint: "SHA256:4a8f9c1e7b2d5a3f8c0e1b9a2d4f6e8b0a1c3e5d7f9a2b4c6e8f0a2d4b6e8f0a",
    verificationStatus: "VERIFIED_ISSUER",
    trustRating: 99,
    contactEmail: "records-verify@apollohospitals.com",
    activeCertificates: [
      { certId: "CERT-APO-2026-X9", validUntil: "2028-12-31", algorithm: "Ed25519-SHA512" }
    ],
    supportedDocumentTypes: ["Cardiac MRI", "Echocardiogram", "Inpatient Discharge Summary", "Prescription", "Surgical Report", "Catheterization Summary"]
  },
  {
    id: "REG-FOR-4412",
    name: "Fortis Healthcare Limited",
    canonicalName: "Fortis Healthcare",
    aliases: ["Fortis Hospital", "Fortis Memorial Research Institute", "Fortis Labs", "Fortis Diagnostics"],
    type: "Tertiary Care Hospital & Diagnostic Labs",
    category: "Hospital",
    accreditations: ["NABH Accredited", "NABL Certified Labs", "CAP Accredited"],
    registrationNumber: "MED-REG-IND-441203",
    jurisdiction: "National Healthcare Authority / Mumbai / Gurugram",
    publicKeyFingerprint: "SHA256:7b1e4c9f2a8d5e3c0f1b8a9d2c4e6f8a0b1c3d5e7f9a1b3c5e7f9a1b3d5e7f9a",
    verificationStatus: "VERIFIED_ISSUER",
    trustRating: 98,
    contactEmail: "pathology-verify@fortishealthcare.com",
    activeCertificates: [
      { certId: "CERT-FOR-2025-L2", validUntil: "2027-08-15", algorithm: "Ed25519-SHA512" }
    ],
    supportedDocumentTypes: ["Comprehensive Metabolic Panel", "Complete Blood Count", "Lipid Profile", "Pathology Report", "Allergy Panel"]
  },
  {
    id: "REG-MAX-1190",
    name: "Max Healthcare Institute Ltd",
    canonicalName: "Max Healthcare",
    aliases: ["Max Super Speciality Hospital", "Max Heart & Vascular Institute", "Max Labs"],
    type: "Super Speciality Hospital System",
    category: "Hospital",
    accreditations: ["NABH Super Speciality", "JCI Gold Seal", "NABL"],
    registrationNumber: "MED-REG-IND-119045",
    jurisdiction: "National Healthcare Authority / New Delhi",
    publicKeyFingerprint: "SHA256:9c2d4f6a8e0b1c3e5a7f9b2d4f6e8a0b1c3e5d7f9a1b3c5e7f9a1b3c5e7f9a1b",
    verificationStatus: "VERIFIED_ISSUER",
    trustRating: 97,
    contactEmail: "trust-office@maxhealthcare.com",
    activeCertificates: [
      { certId: "CERT-MAX-2026-C4", validUntil: "2029-01-10", algorithm: "Ed25519-SHA512" }
    ],
    supportedDocumentTypes: ["12-Lead ECG", "CT Angiography", "Echocardiogram", "Cardiology Consultation", "Biochemistry Report"]
  },
  {
    id: "REG-MPL-5520",
    name: "MedPlus Pharmacy Network Ltd",
    canonicalName: "MedPlus Pharmacy",
    aliases: ["MedPlus Health Services", "MedPlus Diagnostics & Pharmacy", "MedPlus Online"],
    type: "Certified Pharmacy & Primary Care Chain",
    category: "Pharmacy",
    accreditations: ["Pharmacy Council of India (PCI)", "Good Pharmacy Practice (GPP)", "ISO 9001"],
    registrationNumber: "MED-PHARM-IND-552011",
    jurisdiction: "State Drug Control Administration / National Chain",
    publicKeyFingerprint: "SHA256:1a3b5c7d9e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b",
    verificationStatus: "VERIFIED_ISSUER",
    trustRating: 95,
    contactEmail: "rx-validation@medplusindia.com",
    activeCertificates: [
      { certId: "CERT-MPL-2026-P8", validUntil: "2028-05-20", algorithm: "RSA-PSS-4096" }
    ],
    supportedDocumentTypes: ["E-Prescription Dispense Log", "Medication History", "Allergy Interaction Clearance", "Pharmacy Fulfillment Slip"]
  },
  {
    id: "REG-MET-3301",
    name: "Metro Advanced Diagnostics & Scans",
    canonicalName: "Metro Diagnostics",
    aliases: ["Metro Scans & Imaging", "Metro Pathology", "Metro Medical Centre"],
    type: "Advanced Radiology & Scan Imaging Center",
    category: "Diagnostic Center",
    accreditations: ["NABL Certified", "AERB Approved", "ISO 15189"],
    registrationNumber: "MED-DIAG-IND-330188",
    jurisdiction: "Karnataka Medical Council / Bangalore",
    publicKeyFingerprint: "SHA256:5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f",
    verificationStatus: "VERIFIED_ISSUER",
    trustRating: 94,
    contactEmail: "imaging-portal@metrodiagnostics.org",
    activeCertificates: [
      { certId: "CERT-MET-2025-R1", validUntil: "2027-11-30", algorithm: "Ed25519-SHA512" }
    ],
    supportedDocumentTypes: ["Digital Chest X-Ray", "CT Scan Thorax", "Ultrasound Abdomen", "MRI Brain", "Bone Density Dexa"]
  },
  {
    id: "REG-MAN-7734",
    name: "Manipal Hospital Comprehensive Health",
    canonicalName: "Manipal Hospital",
    aliases: ["Manipal Hospitals", "Manipal Heart Centre"],
    type: "Quaternary Care Hospital Network",
    category: "Hospital",
    accreditations: ["NABH", "JCI", "NABL"],
    registrationNumber: "MED-REG-IND-773419",
    jurisdiction: "National Healthcare Authority / Pan-India",
    publicKeyFingerprint: "SHA256:8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c",
    verificationStatus: "VERIFIED_ISSUER",
    trustRating: 96,
    contactEmail: "audit@manipalhospitals.com",
    activeCertificates: [
      { certId: "CERT-MAN-2026-M3", validUntil: "2028-09-14", algorithm: "Ed25519-SHA512" }
    ],
    supportedDocumentTypes: ["Genetic Screening", "Oncology Panel", "Surgical Discharge", "Holter Monitor Analysis"]
  }
];

// Helper to look up an organization in the registry by name or registration ID
export function lookupRegistryOrganization(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  
  return TRUSTED_REGISTRY.find(org => {
    if (org.id.toLowerCase() === q) return true;
    if (org.registrationNumber.toLowerCase() === q) return true;
    if (org.name.toLowerCase().includes(q)) return true;
    if (org.canonicalName.toLowerCase().includes(q)) return true;
    if (org.aliases.some(alias => alias.toLowerCase().includes(q) || q.includes(alias.toLowerCase()))) return true;
    return false;
  }) || null;
}
