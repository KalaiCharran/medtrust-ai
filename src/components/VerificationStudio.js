// Medical Record Trust Engine — Verification Studio Component - Minimalist Light Theme
export function renderVerificationStudio(state) {
  const currentPreset = state.selectedUploadPreset;
  const isScanning = state.isVerifyingDocument;
  const scanProgress = state.verificationProgress || 0;
  const verificationResult = state.lastVerificationResult;
  const scanStepIndex = state.verificationCurrentStep || 0;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <!-- Header Banner -->
      <div class="clean-card p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
              ENGINE 01 • AUTHENTICITY PIPELINE
            </span>
            <span class="text-xs text-emerald-700 font-medium">NATIONAL REGISTRY ARMED</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Medical Record Trust Studio
          </h1>
          <p class="text-xs text-slate-600 mt-0.5">
            Ingest and verify medical records against national healthcare registries, practitioner council databases, and cryptographic signature seals.
          </p>
        </div>

        <div class="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span>Registry Nodes:</span>
          <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            6 Nodes Active
          </span>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Panel: Ingestion Queue & Uploader (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Sample Ingestion Queue -->
          <div class="clean-card p-6 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 class="text-xs font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
                <i data-lucide="folder-check" class="w-4 h-4 text-sky-600"></i>
                <span>Document Ingestion Queue</span>
              </h3>
              <span class="text-[10px] font-mono text-slate-500">SAMPLE REPOSITORY</span>
            </div>
            
            <p class="text-xs text-slate-500">
              Select a clinical record from the queue to run verification:
            </p>

            <div class="space-y-2.5">
              ${state.presetDocuments.map((preset, idx) => `
                <div 
                  onclick="window.selectUploadPreset('${preset.id}')" 
                  class="p-3 rounded-lg border cursor-pointer transition-all ${currentPreset?.id === preset.id ? 'bg-sky-50/70 border-sky-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'}"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-slate-900">${preset.title}</span>
                    <span class="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded ${preset.expectedStatus === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}">
                      ${preset.expectedStatus === 'Verified' ? 'AUTHENTIC' : 'SECURITY FLAG'}
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between text-[11px] text-slate-500">
                    <span class="truncate">${preset.issuingOrg}</span>
                    <span class="font-mono text-slate-700 font-medium">Est. Trust: ${preset.expectedTrustScore}/100</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- File Upload Section -->
          <div class="clean-card p-6 text-center space-y-3">
            <h3 class="text-xs font-bold text-slate-900 uppercase font-mono">Custom Document Upload</h3>
            
            <div 
              onclick="document.getElementById('fileUploadInput').click()" 
              class="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl p-5 transition-all cursor-pointer bg-slate-50 group"
            >
              <i data-lucide="upload" class="w-5 h-5 text-slate-400 group-hover:text-slate-600 mx-auto mb-1.5"></i>
              <p class="text-xs font-semibold text-slate-800">Browse or drop document</p>
              <p class="text-[11px] text-slate-400">PDF, DICOM, Scanned Image (Max 25MB)</p>
              <input id="fileUploadInput" type="file" class="hidden" onchange="window.handleCustomFileUpload(event)" />
            </div>

            <!-- Start Verification Button -->
            <button 
              onclick="window.startTrustVerification()" 
              ${isScanning ? 'disabled' : ''}
              class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              ${isScanning ? `
                <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i>
                <span>Verifying Authenticity (${scanProgress}%)...</span>
              ` : `
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
                <span>Execute Trust Engine Verification</span>
              `}
            </button>
          </div>

        </div>

        <!-- Right Panel: Verification Pipeline Radar & Findings (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Verification Status Card -->
          <div class="clean-card p-6 sm:p-7 relative overflow-hidden space-y-5">
            
            ${isScanning ? `
              <div class="animate-clean-scan z-20"></div>
            ` : ''}

            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-sky-500 animate-ping' : (verificationResult ? 'bg-emerald-500' : 'bg-slate-400')}"></div>
                <span class="text-xs font-bold font-mono text-slate-900 uppercase">
                  ${isScanning ? 'Executing Multi-Factor Verification...' : (verificationResult ? 'Verification Verdict Ready' : 'Trust Pipeline Standby')}
                </span>
              </div>
              <span class="text-xs font-mono text-slate-500">
                ${scanProgress}% Complete
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div class="bg-slate-900 h-1.5 rounded-full transition-all duration-300" style="width: ${scanProgress}%"></div>
            </div>

            <!-- Checklist Steps -->
            <div class="space-y-2 text-xs">
              
              <!-- Step 1 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg ${scanStepIndex >= 1 ? 'bg-slate-50 border border-slate-200' : 'bg-slate-50/50 opacity-40'}">
                <div class="flex items-center gap-2.5">
                  <span class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-mono text-[10px] border border-slate-200">1</span>
                  <span class="font-medium text-slate-800">Document Ingestion & OCR Entity Parse</span>
                </div>
                <span class="text-[11px] font-mono ${scanStepIndex >= 1 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}">
                  ${scanStepIndex >= 1 ? 'PASSED' : 'PENDING'}
                </span>
              </div>

              <!-- Step 2 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg ${scanStepIndex >= 2 ? 'bg-slate-50 border border-slate-200' : 'bg-slate-50/50 opacity-40'}">
                <div class="flex items-center gap-2.5">
                  <span class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-mono text-[10px] border border-slate-200">2</span>
                  <span class="font-medium text-slate-800">Issuing Organization Registry Lookup</span>
                </div>
                <span class="text-[11px] font-mono ${scanStepIndex >= 2 ? (verificationResult?.registryOrg ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold') : 'text-slate-400'}">
                  ${scanStepIndex >= 2 ? (verificationResult?.registryOrg ? 'FOUND (REG-ACTIVE)' : 'NOT FOUND') : 'PENDING'}
                </span>
              </div>

              <!-- Step 3 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg ${scanStepIndex >= 3 ? 'bg-slate-50 border border-slate-200' : 'bg-slate-50/50 opacity-40'}">
                <div class="flex items-center gap-2.5">
                  <span class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-mono text-[10px] border border-slate-200">3</span>
                  <span class="font-medium text-slate-800">Doctor License Credentials Validation</span>
                </div>
                <span class="text-[11px] font-mono ${scanStepIndex >= 3 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}">
                  ${scanStepIndex >= 3 ? 'VALIDATED' : 'PENDING'}
                </span>
              </div>

              <!-- Step 4 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg ${scanStepIndex >= 4 ? 'bg-slate-50 border border-slate-200' : 'bg-slate-50/50 opacity-40'}">
                <div class="flex items-center gap-2.5">
                  <span class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-mono text-[10px] border border-slate-200">4</span>
                  <span class="font-medium text-slate-800">Digital Signature & Cryptographic Certificate</span>
                </div>
                <span class="text-[11px] font-mono ${scanStepIndex >= 4 ? (verificationResult?.digitalSignature?.includes('VALID') ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold') : 'text-slate-400'}">
                  ${scanStepIndex >= 4 ? (verificationResult?.digitalSignature?.includes('VALID') ? 'PKI VALID' : 'INVALID / MISSING') : 'PENDING'}
                </span>
              </div>

              <!-- Step 5 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg ${scanStepIndex >= 5 ? 'bg-slate-50 border border-slate-200' : 'bg-slate-50/50 opacity-40'}">
                <div class="flex items-center gap-2.5">
                  <span class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-mono text-[10px] border border-slate-200">5</span>
                  <span class="font-medium text-slate-800">Tampering & Consistency Anomaly Check</span>
                </div>
                <span class="text-[11px] font-mono ${scanStepIndex >= 5 ? (verificationResult?.tamperingAnalysis === 'NO_ALTERATION_DETECTED' ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold') : 'text-slate-400'}">
                  ${scanStepIndex >= 5 ? (verificationResult?.tamperingAnalysis === 'NO_ALTERATION_DETECTED' ? 'CLEAN (0 FLAGS)' : 'FLAGGED') : 'PENDING'}
                </span>
              </div>

            </div>

            <!-- Terminal Audit Logs Stream -->
            <div class="bg-slate-900 rounded-xl p-3.5 font-mono text-[11px] text-slate-300 max-h-44 overflow-y-auto space-y-1">
              <div class="text-slate-400 font-bold border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between text-[10px]">
                <span>// TRUST ENGINE AUDIT STREAM</span>
                <span>SECURE RUNTIME</span>
              </div>
              ${state.verificationLogs.length === 0 ? `
                <div class="text-slate-500">Select a document and execute verification to generate live audit logs.</div>
              ` : `
                ${state.verificationLogs.map(l => `
                  <div class="flex items-start gap-2">
                    <span class="text-slate-500">[${l.timestamp.slice(11, 19)}]</span>
                    <span class="${l.status === 'PASS' ? 'text-emerald-400 font-bold' : (l.status === 'FAIL' ? 'text-rose-400 font-bold' : 'text-sky-400')}">[${l.status}]</span>
                    <span class="text-slate-300">${l.details}</span>
                  </div>
                `).join('')}
              `}
            </div>

          </div>

          <!-- Final Verification Result Card -->
          ${verificationResult ? `
            <div class="clean-card p-6 sm:p-7 border ${verificationResult.verificationStatus === 'Verified' ? 'border-emerald-300 bg-emerald-50/30' : 'border-rose-300 bg-rose-50/30'} space-y-4">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <span class="text-[10px] font-mono px-2 py-0.2 rounded font-bold uppercase ${verificationResult.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                    VERDICT
                  </span>
                  <h2 class="text-lg font-bold text-slate-900 mt-0.5">
                    ${verificationResult.verificationStatus === 'Verified' ? '✓ Verified Medical Record' : '⚠ Unverified Document Flagged'}
                  </h2>
                  <p class="text-xs text-slate-600">${verificationResult.statusDescription}</p>
                </div>

                <div class="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shrink-0">
                  <div class="text-right">
                    <div class="text-[10px] font-mono text-slate-500">TRUST SCORE</div>
                    <div class="text-xl font-bold font-mono ${verificationResult.trustScore >= 85 ? 'text-emerald-700' : 'text-rose-700'}">
                      ${verificationResult.trustScore}<span class="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                  </div>
                  <i data-lucide="${verificationResult.trustScore >= 85 ? 'check-circle-2' : 'alert-triangle'}" class="w-6 h-6 ${verificationResult.trustScore >= 85 ? 'text-emerald-600' : 'text-rose-600'}"></i>
                </div>
              </div>

              <!-- Factor Breakdown -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                ${verificationResult.verificationFactors.map(f => `
                  <div class="p-2.5 rounded-lg bg-white border border-slate-200 flex items-start gap-2">
                    <i data-lucide="${f.status === 'Pass' ? 'check-circle' : 'x-circle'}" class="w-3.5 h-3.5 ${f.status === 'Pass' ? 'text-emerald-600' : 'text-rose-600'} shrink-0 mt-0.5"></i>
                    <div>
                      <div class="font-semibold text-slate-900">${f.factor}</div>
                      <div class="text-[11px] text-slate-500">${f.details}</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- SHA-256 Hash -->
              <div class="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs">
                <div class="text-[10px] text-slate-500">SHA-256 IMMUTABLE DOCUMENT HASH:</div>
                <div class="text-slate-800 break-all text-[11px]">${verificationResult.sha256Hash}</div>
              </div>

              <!-- Commit Button -->
              <div class="flex items-center justify-end gap-2 pt-1">
                <button onclick="window.commitRecordToVault()" class="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5">
                  <i data-lucide="plus-circle" class="w-4 h-4"></i>
                  <span>Commit Record to Health Vault</span>
                </button>
              </div>

            </div>
          ` : ''}

        </div>

      </div>

    </div>
  `;
}
