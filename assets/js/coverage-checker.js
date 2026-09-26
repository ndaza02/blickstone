/**
 * Service Coverage Checker
 *
 * BlickStone operates out of Bulawayo and works nationwide. This confirms that
 * a visitor's area is covered and how the site visit is arranged.
 *
 * NOTE: this deliberately states no turnaround times. Any number here is a
 * commitment to a prospective client, so it has to come from BlickStone rather
 * than be estimated. Swap `arrangement` for real windows once they are known.
 */

document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.getElementById('region-selector');
    const resultsPanel = document.getElementById('coverage-results');

    const arrangementEl = document.getElementById('visit-arrangement');
    const teamBaseEl = document.getElementById('team-base');
    const noteEl = document.getElementById('coverage-note');
    const visitBtn = document.getElementById('coverage-visit-btn');

    const coverage = {
        bulawayo: {
            arrangement: 'Covered',
            base: 'Bulawayo Head Office',
            note: 'Home ground. Our team works out of Astra Building Centre on H. Chitepo Street, so we can get to most suburbs easily. We confirm a visit date with you when you enquire.'
        },
        matabeleland: {
            arrangement: 'Covered',
            base: 'Bulawayo Head Office',
            note: 'Matabeleland North and South are served directly from Bulawayo. We confirm the date and the site visit fee with you before we travel.'
        },
        midlands: {
            arrangement: 'Covered',
            base: 'Bulawayo Head Office',
            note: 'Gweru, Kwekwe and the Midlands corridor are covered from Bulawayo. We confirm the date and the site visit fee with you before we travel.'
        },
        harare: {
            arrangement: 'Covered',
            base: 'Bulawayo Head Office',
            note: 'We take on Harare and Mashonaland projects, with travel arranged as part of the quotation. Tell us the scope and we will come back with dates and costs.'
        },
        other: {
            arrangement: 'By arrangement',
            base: 'Bulawayo Head Office',
            note: 'Masvingo, Manicaland, Victoria Falls and remote sites are handled case by case. Send us the details and we will tell you what is practical.'
        }
    };

    if (!regionSelector) return;

    regionSelector.addEventListener('change', (e) => {
        const data = coverage[e.target.value];
        if (!data) return;

        arrangementEl.innerText = data.arrangement;
        teamBaseEl.innerText = data.base;
        noteEl.innerText = data.note;

        if (visitBtn) {
            const label = e.target.options[e.target.selectedIndex].text;
            visitBtn.onclick = () => inquiry.siteVisit(label);
        }

        // Brief highlight so the update is noticed
        resultsPanel.classList.add('ring-2', 'ring-blick-blue');
        setTimeout(() => resultsPanel.classList.remove('ring-2', 'ring-blick-blue'), 900);
    });
});
