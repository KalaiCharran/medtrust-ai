// AI Clinical Safety View Component
// Real-time Drug-Drug Interaction, Allergy Cross-Reaction, and Interactive Safety Sandbox

export function renderClinicalSafetyView(state) {
  const safetyReport = state.clinicalSafetyReport;
  const criticalAlerts = safetyReport?.alerts?.filter(a => a.severity === 'Critical') || [];
  const warningAlerts = safetyReport?.alerts?.filter(a => a.severity === 'Warning') || [];
  const infoAlerts = safetyReport?.alerts?.filter(a => a.severity === 'Informational') || [];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Top Banner -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-950 text-amber-300 border border-amber-800">
              ENGINE 03: CLINICAL DECISION SUPPORT
            </span>
            <span class="text-xs text-rose-400 font-mono">CONTINUOUS CONTRAINDICATION SCREENING</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Clinical Safety Engine
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time proactive screening across active medications, known patient allergy profiles, and newly uploaded prescriptions to prevent adverse drug events and anaphylaxis.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono">
            Status: <strong class="${safetyReport.criticalCount > 0 ? 'text-rose-400' : 'text-emerald-400'}">${safetyReport.criticalCount > 0 ? 'HAZARDS DETECTED' : 'SAFETY VERIFIED'}</strong>
          </span>
        </div>
      </div>

      <!-- Mandatory Clinical Decision Support Disclaimer -->
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3 font-mono">
        <i data-lucide="info" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
        <div>
          <strong class="text-slate-200">CLINICAL DECISION-SUPPORT NOTICE:</strong>
          <span>${safetyReport.disclaimer}</span>
        </div>
      </div>

      <!-- Clinical Order & Prescription Pre-Screening Engine -->
      <div class="glass-panel p-6 sm:p-7 rounded-3xl border-cyan-500/30 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <i data-lucide="flask-conical" class="w-4 h-4 text-cyan-400"></i>
              <h3 class="text-sm font-bold text-white">Prescription Safety & Interaction Pre-Screening</h3>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">Pre-screen prospective medication orders against patient profile prior to electronic prescription fulfillment:</p>
          </div>
          <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 font-bold self-start sm:self-auto">
            REAL-TIME CHECK
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Button 1: Amoxicillin (Triggers Critical) -->
          <button 
            onclick="window.simulateDrugCandidate('Amoxicillin-Clavulanate 625mg', 'Aminopenicillin', 'Critical')"
            class="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/50 text-left transition-all group"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-white group-hover:text-rose-300">Amoxicillin 625mg</span>
              <span class="text-[9px] font-mono text-rose-400 bg-rose-950 px-1.5 py-0.2 rounded font-bold">CRITICAL</span>
            </div>
            <p class="text-[11px] text-slate-400">Tests Penicillin Allergy Anaphylaxis detection</p>
          </button>

          <!-- Button 2: Ibuprofen (Triggers Warning) -->
          <button 
            onclick="window.simulateDrugCandidate('Ibuprofen 400mg', 'NSAID', 'Warning')"
            class="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 text-left transition-all group"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-white group-hover:text-amber-300">Ibuprofen 400mg</span>
              <span class="text-[9px] font-mono text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded font-bold">WARNING</span>
            </div>
            <p class="text-[11px] text-slate-400">Tests Lisinopril + NSAID renal conflict</p>
          </button>

          <!-- Button 3: Clarithromycin (Triggers Warning) -->
          <button 
            onclick="window.simulateDrugCandidate('Clarithromycin 500mg', 'Macrolide Antibiotic', 'Warning')"
            class="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 text-left transition-all group"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-white group-hover:text-amber-300">Clarithromycin 500mg</span>
              <span class="text-[9px] font-mono text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded font-bold">WARNING</span>
            </div>
            <p class="text-[11px] text-slate-400">Tests Statin CYP3A4 myopathy hazard</p>
          </button>

          <!-- Button 4: Paracetamol (Safe) -->
          <button 
            onclick="window.simulateDrugCandidate('Paracetamol 500mg', 'Analgesic', 'Safe')"
            class="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-white group-hover:text-emerald-300">Paracetamol 500mg</span>
              <span class="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded font-bold">SAFE</span>
            </div>
            <p class="text-[11px] text-slate-400">Safe analgesic alternative</p>
          </button>
        </div>
      </div>

      <!-- Safety Alerts Section -->
      <div class="space-y-4">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <i data-lucide="shield-alert" class="w-5 h-5 text-rose-400"></i>
          <span>Active Clinical Alerts (${safetyReport.totalAlerts})</span>
        </h2>

        <!-- Critical Alerts -->
        ${criticalAlerts.map(alert => `
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-rose-500/50 glow-rose space-y-4 bg-rose-950/20">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-900/40 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="px-2.5 py-1 rounded-md bg-rose-600 text-white font-mono font-black text-xs uppercase tracking-wider animate-pulse">
                  CRITICAL HAZARD
                </span>
                <span class="text-xs font-mono text-rose-300">${alert.category}</span>
              </div>
              <span class="text-[11px] font-mono text-slate-400">Source: ${alert.sourceDocument}</span>
            </div>

            <div>
              <h3 class="text-base sm:text-lg font-bold text-white mb-2">${alert.title}</h3>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-3">
                ${alert.description}
              </p>
              
              <div class="p-3.5 rounded-xl bg-slate-950/90 border border-rose-500/30 text-xs font-mono space-y-1">
                <div class="text-rose-400 font-bold">PROPOSED CLINICAL ACTION:</div>
                <div class="text-slate-300 font-sans">${alert.clinicalRecommendation}</div>
              </div>
            </div>
          </div>
        `).join('')}

        <!-- Warning Alerts -->
        ${warningAlerts.map(alert => `
          <div class="glass-panel p-6 sm:p-7 rounded-3xl border-amber-500/40 glow-amber space-y-4 bg-amber-950/15">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/40 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider">
                  WARNING
                </span>
                <span class="text-xs font-mono text-amber-300">${alert.category}</span>
              </div>
              <span class="text-[11px] font-mono text-slate-400">Source: ${alert.sourceDocument}</span>
            </div>

            <div>
              <h3 class="text-base font-bold text-white mb-2">${alert.title}</h3>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-3">
                ${alert.description}
              </p>
              
              <div class="p-3.5 rounded-xl bg-slate-950/90 border border-amber-500/30 text-xs font-mono space-y-1">
                <div class="text-amber-400 font-bold">RECOMMENDATION:</div>
                <div class="text-slate-300 font-sans">${alert.clinicalRecommendation}</div>
              </div>
            </div>
          </div>
        `).join('')}

        <!-- Informational Alerts -->
        ${infoAlerts.map(alert => `
          <div class="glass-panel p-5 sm:p-6 rounded-3xl border-cyan-500/30 space-y-3 bg-cyan-950/10">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[10px] font-bold uppercase">
                  INFORMATIONAL
                </span>
                <span class="text-xs font-mono text-cyan-400">${alert.category}</span>
              </div>
            </div>

            <h3 class="text-sm font-bold text-white">${alert.title}</h3>
            <p class="text-xs text-slate-300">${alert.description}</p>
            <p class="text-[11px] text-slate-400 italic">Recommendation: ${alert.clinicalRecommendation}</p>
          </div>
        `).join('')}

      </div>

      <!-- Two-Column Profile Breakdowns: Active Medications vs Known Allergies -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Active Pharmacotherapy -->
        <div class="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i data-lucide="pill" class="w-4 h-4 text-emerald-400"></i>
              <span>Active Pharmacotherapy Profile</span>
            </h3>
            <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              ${state.medications.length} REGIMENS
            </span>
          </div>

          <div class="space-y-3">
            ${state.medications.map(med => `
              <div class="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-xs font-bold text-white">${med.name} (${med.dosage})</h4>
                    <p class="text-[11px] text-slate-400 font-mono">${med.drugClass}</p>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                    ACTIVE
                  </span>
                </div>
                <p class="text-xs text-slate-300">Frequency: <strong>${med.frequency}</strong> • Route: <strong>${med.route}</strong></p>
                <p class="text-[11px] text-slate-400 italic">Indication: ${med.indication}</p>
                ${med.knownInteractionsWarning ? `
                  <div class="text-[10px] font-mono text-amber-400/90 bg-amber-950/30 p-2 rounded-lg border border-amber-800/40">
                    ⚠ Warning: ${med.knownInteractionsWarning}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Documented Allergy Profile -->
        <div class="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400"></i>
              <span>Documented Patient Allergies</span>
            </h3>
            <span class="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
              ${state.allergies.length} CONTRAINDICATIONS
            </span>
          </div>

          <div class="space-y-3">
            ${state.allergies.map(alg => `
              <div class="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-xs font-bold text-white">${alg.substance}</h4>
                    <p class="text-[11px] text-slate-400 font-mono">${alg.category}</p>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${alg.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}">
                    ${alg.severity.toUpperCase()}
                  </span>
                </div>
                <p class="text-xs text-slate-300">Reaction: <strong class="text-rose-300">${alg.reactionType}</strong></p>
                <div class="text-[10px] font-mono text-slate-400">
                  Contraindicated: <span class="text-slate-300">${alg.contraindicatedClasses.join(', ')}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}
