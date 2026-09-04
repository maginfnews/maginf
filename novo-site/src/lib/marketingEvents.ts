type MarketingEventValue = string | number | boolean;
type MarketingEventProperties = Record<string, MarketingEventValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    maginfTrack?: (eventName: string, properties?: MarketingEventProperties) => void;
  }
}

export function trackMarketingEvent(
  eventName: string,
  properties: MarketingEventProperties = {},
) {
  if (typeof window === 'undefined') return;

  if (typeof window.maginfTrack === 'function') {
    window.maginfTrack(eventName, properties);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    ...properties,
  });
}
