// Patient Dashboard & Health Overview Component - Minimalist Healthcare Theme
export function renderPatientDashboard(state) {
  const patient = state.patient;
  const records = state.records;
  const verifiedCount = records.filter(r => r.verificationStatus === 'Verified').length;
  const avgTrustScore = Math.round(records.reduce((acc, r) => acc + (r.trustScore || 0), 0) / (records.length || 1));
  const pendingRequests = state.accessRequests.filter(r => r.status === 'Pending');
  const activeGrants = state.accessGrants.filter(g => g.status === 'Active');
  const safetyReport = state.clinicalSafetyReport;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <!-- Patient Profile Header Card -->
      <div class="clean-card p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div class="flex items-start sm:items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-sky-100 border border-sky-200 text-sky-800 flex items-center justify-center font-bold text-lg shrink-0">
            AK
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <h1 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">${patient.name}</h1>
              <span class="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
                ${patient.age} Y • ${patient.gender}
              </span>
              <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Blood: ${patient.bloodGroup}
              </span>
            </div>
            
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
              <span>UHID: <strong class="text-slate-700 font-semibold">${patient.uhid}</strong></span>
              <span>•</span>
              <span>Health ID: <strong class="text-slate-700 font-semibold">${patient.digitalHealthId}</strong></span>
              <span>•</span>
              <span class="text-emerald-700 font-medium">Zero-Trust Minimization Active</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <button onclick="window.appRouter('verify')" class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition-all flex items-center gap-1.5">
            <i data-lucide="upload" class="w-4 h-4"></i>
            <span>Upload Document</span>
          </button>
          <button onclick="window.appRouter('consent')" class="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-xs transition-all flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-4 h-4 text-sky-600"></i>
            <span>Consent Center</span>
            ${pendingRequests.length > 0 ? `
              <span class="px-1.5 py-0.2 rounded-full bg-sky-600 text-white text-[10px] font-bold">${pendingRequests.length}</span>
            ` : ''}
          </button>
        </div>
      </div>

      <!-- Critical Clinical Safety Alert Banner (if any) -->
      ${safetyReport && safetyReport.criticalCount > 0 ? `
        <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="alert-octagon" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-xs font-bold text-rose-800 uppercase tracking-wide">Critical Allergy Conflict</span>
                <span class="text-[11px] text-rose-600">Penicillin Allergy vs Prescribed Beta-Lactam</span>
              </div>
              <p class="text-xs text-rose-900 leading-relaxed">
                Documented severe allergy to <strong class="underline">Penicillin</strong> conflicts with detected <strong class="underline">Amoxicillin/Augmentin</strong> prescription. High anaphylaxis hazard.
              </p>
            </div>
          </div>
          
          <button onclick="window.appRouter('safety')" class="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium shrink-0 shadow-xs transition-all flex items-center gap-1">
            <span>Review Safety Report</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      ` : ''}

      <!-- Metric Grid Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Card 1: Verified Records -->
        <div onclick="window.appRouter('vault')" class="clean-card-interactive p-5 cursor-pointer">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Verified Health Records</span>
            <i data-lucide="folder-check" class="w-4 h-4 text-emerald-600"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-2xl font-bold font-mono text-slate-900">${verifiedCount}</span>
            <span class="text-xs text-slate-500 font-mono">/ ${records.length} records</span>
          </div>
          <div class="text-[11px] font-mono text-emerald-700 font-medium">
            Avg Trust Score: ${avgTrustScore}/100
          </div>
        </div>

        <!-- Card 2: Active Prescriptions -->
        <div onclick="window.appRouter('vault'); window.setVaultFilter('Prescriptions')" class="clean-card-interactive p-5 cursor-pointer">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Medications</span>
            <i data-lucide="pill" class="w-4 h-4 text-sky-600"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-2xl font-bold font-mono text-slate-900">${state.medications.length}</span>
            <span class="text-xs text-slate-500">Therapies</span>
          </div>
          <div class="text-[11px] text-slate-600 truncate">
            ${state.medications.map(m => m.name).join(', ')}
          </div>
        </div>

        <!-- Card 3: Known Allergies -->
        <div onclick="window.appRouter('safety')" class="clean-card-interactive p-5 cursor-pointer">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Documented Allergies</span>
            <i data-lucide="alert-circle" class="w-4 h-4 text-rose-600"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-2xl font-bold font-mono text-rose-700">${state.allergies.length}</span>
            <span class="text-xs text-rose-600 font-medium">Known Contraindications</span>
          </div>
          <div class="text-[11px] font-mono text-rose-700">
            Penicillin (Severe Anaphylaxis)
          </div>
        </div>

        <!-- Card 4: Pending Consent Requests -->
        <div onclick="window.appRouter('consent')" class="clean-card-interactive p-5 cursor-pointer">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Pending Consent</span>
            <i data-lucide="sparkles" class="w-4 h-4 text-sky-600"></i>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-2xl font-bold font-mono text-slate-900">${pendingRequests.length}</span>
            <span class="text-xs text-sky-700 font-medium">Needs Decision</span>
          </div>
          <div class="text-[11px] text-sky-700 font-medium">
            AI Data Minimization Ready
          </div>
        </div>

      </div>

      <!-- Main Two-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Column: Pending Consent & Recent Vault (2 Cols) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Pending Organization Access Requests -->
          <div class="clean-card p-6">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4 text-sky-600"></i>
                <h2 class="text-sm font-bold text-slate-900">Pending Organization Access Requests</h2>
              </div>
              <button onclick="window.appRouter('consent')" class="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1">
                <span>View All (${pendingRequests.length})</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            ${pendingRequests.length === 0 ? `
              <div class="p-8 text-center rounded-xl bg-slate-50 border border-slate-200">
                <i data-lucide="check-circle" class="w-6 h-6 text-emerald-600 mx-auto mb-2"></i>
                <p class="text-xs text-slate-600 font-medium">All data access requests have been addressed.</p>
              </div>
            ` : `
              <div class="space-y-4">
                ${pendingRequests.map(req => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div class="flex items-center gap-2">
                          <h3 class="text-sm font-bold text-slate-900">${req.orgName}</h3>
                          <span class="text-[10px] font-mono px-2 py-0.2 rounded bg-white text-slate-600 border border-slate-200">${req.orgType}</span>
                        </div>
                        <p class="text-xs text-slate-600 mt-0.5">Purpose: <strong class="text-slate-800">${req.purpose}</strong></p>
                      </div>
                      <span class="text-xs font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md shrink-0">
                        Duration: ${req.durationHours} Hours
                      </span>
                    </div>

                    <!-- AI Minimization Box -->
                    <div class="p-3.5 rounded-lg bg-white border border-slate-200 text-xs">
                      <div class="flex items-center justify-between mb-1">
                        <div class="font-bold text-slate-900 flex items-center gap-1.5">
                          <i data-lucide="cpu" class="w-3.5 h-3.5 text-sky-600"></i>
                          <span>AI Data Minimization Recommendation</span>
                        </div>
                        <span class="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                          ${req.aiMinimization?.privacyScoreBoost || '+65% Protected'}
                        </span>
                      </div>
                      <p class="text-slate-600 text-xs mb-1.5">
                        Requested: <span class="text-rose-700 font-medium">Complete History</span>. Recommended sharing: <strong class="text-emerald-800">${req.aiMinimization?.recommendedScopeSummary || 'Verified cardiac & medication records'}</strong>.
                      </p>
                      <p class="text-[11px] text-slate-500 italic">
                        Reason: ${req.aiMinimization?.excludedReason || 'Non-essential records excluded.'}
                      </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-wrap items-center gap-2">
                      <button onclick="window.approveRequestWithAIMinimum('${req.id}')" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i>
                        <span>Approve AI Minimum</span>
                      </button>
                      
                      <button onclick="window.appRouter('consent'); window.selectConsentRequest('${req.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-all flex items-center gap-1">
                        <i data-lucide="sliders" class="w-3.5 h-3.5 text-slate-500"></i>
                        <span>Customize Scope</span>
                      </button>

                      <button onclick="window.rejectRequest('${req.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-medium transition-all flex items-center gap-1 ml-auto">
                        <i data-lucide="x" class="w-3.5 h-3.5"></i>
                        <span>Reject</span>
                      </button>
                    </div>

                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Recent Medical Records -->
          <div class="clean-card p-6">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <i data-lucide="folder-lock" class="w-4 h-4 text-slate-600"></i>
                <h2 class="text-sm font-bold text-slate-900">Recent Records in Health Vault</h2>
              </div>
              <button onclick="window.appRouter('vault')" class="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1">
                <span>View Full Vault (${records.length})</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              ${records.slice(0, 4).map(rec => `
                <div onclick="window.openDocumentModal('${rec.id}')" class="clean-card-interactive p-4 cursor-pointer flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-1.5">
                      <span class="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-600">${rec.category}</span>
                      <span class="px-2 py-0.2 rounded text-[10px] font-mono font-semibold ${rec.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}">
                        ${rec.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                    <h4 class="text-xs font-bold text-slate-900 line-clamp-1 mb-0.5">${rec.title}</h4>
                    <p class="text-[11px] text-slate-500 truncate">${rec.issuingOrg}</p>
                  </div>

                  <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>${rec.date}</span>
                    <span class="font-semibold text-slate-800">Trust: ${rec.trustScore}/100</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Right Column: Active Grants & Audit Trail (1 Col) -->
        <div class="space-y-6">
          
          <!-- Active Grants -->
          <div class="clean-card p-6">
            <div class="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <i data-lucide="timer" class="w-4 h-4 text-emerald-600"></i>
                <h3 class="text-sm font-bold text-slate-900">Active Data Grants</h3>
              </div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                ${activeGrants.length} Active
              </span>
            </div>

            ${activeGrants.length === 0 ? `
              <div class="p-6 text-center rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                No organizations currently hold active access grants.
              </div>
            ` : `
              <div class="space-y-3">
                ${activeGrants.map(grant => `
                  <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-bold text-slate-900">${grant.orgName}</span>
                      <span class="text-[10px] font-mono text-emerald-700 font-semibold">ACTIVE</span>
                    </div>
                    <p class="text-[11px] text-slate-600">Purpose: ${grant.purpose}</p>
                    <div class="text-[10px] font-mono text-slate-500 bg-white p-2 rounded border border-slate-200">
                      <div>Scope: <strong class="text-slate-800">${Array.isArray(grant.grantedScope) ? grant.grantedScope.join(', ') : grant.grantedScope}</strong></div>
                      <div>Token: <span class="text-slate-500 truncate">${grant.zeroTrustToken || 'ZT-ECDSA-VALID'}</span></div>
                    </div>
                    <div class="pt-1 flex items-center justify-between">
                      <button onclick="window.revokeAccessGrant('${grant.id}')" class="px-2.5 py-1 rounded bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-medium transition-all">
                        Revoke Now
                      </button>
                      <button onclick="window.fastForwardGrant('${grant.id}')" class="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium transition-all" title="Enforce token expiration">
                        Expire Token
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Audit Log Snippet -->
          <div class="clean-card p-6">
            <div class="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <i data-lucide="history" class="w-4 h-4 text-slate-600"></i>
                <h3 class="text-sm font-bold text-slate-900">Access Audit Trail</h3>
              </div>
              <button onclick="window.appRouter('activity')" class="text-xs text-sky-600 hover:text-sky-700 font-medium">
                Full Log
              </button>
            </div>

            <div class="space-y-2.5">
              ${state.activityLog.slice(0, 4).map(log => `
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-slate-800 truncate max-w-[140px]">${log.orgName}</span>
                    <span class="text-[9px] font-mono px-1.5 py-0.2 rounded ${log.status === 'Active' ? 'bg-emerald-50 text-emerald-800' : (log.status === 'Revoked' ? 'bg-rose-50 text-rose-800' : 'bg-slate-200 text-slate-700')}">
                      ${log.status}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-500 line-clamp-1">${log.purpose}</p>
                  <div class="text-[9px] font-mono text-slate-400 flex items-center justify-between pt-0.5">
                    <span>${new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>${log.action}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
