import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';

type EventData = Record<string, string | number>;

export default class Api {
  containerId: string;
  api_url: string;
  user_id: string;

  constructor(containerId: string, user_id: string | null, api_url: string | null) {
    this.containerId = containerId;
    this.api_url = api_url || 'https://api.samhub.io/v1';
    this.user_id = user_id || this.samhubUserId();
  }

  public pageView(eventData: EventData = {}) {
    eventData.visit_id ||= uuid();
    this.setEventDefaults(eventData);
    this.event('page_view', eventData);
  }

  public event(eventName: string, data: EventData) {
    data.timestamp = Date.now();
    data.user_id = this.user_id;
    data.container_id = this.containerId;
    console.log('event', this.api_url, eventName, data);
  }

  private setEventDefaults(eventData: EventData) {
    this.setUrl(eventData, eventData.url ? eventData.url as string : window.location.href);
    eventData.referrer ||= document.referrer;
  }

  private samhubUserId() {
    const user_id = Cookies.get('samhub') || uuid();
    Cookies.set('samhub', user_id, { expires: 365 });
    return user_id;
  }

  private setUrl(eventData: EventData, url: string) {
    const parsedUrl = new URL(url);
    eventData.path ||= parsedUrl.pathname;
    eventData.host ||= parsedUrl.host;

    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
      if (parsedUrl.searchParams.has(param)) {
        eventData[param] ||= parsedUrl.searchParams.get(param) as string;
      }
    });
  }
}