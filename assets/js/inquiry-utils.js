/**
 * Global Enquiry Utilities
 *
 * Builds structured WhatsApp enquiries that mirror step 01 of the BlickStone
 * process: "you reach out, and we log your project details and requirements."
 */

const inquiry = {
    /** Single-service enquiry, fired from a service card. */
    whatsapp: (serviceName, code, division = 'Construction') => {
        const messageStr = `*PROJECT ENQUIRY*
---------------------------------------
*Ref:* ${BLICKSTONE.ref()}
*Date:* ${BLICKSTONE.today()}

*Client Information:*
[Your name]
[Your contact number]

*Service Required:*
*Service:* ${serviceName}
*Service Code:* ${code}
*Division:* BlickStone ${division}

*Project Details:*
*Site Location:* [Suburb / town]
*Project Stage:* [New build / incomplete / renovation / other]
*Target Start:* [When you would like to begin]

*Additional Notes:*
---------------------------------------
Please advise on next steps, site visit arrangements and an indicative cost range for the above.

*BlickStone Private Limited* | Reg. ${BLICKSTONE.registration}`;

        inquiry.open(messageStr);
    },

    /** Request a site visit, the second step of the BlickStone process. */
    siteVisit: (location = '') => {
        const messageStr = `*SITE VISIT REQUEST*
---------------------------------------
*Ref:* ${BLICKSTONE.ref()}
*Date:* ${BLICKSTONE.today()}

*Client Information:*
[Your name]
[Your contact number]

*Site Details:*
*Location:* ${location || '[Suburb / town]'}
*Scope of Work:* [Brief description]
*Preferred Visit Date:* [Date]

---------------------------------------
I understand a site visit fee applies per visit and is deductible upon project confirmation.

*BlickStone Private Limited* | Reg. ${BLICKSTONE.registration}`;

        inquiry.open(messageStr);
    },

    /** General enquiry for the marketing and sentinel divisions. */
    division: (divisionName) => {
        const messageStr = `*GENERAL ENQUIRY*
---------------------------------------
*Ref:* ${BLICKSTONE.ref()}
*Date:* ${BLICKSTONE.today()}

*Client Information:*
[Your name / organisation]
[Your contact number]

*Division:* ${divisionName}
*Requirement:* [What you need]
*Location:* [Suburb / town]

---------------------------------------
Please advise on your approach, availability and next steps.

*BlickStone Private Limited* | Reg. ${BLICKSTONE.registration}`;

        inquiry.open(messageStr);
    },

    open: (messageStr) => {
        const message = encodeURIComponent(messageStr);
        window.open(`https://wa.me/${BLICKSTONE.whatsapp}?text=${message}`, '_blank');
    }
};

window.inquiry = inquiry;
