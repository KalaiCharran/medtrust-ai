// MedTrust AI - Master Application Router & State Manager

import { 
  INITIAL_PATIENT, 
  INITIAL_ALLERGIES, 
  INITIAL_MEDICATIONS, 
  INITIAL_RECORDS, 
  PRESET_DOCUMENTS_FOR_UPLOAD,
  INITIAL_ACCESS_REQUESTS,
  INITIAL_ACCESS_GRANTS,
  INITIAL_ACTIVITY_LOG 
} from './data/initialData.js';
import { TRUSTED_REGISTRY } from './data/trustedRegistry.js';
import { TrustEngine } from './engines/trustEngine.js';
import { ConsentEngine } from './engines/consentEngine.js';
import { ClinicalSafetyEngine } from './engines/clinicalSafety.js';

import { renderNavbar } from './components/Navbar.js';
import { renderLandingPage } from './components/LandingPage.js';
import { renderPatientDashboard } from './components/PatientDashboard.js';
import { renderHealthVault } from './components/HealthVault.js';
import { renderVerificationStudio } from './components/VerificationStudio.js';
import { renderSmartConsentCenter } from './components/SmartConsentCenter.js';
import { renderOrgPortal } from './components/OrgPortal.js';
import { renderActivityLog } from './components/ActivityLog.js';
import { renderClinicalSafetyView } from './components/ClinicalSafetyView.js';
import { renderDocumentModal } from './components/DocumentModal.js';

const STORAGE_KEY = 'medtrust_ai_state_v1';

class AppState {
  constructor() {
    this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.patient = parsed.patient || INITIAL_PATIENT;
        this.allergies = parsed.allergies || INITIAL_ALLERGIES;
        this.medications = parsed.medications || INITIAL_MEDICATIONS;
        this.records = parsed.records || INITIAL_RECORDS;
        this.accessRequests = parsed.accessRequests || INITIAL_ACCESS_REQUESTS;
        this.accessGrants = parsed.accessGrants || INITIAL_ACCESS_GRANTS;
        this.activityLog = parsed.activityLog || INITIAL_ACTIVITY_LOG;
      } else {
        this.resetToDefaults();
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      this.resetToDefaults();
    }

    // Ephemeral UI State
    this.trustedRegistry = TRUSTED_REGISTRY;
    this.presetDocuments = PRESET_DOCUMENTS_FOR_UPLOAD;
    this.selectedUploadPreset = PRESET_DOCUMENTS_FOR_UPLOAD[0];
    this.currentView = 'landing'; // landing, dashboard, vault, verify, consent, safety, org-portal, activity
    this.currentRole = 'patient'; // patient, org
    this.activeOrgPersona = 'REG-APO-8821';
    
    this.vaultFilterCategory = 'All';
    this.vaultFilterStatus = 'All';
    this.vaultSearchQuery = '';

    this.activityFilterStatus = 'All';
    this.activitySearchQuery = '';

    this.selectedConsentRequestId = this.accessRequests.find(r => r.status === 'Pending')?.id || null;
    this.selectedModalRecord = null;

    this.isCustomizingConsent = false;
    this.customizingRequestId = null;
    this.customConsentRecordIds = [];

    this.isVerifyingDocument = false;
    this.verificationProgress = 0;
    this.verificationCurrentStep = 0;
    this.verificationLogs = [];
    this.lastVerificationResult = null;

    this.refreshSafetyEngine();
  }

  saveState() {
    try {
      const payload = {
        patient: this.patient,
        allergies: this.allergies,
        medications: this.medications,
        records: this.records,
        accessRequests: this.accessRequests,
        accessGrants: this.accessGrants,
        activityLog: this.activityLog
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  resetToDefaults() {
    this.patient = JSON.parse(JSON.stringify(INITIAL_PATIENT));
    this.allergies = JSON.parse(JSON.stringify(INITIAL_ALLERGIES));
    this.medications = JSON.parse(JSON.stringify(INITIAL_MEDICATIONS));
    this.records = JSON.parse(JSON.stringify(INITIAL_RECORDS));
    this.accessRequests = JSON.parse(JSON.stringify(INITIAL_ACCESS_REQUESTS));
    this.accessGrants = JSON.parse(JSON.stringify(INITIAL_ACCESS_GRANTS));
    this.activityLog = JSON.parse(JSON.stringify(INITIAL_ACTIVITY_LOG));
    this.saveState();
  }

  refreshSafetyEngine() {
    this.clinicalSafetyReport = ClinicalSafetyEngine.evaluateSafetyProfile(
      this.medications,
      this.allergies,
      this.records
    );
  }

  addActivityLog(orgName, orgId, action, purpose, scopeGranted, scopeDenied, status, details = '') {
    const entry = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      orgName,
      orgId,
      action,
      purpose,
      scopeGranted,
      scopeDenied,
      status,
      details,
      ipAddress: `${Math.floor(Math.random() * 200) + 20}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.10 (Secure Enclave)`
    };
    this.activityLog.unshift(entry);
    this.saveState();
  }
}

// Global State Instance
const app = new AppState();

// Global Window Functions
window.appRouter = (view) => {
  app.currentView = view;
  if (view === 'org-portal') {
    app.currentRole = 'org';
  } else if (view !== 'landing' && app.currentRole === 'org' && view !== 'activity') {
    app.currentRole = 'patient';
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.switchUserRole = (role) => {
  app.currentRole = role;
  if (role === 'patient') {
    if (app.currentView === 'org-portal' || app.currentView === 'landing') {
      app.currentView = 'dashboard';
    }
  } else if (role === 'org') {
    app.currentView = 'org-portal';
  }
  renderApp();
  window.showToast(`Switched persona to ${role === 'patient' ? 'Patient (Arjun Kumar)' : 'Healthcare Organization Portal'}`, 'info');
};

window.resetAppState = () => {
  app.resetToDefaults();
  app.loadState();
  renderApp();
  window.showToast('Network data state restored to baseline.', 'success');
};

window.selectUploadPreset = (presetId) => {
  const preset = app.presetDocuments.find(p => p.id === presetId);
  if (preset) {
    app.selectedUploadPreset = preset;
    app.verificationProgress = 0;
    app.verificationCurrentStep = 0;
    app.verificationLogs = [];
    app.lastVerificationResult = null;
    renderApp();
  }
};

window.handleCustomFileUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const customDoc = {
    id: `CUSTOM-${Date.now()}`,
    title: file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
    fileName: file.name,
    category: "Medical History",
    subCategory: "Uploaded Document",
    issuingOrg: "Apollo Hospitals Enterprise Ltd",
    issuingOrgId: "REG-APO-8821",
    doctorName: "Dr. K. Srinivas, MD",
    doctorRegNo: "KMC-DOC-54912",
    date: new Date().toISOString().split('T')[0],
    rawDocumentText: `UPLOADED DOCUMENT: ${file.name}\nFile Size: ${(file.size / 1024).toFixed(1)} KB\nExtracted Header: Apollo Hospital Diagnostic Division\nVerified Signature: PKI VALID`,
    expectedTrustScore: 94,
    expectedStatus: "Verified",
    tamperDetected: false,
    fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
  };

  app.presetDocuments.unshift(customDoc);
  app.selectedUploadPreset = customDoc;
  renderApp();
  window.showToast(`Custom document "${file.name}" ingested into sandbox.`, 'info');
};

window.startTrustVerification = async () => {
  if (!app.selectedUploadPreset || app.isVerifyingDocument) return;

  app.isVerifyingDocument = true;
  app.verificationProgress = 10;
  app.verificationCurrentStep = 1;
  app.verificationLogs = [];
  app.lastVerificationResult = null;
  renderApp();

  const preset = app.selectedUploadPreset;
  const result = await TrustEngine.verifyDocument(preset);

  // Progressive simulation timers for realistic radar animation
  const stepDelays = [
    { step: 1, prog: 25, delay: 350 },
    { step: 2, prog: 45, delay: 700 },
    { step: 3, prog: 65, delay: 1050 },
    { step: 4, prog: 85, delay: 1400 },
    { step: 5, prog: 100, delay: 1750 }
  ];

  stepDelays.forEach(({ step, prog, delay }, idx) => {
    setTimeout(() => {
      app.verificationProgress = prog;
      app.verificationCurrentStep = step;
      app.verificationLogs = result.logs.slice(0, step + 1);
      
      if (idx === stepDelays.length - 1) {
        app.isVerifyingDocument = false;
        app.lastVerificationResult = result;
        
        // Log to immutable activity log
        app.addActivityLog(
          preset.issuingOrg,
          result.registryOrg?.id || "UNREGISTERED",
          result.verificationStatus === "Verified" ? "RECORD_VERIFIED_SUCCESS" : "RECORD_VERIFICATION_REJECTED",
          `Document Authenticity Verification: ${preset.title}`,
          result.verificationStatus === "Verified" ? `Trust Score ${result.trustScore}/100` : "None",
          result.verificationStatus === "Verified" ? "N/A" : "Unverified Document Flagged",
          result.verificationStatus === "Verified" ? "Active" : "Revoked",
          `Zero-Trust Multi-factor result: ${result.verificationStatus.toUpperCase()} (Score: ${result.trustScore}/100)`
        );

        if (result.verificationStatus === 'Verified') {
          window.showToast(`Document Verified! Trust Score: ${result.trustScore}/100`, 'success');
        } else {
          window.showToast(`Document Unverified! Trust Score: ${result.trustScore}/100. Tampering suspected.`, 'error');
        }
      }
      renderApp();
    }, delay);
  });
};

window.commitRecordToVault = () => {
  if (!app.lastVerificationResult || !app.selectedUploadPreset) return;

  const preset = app.selectedUploadPreset;
  const res = app.lastVerificationResult;

  const newRecord = {
    id: `REC-${Date.now()}`,
    title: preset.title,
    category: preset.category || "Medical History",
    subCategory: preset.subCategory || "General Diagnostic",
    issuingOrg: preset.issuingOrg,
    issuingOrgId: res.registryOrg?.id || "UNREGISTERED",
    doctorName: preset.doctorName || "Verified Physician",
    doctorRegNo: preset.doctorRegNo || "REG-VALID",
    date: preset.date || new Date().toISOString().split('T')[0],
    uploadedDate: new Date().toISOString(),
    trustScore: res.trustScore,
    verificationStatus: res.verificationStatus,
    digitalSignature: res.digitalSignature,
    tamperingAnalysis: res.tamperingAnalysis,
    sha256Hash: res.sha256Hash,
    summary: preset.rawDocumentText?.slice(0, 300) || "Document notarized and encrypted in zero-trust health vault.",
    rawDocumentText: preset.rawDocumentText,
    verificationFactors: res.verificationFactors,
    fileSize: preset.fileSize || "1.5 MB"
  };

  app.records.unshift(newRecord);
  app.refreshSafetyEngine();
  app.saveState();
  
  app.lastVerificationResult = null;
  app.verificationProgress = 0;
  
  window.appRouter('vault');
  window.showToast(`"${newRecord.title}" successfully committed to Digital Health Vault.`, 'success');
};

window.selectConsentRequest = (requestId) => {
  app.selectedConsentRequestId = requestId;
  app.isCustomizingConsent = false;
  renderApp();
};

window.toggleCustomizeConsent = (requestId) => {
  app.isCustomizingConsent = !app.isCustomizingConsent;
  app.customizingRequestId = requestId;
  const req = app.accessRequests.find(r => r.id === requestId);
  app.customConsentRecordIds = req?.aiMinimization?.recommendedRecordIds ? [...req.aiMinimization.recommendedRecordIds] : [];
  renderApp();
};

window.toggleCustomRecordSelection = (recordId) => {
  if (app.customConsentRecordIds.includes(recordId)) {
    app.customConsentRecordIds = app.customConsentRecordIds.filter(id => id !== recordId);
  } else {
    app.customConsentRecordIds.push(recordId);
  }
  renderApp();
};

window.approveCustomScope = (requestId) => {
  const req = app.accessRequests.find(r => r.id === requestId);
  if (!req) return;

  req.status = 'Approved';
  const selectedRecords = app.records.filter(r => app.customConsentRecordIds.includes(r.id));
  const categories = Array.from(new Set(selectedRecords.map(r => r.category)));

  const grant = ConsentEngine.createAccessGrant(
    req,
    categories.length > 0 ? categories : ["Custom Scoped Records"],
    app.customConsentRecordIds,
    req.durationHours
  );

  app.accessGrants.unshift(grant);
  app.isCustomizingConsent = false;

  app.addActivityLog(
    req.orgName,
    req.orgId,
    "ACCESS_GRANTED_CUSTOM_MINIMIZED",
    req.purpose,
    `Patient Custom Scope (${app.customConsentRecordIds.length} records)`,
    "Remaining Vault Records Excluded",
    "Active",
    `Patient issued customized grant token: ${grant.zeroTrustToken}.`
  );

  app.saveState();
  renderApp();
  window.showToast(`Custom Zero-Trust Grant issued for ${req.orgName}!`, 'success');
};

window.approveRequestWithAIMinimum = (requestId) => {
  const req = app.accessRequests.find(r => r.id === requestId);
  if (!req) return;

  req.status = 'Approved';

  const grant = ConsentEngine.createAccessGrant(
    req,
    req.aiMinimization.recommendedCategories,
    req.aiMinimization.recommendedRecordIds,
    req.durationHours
  );

  app.accessGrants.unshift(grant);

  app.addActivityLog(
    req.orgName,
    req.orgId,
    "ACCESS_GRANTED_MINIMIZED",
    req.purpose,
    `AI-Minimized Scope: ${req.aiMinimization.recommendedCategories.join(', ')}`,
    req.aiMinimization.excludedCategories.join(', '),
    "Active",
    `Patient approved AI-minimized dataset. Token issued: ${grant.zeroTrustToken}. Expires in ${req.durationHours}h.`
  );

  app.saveState();
  renderApp();
  window.showToast(`Zero-Trust Grant created for ${req.orgName} (${req.aiMinimization.privacyScoreBoost})!`, 'success');
};

window.approveRequestFullScope = (requestId) => {
  const req = app.accessRequests.find(r => r.id === requestId);
  if (!req) return;

  req.status = 'Approved';
  const allRecordIds = app.records.map(r => r.id).concat(app.medications.map(m => m.id)).concat(app.allergies.map(a => a.id));

  const grant = ConsentEngine.createAccessGrant(
    req,
    req.requestedCategories,
    allRecordIds,
    req.durationHours
  );

  app.accessGrants.unshift(grant);

  app.addActivityLog(
    req.orgName,
    req.orgId,
    "ACCESS_GRANTED_FULL_SCOPE",
    req.purpose,
    "Full Medical Vault History (6 categories)",
    "None (Patient override)",
    "Active",
    `Patient manually approved broad request. Duration: ${req.durationHours}h.`
  );

  app.saveState();
  renderApp();
  window.showToast(`Full access granted to ${req.orgName} for ${req.durationHours} hours.`, 'info');
};

window.rejectRequest = (requestId) => {
  const req = app.accessRequests.find(r => r.id === requestId);
  if (!req) return;

  req.status = 'Rejected';

  app.addActivityLog(
    req.orgName,
    req.orgId,
    "REQUEST_REJECTED_BY_PATIENT",
    req.purpose,
    "None",
    "All requested records denied",
    "Revoked",
    "Patient rejected organization request under zero-trust discretion."
  );

  app.saveState();
  renderApp();
  window.showToast(`Access request from ${req.orgName} was rejected.`, 'error');
};

window.revokeAccessGrant = (grantId) => {
  const grant = app.accessGrants.find(g => g.id === grantId);
  if (!grant) return;

  grant.status = 'Revoked';
  grant.revocationReason = 'Explicit patient revocation';

  app.addActivityLog(
    grant.orgName,
    grant.orgId,
    "ACCESS_REVOKED_BY_PATIENT",
    grant.purpose,
    "Access Revoked",
    "All records blocked immediately",
    "Revoked",
    `Token ${grant.zeroTrustToken} invalidated in enclave.`
  );

  app.saveState();
  renderApp();
  window.showToast(`Access for ${grant.orgName} immediately revoked!`, 'error');
};

window.fastForwardGrant = (grantId) => {
  const grant = app.accessGrants.find(g => g.id === grantId);
  if (!grant) return;

  grant.status = 'Expired';
  grant.expiresAt = new Date(Date.now() - 1000).toISOString();

  app.addActivityLog(
    grant.orgName,
    grant.orgId,
    "ACCESS_EXPIRED_AUTOMATIC",
    grant.purpose,
    "Expired",
    "Token automatically invalidated after duration window",
    "Expired",
    `Zero-trust hardware timer triggered. All viewing streams terminated.`
  );

  app.saveState();
  renderApp();
  window.showToast(`Access token for ${grant.orgName} expired. Record visibility terminated.`, 'info');
};

window.simulateDrugCandidate = (name, drugClass, type) => {
  if (type === 'Critical') {
    window.showToast(`Clinical Pre-Screening: ${name} -> CRITICAL ALLERGY CONTRAINDICATION (Penicillin Anaphylaxis)`, 'error');
  } else if (type === 'Warning') {
    window.showToast(`Clinical Pre-Screening: ${name} -> CLINICAL WARNING (Potential Interaction with Active Pharmacotherapy)`, 'info');
  } else {
    window.showToast(`Clinical Pre-Screening: ${name} -> ORDER CLEARED: No contraindications detected.`, 'success');
  }
};

window.switchOrgPersona = (orgId) => {
  app.activeOrgPersona = orgId;
  renderApp();
};

window.populateOrgRequestForm = (purpose, categories, duration) => {
  app.orgDraftPurpose = purpose;
  renderApp();
  const purposeInput = document.getElementById('orgRequestPurpose');
  if (purposeInput) purposeInput.value = purpose;
  const durationSelect = document.getElementById('orgRequestDuration');
  if (durationSelect) durationSelect.value = duration;
};

window.selectAllOrgCategories = () => {
  document.querySelectorAll('input[name="orgCategories"]').forEach(cb => cb.checked = true);
};

window.submitOrgAccessRequest = () => {
  const org = app.trustedRegistry.find(o => o.id === app.activeOrgPersona) || app.trustedRegistry[0];
  const purpose = document.getElementById('orgRequestPurpose')?.value || 'Emergency Cardiac Evaluation';
  const duration = parseInt(document.getElementById('orgRequestDuration')?.value || '48', 10);
  
  const checkedCategories = Array.from(document.querySelectorAll('input[name="orgCategories"]:checked')).map(cb => cb.value);

  const rawRequest = {
    id: `REQ-${Date.now()}`,
    orgName: org.name,
    orgId: org.id,
    orgType: org.type,
    requestedBy: `Attending Medical Team (${org.canonicalName})`,
    requestedScope: checkedCategories.length >= 6 ? "Complete Medical History (All 6 Vault Categories)" : checkedCategories.join(', '),
    requestedCategories: checkedCategories.length > 0 ? checkedCategories : ["Medical History", "Prescriptions", "Laboratory Reports", "X-rays and Scans", "Medications", "Allergies"],
    purpose,
    durationHours: duration,
    requestedAt: new Date().toISOString(),
    status: "Pending"
  };

  const minimization = ConsentEngine.analyzeRequest(
    rawRequest,
    app.records,
    app.medications,
    app.allergies
  );

  rawRequest.aiMinimization = minimization;

  app.accessRequests.unshift(rawRequest);
  app.selectedConsentRequestId = rawRequest.id;

  app.addActivityLog(
    org.name,
    org.id,
    "REQUEST_TRANSMITTED_TO_PATIENT",
    purpose,
    "Pending Patient Consent",
    "Waiting",
    "Pending",
    `Organization requested ${checkedCategories.length} categories for ${duration} hours.`
  );

  app.saveState();
  renderApp();
  window.showToast(`Request submitted! Open Patient Portal > Smart Consent Center to review.`, 'success');
};

window.setVaultCategory = (cat) => {
  app.vaultFilterCategory = cat;
  renderApp();
};

window.setVaultStatus = (status) => {
  app.vaultFilterStatus = status;
  renderApp();
};

window.setVaultSearch = (query) => {
  app.vaultSearchQuery = query;
  renderApp();
};

window.setActivityStatusFilter = (status) => {
  app.activityFilterStatus = status;
  renderApp();
};

window.setActivitySearch = (query) => {
  app.activitySearchQuery = query;
  renderApp();
};

window.openDocumentModal = (recId) => {
  const rec = app.records.find(r => r.id === recId);
  if (rec) {
    app.selectedModalRecord = rec;
    renderApp();
  }
};

window.closeDocumentModal = () => {
  app.selectedModalRecord = null;
  renderApp();
};

window.exportAuditLog = (format) => {
  const data = app.activityLog;
  let content = '';
  let filename = `MedTrust_AuditLog_${new Date().toISOString().slice(0, 10)}`;

  if (format === 'json') {
    content = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    filename += '.json';
  } else {
    const headers = ['Timestamp', 'Organization', 'Org ID', 'Action', 'Purpose', 'Scope Granted', 'Status'];
    const rows = data.map(d => [
      `"${d.timestamp}"`,
      `"${d.orgName}"`,
      `"${d.orgId}"`,
      `"${d.action}"`,
      `"${d.purpose}"`,
      `"${d.scopeGranted}"`,
      `"${d.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    content = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    filename += '.csv';
  }

  const link = document.createElement('a');
  link.setAttribute('href', content);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.showToast(`Exported Audit Trail as ${format.toUpperCase()}`, 'success');
};

window.exportSingleRecordFHIR = (recId) => {
  const rec = app.records.find(r => r.id === recId);
  if (!rec) return;

  const fhirDoc = {
    resourceType: "Bundle",
    type: "document",
    id: `medtrust-fhir-${rec.id}`,
    timestamp: new Date().toISOString(),
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: app.patient.id,
          name: [{ text: app.patient.name }],
          gender: app.patient.gender.toLowerCase(),
          birthDate: app.patient.dob
        }
      },
      {
        resource: {
          resourceType: "DiagnosticReport",
          id: rec.id,
          status: "final",
          code: { text: rec.title },
          subject: { reference: `Patient/${app.patient.id}` },
          performer: [{ display: rec.issuingOrg }],
          conclusion: rec.summary,
          extension: [
            { url: "https://medtrust.ai/fhir/trustScore", valueDecimal: rec.trustScore },
            { url: "https://medtrust.ai/fhir/verificationStatus", valueString: rec.verificationStatus },
            { url: "https://medtrust.ai/fhir/sha256Hash", valueString: rec.sha256Hash }
          ]
        }
      }
    ]
  };

  const content = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fhirDoc, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', content);
  link.setAttribute('download', `FHIR_${rec.id}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.showToast(`FHIR R4 DiagnosticReport exported for ${rec.title}`, 'success');
};

// Toast Notifications
window.showToast = (message, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300' :
             (type === 'error' ? 'bg-rose-950 border-rose-500/40 text-rose-300' : 'bg-cyan-950 border-cyan-500/40 text-cyan-300');

  toast.className = `p-4 rounded-2xl border shadow-xl flex items-center gap-3 text-xs font-medium font-sans toast-enter transition-all pointer-events-auto ${bg}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : (type === 'error' ? 'alert-octagon' : 'info')}" class="w-4 h-4 shrink-0"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-enter-active');
  }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Main DOM Render Function
function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  let mainViewHtml = '';

  switch (app.currentView) {
    case 'landing':
      mainViewHtml = renderLandingPage(app);
      break;
    case 'dashboard':
      mainViewHtml = renderPatientDashboard(app);
      break;
    case 'vault':
      mainViewHtml = renderHealthVault(app);
      break;
    case 'verify':
      mainViewHtml = renderVerificationStudio(app);
      break;
    case 'consent':
      mainViewHtml = renderSmartConsentCenter(app);
      break;
    case 'safety':
      mainViewHtml = renderClinicalSafetyView(app);
      break;
    case 'org-portal':
      mainViewHtml = renderOrgPortal(app);
      break;
    case 'activity':
      mainViewHtml = renderActivityLog(app);
      break;
    default:
      mainViewHtml = renderLandingPage(app);
  }

  root.innerHTML = `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans bg-grid-pattern">
      ${renderNavbar(app, window.appRouter, window.switchUserRole, window.resetAppState)}
      
      <main class="flex-1 pb-24">
        ${mainViewHtml}
      </main>

      <!-- Footer -->
      <footer class="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500 font-mono">
        <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-300">MedTrust AI</span>
            <span>•</span>
            <span>Zero-Trust Patient Health Data Network</span>
          </div>
          <div class="text-[11px] text-slate-600">
            Trust before storage • Intelligence before sharing • Safety before treatment
          </div>
        </div>
      </footer>

      <!-- Modal Container -->
      ${renderDocumentModal(app.selectedModalRecord, window.closeDocumentModal)}

      <!-- Toast Notification Container -->
      <div id="toast-container" class="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"></div>
    </div>
  `;

  // Re-initialize Lucide Icons after DOM update
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Initial Bootstrap on Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
