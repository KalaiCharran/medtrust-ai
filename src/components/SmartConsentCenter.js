// Smart Consent Center Component — Primary Differentiator
// Visual Side-by-Side Data Minimization Comparison & Granular Consent Controls

export function renderSmartConsentCenter(state) {
  const pendingRequests = state.accessRequests.filter(r => r.status === 'Pending');
  const selectedRequestId = state.selectedConsentRequestId || pendingRequests[0]?.id;
  const activeRequest = state.accessRequests.find(r => r.id === selectedRequestId);

  const isCustomizing = state.isCustomizingConsent && state.customizingRequestId === activeRequest?.id;
  const customRecordIds = state.customConsentRecordIds || (activeRequest?.aiMinimization?.recommendedRecordIds || []);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Top Banner -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
              ENGINE 02: AI DATA MINIMIZATION
            </span>
            <span class="text-xs text-cyan-400 font-mono">ZERO-TRUST SHARING ENCLAVE</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Smart Consent Center
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Organizations frequently request entire medical histories. MedTrust AI's Smart Consent Engine evaluates <strong class="text-white">Who</strong> is asking, <strong class="text-white">Why</strong> they need it, and automatically recommends the <strong class="text-emerald-400">minimal necessary dataset</strong>.
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <span class="text-xs font-mono text-slate-400">Pending Requests:</span>
          <span class="px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono shadow-md">
            ${pendingRequests.length} Requiring Consent
          </span>
        </div>
      </div>

      ${!activeRequest ? `
        <div class="glass-panel p-16 rounded-3xl border-slate-800 text-center space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <i data-lucide="shield-check" class="w-8 h-8"></i>
          </div>
          <h2 class="text-xl font-bold text-white">Zero Pending Consent Requests</h2>
          <p class="text-xs text-slate-400 max-w-md mx-auto">
            All organization access requests have been addressed. No external healthcare entities have unapproved access to your medical vault.
          </p>
          <div class="pt-2">
            <button onclick="window.switchUserRole('org'); window.appRouter('org-portal')" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition-all">
              Switch to Organization Portal to Submit a New Request ➔
            </button>
          </div>
        </div>
      ` : `
        
        <!-- Active Request Selector Bar (if multiple requests) -->
        ${pendingRequests.length > 1 ? `
          <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            <span class="text-xs font-mono text-slate-400">Select Request:</span>
            ${pendingRequests.map(r => `
              <button 
                onclick="window.selectConsentRequest('${r.id}')"
                class="px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${r.id === activeRequest.id ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'}"
              >
                <span>${r.orgName}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded ${r.id === activeRequest.id ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'}">${r.durationHours}h</span>
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- Request Details Banner Card -->
        <div class="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 relative overflow-hidden">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div>
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <h2 class="text-xl sm:text-2xl font-bold text-white">${activeRequest.orgName}</h2>
                <span class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  ${activeRequest.orgType}
                </span>
                <span class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800">
                  ${activeRequest.aiMinimization?.riskLevel || 'High Overexposure'}
                </span>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300 mt-3">
                <div>
                  <span class="text-slate-500">REQUESTED BY:</span><br />
                  <strong class="text-white">${activeRequest.requestedBy || 'Clinical Staff'}</strong>
                </div>
                <div>
                  <span class="text-slate-500">CLINICAL PURPOSE:</span><br />
                  <strong class="text-cyan-300">${activeRequest.purpose}</strong>
                </div>
                <div>
                  <span class="text-slate-500">REQUESTED DURATION:</span><br />
                  <strong class="text-white">${activeRequest.durationHours} Hours Temporary Access</strong>
                </div>
              </div>
            </div>

            <!-- Privacy Boost Badge -->
            <div class="bg-gradient-to-br from-emerald-950/80 to-teal-950/80 border border-emerald-500/30 p-4 rounded-2xl text-center shrink-0">
              <div class="text-[10px] font-mono text-emerald-400 uppercase font-bold">ZERO-TRUST ADVANTAGE</div>
              <div class="text-2xl font-black font-mono text-emerald-300 mt-0.5">
                ${activeRequest.aiMinimization?.privacyScoreBoost || '+65% Protected'}
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5">Over-exposure Blocked</div>
            </div>

          </div>
        </div>

        <!-- AI Minimization Explanation Card -->
        <div class="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 glow-cyan">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="cpu" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h4 class="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wider">AI Minimization Rationale</h4>
                <span class="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-900 text-cyan-200">AUTOMATED ANALYSIS</span>
              </div>
              <p class="text-xs text-slate-200 leading-relaxed font-sans">
                ${activeRequest.aiMinimization?.rationale || 'The requested data scope exceeds the minimum necessity for this clinical purpose.'}
              </p>
            </div>
          </div>
        </div>

        <!-- Custom Scope Editor Drawer (if patient clicked 'Customize Scope') -->
        ${isCustomizing ? `
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-cyan-500/40 glow-cyan space-y-5 bg-slate-900/95">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <i data-lucide="sliders" class="w-5 h-5 text-cyan-400"></i>
                <h3 class="text-sm font-bold text-white">Granular Medical Record Permissions</h3>
              </div>
              <button onclick="window.toggleCustomizeConsent('${activeRequest.id}')" class="text-xs text-slate-400 hover:text-white">
                Cancel Customization
              </button>
            </div>

            <p class="text-xs text-slate-300">
              Select or deselect specific medical records to build a customized zero-trust disclosure token:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${state.records.map(rec => {
                const isSelected = customRecordIds.includes(rec.id);
                return `
                  <label class="p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${isSelected ? 'bg-cyan-950/40 border-cyan-500/60' : 'bg-slate-950/60 border-slate-800 opacity-60'}">
                    <input 
                      type="checkbox" 
                      value="${rec.id}" 
                      ${isSelected ? 'checked' : ''} 
                      onchange="window.toggleCustomRecordSelection('${rec.id}')"
                      class="rounded border-slate-700 text-cyan-500 focus:ring-0 mt-0.5" 
                    />
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-white">${rec.title}</span>
                        <span class="text-[9px] font-mono px-1.5 py-0.2 rounded ${rec.verificationStatus === 'Verified' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}">${rec.verificationStatus}</span>
                      </div>
                      <p class="text-[11px] text-slate-400 mt-0.5">${rec.category} • ${rec.issuingOrg}</p>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-800">
              <div class="text-xs font-mono text-cyan-300">
                Custom Selected: <strong>${customRecordIds.length} records</strong>
              </div>
              <button onclick="window.approveCustomScope('${activeRequest.id}')" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5">
                <i data-lucide="check-check" class="w-4 h-4"></i>
                <span>Approve Custom Token</span>
              </button>
            </div>
          </div>
        ` : ''}

        <!-- The Main Comparison: Broad Requested vs. AI Recommended Minimum -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Column 1: Organization Requested Data (BROAD ACCESS) -->
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-rose-500/30 space-y-5 relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <i data-lucide="unlock" class="w-4 h-4"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-white">Organization Requested Data</h3>
                  <p class="text-[11px] text-rose-400 font-mono">BROAD ACCESS SCOPE (HIGH EXPOSURE)</p>
                </div>
              </div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                ALL 6 VAULT CATEGORIES
              </span>
            </div>

            <p class="text-xs text-slate-400">
              The organization requested unrestricted visibility over all patient records, diagnostics, historical notes, and scans:
            </p>

            <div class="space-y-3">
              ${state.records.map(rec => {
                const isRecommended = activeRequest.aiMinimization?.recommendedRecordIds?.includes(rec.id);
                return `
                  <div class="p-3.5 rounded-xl bg-slate-900/60 border ${isRecommended ? 'border-slate-800' : 'border-rose-900/40 bg-rose-950/10'} flex items-start justify-between gap-3">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-white">${rec.title}</span>
                        <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">${rec.category}</span>
                      </div>
                      <p class="text-[11px] text-slate-400 mt-0.5">${rec.issuingOrg} • ${rec.date}</p>
                    </div>
                    
                    <span class="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded ${isRecommended ? 'text-slate-400 bg-slate-800' : 'text-rose-400 bg-rose-950 border border-rose-800 font-bold'}">
                      ${isRecommended ? 'Relevant' : '⚠ EXCESSIVE'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="pt-2 text-[11px] text-slate-400 italic">
              * In traditional healthcare, approving this request would grant permanent, unrestricted access to the entire record set above.
            </div>
          </div>

          <!-- Column 2: AI Recommended Minimum Necessary Data (ZERO-TRUST) -->
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-emerald-500/40 glow-emerald space-y-5 relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <i data-lucide="shield-check" class="w-4 h-4"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-white">AI Recommended Minimum Data</h3>
                  <p class="text-[11px] text-emerald-400 font-mono">ZERO-TRUST MINIMIZED SCOPE</p>
                </div>
              </div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                MATHEMATICALLY MINIMAL
              </span>
            </div>

            <p class="text-xs text-slate-300">
              Only verified records directly pertinent to <strong class="text-white">"${activeRequest.purpose}"</strong> will be shared:
            </p>

            <div class="space-y-3">
              ${state.records.filter(r => activeRequest.aiMinimization?.recommendedRecordIds?.includes(r.id)).map(rec => `
                <div class="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
                      <span class="text-xs font-bold text-white">${rec.title}</span>
                    </div>
                    <p class="text-[11px] text-slate-300 mt-0.5 pl-5">${rec.category} • Trust Score: <strong class="text-emerald-400">${rec.trustScore}/100</strong></p>
                  </div>
                  
                  <span class="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold">
                    INCLUDED
                  </span>
                </div>
              `).join('')}

              <!-- Also show included medications and allergies for safety -->
              <div class="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
                    <span class="text-xs font-bold text-white">Active Pharmacotherapy & Allergy Profiles</span>
                  </div>
                  <p class="text-[11px] text-slate-300 mt-0.5 pl-5">Lisinopril, Atorvastatin, and Penicillin Anaphylaxis Warnings</p>
                </div>
                <span class="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold">
                  SAFETY CRITICAL
                </span>
              </div>
            </div>

            <!-- Excluded Items Summary Box -->
            <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div class="font-bold text-slate-300 flex items-center gap-1.5">
                <i data-lucide="eye-off" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>Protected / Filtered Out from Sharing:</span>
              </div>
              <p class="text-[11px]">
                ${activeRequest.aiMinimization?.excludedCategories?.join(', ') || 'Unrelated laboratory panels, routine checkup notes, and unverified documents.'}
              </p>
            </div>

          </div>

        </div>

        <!-- Patient Action Decision Matrix -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-xs text-slate-400">
            <strong class="text-white">Patient Decision Authority:</strong> You maintain cryptographic ownership over your health record enclave.
          </div>

          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <!-- 1-Click Approve AI Recommendation -->
            <button 
              onclick="window.approveRequestWithAIMinimum('${activeRequest.id}')"
              class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <i data-lucide="sparkles" class="w-4 h-4 text-slate-950"></i>
              <span>Approve AI Minimum Scope (Recommended)</span>
            </button>

            <!-- Customize Scope -->
            <button 
              onclick="window.toggleCustomizeConsent('${activeRequest.id}')"
              class="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
              <span>Customize Scope</span>
            </button>

            <!-- Approve Full Scope Override -->
            <button 
              onclick="window.approveRequestFullScope('${activeRequest.id}')"
              class="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Approve Full Broad Scope</span>
            </button>

            <!-- Reject Request -->
            <button 
              onclick="window.rejectRequest('${activeRequest.id}')"
              class="w-full sm:w-auto px-4 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="x" class="w-4 h-4"></i>
              <span>Reject Request</span>
            </button>
          </div>
        </div>

      `}

    </div>
  `;
}
