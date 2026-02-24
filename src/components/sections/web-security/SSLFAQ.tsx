'use client';

import { FAQAccordion } from '@/components/ui/FAQAccordion';

const FAQS = [
    {
        question: 'What is an SSL Certificate?',
        answer: 'SSL Certificates enable data encryption on the internet and allow data to be transmitted securely from a web server to a browser. With SSL, your website can use the https protocol and will display a padlock in end users web browsers to indicate the connection is secure.'
    },
    {
        question: 'Why do I need an SSL Certificate?',
        answer: 'SSL Certificates are an essential part of the internet. They not only encrypt communication between your computer and the server where a website is located, but they also provide verification that a site is what it claims to be. Google also prioritizes secure websites, so having SSL can improve your search engine rankings.'
    },
    {
        question: 'What are the different types of SSL?',
        answer: 'There are 3 different levels of vetting: Domain Validated (DV), Organization Validated (OV), and Extended Validation (EV). The major difference relates to the information the Certificate Authority requires and validates. Higher levels like EV turn the browser bar green and display the organization name to generate more trust.'
    },
    {
        question: 'What is a Wildcard SSL Certificate?',
        answer: 'A Wildcard SSL certificate provides the same encryption and authentication features as other SSL certificates but can also be applied to an unlimited number of subdomains. It supports the root domain (example.com) as well as its subdomains (mail.example.com, ftp.example.com, etc.).'
    },
    {
        question: 'What are the advantages of an EV SSL Certificate?',
        answer: 'EV certificates are the highest class of SSL available and give the most credibility and trust. They assure consumers that their personal and financial information is protected at the highest levels of authentication. Additional verifications are performed, and they are best suited for business-critical webpages.'
    },
    {
        question: 'Do I need to manually configure my SSL every year?',
        answer: 'With our SSL certificate services, you won\'t need to take manual steps to configure and deploy new certificates every year. We generate a renewal order automatically, and after payment, we automatically configure, validate, and provision your new certificate for you (assuming your domain is hosted with us on supported platforms like cPanel or Plesk).'
    }
];

export function SSLFAQ() {
    return (
        <section id="faq">
            <FAQAccordion faqs={FAQS} />
        </section>
    );
}
