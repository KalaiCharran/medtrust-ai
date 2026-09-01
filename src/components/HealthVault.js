// Digital Health Vault Component - Clean Minimal Healthcare Theme
export function renderHealthVault(state) {
  const selectedCategory = state.vaultFilterCategory || 'All';
  const selectedStatus = state.vaultFilterStatus || 'All';
  const searchQuery = (state.vaultSearchQuery || '').toLowerCase();

  const categories = [
    { id: 'All', label: 'All Records', icon: 'layers' },
    { id: 'Medical History', label: 'Medical History', icon: 'file-text' },
    { id: 'Prescriptions', label: 'Prescriptions', icon: 'pill' },
    { id: 'Laboratory Reports', label: 'Lab Reports', icon: 'flask-conical' },
    { id: 'X-rays and Scans', label: 'X-rays & Scans', icon: 'scan' },
    { id: 'Medications', label: 'Medications', icon: 'heart-pulse' },
    { id: 'Allergies', label: 'Allergies', icon: 'alert-circle' }
  ];

  let filteredRecords = state.records.filter(record => {
    const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || record.verificationStatus === selectedStatus;
    const matchesSearch = !searchQuery || 
      record.title.toLowerCase().includes(searchQuery) ||
      record.issuingOrg.toLowerCase().includes(searchQuery) ||
      (record.doctorName && record.doctorName.toLowerCase().includes(searchQuery)) ||
      (record.summary && record.summary.toLowerCase().includes(searchQuery));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <!-- Vault Header -->
      <div class="clean-card p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
              HEALTH VAULT ENCLAVE
            </span>
            <span class="text-xs text-emerald-700 font-medium">ENCRYPTED NOTARIZATION</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Digital Health Vault</h1>
          <p class="text-xs text-slate-600 mt-0.5">
            Cryptographically verified patient health records, diagnostic tests, prescriptions, and radiology scans.
          </p>
        </div>

        <button onclick="window.appRouter('verify')" class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition-all flex items-center gap-1.5 self-start md:self-auto">
          <i data-lucide="upload" class="w-4 h-4"></i>
          <span>Upload & Verify New Record</span>
        </button>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="clean-card p-4 space-y-3">
        
        <!-- Category Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          ${categories.map(cat => `
            <button onclick="window.setVaultCategory('${cat.id}')" class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-slate-900 text-white font-semibold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}">
              <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
              <span>${cat.label}</span>
              ${cat.id === 'All' ? `
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'} font-mono">${state.records.length}</span>
              ` : ''}
            </button>
          `).join('')}
        </div>

        <!-- Search Bar and Status Filters -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          <!-- Search Input -->
          <div class="relative w-full sm:w-80">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              placeholder="Search by title, clinic, doctor..." 
              value="${state.vaultSearchQuery || ''}"
              oninput="window.setVaultSearch(this.value)"
              class="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>

          <!-- Status Filter Pills -->
          <div class="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            <span class="text-xs text-slate-500 hidden sm:inline">Status:</span>
            
            <button onclick="window.setVaultStatus('All')" class="px-2.5 py-1 rounded-md text-xs font-medium ${selectedStatus === 'All' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              All
            </button>
            <button onclick="window.setVaultStatus('Verified')" class="px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${selectedStatus === 'Verified' ? 'bg-emerald-600 text-white font-semibold' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}">
              <span class="w-1.5 h-1.5 rounded-full ${selectedStatus === 'Verified' ? 'bg-white' : 'bg-emerald-600'}"></span>
              <span>Verified Only</span>
            </button>
            <button onclick="window.setVaultStatus('Unverified')" class="px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${selectedStatus === 'Unverified' ? 'bg-rose-600 text-white font-semibold' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'}">
              <span class="w-1.5 h-1.5 rounded-full ${selectedStatus === 'Unverified' ? 'bg-white' : 'bg-rose-600'}"></span>
              <span>Unverified</span>
            </button>
          </div>

        </div>

      </div>

      <!-- Records Grid -->
      ${filteredRecords.length === 0 ? `
        <div class="clean-card p-12 text-center space-y-2">
          <i data-lucide="file-question" class="w-8 h-8 text-slate-400 mx-auto"></i>
          <h3 class="text-sm font-bold text-slate-900">No Medical Records Match Criteria</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">Try clearing your search query or selecting a different category filter.</p>
          <button onclick="window.setVaultCategory('All'); window.setVaultStatus('All'); window.setVaultSearch('')" class="mt-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-all">
            Reset Filters
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${filteredRecords.map(rec => `
            <div onclick="window.openDocumentModal('${rec.id}')" class="clean-card-interactive p-5 flex flex-col justify-between cursor-pointer">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                    ${rec.category}
                  </span>
                  
                  <span class="px-2 py-0.2 rounded text-[10px] font-mono font-semibold flex items-center gap-1 ${rec.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}">
                    <i data-lucide="${rec.verificationStatus === 'Verified' ? 'shield-check' : 'alert-circle'}" class="w-3 h-3"></i>
                    <span>${rec.verificationStatus.toUpperCase()}</span>
                  </span>
                </div>

                <h3 class="text-xs font-bold text-slate-900 line-clamp-2 mb-1">
                  ${rec.title}
                </h3>
                
                <div class="text-[11px] text-slate-500 mb-2 truncate">
                  ${rec.issuingOrg}
                </div>

                <p class="text-xs text-slate-600 line-clamp-2 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  ${rec.summary || 'Clinical record ingested and verified in zero-trust health enclave.'}
                </p>
              </div>

              <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>${rec.date}</span>
                <span class="font-semibold text-slate-800">Trust: ${rec.trustScore}/100</span>
              </div>
            </div>
          `).join('')}
        </div>
      `}

    </div>
  `;
}
