/**
 * BlickStone Private Limited — shared company constants.
 * Single source of truth for contact details used across the site and in
 * generated WhatsApp / email enquiries.
 */

const BLICKSTONE = {
    name: 'BlickStone Private Limited',
    registration: '379/2019',
    registered: '18 February 2019',

    // Procurement Regulatory Authority of Zimbabwe registration. The
    // verification code from the certificate is deliberately not published
    // here; it is handed to procuring entities on request.
    praz: {
        supplier: 'PR2650878185',
        category: 'SC006 — Construction and Civil Works (buildings, dams, roads etc.)',
        orgCategory: 'Small/Medium Enterprise (SME)',
        validTo: '31 December 2026',
    },

    // Primary WhatsApp line (Construction Division), digits only for wa.me
    whatsapp: '263717739949',

    phones: ['+263 71 773 9949', '+263 771 637 326', '+263 88 293 2684'],
    landline: '+263 292 276 458',

    email: 'construction@blickstone.co.zw',
    web: 'www.blickstone.co.zw',
    facebook: 'Blickstone Construction Zw',

    address: 'Astra Building Centre, Suite 2B, H. Chitepo Street & 9th Avenue, Bulawayo, Zimbabwe',
    city: 'Bulawayo, Zimbabwe',
    coverage: 'Bulawayo & beyond, nationwide',

    divisions: ['BlickStone Marketing', 'BlickStone Construction', 'BlickStone Sentinel Group'],

    /** Reference number for enquiries, e.g. BS-482913 */
    ref: () => `BS-${Math.floor(Date.now() / 1000).toString().slice(-6)}`,

    today: () => new Date().toLocaleDateString('en-GB'),
};

window.BLICKSTONE = BLICKSTONE;
