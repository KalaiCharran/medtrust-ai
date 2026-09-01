// Document Detail Inspection Modal Component
// Includes high-fidelity simulated visual preview, reference range bars, and cryptographic audit proofs

export function renderDocumentModal(record, onClose) {
  if (!record) return '';

  const isVerified = record.verificationStatus === 'Verified';
  const isSuspicious = record.verificationStatus === 'Unverified' || record.tamperDetected;

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div class="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-float">
        
        <!-- Modal Header -->
        <div class="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/80">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                ${record.category}
              </span>
              <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${isVerified ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}">
                ${isVerified ? '✓ VERIFIED MEDICAL RECORD' : '⚠ UNVERIFIED / SUSPICIOUS'}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">${record.title}</h2>
            <p class="text-xs text-slate-400 mt-0.5">${record.issuingOrg} • Ingested: ${record.date}</p>
          </div>

          <button onclick="window.closeDocumentModal()" class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all shrink-0">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          
          <!-- Trust Score Banner -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl ${record.trustScore >= 85 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'} flex items-center justify-center font-mono font-black text-xl">
                ${record.trustScore}
              </div>
              <div>
                <div class="text-xs font-bold text-white">Trust Engine Verification Rating: ${record.trustScore}/100</div>
                <div class="text-[11px] text-slate-400">Digital Signature: <strong class="text-cyan-300">${record.digitalSignature || 'Ed25519 PKI Valid'}</strong></div>
              </div>
            </div>
            <div class="text-xs font-mono text-slate-400 sm:text-right">
              <div>DOCTOR REGISTRATION: <strong class="text-white">${record.doctorRegNo || 'KMC-54912'}</strong></div>
              <div>PHYSICIAN: <span class="text-slate-300">${record.doctorName || 'Verified Medical Practitioner'}</span></div>
            </div>
          </div>

          <!-- Simulated Document Visualizer Canvas / Preview -->
          <div class="p-5 rounded-2xl bg-slate-950 border ${isSuspicious ? 'border-rose-500/40 bg-rose-950/10' : 'border-slate-800'} space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-2">
                <i data-lucide="file-check" class="w-4 h-4 text-cyan-400"></i>
                <span>Rendered Document Visualizer (Zero-Trust Decrypted)</span>
              </span>
              <span class="text-[10px] font-mono ${isVerified ? 'text-emerald-400' : 'text-rose-400'}">
                ${isVerified ? 'CRYPTOGRAPHIC SEAL INTACT' : 'TAMPER EVIDENCE FLAGGED'}
              </span>
            </div>

            ${record.category === 'X-rays and Scans' || record.title.includes('Echo') || record.title.includes('MRI') ? `
              <!-- Cardiology Imaging Simulation -->
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <div class="h-24 w-full bg-slate-950 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <svg class="w-full h-16 text-cyan-400 opacity-80" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <path d="M0,50 L100,50 L120,50 L130,20 L140,85 L150,10 L160,50 L250,50 L270,50 L280,20 L290,85 L300,10 L310,50 L400,50 L420,50 L430,20 L440,85 L450,10 L460,50 L500,50" fill="none" stroke="currentColor" stroke-width="2" />
                  </svg>
                  <div class="absolute bottom-1 right-2 text-[10px] font-mono text-cyan-400/70">ECG TRACE • 72 BPM</div>
                </div>
                <div class="grid grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                  <div class="p-2 rounded bg-slate-950 border border-slate-800">LVEF: <strong class="text-emerald-400">60% (Normal)</strong></div>
                  <div class="p-2 rounded bg-slate-950 border border-slate-800">LVIDd: <strong class="text-white">4.8 cm</strong></div>
                  <div class="p-2 rounded bg-slate-950 border border-slate-800">Wall Motion: <strong class="text-emerald-400">Normal</strong></div>
                </div>
              </div>
            ` : (record.category === 'Laboratory Reports' ? `
              <!-- Laboratory Biochemical Panel Gauge -->
              <div class="space-y-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>Serum Creatinine (0.70 - 1.20 mg/dL):</div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400 font-bold">0.90 mg/dL</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>Estimated GFR (CKD-EPI):</div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400 font-bold">> 90 mL/min</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>Total Cholesterol (< 200 mg/dL):</div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400 font-bold">178 mg/dL</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                </div>
              </div>
            ` : (isSuspicious ? `
              <!-- Tampered Document Visual Red Flags -->
              <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                <div class="text-rose-400 font-bold flex items-center gap-1.5">
                  <i data-lucide="alert-octagon" class="w-4 h-4"></i>
                  <span>Forensic Tampering Highlights:</span>
                </div>
                <div class="border-2 border-dashed border-rose-500/60 p-3 rounded-lg bg-slate-950 font-mono text-rose-300 text-[11px]">
                  [!] ALTERED BOUNDING BOX: "Tab Amoxicillin-Clavulanate 625mg TID"<br />
                  [!] UNREGISTERED DOCTOR CODE: "KMC-99999-FAKE"<br />
                  [!] CRYPTOGRAPHIC FAIL: Missing HSM private key digital signature stream.
                </div>
              </div>
            ` : `
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 font-sans text-xs text-slate-300">
                ${record.summary}
              </div>
            `))}
          </div>

          <!-- Clinical Summary -->
          <div>
            <h4 class="text-xs font-mono font-bold text-slate-400 uppercase mb-2">Clinical Findings & Summary</h4>
            <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 font-sans text-xs text-slate-200 leading-relaxed">
              ${record.summary}
            </div>
          </div>

          <!-- Extracted Key Clinical Metrics (if any) -->
          ${record.clinicalInsights ? `
            <div>
              <h4 class="text-xs font-mono font-bold text-slate-400 uppercase mb-2">Extracted Diagnostic Entities (FHIR)</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                ${Object.entries(record.clinicalInsights).map(([k, v]) => `
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                    <span class="text-slate-400 uppercase text-[10px]">${k}:</span>
                    <span class="text-cyan-300 font-bold text-[11px]">${v}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Verification Breakdown Factors -->
          ${record.verificationFactors ? `
            <div>
              <h4 class="text-xs font-mono font-bold text-slate-400 uppercase mb-2">Zero-Trust Verification Factors</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${record.verificationFactors.map(f => `
                  <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] flex items-start gap-2">
                    <i data-lucide="${f.status === 'Pass' ? 'check-circle' : 'alert-triangle'}" class="w-3.5 h-3.5 ${f.status === 'Pass' ? 'text-emerald-400' : 'text-rose-400'} shrink-0 mt-0.5"></i>
                    <div>
                      <div class="font-bold text-white">${f.factor}</div>
                      <div class="text-slate-400 text-[10px]">${f.details}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Raw Encrypted Document Payload / Source Preview -->
          <div>
            <h4 class="text-xs font-mono font-bold text-slate-400 uppercase mb-2">Raw Document Text / OCR Stream</h4>
            <pre class="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-40 whitespace-pre-wrap">${record.rawDocumentText || record.summary}</pre>
          </div>

          <!-- Cryptographic SHA-256 Hash -->
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
            <div class="text-[10px] text-slate-500 mb-1">IMMUTABLE ENCLAVE SHA-256 HASH:</div>
            <div class="text-cyan-400 break-all">${record.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}</div>
          </div>

        </div>

        <!-- Modal Footer -->
        <div class="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <button onclick="window.exportSingleRecordFHIR('${record.id}')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all flex items-center gap-1.5">
            <i data-lucide="code" class="w-3.5 h-3.5 text-cyan-400"></i>
            <span>Export FHIR JSON</span>
          </button>
          
          <button onclick="window.closeDocumentModal()" class="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all">
            Close
          </button>
        </div>

      </div>
    </div>
  `;
}
