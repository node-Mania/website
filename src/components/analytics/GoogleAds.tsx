import Script from 'next/script';

export default function GoogleAds({ GOOGLE_ADS_ID }: { GOOGLE_ADS_ID: string }) {
    if (!GOOGLE_ADS_ID) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            />
            <Script
                id="google-ads"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `,
                }}
            />
        </>
    );
}
