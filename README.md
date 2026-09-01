# MedTrust AI – Zero-Trust, AI-Powered Patient Health Data Network

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero-Trust](https://img.shields.io/badge/Security-Zero--Trust_Enclave-06b6d4)](https://github.com)
[![AI Engines](https://img.shields.io/badge/Engines-3_Intelligent_Engines-10b981)](https://github.com)
[![Compliance](https://img.shields.io/badge/Compliance-HL7_FHIR_R4-emerald)](https://github.com)

**MedTrust AI** is a patient-centric, zero-trust healthcare data network engineered to eliminate medical record fragmentation, prevent document tampering, and enforce mathematically minimal data sharing under complete patient sovereignty.

---

## 🌟 Core Philosophy

> **Trust before storage.**  
> **Intelligence before sharing.**  
> **Safety before treatment.**  
> **Patient control at every step.**

---

## 🧠 The Three Intelligent Engines

### 1. Medical Record Trust Engine
Uploaded medical documents (X-rays, MRIs, prescriptions, lab reports) are **never automatically trusted**. The engine executes a 6-stage authenticity pipeline:
$$\text{Ingest} \rightarrow \text{AI OCR Extract} \rightarrow \text{National Registry Match} \rightarrow \text{Practitioner Licensure Check} \rightarrow \text{PKI Digital Signature} \rightarrow \text{Tamper Anomaly Analysis}$$
- **Trust Score**: Computes a dynamic rating from `0–100`.
- **Status Badges**: `Verified` ($\ge 85$), `Partially Verified` ($60–84$), `Unverified` ($< 60$).
- **Anti-Tampering**: Identifies mismatched fonts, altered pixel bounding boxes, unregistered clinics, and forged doctor registration IDs.

### 2. AI Smart Consent Engine (Primary Differentiator)
Solves over-permissioning and privacy exposure. When an organization requests broad medical history (e.g. Apollo Hospital requesting *Complete Medical History* for *Emergency Cardiac Treatment*):
- AI analyzes **Who** is requesting + **Why** they need it + **What** was requested.
- Computes the **Minimum Necessary Dataset** (e.g., cardiac imaging, 12-lead ECG, anti-hypertensive drugs, penicillin allergy).
- Filters out non-pertinent documents (e.g., unrelated blood tests, psychotherapy notes).
- **Side-by-Side Visualizer**: Clear visual contrast between *Organization Requested (Broad)* vs. *AI Recommended (Minimized)* with a $+65\%$ Privacy Preservation metric.
- Patient retains full authority to approve AI minimum, customize scope, or reject.

### 3. AI Clinical Safety Engine
Proactive clinical decision-support cross-evaluating active medications, documented allergies, and newly uploaded prescriptions:
- **Critical Alert**: Detects **Severe Penicillin Allergy vs. Amoxicillin/Augmentin** prescription (Anaphylaxis hazard).
- **Warning Alert**: Detects **ACE Inhibitor (Lisinopril) + NSAID (Ibuprofen)** renal hemodynamic conflict.
- **Informational Alert**: Monitors Statin therapy targets and routine liver enzyme schedules.
- Formally adheres to clinical decision support standards with mandatory medical disclaimers.

---

## 🏗️ Architecture & Website Structure

1. **Enterprise Landing Page**: Modern health-tech showcase with interactive engine visualizers and dual portal launchpads.
2. **Patient Dashboard & Health Overview**: Central entry point with patient profile summary (Arjun Kumar, Age 28), verified records count, active medications, allergy badges, pending consent requests, and live audit feed.
3. **Digital Health Vault**: Categorized repository (Medical History, Prescriptions, Lab Reports, X-rays & Scans, Medications, Allergies) with deep inspection modal and FHIR R4 JSON export.
4. **Medical Record Trust Studio**: Multi-stage upload & scanning verification HUD with live radar animations, terminal logs, and tamper reports.
5. **Smart Consent Center**: Granular consent controller with side-by-side minimization cards, custom scope editor, and 1-click zero-trust token issuance.
6. **Healthcare Organization Portal**: Multi-persona console (Apollo Hospitals, MedPlus Pharmacy, Metro Diagnostics) allowing hospitals to request data, inspect permitted records in zero-trust isolation, and manage active grants.
7. **Access Activity Log**: Real-time immutable audit trail with non-repudiation timestamps and CSV/JSON export.

---

## 🚀 Quickstart & Local Execution

### Prerequisites
- Node.js (or Antigravity built-in `agy-node`)

### Starting the Server
```bash
# From the medtrust-ai directory:
node server.js
```

Then open your browser to:
```
http://localhost:3000
```

---

## 🎯 End-to-End System Workflow

1. **Patient Dashboard**: View patient health summary, active medications, and verified records count.
2. **Trust Verification Studio**: Ingest medical documents to run registry verification, PKI signature validation, and tamper analysis.
3. **Healthcare Organization Portal**: Healthcare entities submit purpose-bound data requests.
4. **Smart Consent Center**: AI analyzes data minimization, and the patient approves the minimum required dataset.
5. **Zero-Trust Record Access**: The healthcare provider receives temporary, read-only access strictly to the approved records.
6. **Clinical Safety Monitoring**: Continuous safety screening detects medication-allergy conflicts and drug interactions in real time.
7. **Time-Bound Revocation & Audit**: All access grants automatically expire or can be revoked immediately, with every action immutably logged.

---

## 📄 License
MIT License.
