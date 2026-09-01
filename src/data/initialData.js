// Initial Mock Dataset for MedTrust AI
// Patient: Arjun Kumar (28, Male)

export const INITIAL_PATIENT = {
  id: "PAT-IND-2026-8839",
  name: "Arjun Kumar",
  age: 28,
  gender: "Male",
  bloodGroup: "B+",
  dob: "1998-04-12",
  phone: "+91 98450 12345",
  email: "arjun.kumar@medtrust-network.org",
  uhid: "UHID-8839-4412-IN",
  address: "Indiranagar 12th Main, Bengaluru, Karnataka, 560038",
  emergencyContact: {
    name: "Priya Kumar",
    relationship: "Spouse",
    phone: "+91 98450 98765"
  },
  digitalHealthId: "91-4402-9811-2045",
  publicKey: "ed25519:7b3a9c...8f1e4d",
  consentPolicy: "ZERO_TRUST_MINIMIZATION_DEFAULT",
  securityEnclaveStatus: "SECURE_HARDWARE_BACKED",
  lastVerifiedAt: "2026-09-01T10:30:00Z"
};

export const INITIAL_ALLERGIES = [
  {
    id: "ALG-001",
    substance: "Penicillin",
    category: "Antibiotic (Beta-Lactam)",
    reactionType: "Severe Anaphylaxis & Angioedema",
    severity: "Critical",
    identifiedDate: "2021-03-15",
    verifiedBy: "Apollo Hospitals - Allergy & Immunology Dept",
    verificationStatus: "Verified",
    contraindicatedClasses: ["Penicillins", "Aminopenicillins (Amoxicillin, Ampicillin)", "Beta-lactamase combinations (Augmentin)", "First-Gen Cephalosporins (caution)"]
  },
  {
    id: "ALG-002",
    substance: "Sulfonamides (Sulfa drugs)",
    category: "Antimicrobial",
    reactionType: "Moderate Urticarial Rash & Pruritus",
    severity: "Warning",
    identifiedDate: "2023-08-20",
    verifiedBy: "Fortis Healthcare - Internal Medicine",
    verificationStatus: "Verified",
    contraindicatedClasses: ["Sulfamethoxazole-Trimethoprim (Bactrim)", "Sulfadiazine"]
  }
];

export const INITIAL_MEDICATIONS = [
  {
    id: "MED-001",
    name: "Lisinopril",
    genericName: "Lisinopril Anhydrous",
    dosage: "10 mg",
    frequency: "Once daily (Morning)",
    route: "Oral",
    indication: "Stage 1 Essential Hypertension & Renal Microalbuminuria Protection",
    prescribedBy: "Dr. K. Srinivas, MD (Cardiology) - Apollo Hospitals",
    startDate: "2025-11-10",
    status: "Active",
    refillsRemaining: 3,
    drugClass: "ACE Inhibitor",
    category: "Cardiovascular",
    knownInteractionsWarning: "High risk with NSAIDs (Ibuprofen, Naproxen) -> Acute kidney injury & loss of blood pressure control. High risk with Potassium supplements."
  },
  {
    id: "MED-002",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "20 mg",
    frequency: "Once daily (Bedtime)",
    route: "Oral",
    indication: "Hyperlipidemia & Atherosclerotic Plaque Stabilization",
    prescribedBy: "Dr. K. Srinivas, MD (Cardiology) - Apollo Hospitals",
    startDate: "2026-01-05",
    status: "Active",
    refillsRemaining: 2,
    drugClass: "HMG-CoA Reductase Inhibitor (Statin)",
    category: "Cardiovascular",
    knownInteractionsWarning: "Avoid strong CYP3A4 inhibitors (Clarithromycin, Ketoconazole) -> Elevated rhabdomyolysis risk."
  }
];

export const INITIAL_RECORDS = [
  {
    id: "REC-2026-APO-01",
    title: "Cardiac MRI & 2D-Echocardiogram Assessment",
    category: "X-rays and Scans",
    subCategory: "Cardiology Imaging",
    issuingOrg: "Apollo Hospitals Enterprise Ltd",
    issuingOrgId: "REG-APO-8821",
    doctorName: "Dr. K. Srinivas, MBBS, MD, DM (Cardio)",
    doctorRegNo: "KMC-DOC-54912",
    date: "2026-08-18",
    uploadedDate: "2026-08-18T14:32:00Z",
    trustScore: 96,
    verificationStatus: "Verified",
    digitalSignature: "Ed25519_VALID_RSA4096_PKI",
    tamperingAnalysis: "NO_ALTERATION_DETECTED",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    fhirResource: "DiagnosticReport/CardiacImaging",
    summary: "Normal left ventricular systolic function (LVEF 58%). Mild concentric LV remodeling. No regional wall motion abnormalities or delayed myocardial enhancement.",
    clinicalInsights: {
      lvef: "58%",
      aorticRoot: "Normal (31 mm)",
      pericardialEffusion: "None",
      recommendation: "Continue lifestyle optimization and ACE inhibitor therapy. Repeat echo in 12 months."
    },
    verificationFactors: [
      { factor: "Issuing Organization Registry", status: "Pass", details: "Apollo Hospitals (REG-APO-8821) active in National Registry" },
      { factor: "Doctor Registration Match", status: "Pass", details: "Dr. K. Srinivas verified in State Medical Council Database" },
      { factor: "Cryptographic Certificate", status: "Pass", details: "Signed with private HSM key (CERT-APO-2026-X9)" },
      { factor: "Document Structure Consistency", status: "Pass", details: "Header metadata, DICOM tags, and timestamps correlate exactly" },
      { factor: "Tamper Integrity Hash", status: "Pass", details: "Zero pixel or text byte divergence detected" }
    ],
    fileSize: "4.8 MB",
    fileType: "DICOM Encapsulated PDF"
  },
  {
    id: "REC-2026-FOR-02",
    title: "Comprehensive Metabolic & Lipid Panel",
    category: "Laboratory Reports",
    subCategory: "Clinical Biochemistry",
    issuingOrg: "Fortis Healthcare Limited",
    issuingOrgId: "REG-FOR-4412",
    doctorName: "Dr. Shalini Raman, MD (Pathology)",
    doctorRegNo: "MMC-PATH-88301",
    date: "2026-07-25",
    uploadedDate: "2026-07-25T09:15:00Z",
    trustScore: 94,
    verificationStatus: "Verified",
    digitalSignature: "Ed25519_VALID_NABL_PKI",
    tamperingAnalysis: "NO_ALTERATION_DETECTED",
    sha256Hash: "8f4e2a1b9c3d5e7f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f",
    fhirResource: "Observation/MetabolicPanel",
    summary: "Fasting Blood Glucose 94 mg/dL (Normal). Total Cholesterol 182 mg/dL (Improved on Atorvastatin). Serum Creatinine 0.92 mg/dL (Normal eGFR > 90). Normal liver enzymes (ALT 22 U/L, AST 19 U/L).",
    clinicalInsights: {
      fastingGlucose: "94 mg/dL (Normal: 70-99)",
      totalCholesterol: "182 mg/dL (Optimal: <200)",
      hdl: "48 mg/dL",
      ldl: "104 mg/dL (Target <100 on statin)",
      creatinine: "0.92 mg/dL",
      potassium: "4.3 mEq/L (Normal)"
    },
    verificationFactors: [
      { factor: "Issuing Organization Registry", status: "Pass", details: "Fortis Healthcare (REG-FOR-4412) NABL accredited lab" },
      { factor: "Doctor Registration Match", status: "Pass", details: "Dr. Shalini Raman licensed pathologist" },
      { factor: "Cryptographic Certificate", status: "Pass", details: "Signed with Fortis PKI (CERT-FOR-2025-L2)" },
      { factor: "Document Structure Consistency", status: "Pass", details: "Laboratory Information System (LIS) barcode matched" },
      { factor: "Tamper Integrity Hash", status: "Pass", details: "Zero post-issuance alterations detected" }
    ],
    fileSize: "1.2 MB",
    fileType: "NABL Certified PDF"
  },
  {
    id: "REC-2026-MAX-03",
    title: "12-Lead Resting Electrocardiogram (ECG)",
    category: "Medical History",
    subCategory: "Cardiac Diagnostics",
    issuingOrg: "Max Healthcare Institute Ltd",
    issuingOrgId: "REG-MAX-1190",
    doctorName: "Dr. Amitav Sen, MD (Internal Medicine)",
    doctorRegNo: "DMC-DOC-31994",
    date: "2026-06-10",
    uploadedDate: "2026-06-10T11:45:00Z",
    trustScore: 92,
    verificationStatus: "Verified",
    digitalSignature: "Ed25519_VALID_MAX_PKI",
    tamperingAnalysis: "NO_ALTERATION_DETECTED",
    sha256Hash: "3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d",
    fhirResource: "DiagnosticReport/ECG",
    summary: "Normal Sinus Rhythm at 72 bpm. Normal PR interval (150 ms) and QRS duration (88 ms). Normal axis. No ST-T segment elevation or ischemic changes.",
    clinicalInsights: {
      heartRate: "72 bpm (Normal)",
      rhythm: "Normal Sinus Rhythm",
      prInterval: "150 ms",
      qtcBazzet: "412 ms (Normal)"
    },
    verificationFactors: [
      { factor: "Issuing Organization Registry", status: "Pass", details: "Max Healthcare (REG-MAX-1190) verified registry member" },
      { factor: "Doctor Registration Match", status: "Pass", details: "Dr. Amitav Sen registered with Delhi Medical Council" },
      { factor: "Cryptographic Certificate", status: "Pass", details: "Valid timestamp and digital signature" },
      { factor: "Document Structure Consistency", status: "Pass", details: "ECG waveform vector stream valid" },
      { factor: "Tamper Integrity Hash", status: "Pass", details: "Hash verified against Max Gateway archive" }
    ],
    fileSize: "2.1 MB",
    fileType: "High-Resolution Diagnostic PDF"
  },
  {
    id: "REC-2026-MPL-04",
    title: "Electronic Anti-Hypertensive Prescription Record",
    category: "Prescriptions",
    subCategory: "Cardiology Pharmacotherapy",
    issuingOrg: "MedPlus Pharmacy Network Ltd",
    issuingOrgId: "REG-MPL-5520",
    doctorName: "Dr. K. Srinivas, MD (Cardiology)",
    doctorRegNo: "KMC-DOC-54912",
    date: "2026-05-20",
    uploadedDate: "2026-05-20T16:20:00Z",
    trustScore: 95,
    verificationStatus: "Verified",
    digitalSignature: "RSA4096_GPP_VALID",
    tamperingAnalysis: "NO_ALTERATION_DETECTED",
    sha256Hash: "7a9b1c3d5e7f9a1b3c5e7f9a1b3d5e7f9a1b3c5e7f9a1b3c5e7f9a1b3d5e7f9a",
    fhirResource: "MedicationRequest/CardioRx",
    summary: "Lisinopril 10mg PO Daily #90 tabs. Atorvastatin 20mg PO QHS #90 tabs. Prescribed for ongoing blood pressure and hyperlipidemia management.",
    clinicalInsights: {
      medicationsListed: "Lisinopril 10mg, Atorvastatin 20mg",
      interactionCheckPassed: "Yes (No contraindications between ACEi and Statin)",
      allergyScreening: "Passed (No Penicillin derivative prescribed)"
    },
    verificationFactors: [
      { factor: "Issuing Organization Registry", status: "Pass", details: "MedPlus Pharmacy (REG-MPL-5520) verified Pharmacy Council" },
      { factor: "Doctor Registration Match", status: "Pass", details: "Dr. K. Srinivas authorized prescriber" },
      { factor: "Cryptographic Certificate", status: "Pass", details: "E-Prescription token signed with GPP standard" },
      { factor: "Document Structure Consistency", status: "Pass", details: "Barcode and dispense ledger serial matched" },
      { factor: "Tamper Integrity Hash", status: "Pass", details: "No prescription modifications detected" }
    ],
    fileSize: "680 KB",
    fileType: "Digital Signed E-Prescription"
  },
  {
    id: "REC-2026-MET-05",
    title: "High-Resolution Digital Chest X-Ray (PA View)",
    category: "X-rays and Scans",
    subCategory: "Pulmonology Radiology",
    issuingOrg: "Metro Advanced Diagnostics & Scans",
    issuingOrgId: "REG-MET-3301",
    doctorName: "Dr. R. Venkatraman, MD (Radiology)",
    doctorRegNo: "KMC-RAD-44019",
    date: "2026-04-12",
    uploadedDate: "2026-04-12T10:00:00Z",
    trustScore: 94,
    verificationStatus: "Verified",
    digitalSignature: "Ed25519_VALID_METRO_AERB",
    tamperingAnalysis: "NO_ALTERATION_DETECTED",
    sha256Hash: "9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f",
    fhirResource: "DiagnosticReport/RadiologyChest",
    summary: "Clear lung parenchyma bilaterally. Cardiothoracic ratio within normal limits (< 0.5). Costophrenic and cardiophrenic angles sharp. Normal bony thorax.",
    clinicalInsights: {
      lungFields: "Clear, no infiltrates or consolidations",
      cardiacSilhouette: "Normal size",
      pleuralSpaces: "Clear",
      clinicalImpression: "Normal PA Chest Radiograph"
    },
    verificationFactors: [
      { factor: "Issuing Organization Registry", status: "Pass", details: "Metro Diagnostics (REG-MET-3301) AERB approved" },
      { factor: "Doctor Registration Match", status: "Pass", details: "Dr. R. Venkatraman verified radiologist" },
      { factor: "Cryptographic Certificate", status: "Pass", details: "AERB encrypted digital signature valid" },
      { factor: "Document Structure Consistency", status: "Pass", details: "DICOM header metadata intact" },
      { factor: "Tamper Integrity Hash", status: "Pass", details: "Pixel checksum matches raw acquisition stream" }
    ],
    fileSize: "6.4 MB",
    fileType: "Radiology DICOM Image"
  },
  {
    id: "REC-2026-SUS-06",
    title: "Dr. Roy Care Clinic - Altered Antibiotic Prescription",
    category: "Prescriptions",
    subCategory: "General Practice Rx",
    issuingOrg: "Dr. Roy Healthcare Clinic (Unregistered Entity)",
    issuingOrgId: "UNKNOWN_OR_UNREGISTERED",
    doctorName: "Dr. A. K. Roy (Unverified Reg: KMC-99999-FAKE)",
    doctorRegNo: "UNVERIFIED_INVALID_FORMAT",
    date: "2026-08-30",
    uploadedDate: "2026-08-30T18:10:00Z",
    trustScore: 32,
    verificationStatus: "Unverified",
    digitalSignature: "SIGNATURE_INVALID_OR_MISSING",
    tamperingAnalysis: "HIGH_SUSPICION_ALTERED_TEXT_BLOCKS",
    sha256Hash: "11223344556677889900aabbccddeeff0011223344556677889900aabbccddee",
    fhirResource: "MedicationRequest/Unverified",
    summary: "Prescription for Amoxicillin-Clavulanate 625mg PO TID + Ibuprofen 400mg PO PRN. Multiple structural red flags: clinic is not present in the National Healthcare Registry, doctor registration ID failed checksum validation, font compression indicates pixel-level text replacement in dosage fields, and lacks cryptographic digital signature.",
    clinicalInsights: {
      medicationsListed: "Amoxicillin-Clavulanate 625mg, Ibuprofen 400mg",
      securityFlags: "CRITICAL: Unregistered clinic, fake doctor registration ID, altered PDF stream.",
      clinicalRisk: "SEVERE: Patient is allergic to Penicillin. Amoxicillin is a direct Beta-Lactam Penicillin derivative! High anaphylaxis hazard."
    },
    verificationFactors: [
      { factor: "Issuing Organization Registry", status: "Fail", details: "Entity 'Dr. Roy Healthcare Clinic' not found in National Registry" },
      { factor: "Doctor Registration Match", status: "Fail", details: "KMC-99999-FAKE failed Medical Council format and active status" },
      { factor: "Cryptographic Certificate", status: "Fail", details: "No public key or cryptographic timestamp found" },
      { factor: "Document Structure Consistency", status: "Warning", details: "Font metadata mismatch: Helvetica mixed with low-res raster glyphs" },
      { factor: "Tamper Integrity Hash", status: "Fail", details: "Altered bounding box detected around dosage field" }
    ],
    fileSize: "410 KB",
    fileType: "Unverified Scanned Document"
  }
];

// Preset Document Templates for live verification demo
export const PRESET_DOCUMENTS_FOR_UPLOAD = [
  {
    id: "SAMPLE-APOLLO-CARDIAC",
    title: "Apollo Hospitals - 2D Echocardiogram & Doppler Report",
    fileName: "Apollo_Echo_Report_Arjun_Kumar.pdf",
    category: "X-rays and Scans",
    subCategory: "Cardiac Imaging",
    issuingOrg: "Apollo Hospitals Enterprise Ltd",
    issuingOrgId: "REG-APO-8821",
    doctorName: "Dr. K. Srinivas, MD, DM (Cardio)",
    doctorRegNo: "KMC-DOC-54912",
    date: "2026-09-01",
    rawDocumentText: `APOLLO HOSPITALS ENTERPRISE LTD
Department of Cardiology & Cardiovascular Sciences
Greams Road, Chennai / Bannerghatta Rd, Bengaluru
NABH & JCI Accredited | Registry ID: REG-APO-8821

PATIENT NAME: Arjun Kumar | AGE/SEX: 28 Y / M | UHID: UHID-8839-4412-IN
EXAM DATE: September 1, 2026 | REFERRING PHYSICIAN: Dr. K. Srinivas, MD

TRANSTHORACIC 2D ECHOCARDIOGRAM & COLOR DOPPLER STUDY
- Left Ventricle: Normal internal dimensions. LVIDd 4.8 cm, LVIDs 3.1 cm.
- Systolic Function: Normal global LV contractility. LVEF: 60% by Simpson's biplane method.
- Left Atrium: Normal size (LAVi 26 ml/m²).
- Right Ventricle & Atrium: Normal size and systolic function (TAPSE 22 mm).
- Valvular Assessment: Normal mitral, aortic, and tricuspid valve morphology. No significant regurgitation or stenosis.
- Pericardium: Clear, no pericardial thickening or effusion.
- Aortic Root: 3.2 cm, normal caliber.

CONCLUSION:
Normal 2D-Echocardiogram with preserved left ventricular ejection fraction (60%).
Digital Signature: [ED25519-PKI-APO-VERIFIED-CERT-2026-X9]
Cryptographic SHA-256 Hash: e4b1928a8d1c3e5f7a9b2d4f6e8a0b1c3e5d7f9a2b4c6e8f0a2d4b6e8f0a1c3e`,
    expectedTrustScore: 97,
    expectedStatus: "Verified",
    tamperDetected: false,
    fileSize: "2.4 MB"
  },
  {
    id: "SAMPLE-FORTIS-BLOOD",
    title: "Fortis Diagnostics - Comprehensive Lipid & Renal Biochemistry Panel",
    fileName: "Fortis_Metabolic_Panel_Report.pdf",
    category: "Laboratory Reports",
    subCategory: "Clinical Biochemistry",
    issuingOrg: "Fortis Healthcare Limited",
    issuingOrgId: "REG-FOR-4412",
    doctorName: "Dr. Shalini Raman, MD (Pathology)",
    doctorRegNo: "MMC-PATH-88301",
    date: "2026-08-28",
    rawDocumentText: `FORTIS HEALTHCARE LIMITED - CENTRAL DIAGNOSTIC LABORATORIES
NABL Accredited Lab Certificate No. M-0412 | National Registry: REG-FOR-4412

PATIENT: Arjun Kumar | AGE/GENDER: 28 / Male | BARCODE: LIS-88201-99
COLLECTION DATE: 28-Aug-2026 07:30 AM | REPORT DATE: 28-Aug-2026 11:45 AM

BIOCHEMISTRY & METABOLIC INVESTIGATION:
- Serum Creatinine: 0.90 mg/dL (Reference: 0.70 - 1.20) [NORMAL]
- Estimated GFR (CKD-EPI): > 90 mL/min/1.73m² [NORMAL RENAL FUNCTION]
- Blood Urea Nitrogen: 14 mg/dL (Reference: 7 - 20) [NORMAL]
- Serum Potassium: 4.2 mEq/L (Reference: 3.5 - 5.0) [NORMAL]
- Fasting Blood Sugar: 92 mg/dL (Reference: 70 - 99) [NORMAL]
- Total Cholesterol: 178 mg/dL (Optimal: < 200) [TARGET ACHIEVED]
- HDL Cholesterol: 49 mg/dL (Normal: > 40)
- LDL Cholesterol: 98 mg/dL (Target on Atorvastatin: < 100)

VERIFICATION METADATA:
NABL Laboratory Seal: Valid | LIS Barcode Authenticated: Yes
Digital Certificate: [CERT-FOR-2025-L2 Ed25519]
Signature Validation: 100% Cryptographic Match`,
    expectedTrustScore: 95,
    expectedStatus: "Verified",
    tamperDetected: false,
    fileSize: "1.8 MB"
  },
  {
    id: "SAMPLE-SUSPICIOUS-RX",
    title: "Suspicious Antibiotic Prescription (Tampered / Unknown Clinic)",
    fileName: "Dr_Roy_Clinic_Altered_Rx.pdf",
    category: "Prescriptions",
    subCategory: "General Practice Rx",
    issuingOrg: "Dr. Roy Care Clinic",
    issuingOrgId: "UNREGISTERED_CLINIC_ENTITY",
    doctorName: "Dr. A. K. Roy (Fake Reg: KMC-99999-FAKE)",
    doctorRegNo: "KMC-99999-FAKE",
    date: "2026-08-30",
    rawDocumentText: `DR. ROY CARE CLINIC & CONSULTATION SUITE
14/B Quick Health Lane (Unverified Address)

Rx Prescription Slip
Patient: Arjun Kumar (Age: 28)
Date: 30-Aug-2026

Medications:
1. Tab Amoxicillin-Clavulanate 625mg -- 1 tab TID x 7 days
2. Tab Ibuprofen 400mg -- 1 tab PRN for pain / fever

Doctor Signature: [Scanned Bitmap Stamp - No PKI Digital Signature]
Registration Number: KMC-99999-FAKE

*** SECURITY AUDIT NOTICE ***
- Issuing clinic failed National Healthcare Authority Registry validation.
- Doctor registration ID does not exist in State Medical Registry.
- Micro-font compression indicates text alteration in medication field.
- Document does not contain any cryptographic public key signature.`,
    expectedTrustScore: 32,
    expectedStatus: "Unverified",
    tamperDetected: true,
    fileSize: "520 KB"
  }
];

// Initial Pending / Active Access Requests from Organizations
export const INITIAL_ACCESS_REQUESTS = [
  {
    id: "REQ-2026-APO-001",
    orgName: "Apollo Hospitals Enterprise Ltd",
    orgId: "REG-APO-8821",
    orgType: "Super Specialty Hospital",
    requestedBy: "Dr. Vikram Seth, Head of Emergency Cardiology",
    requestedScope: "Complete Medical History (All 6 Vault Categories)",
    requestedCategories: ["Medical History", "Prescriptions", "Laboratory Reports", "X-rays and Scans", "Medications", "Allergies"],
    purpose: "Emergency Cardiac Treatment & Catheterization Evaluation",
    durationHours: 48,
    requestedAt: "2026-09-01T19:40:00Z",
    status: "Pending", // Pending, Approved, Rejected, Expired, Revoked
    aiMinimization: {
      excessiveRisk: true,
      riskLevel: "High Data Overexposure",
      analysisSummary: "The requesting organization requested 'Complete Medical History' (6 broad categories), which exceeds the clinical necessity for acute emergency cardiac treatment.",
      recommendedCategories: ["X-rays and Scans", "Medications", "Allergies", "Medical History"],
      recommendedRecordIds: ["REC-2026-APO-01", "REC-2026-MAX-03", "MED-001", "MED-002", "ALG-001", "ALG-002"],
      recommendedScopeSummary: "Recent Cardiac MRI/Echo, 12-Lead ECG, Active Cardiovascular Medications (Lisinopril, Atorvastatin), and Known Allergies (Penicillin anaphylaxis).",
      excludedCategories: ["Unrelated General Laboratory Reports", "Unverified Clinic Prescriptions"],
      excludedReason: "Non-cardiac routine biochemistry and unverified prescription documents are irrelevant to emergency cardiac intervention and should remain private under zero-trust minimization.",
      privacyScoreBoost: "+65% Patient Privacy Preservation"
    }
  },
  {
    id: "REQ-2026-MPL-002",
    orgName: "MedPlus Pharmacy Network Ltd",
    orgId: "REG-MPL-5520",
    orgType: "Certified Pharmacy",
    requestedBy: "Chief Pharmacist R. Mehra",
    requestedScope: "Complete Medical History & Diagnostic Scans",
    requestedCategories: ["Medical History", "Prescriptions", "Laboratory Reports", "X-rays and Scans", "Medications", "Allergies"],
    purpose: "Routine Prescription Fulfillment & Allergy Conflict Verification",
    durationHours: 1,
    requestedAt: "2026-09-01T20:15:00Z",
    status: "Pending",
    aiMinimization: {
      excessiveRisk: true,
      riskLevel: "Critical Over-permissioning",
      analysisSummary: "A retail pharmacy does not require access to patient imaging scans, diagnostic X-rays, or full surgical history to dispense medications.",
      recommendedCategories: ["Prescriptions", "Medications", "Allergies"],
      recommendedRecordIds: ["REC-2026-MPL-04", "MED-001", "MED-002", "ALG-001", "ALG-002"],
      recommendedScopeSummary: "Active Verified Prescriptions, Current Medications (for drug-drug interaction check), and Known Drug Allergies (Penicillin).",
      excludedCategories: ["X-rays and Scans", "Cardiac MRI Reports", "General History Notes"],
      excludedReason: "Imaging and invasive procedure notes are strictly outside the scope of medication dispensation.",
      privacyScoreBoost: "+80% Patient Privacy Preservation"
    }
  }
];

// Initial Access Grants (Active / Past)
export const INITIAL_ACCESS_GRANTS = [
  {
    id: "GRANT-2026-FOR-81",
    requestId: "REQ-PREV-081",
    orgName: "Fortis Healthcare Limited",
    orgId: "REG-FOR-4412",
    orgType: "Hospital & Lab",
    purpose: "Routine Follow-up & Biochemistry Review",
    grantedScope: ["Laboratory Reports", "Medications"],
    grantedRecordIds: ["REC-2026-FOR-02", "MED-001", "MED-002"],
    grantedAt: "2026-09-01T15:00:00Z",
    expiresAt: "2026-09-01T23:00:00Z", // Active for a few more hours
    durationHours: 8,
    status: "Active", // Active, Expired, Revoked
    revocationReason: null,
    accessCount: 4
  }
];

// Initial Access Activity Log (Audit Trail)
export const INITIAL_ACTIVITY_LOG = [
  {
    id: "LOG-1001",
    timestamp: "2026-09-01T15:00:12Z",
    orgName: "Fortis Healthcare Limited",
    orgId: "REG-FOR-4412",
    action: "ACCESS_GRANTED_MINIMIZED",
    purpose: "Routine Follow-up & Biochemistry Review",
    scopeGranted: "Laboratory Reports, Current Medications (2 records)",
    scopeDenied: "Excluded X-rays, Prescriptions, full history",
    status: "Active",
    details: "Patient approved AI-minimized scope for 8 hours. Zero-trust token issued (JWT-ECDSA-4412).",
    ipAddress: "114.79.142.18 (Fortis Secure Gateway)"
  },
  {
    id: "LOG-1002",
    timestamp: "2026-08-30T18:10:05Z",
    orgName: "Dr. Roy Healthcare Clinic",
    orgId: "UNKNOWN_OR_UNREGISTERED",
    action: "RECORD_VERIFICATION_REJECTED",
    purpose: "Prescription Upload Verification",
    scopeGranted: "None",
    scopeDenied: "Document flagged as Unverified (Trust Score 32/100)",
    status: "Revoked",
    details: "Trust Engine identified unregistered issuing clinic, invalid doctor registration ID, and altered PDF text bounding box.",
    ipAddress: "49.207.210.55"
  },
  {
    id: "LOG-1003",
    timestamp: "2026-08-18T14:32:40Z",
    orgName: "Apollo Hospitals Enterprise Ltd",
    orgId: "REG-APO-8821",
    action: "RECORD_VERIFIED_SUCCESS",
    purpose: "Cardiac MRI Ingestion & Zero-Trust Notarization",
    scopeGranted: "Notarized in Health Vault (Trust Score 96/100)",
    scopeDenied: "N/A",
    status: "Active",
    details: "Digital signature [ED25519-PKI-APO-VERIFIED-CERT-2026-X9] confirmed against National Healthcare Registry.",
    ipAddress: "182.73.19.110 (Apollo Hospital Gateway)"
  },
  {
    id: "LOG-1004",
    timestamp: "2026-08-15T11:20:00Z",
    orgName: "Metro Diagnostics & Scans",
    orgId: "REG-MET-3301",
    action: "ACCESS_EXPIRED_AUTOMATIC",
    purpose: "Radiology Chest X-Ray Ingestion",
    scopeGranted: "X-rays and Scans (1 record)",
    scopeDenied: "Other Vault Categories",
    status: "Expired",
    details: "Temporary 24-hour access token automatically expired and revoked by zero-trust enclave.",
    ipAddress: "103.14.120.44"
  }
];
