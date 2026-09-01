// Landing Page Component - Minimalist Enterprise Healthcare Technology Showcase
export function renderLandingPage(state) {
  return `
    <div class="space-y-20 py-8">
      
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-medium mb-6">
          <i data-lucide="shield" class="w-3.5 h-3.5 text-sky-600"></i>
          <span>Zero-Trust Patient Health Data Network</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
          Your Health Data. Your Control. <br />
          <span class="text-sky-600">Intelligently Protected.</span>
        </h1>

        <p class="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-normal">
          A patient-centric platform where medical records are verified for authenticity, organizations receive only the minimum necessary information, and all access is temporary and auditable.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <button onclick="window.switchUserRole('patient'); window.appRouter('dashboard')" class="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm transition-all">
            <i data-lucide="user" class="w-4 h-4"></i>
            <span>Enter Patient Portal</span>
          </button>
          
          <button onclick="window.switchUserRole('org'); window.appRouter('org-portal')" class="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-sm shadow-xs transition-all">
            <i data-lucide="building-2" class="w-4 h-4 text-slate-500"></i>
            <span>Enter Healthcare Provider Portal</span>
          </button>
        </div>

        <!-- Clean Metric Summary Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="clean-card p-5 text-center">
            <div class="text-2xl font-bold font-mono text-slate-900">100%</div>
            <div class="text-xs text-slate-500 mt-0.5">Cryptographic Verification</div>
          </div>
          <div class="clean-card p-5 text-center">
            <div class="text-2xl font-bold font-mono text-emerald-600">Zero-Trust</div>
            <div class="text-xs text-slate-500 mt-0.5">Data Minimization</div>
          </div>
          <div class="clean-card p-5 text-center">
            <div class="text-2xl font-bold font-mono text-amber-600">Real-Time</div>
            <div class="text-xs text-slate-500 mt-0.5">Clinical Safety Screening</div>
          </div>
          <div class="clean-card p-5 text-center">
            <div class="text-2xl font-bold font-mono text-sky-600">Auto-Revoke</div>
            <div class="text-xs text-slate-500 mt-0.5">Time-Bound Access</div>
          </div>
        </div>
      </section>

      <!-- 3 Core Engines Overview -->
      <section id="engines" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Three Intelligent Zero-Trust Engines
          </h2>
          <p class="text-slate-600 max-w-2xl mx-auto mt-2 text-sm">
            Architected to guarantee record authenticity, prevent over-sharing, and protect clinical safety.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Engine 1: Medical Record Trust Engine -->
          <div class="clean-card p-6 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center mb-4 text-sky-600">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div class="text-xs font-mono font-semibold text-sky-600 uppercase mb-1">Engine 01</div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">Medical Record Trust Engine</h3>
              <p class="text-slate-600 text-xs leading-relaxed mb-4">
                Does not blindly trust uploaded documents. Ingests records through an authenticity pipeline checking national registries, physician credentials, digital signatures, and tamper inconsistencies.
              </p>
              <div class="space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Registry Match:</span>
                  <span class="font-medium text-emerald-700">Apollo Hospitals</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Digital Signature:</span>
                  <span class="font-medium text-emerald-700">Ed25519 PKI Valid</span>
                </div>
                <div class="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span class="text-slate-900 font-semibold">Trust Score:</span>
                  <span class="font-bold text-emerald-600">96/100 (Verified)</span>
                </div>
              </div>
            </div>
            <button onclick="window.switchUserRole('patient'); window.appRouter('verify')" class="mt-6 w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5">
              <span>View Trust Studio</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <!-- Engine 2: AI Smart Consent Engine -->
          <div class="clean-card p-6 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                <i data-lucide="sparkles" class="w-5 h-5"></i>
              </div>
              <div class="text-xs font-mono font-semibold text-emerald-600 uppercase mb-1">Engine 02 • Core Differentiator</div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">AI Smart Consent Engine</h3>
              <p class="text-slate-600 text-xs leading-relaxed mb-4">
                Enforces the principle of minimum necessary disclosure. Evaluates who is requesting, why they need it, and automatically recommends the minimal dataset needed for clinical care.
              </p>
              <div class="space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Requested Scope:</span>
                  <span class="font-medium text-rose-700">Complete History (8 items)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">AI Minimized:</span>
                  <span class="font-medium text-emerald-700">Necessary Scope (3 items)</span>
                </div>
                <div class="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span class="text-slate-900 font-semibold">Privacy Gain:</span>
                  <span class="font-bold text-emerald-600">+65% Protected</span>
                </div>
              </div>
            </div>
            <button onclick="window.switchUserRole('patient'); window.appRouter('consent')" class="mt-6 w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5">
              <span>View Consent Center</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <!-- Engine 3: AI Clinical Safety Engine -->
          <div class="clean-card p-6 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center mb-4 text-amber-600">
                <i data-lucide="activity" class="w-5 h-5"></i>
              </div>
              <div class="text-xs font-mono font-semibold text-amber-600 uppercase mb-1">Engine 03</div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">AI Clinical Safety Engine</h3>
              <p class="text-slate-600 text-xs leading-relaxed mb-4">
                Continuous clinical decision support screening active medications, documented allergies, and newly ingested prescriptions for adverse drug interactions and contraindications.
              </p>
              <div class="space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Allergy Conflict:</span>
                  <span class="font-medium text-rose-700">Penicillin vs Amox</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Interaction Warning:</span>
                  <span class="font-medium text-amber-700">Lisinopril + NSAID</span>
                </div>
                <div class="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span class="text-slate-900 font-semibold">Status:</span>
                  <span class="font-bold text-rose-600">Critical Alert Triggered</span>
                </div>
              </div>
            </div>
            <button onclick="window.switchUserRole('patient'); window.appRouter('safety')" class="mt-6 w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5">
              <span>View Clinical Safety</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

        </div>
      </section>

      <!-- Zero-Trust Architecture Section -->
      <section id="zero-trust" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="clean-card p-8 sm:p-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span class="text-xs font-mono font-semibold text-sky-600 uppercase mb-2 block">Architecture</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                Zero-Trust Health Data Principles
              </h2>
              <p class="text-slate-600 text-sm leading-relaxed mb-6">
                Unlike traditional health systems with perimeter-only access, MedTrust AI treats every data interaction as unverified until verified cryptographically, minimized contextually, and authorized explicitly.
              </p>
              
              <div class="space-y-3.5 text-sm">
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div>
                    <strong class="text-slate-900">Trust Before Storage:</strong>
                    <span class="text-slate-600"> Multi-factor document validation against verified medical registries.</span>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div>
                    <strong class="text-slate-900">Intelligence Before Sharing:</strong>
                    <span class="text-slate-600"> Automated data minimization based on stated clinical purpose.</span>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div>
                    <strong class="text-slate-900">Safety Before Treatment:</strong>
                    <span class="text-slate-600"> Automated contraindication and drug-allergy conflict screening.</span>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div>
                    <strong class="text-slate-900">Patient Control at Every Step:</strong>
                    <span class="text-slate-600"> Time-bound grants with instant revocation and immutable audit logging.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Clean Gateway Illustration -->
            <div class="clean-card-subtle p-6 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                <span class="text-xs font-semibold text-slate-800">Zero-Trust Minimization Flow</span>
                <span class="text-[11px] font-mono text-emerald-600 font-medium">ACTIVE ENCLAVE</span>
              </div>

              <div class="space-y-3">
                <div class="p-3.5 rounded-lg bg-white border border-slate-200">
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="font-bold text-slate-900">Apollo Hospital Request</span>
                    <span class="text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-0.2 rounded">BROAD (6 CATEGORIES)</span>
                  </div>
                  <div class="text-[11px] text-slate-500">Purpose: Emergency Cardiac Treatment</div>
                </div>

                <div class="flex justify-center">
                  <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-mono">
                    <i data-lucide="arrow-down" class="w-3.5 h-3.5"></i>
                    <span>AI MINIMIZATION FILTER</span>
                  </div>
                </div>

                <div class="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="font-bold text-emerald-900">Authorized Disclosure Dataset</span>
                    <span class="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded font-semibold">MINIMAL (3 CATEGORIES)</span>
                  </div>
                  <div class="text-[11px] text-emerald-800">Shared: Cardiac MRI, Lisinopril, Penicillin Allergy</div>
                  <div class="text-[10px] text-slate-500 mt-1">Excluded: Unrelated laboratory blood tests and routine clinic slips.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Interoperability & Standards -->
      <section id="standards" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="text-center mb-8">
          <h3 class="text-xl font-bold text-slate-900">Interoperability & Standards Compliance</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div class="clean-card p-5">
            <div class="font-bold text-slate-900 mb-1">HL7® FHIR® R4</div>
            <p class="text-slate-600">Standardized patient, observation, and diagnostic report resource bundles.</p>
          </div>
          <div class="clean-card p-5">
            <div class="font-bold text-slate-900 mb-1">HIPAA Privacy Rule</div>
            <p class="text-slate-600">Enforces the Minimum Necessary standard through automated AI context analysis.</p>
          </div>
          <div class="clean-card p-5">
            <div class="font-bold text-slate-900 mb-1">Ed25519 PKI Security</div>
            <p class="text-slate-600">Hardware-backed cryptographic signatures and SHA-256 document hashing.</p>
          </div>
          <div class="clean-card p-5">
            <div class="font-bold text-slate-900 mb-1">Audit Non-Repudiation</div>
            <p class="text-slate-600">Immutable ledger tracking every ingestion, consent grant, and access termination.</p>
          </div>
        </div>
      </section>

    </div>
  `;
}
