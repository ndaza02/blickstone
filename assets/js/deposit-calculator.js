/**
 * Deposit & Payment Plan Calculator
 *
 * Works entirely from the deposit percentages BlickStone publishes in the
 * client information pack. The client supplies the project value, so nothing
 * here is an estimate of cost — it only applies the published percentages.
 *
 * Deliberately NOT a quotation: the real figure comes from the Bill of
 * Quantities after a site visit, and the copy on the page says so.
 */

const DEPOSIT_TIERS = {
    small: { label: 'Small project', min: 0.50, max: 0.50 },
    medium: { label: 'Medium project', min: 0.40, max: 0.40 },
    large: { label: 'Large project', min: 0.30, max: 0.35 },
    durawall: { label: 'Residential durawall', min: 0.30, max: 0.30 },
};

document.addEventListener('DOMContentLoaded', () => {
    const valueInput = document.getElementById('calc-value');
    if (!valueInput) return;

    const tierInput = document.getElementById('calc-tier');
    const termInput = document.getElementById('calc-term');

    const depositEl = document.getElementById('calc-deposit');
    const depositPctEl = document.getElementById('calc-deposit-pct');
    const balanceEl = document.getElementById('calc-balance');
    const monthlyEl = document.getElementById('calc-monthly');
    const termLabelEl = document.getElementById('calc-term-label');
    const emptyEl = document.getElementById('calc-empty');
    const resultEl = document.getElementById('calc-result');

    const money = (n) => 'US$' + Math.round(n).toLocaleString('en-US');

    /** Renders a single figure, or a range when the tier has a band. */
    const range = (lo, hi, fmt) => (Math.round(lo) === Math.round(hi))
        ? fmt(lo)
        : `${fmt(lo)} – ${fmt(hi)}`;

    function update() {
        // Strip separators and currency symbols people paste in ("US$120,000",
        // "25 000"). A minus sign would otherwise be stripped too and read as a
        // positive value, so reject it outright.
        const entered = valueInput.value;
        const raw = entered.replace(/[^0-9.]/g, '');
        const value = entered.includes('-') ? NaN : parseFloat(raw);
        const tier = DEPOSIT_TIERS[tierInput.value] || DEPOSIT_TIERS.medium;
        const months = parseInt(termInput.value, 10);

        if (!isFinite(value) || value <= 0) {
            emptyEl.classList.remove('hidden');
            resultEl.classList.add('hidden');
            return;
        }

        emptyEl.classList.add('hidden');
        resultEl.classList.remove('hidden');

        const depositLo = value * tier.min;
        const depositHi = value * tier.max;

        depositEl.innerText = range(depositLo, depositHi, money);
        depositPctEl.innerText = (tier.min === tier.max)
            ? `${Math.round(tier.min * 100)}% of project value`
            : `${Math.round(tier.min * 100)}–${Math.round(tier.max * 100)}% of project value`;

        // The higher deposit leaves the smaller balance, so the range inverts
        balanceEl.innerText = range(value - depositHi, value - depositLo, money);
        monthlyEl.innerText = range((value - depositHi) / months, (value - depositLo) / months, money);
        termLabelEl.innerText = `averaged over ${months} months`;
    }

    [valueInput, tierInput, termInput].forEach(el => {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
    });

    update();
});
