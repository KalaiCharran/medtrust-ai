// Access Activity Log Component
// Comprehensive immutable audit trail tracking all data access requests, grants, and revocations

export function renderActivityLog(state) {
  const filterStatus = state.activityFilterStatus || 'All';
  const searchQuery = (state.activitySearchQuery || '').toLowerCase();

  const filteredLogs = state.activityLog.filter(log => {
    const matchesStatus = filterStatus === 'All' || log.status === filterStatus;
    const matchesSearch = !searchQuery || 
      log.orgName.toLowerCase().includes(searchQuery) ||
      log.purpose.toLowerCase().includes(searchQuery) ||
      log.action.toLowerCase().includes(searchQuery) ||
      (log.details && log.details.toLowerCase().includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Header Banner -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-950 text-cyan-300 border border-cyan-800">
              IMMUTABLE AUDIT TRAIL
            </span>
            <span class="text-xs text-emerald-400 font-mono">APPEND-ONLY SECURE LEDGER</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Access Activity & Compliance Log
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Every data ingestion, verification verdict, consent decision, zero-trust token issuance, and automatic expiration event is recorded with non-repudiation timestamps.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.exportAuditLog('json')" class="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-medium transition-all flex items-center gap-1.5">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Export JSON</span>
          </button>
          <button onclick="window.exportAuditLog('csv')" class="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5">
            <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="glass-panel p-4 rounded-2xl border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
          <input 
            type="text" 
            placeholder="Search by organization, purpose, action..." 
            value="${state.activitySearchQuery || ''}"
            oninput="window.setActivitySearch(this.value)"
            class="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <!-- Status Filter Buttons -->
        <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span class="text-xs text-slate-400 font-mono hidden sm:inline">Filter Status:</span>
          ${['All', 'Active', 'Expired', 'Revoked', 'Pending'].map(status => `
            <button 
              onclick="window.setActivityStatusFilter('${status}')"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === status ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'bg-slate-900 text-slate-400 hover:text-white'}"
            >
              ${status}
            </button>
          `).join('')}
        </div>

      </div>

      <!-- Audit Trail Table -->
      <div class="glass-panel rounded-3xl border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-950/70 text-[11px] font-mono text-slate-400">
                <th class="py-3.5 px-4 sm:px-6">TIMESTAMP</th>
                <th class="py-3.5 px-4">ORGANIZATION</th>
                <th class="py-3.5 px-4">ACTION & PURPOSE</th>
                <th class="py-3.5 px-4">DATA SCOPE</th>
                <th class="py-3.5 px-4">STATUS</th>
                <th class="py-3.5 px-4 text-right">GATEWAY IP</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-xs">
              ${filteredLogs.length === 0 ? `
                <tr>
                  <td colspan="6" class="py-10 text-center text-slate-500 font-mono">
                    No activity logs match your filter criteria.
                  </td>
                </tr>
              ` : `
                ${filteredLogs.map(log => `
                  <tr class="hover:bg-slate-900/50 transition-colors">
                    
                    <!-- Timestamp -->
                    <td class="py-4 px-4 sm:px-6 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      <div>${new Date(log.timestamp).toLocaleDateString()}</div>
                      <div class="text-[10px] text-slate-500">${new Date(log.timestamp).toLocaleTimeString()}</div>
                    </td>

                    <!-- Organization -->
                    <td class="py-4 px-4 whitespace-nowrap">
                      <div class="font-bold text-white">${log.orgName}</div>
                      <div class="text-[10px] font-mono text-cyan-400">${log.orgId || 'ID-VERIFIED'}</div>
                    </td>

                    <!-- Action & Purpose -->
                    <td class="py-4 px-4">
                      <div class="font-mono text-[11px] font-semibold ${log.action.includes('REJECT') || log.action.includes('REVOKE') ? 'text-rose-400' : (log.action.includes('GRANT') ? 'text-emerald-400' : 'text-cyan-300')}">
                        ${log.action}
                      </div>
                      <div class="text-[11px] text-slate-300 line-clamp-1">${log.purpose}</div>
                      ${log.details ? `<div class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">${log.details}</div>` : ''}
                    </td>

                    <!-- Data Scope -->
                    <td class="py-4 px-4 max-w-xs">
                      <div class="text-[11px] text-slate-200 line-clamp-1">${log.scopeGranted || 'All Requested Scope'}</div>
                      ${log.scopeDenied && log.scopeDenied !== 'N/A' ? `
                        <div class="text-[10px] font-mono text-emerald-400 line-clamp-1">Protected: ${log.scopeDenied}</div>
                      ` : ''}
                    </td>

                    <!-- Status Pill -->
                    <td class="py-4 px-4 whitespace-nowrap">
                      <span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase ${log.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : (log.status === 'Revoked' ? 'bg-rose-950 text-rose-300 border border-rose-800' : (log.status === 'Pending' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-800 text-slate-400'))}">
                        ${log.status}
                      </span>
                    </td>

                    <!-- Gateway IP -->
                    <td class="py-4 px-4 text-right font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      ${log.ipAddress || '127.0.0.1 (Enclave)'}
                    </td>

                  </tr>
                `).join('')}
              `}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}
