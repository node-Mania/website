'use client';

import { motion } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

const faqs = [
    {
        question: 'What apps are included in OX App Suite?',
        answer: 'All OX App Suite plans include access to Webmail, Calendar, Tasks and Address Book. The Productivity package adds OX Drive and OX Documents (Text, Spreadsheets and Presentations).'
    },
    {
        question: 'Can I add outside email accounts to OX App Suite?',
        answer: 'Yes, OX App Suite supports connecting all external IMAP email accounts including popular providers such as Gmail, Yahoo and Outlook.com. Simply add your email address and password into App Suite and any email sent to those accounts will appear in your App Suite Interface.'
    },
    {
        question: 'Can I migrate my existing email account from another provider?',
        answer: 'Yes, we offer a self-service migration tool that is intuitive and easy to use. Migrate from all popular email services including Apple iCloud, Gmail, Outlook.com/Windows Live/Hotmail, Yahoo Mail, GMX, or T-Online, or manually enter your provider\'s information using IMAP/POP3 or other available preferred protocols.'
    },
    {
        question: 'Can I sync calendar and contacts between OX App Suite and my mobile device?',
        answer: 'Yes, OX App Suite fully supports CalDAV and CardDAV. And for Android users, syncing is easy via our dedicated Android Sync App.'
    },
    {
        question: 'Will OX App Suite work on my device?',
        answer: 'App Suite works seamlessly with most native desktop and mobile email clients. Mobile Devices: iPhone on iOS 11/iOS 12, Smartphone on Android 4.1 or later. Supported Browsers: Safari, Chrome, Mozilla Firefox, Microsoft Internet Explorer 11/Edge.'
    },
    {
        question: 'Does OX App Suite protect against Spam and Viruses?',
        answer: 'Yes! OX App Suite uses proprietary technology as well as partnerships with well-established vendors in the Anti-Spam industry to keep your inbox as clean and safe as possible.'
    },
    {
        question: 'What is OX Drive (Productivity)?',
        answer: 'OX Drive is an online storage solution to store your documents, photos and media in the cloud. You only need access to OX App Suite and OX Drive and you will have access to all your files. OX Drive lets you synchronize your files with all your devices using the browser or native apps.'
    },
    {
        question: 'What is OX Documents (Productivity)?',
        answer: 'OX Text, OX Spreadsheet and OX Presentation are the 3 applications within the broader term OX Documents. These applications can be used to create and edit text documents, spreadsheets and presentations online from anywhere on all your devices.'
    }
];

export function BusinessEmailFAQ() {
    return (
        <div className="py-4 bg-slate-50">
            <FAQAccordion faqs={faqs} />
        </div>
    );
}
