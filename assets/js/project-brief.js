/**
 * Project Brief Builder
 *
 * Construction work is priced from a Bill of Quantities, not a price list, so
 * this collects the services a client is interested in and hands BlickStone a
 * single structured brief over WhatsApp instead of taking payment.
 */
class ProjectBrief {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('blickstone_brief')) || [];
        this.lastRef = null;
        this.init();
    }

    init() {
        this.renderFloatingButton();
        this.renderModal();
        this.updateUI();
    }

    addItem(service) {
        if (this.items.find(i => i.id === service.id)) {
            this.showToast(`${service.name} is already in your brief`);
            return;
        }
        this.items.push({ ...service });
        this.save();
        this.updateUI();
        this.showToast(`Added ${service.name} to your brief`);
    }

    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
        this.updateUI();
    }

    save() {
        localStorage.setItem('blickstone_brief', JSON.stringify(this.items));
    }

    updateUI() {
        const badge = document.getElementById('brief-badge');
        if (badge) {
            badge.innerText = this.items.length;
            badge.classList.toggle('hidden', this.items.length === 0);
        }

        const container = document.getElementById('brief-items-container');
        if (container) {
            container.innerHTML = this.items.map(item => `
                <div class="flex items-center gap-4 bg-blick-offWhite p-4 rounded-xl mb-3 border border-blick-steel">
                    <div class="w-10 h-10 rounded-full bg-white border border-blick-steel flex items-center justify-center text-blick-navy shrink-0">
                        <i data-lucide="${item.icon || 'hard-hat'}" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-sm text-blick-navy truncate">${item.name}</h4>
                        <p class="text-xs text-blick-gray">${item.id.toUpperCase()} · BlickStone ${item.division || 'Construction'}</p>
                    </div>
                    <button type="button" onclick="brief.removeItem('${item.id}')" aria-label="Remove ${item.name}"
                        class="w-8 h-8 rounded-full bg-white border border-blick-steel flex items-center justify-center text-blick-gray hover:text-blick-red hover:border-blick-red transition-colors shrink-0">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            `).join('') || `
                <div class="text-center py-12 px-6">
                    <div class="w-16 h-16 rounded-full bg-blick-offWhite border border-blick-steel flex items-center justify-center mx-auto mb-4 text-blick-steel">
                        <i data-lucide="clipboard-list" class="w-8 h-8"></i>
                    </div>
                    <p class="text-blick-gray text-sm">No services selected yet.</p>
                    <p class="text-blick-gray text-xs mt-1">Add the work you need and we will cost it as one project.</p>
                </div>`;

            if (window.lucide) lucide.createIcons();
        }

        const submitBtn = document.getElementById('brief-continue-btn');
        if (submitBtn) submitBtn.disabled = this.items.length === 0;
    }

    renderFloatingButton() {
        const btn = document.createElement('div');
        btn.innerHTML = `
            <button type="button" onclick="brief.openPanel()" aria-label="Open project brief"
                class="fixed bottom-8 right-8 bg-blick-navy text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 hover:bg-blick-deep transition-all">
                <i data-lucide="clipboard-list" class="w-7 h-7"></i>
                <span id="brief-badge" class="absolute -top-1 -right-1 bg-blick-red text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white hidden">0</span>
            </button>
        `;
        document.body.appendChild(btn);
        if (window.lucide) lucide.createIcons();
    }

    renderModal() {
        const modal = document.createElement('div');
        modal.id = 'brief-modal';
        modal.className = 'fixed inset-0 z-[60] hidden';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-blick-deep/50 backdrop-blur-sm" onclick="brief.closePanel()"></div>
            <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
                <div class="flex justify-between items-start p-6 border-b border-blick-steel">
                    <div>
                        <h2 class="text-2xl font-bold text-blick-navy">Your Project Brief</h2>
                        <p class="text-xs text-blick-gray mt-1">Step 01 — Enquiry</p>
                    </div>
                    <button type="button" onclick="brief.closePanel()" aria-label="Close project brief" class="p-2 hover:bg-blick-offWhite rounded-full">
                        <i data-lucide="x" class="w-6 h-6 text-blick-gray"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6" id="brief-items-container"></div>

                <div class="border-t border-blick-steel p-6 bg-blick-offWhite">
                    <button type="button" id="brief-continue-btn" onclick="brief.startDetails()"
                        class="w-full bg-blick-navy text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blick-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        Add Your Details
                    </button>
                    <p class="text-center text-xs text-blick-gray mt-3">No obligation. We reply with next steps and a site visit slot.</p>
                </div>
            </div>

            <!-- Details step -->
            <div id="brief-details-modal" class="absolute inset-0 z-[70] bg-white hidden flex-col">
                <div class="p-6 border-b border-blick-steel flex items-center gap-4">
                    <button type="button" onclick="brief.closeDetails()" aria-label="Back to brief" class="p-2 hover:bg-blick-offWhite rounded-full">
                        <i data-lucide="arrow-left" class="w-6 h-6 text-blick-navy"></i>
                    </button>
                    <div>
                        <h2 class="text-xl font-bold text-blick-navy">Project Details</h2>
                        <p class="text-xs text-blick-gray">So our Quantity Surveyor can prepare a BOQ</p>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                    <div class="mb-8">
                        <h3 class="text-xs font-bold text-blick-gray uppercase tracking-wider mb-4">Your Details</h3>
                        <div class="space-y-4">
                            <div>
                                <label for="brief-name" class="block text-sm font-medium text-blick-ink mb-1">Full Name <span class="text-blick-red">*</span></label>
                                <input type="text" id="brief-name" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite" placeholder="e.g. T. Moyo">
                            </div>
                            <div>
                                <label for="brief-phone" class="block text-sm font-medium text-blick-ink mb-1">Contact Number <span class="text-blick-red">*</span></label>
                                <input type="tel" id="brief-phone" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite" placeholder="+263 ...">
                            </div>
                            <div>
                                <label for="brief-company" class="block text-sm font-medium text-blick-ink mb-1">Company / Organisation (optional)</label>
                                <input type="text" id="brief-company" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite" placeholder="If this is a business project">
                            </div>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-xs font-bold text-blick-gray uppercase tracking-wider mb-4">The Project</h3>
                        <div class="space-y-4">
                            <div>
                                <label for="brief-location" class="block text-sm font-medium text-blick-ink mb-1">Site Location <span class="text-blick-red">*</span></label>
                                <input type="text" id="brief-location" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite" placeholder="e.g. Emganwini, Bulawayo">
                            </div>
                            <div>
                                <label for="brief-type" class="block text-sm font-medium text-blick-ink mb-1">Project Type</label>
                                <select id="brief-type" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite">
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Institutional</option>
                                    <option>Industrial</option>
                                </select>
                            </div>
                            <div>
                                <label for="brief-stage" class="block text-sm font-medium text-blick-ink mb-1">Current Stage</label>
                                <select id="brief-stage" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite">
                                    <option>Vacant stand — new build</option>
                                    <option>Incomplete / stalled structure</option>
                                    <option>Existing building — renovation</option>
                                    <option>Existing building — maintenance</option>
                                    <option>Planning &amp; costing only</option>
                                </select>
                            </div>
                            <div>
                                <label for="brief-notes" class="block text-sm font-medium text-blick-ink mb-1">Additional Notes</label>
                                <textarea id="brief-notes" rows="3" class="w-full border border-blick-steel rounded-lg p-3 focus:ring-2 focus:ring-blick-blue focus:border-transparent outline-none bg-blick-offWhite" placeholder="Plans available, target start date, budget range..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-6 border-t border-blick-steel bg-blick-offWhite">
                    <button type="button" onclick="brief.submit()"
                        class="w-full bg-blick-red text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blick-darkRed transition-colors shadow-lg shadow-red-900/10 flex items-center justify-center gap-3">
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                        Send Brief via WhatsApp
                    </button>
                    <p class="text-center text-xs text-blick-gray mt-3">Opens WhatsApp with your brief already written out.</p>
                </div>

                <!-- Confirmation -->
                <div id="brief-success" class="absolute inset-0 bg-blick-offWhite z-[90] hidden flex-col items-center justify-center text-center p-8">
                    <div class="w-24 h-24 bg-blick-navy rounded-full flex items-center justify-center mb-6 shadow-xl text-white">
                        <i data-lucide="check" class="w-12 h-12"></i>
                    </div>
                    <h3 class="text-3xl font-bold mb-2 text-blick-navy">Brief Logged</h3>
                    <p class="text-blick-gray mb-8 max-w-sm mx-auto text-sm">
                        Your brief is open in WhatsApp — press send and our team will confirm a site visit. Step 02 of 07.
                    </p>

                    <div class="bg-white p-6 rounded-2xl border border-blick-steel w-full max-w-sm mb-8">
                        <div class="flex justify-between mb-3">
                            <span class="text-blick-gray text-sm">Reference</span>
                            <span id="brief-ref" class="font-mono font-bold text-blick-navy">&mdash;</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-blick-gray text-sm">Next Step</span>
                            <span class="font-bold text-blick-red text-sm">Site Visit &amp; Assessment</span>
                        </div>
                    </div>

                    <button type="button" onclick="location.reload()" class="bg-blick-navy text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest">Back to Services</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (window.lucide) lucide.createIcons();
    }

    openPanel() {
        document.getElementById('brief-modal').classList.remove('hidden');
    }

    closePanel() {
        document.getElementById('brief-modal').classList.add('hidden');
    }

    startDetails() {
        if (this.items.length === 0) return;
        const el = document.getElementById('brief-details-modal');
        el.classList.remove('hidden');
        el.classList.add('flex');
    }

    closeDetails() {
        const el = document.getElementById('brief-details-modal');
        el.classList.add('hidden');
        el.classList.remove('flex');
    }

    submit() {
        const val = id => (document.getElementById(id).value || '').trim();
        const name = val('brief-name');
        const phone = val('brief-phone');
        const location = val('brief-location');

        if (!name || !phone || !location) {
            alert('Please give us your name, contact number and site location.');
            return;
        }

        const ref = BLICKSTONE.ref();
        const company = val('brief-company');
        const notes = val('brief-notes');
        const services = this.items
            .map((i, n) => `${n + 1}. ${i.name} (${i.id.toUpperCase()})`)
            .join('\n');

        const messageStr = `*PROJECT BRIEF*
---------------------------------------
*Ref:* ${ref}
*Date:* ${BLICKSTONE.today()}

*Client Information:*
*Name:* ${name}
*Contact:* ${phone}${company ? `\n*Organisation:* ${company}` : ''}

*Project:*
*Site Location:* ${location}
*Project Type:* ${val('brief-type')}
*Current Stage:* ${val('brief-stage')}

*Services Required:*
${services}
${notes ? `\n*Additional Notes:*\n${notes}` : ''}
---------------------------------------
Please confirm a site visit and prepare a Bill of Quantities for the above scope.

*BlickStone Private Limited* | Reg. ${BLICKSTONE.registration}`;

        inquiry.open(messageStr);

        document.getElementById('brief-ref').innerText = `#${ref}`;
        const success = document.getElementById('brief-success');
        success.classList.remove('hidden');
        success.classList.add('flex');
        if (window.lucide) lucide.createIcons();

        this.items = [];
        this.save();
        this.updateUI();
    }

    showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 bg-blick-navy text-white px-6 py-3 rounded-full shadow-xl z-[100] text-sm font-bold';
        toast.innerText = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2200);
    }
}

window.brief = new ProjectBrief();
