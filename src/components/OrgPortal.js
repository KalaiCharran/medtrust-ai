// Healthcare Organization Portal Component
// Allows hospitals, labs, and pharmacies to request and inspect permitted patient data in zero-trust isolation

export function renderOrgPortal(state) {
  const activeOrgId = state.activeOrgPersona || "REG-APO-8821";
  const activeOrg = state.trustedRegistry.find(o => o.id === activeOrgId) || state.trustedRegistry[0];
  
  // Find active grants for this organization
  const orgGrants = state.accessGrants.filter(g => g.orgId === activeOrg.id || g.orgName === activeOrg.canonicalName || g.orgName === activeOrg.name);
  const activeGrant = orgGrants.find(g => g.status === 'Active');

  // Compute permitted records for the active grant
  let accessibleRecords = [];
  if (activeGrant) {
    accessibleRecords = state.records.filter(r => activeGrant.grantedRecordIds?.includes(r.id));
  }

  const pendingOrgRequests = state.accessRequests.filter(r => (r.orgId === activeOrg.id || r.orgName.includes(activeOrg.canonicalName)) && r.status === 'Pending');

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Top Banner with Organization Switcher -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
              HEALTHCARE ORGANIZATION SECURE CONSOLE
            </span>
            <span class="text-xs text-slate-400 font-mono">REGISTRY ID: <strong class="text-white">${activeOrg.id}</strong></span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>${activeOrg.name}</span>
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-Trust Bound Consumer: Organization can only query, stream, and process patient records explicitly authorized by the patient's cryptographic grant.
          </p>
        </div>

        <!-- Org Switcher Dropdown -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span class="text-xs font-mono text-slate-400">Switch Requesting Entity:</span>
          <select 
            onchange="window.switchOrgPersona(this.value)"
            class="bg-slate-900 border border-slate-700 text-xs font-medium text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            ${state.trustedRegistry.map(org => `
              <option value="${org.id}" ${org.id === activeOrg.id ? 'selected' : ''}>
                ${org.canonicalName} (${org.category})
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Main Two-Column Layout: Left = Request Builder, Right = Permitted Vault Viewer -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Data Request Builder (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Request Form Card -->
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 space-y-5">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i data-lucide="send" class="w-4 h-4 text-cyan-400"></i>
                <span>Submit Health Data Request</span>
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                ACTIVE PATIENT: ARJUN KUMAR
              </span>
            </div>

            <!-- Clinical Request Templates -->
            <div>
              <label class="block text-xs font-mono text-slate-400 mb-2">CLINICAL REQUEST TEMPLATES:</label>
              <div class="grid grid-cols-2 gap-2">
                <button 
                  onclick="window.populateOrgRequestForm('Emergency Cardiac Treatment', ['Medical History', 'Prescriptions', 'Laboratory Reports', 'X-rays and Scans', 'Medications', 'Allergies'], 48)"
                  class="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs transition-all"
                >
                  <div class="font-bold text-white">Emergency Cardiac</div>
                  <div class="text-[10px] text-slate-400">Broad Request (48h)</div>
                </button>

                <button 
                  onclick="window.populateOrgRequestForm('Pharmacy Prescription Dispensation', ['Medical History', 'Prescriptions', 'Laboratory Reports', 'X-rays and Scans', 'Medications', 'Allergies'], 1)"
                  class="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs transition-all"
                >
                  <div class="font-bold text-white">Pharmacy Refill</div>
                  <div class="text-[10px] text-slate-400">Over-scoped (1h)</div>
                </button>
              </div>
            </div>

            <!-- Clinical Purpose Input -->
            <div>
              <label class="block text-xs font-mono text-slate-400 mb-1.5">CLINICAL PURPOSE FOR ACCESS:</label>
              <input 
                id="orgRequestPurpose" 
                type="text" 
                value="${state.orgDraftPurpose || 'Emergency Cardiac Catheterization & Pre-Op Assessment'}"
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <!-- Categories Requested -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-mono text-slate-400">REQUESTED RECORD CATEGORIES:</label>
                <button onclick="window.selectAllOrgCategories()" class="text-[10px] text-cyan-400 hover:underline">Select All 6</button>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                ${['Medical History', 'Prescriptions', 'Laboratory Reports', 'X-rays and Scans', 'Medications', 'Allergies'].map(cat => `
                  <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer hover:bg-slate-800">
                    <input type="checkbox" name="orgCategories" value="${cat}" checked class="rounded border-slate-700 text-cyan-500 focus:ring-0" />
                    <span class="text-slate-300 text-[11px]">${cat}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Duration -->
            <div>
              <label class="block text-xs font-mono text-slate-400 mb-1.5">REQUESTED DURATION:</label>
              <select id="orgRequestDuration" class="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3.5 py-2.5">
                <option value="1">1 Hour (Quick Dispense / Single Read)</option>
                <option value="8">8 Hours (Outpatient Clinic Day)</option>
                <option value="24">24 Hours (Overnight Observation)</option>
                <option value="48" selected>48 Hours (Inpatient Procedural Care)</option>
                <option value="168">7 Days (Surgical Post-Op Recovery)</option>
              </select>
            </div>

            <!-- Submit Button -->
            <button 
              onclick="window.submitOrgAccessRequest()" 
              class="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>Transmit Request to Patient Smart Consent Center</span>
            </button>
          </div>

          <!-- Pending Requests Status from this Org -->
          <div class="glass-panel p-5 rounded-2xl border-slate-800 space-y-3">
            <h4 class="text-xs font-mono font-bold text-slate-400 uppercase">Pending Review at Patient End:</h4>
            ${pendingOrgRequests.length === 0 ? `
              <p class="text-xs text-slate-500 italic">No outstanding requests pending patient decision.</p>
            ` : `
              ${pendingOrgRequests.map(r => `
                <div class="p-3 rounded-xl bg-slate-900 border border-cyan-500/20 text-xs space-y-1">
                  <div class="flex items-center justify-between text-white font-bold">
                    <span>${r.purpose}</span>
                    <span class="text-[10px] font-mono text-cyan-400 animate-pulse">PENDING CONSENT</span>
                  </div>
                  <p class="text-[11px] text-slate-400">Duration: ${r.durationHours}h • Requested: ${new Date(r.requestedAt).toLocaleTimeString()}</p>
                </div>
              `).join('')}
            `}
          </div>

        </div>

        <!-- Right Column: Zero-Trust Permitted Data Viewer (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Active Grant Status Header -->
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 space-y-4">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded ${activeGrant ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'} uppercase font-bold">
                  ${activeGrant ? 'ZERO-TRUST TOKEN ACTIVE' : 'NO ACTIVE DATA GRANT'}
                </span>
                <h3 class="text-lg font-bold text-white mt-1">
                  Permitted Patient Medical Record Stream
                </h3>
              </div>

              ${activeGrant ? `
                <!-- Live Expiration Controls & Countdown -->
                <div class="flex items-center gap-2">
                  <button onclick="window.fastForwardGrant('${activeGrant.id}')" class="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800 text-xs font-mono font-medium transition-all" title="Enforce token lifecycle expiration">
                    Expire Token
                  </button>
                  <button onclick="window.revokeAccessGrant('${activeGrant.id}')" class="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-mono font-medium transition-all">
                    Revoke Grant
                  </button>
                </div>
              ` : ''}
            </div>

            ${!activeGrant ? `
              <!-- Zero-Trust Locked State -->
              <div class="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                  <i data-lucide="lock" class="w-6 h-6"></i>
                </div>
                <h4 class="text-sm font-bold text-white">Access Restricted by Zero-Trust Enclave</h4>
                <p class="text-xs text-slate-400 max-w-md mx-auto">
                  ${activeOrg.canonicalName} does not possess an active, patient-signed zero-trust token. Submit a data request on the left and approve it from the Patient Portal to view permitted records.
                </p>
                <div class="pt-2">
                  <button onclick="window.switchUserRole('patient'); window.appRouter('consent')" class="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all">
                    Switch to Patient View & Approve Pending Requests ➔
                  </button>
                </div>
              </div>
            ` : `
              
              <!-- Active Zero-Trust Token Details -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
                <div class="flex items-center justify-between text-slate-400">
                  <span>GRANT TOKEN ID:</span>
                  <span class="text-cyan-400">${activeGrant.id}</span>
                </div>
                <div class="flex items-center justify-between text-slate-400">
                  <span>AUTHORIZED PURPOSE:</span>
                  <span class="text-white">${activeGrant.purpose}</span>
                </div>
                <div class="flex items-center justify-between text-slate-400">
                  <span>AUTHORIZED SCOPE:</span>
                  <span class="text-emerald-400 font-bold">${Array.isArray(activeGrant.grantedScope) ? activeGrant.grantedScope.join(', ') : activeGrant.grantedScope}</span>
                </div>
                <div class="flex items-center justify-between text-slate-400">
                  <span>RECORDS VISIBLE UNDER ZERO-TRUST:</span>
                  <span class="text-emerald-300 font-bold">${accessibleRecords.length} Documents</span>
                </div>
              </div>

              <!-- Permitted Documents Grid -->
              <div class="space-y-3">
                <div class="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <i data-lucide="eye" class="w-4 h-4 text-emerald-400"></i>
                  <span>Patient-Permitted Records (Zero-Trust Enforced):</span>
                </div>

                ${accessibleRecords.map(rec => `
                  <div onclick="window.openDocumentModal('${rec.id}')" class="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all">
                    <div class="flex items-center justify-between gap-2 mb-1.5">
                      <h4 class="text-xs font-bold text-white">${rec.title}</h4>
                      <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        VERIFIED (${rec.trustScore}/100)
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-400 mb-2">${rec.issuingOrg} • ${rec.date}</p>
                    <p class="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 font-sans">
                      ${rec.summary}
                    </p>
                  </div>
                `).join('')}
              </div>

            `}

          </div>

        </div>

      </div>

    </div>
  `;
}
