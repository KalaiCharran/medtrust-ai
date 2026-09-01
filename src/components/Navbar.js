// Navbar Component - Clean Minimal Healthcare Navigation
export function renderNavbar(state, onNavigate, onSwitchRole, onResetData) {
  const pendingRequestsCount = state.accessRequests.filter(r => r.status === 'Pending').length;
  const safetySummary = state.clinicalSafetyReport || { criticalCount: 0, warningCount: 0 };
  const criticalAlertsCount = safetySummary.criticalCount;

  return `
    <header class="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Brand Logo -->
          <div class="flex items-center gap-2.5 cursor-pointer" onclick="window.appRouter('landing')">
            <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-sky-600 text-white shadow-sm">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-bold tracking-tight text-slate-900 font-sans">MedTrust <span class="text-sky-600 font-extrabold">AI</span></span>
                <span class="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">ZERO-TRUST</span>
              </div>
            </div>
          </div>

          <!-- Navigation Links (When inside Patient or Org view) -->
          ${state.currentView !== 'landing' ? `
            <nav class="hidden md:flex items-center gap-1 text-xs">
              ${state.currentRole === 'patient' ? `
                <button onclick="window.appRouter('dashboard')" class="px-3 py-1.5 rounded-lg font-medium transition-all ${state.currentView === 'dashboard' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="layout-dashboard" class="w-4 h-4 text-slate-500"></i>
                    <span>Dashboard</span>
                  </div>
                </button>
                <button onclick="window.appRouter('vault')" class="px-3 py-1.5 rounded-lg font-medium transition-all ${state.currentView === 'vault' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="folder-lock" class="w-4 h-4 text-slate-500"></i>
                    <span>Health Vault</span>
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-mono">${state.records.length}</span>
                  </div>
                </button>
                <button onclick="window.appRouter('verify')" class="px-3 py-1.5 rounded-lg font-medium transition-all ${state.currentView === 'verify' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="scan-line" class="w-4 h-4 text-emerald-600"></i>
                    <span>Trust Engine</span>
                  </div>
                </button>
                <button onclick="window.appRouter('consent')" class="relative px-3 py-1.5 rounded-lg font-medium transition-all ${state.currentView === 'consent' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="sparkles" class="w-4 h-4 text-sky-600"></i>
                    <span>Smart Consent</span>
                    ${pendingRequestsCount > 0 ? `
                      <span class="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-sky-600 text-white">${pendingRequestsCount}</span>
                    ` : ''}
                  </div>
                </button>
                <button onclick="window.appRouter('safety')" class="relative px-3 py-1.5 rounded-lg font-medium transition-all ${state.currentView === 'safety' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600"></i>
                    <span>Clinical Safety</span>
                    ${criticalAlertsCount > 0 ? `
                      <span class="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-600 text-white">${criticalAlertsCount}</span>
                    ` : ''}
                  </div>
                </button>
                <button onclick="window.appRouter('activity')" class="px-3 py-1.5 rounded-lg font-medium transition-all ${state.currentView === 'activity' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="history" class="w-4 h-4 text-slate-500"></i>
                    <span>Audit Log</span>
                  </div>
                </button>
              ` : `
                <!-- Healthcare Org Portal Links -->
                <button onclick="window.appRouter('org-portal')" class="px-3 py-1.5 rounded-lg font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="building-2" class="w-4 h-4 text-emerald-600"></i>
                    <span>Provider Console</span>
                  </div>
                </button>
                <button onclick="window.appRouter('activity')" class="px-3 py-1.5 rounded-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="file-check-2" class="w-4 h-4 text-slate-500"></i>
                    <span>Compliance Audits</span>
                  </div>
                </button>
              `}
            </nav>
          ` : `
            <div class="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-medium">
              <a href="#engines" class="hover:text-slate-900 transition-colors">Core Technology</a>
              <a href="#zero-trust" class="hover:text-slate-900 transition-colors">Zero-Trust Architecture</a>
              <a href="#standards" class="hover:text-slate-900 transition-colors">Standards & Compliance</a>
            </div>
          `}

          <!-- Right Action Controls -->
          <div class="flex items-center gap-2">

            <!-- Role Selector -->
            <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200">
              <button onclick="window.switchUserRole('patient')" class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${state.currentRole === 'patient' && state.currentView !== 'landing' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                <i data-lucide="user" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">Patient</span>
              </button>
              <button onclick="window.switchUserRole('org')" class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${state.currentRole === 'org' && state.currentView !== 'landing' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">Provider</span>
              </button>
            </div>

            <!-- Reset Data Button -->
            <button onclick="window.resetAppState()" title="Reset to baseline data state" class="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
            </button>

          </div>

        </div>
      </div>
    </header>
  `;
}
