import GoogleAnalytics from './GoogleAnalytics';
import MetaPixel from './MetaPixel';
import ClarityAnalytics from './ClarityAnalytics';
import GoogleAds from './GoogleAds';
import GoogleTagManager from './GoogleTagManager';

export default function Analytics() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

    return (
        <>
            {GTM_ID && <GoogleTagManager GTM_ID={GTM_ID} />}
            {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
            {FACEBOOK_PIXEL_ID && <MetaPixel PIXEL_ID={FACEBOOK_PIXEL_ID} />}
            {CLARITY_PROJECT_ID && <ClarityAnalytics PROJECT_ID={CLARITY_PROJECT_ID} />}
            {GOOGLE_ADS_ID && <GoogleAds GOOGLE_ADS_ID={GOOGLE_ADS_ID} />}
        </>
    );
}
