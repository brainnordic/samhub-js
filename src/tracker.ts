import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';
import Pixel from './pixel';

export type EventData = {
  url?: string;
  path?: string;
  host?: string;
  zipcode?: string;
  ip?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  timestamp?: number;
  event_id?: string;
  user_id?: string;
  ced?: {
    [key: string]: string | number;
  }
};

const API_URL = 'https://track.samhub.io/v1/e.gif';

type TrackerOptions = {
  api_url?: string;
  debug?: (...args: any) => void;
  auto_track_user_id?: 'cookie' | 'localstorage' | 'none';
  auto_track_referrer?: boolean;
  auto_track_url?: boolean;
}

export default class Tracker {
  public containerId: string;
  public options: TrackerOptions;

  constructor(containerId: string, options: TrackerOptions = {}) {
    this.containerId = containerId;
    // copy options with defaults
    this.options = {
      api_url: API_URL,
      auto_track_user_id: 'cookie',
      auto_track_referrer: true,
      auto_track_url: true,
      ...options
    };

    this.debug("init", this.options);
  }

  public track(eventName: string, eventData: EventData) {
    const data = { ...eventData }
    this.setEventDefaults(data);
    this.debug("track", eventName, this.containerId, data);

    const pixel = new Pixel(this.options.api_url || API_URL, this.containerId, this.options.debug);
    pixel.send(data);
  }

  private debug(message: string, ...args: any) {
    if (this.options.debug) {
      this.options.debug("[Samhub.js->Tracker] " + message, ...args);
    }
  }

  private setEventDefaults(eventData: EventData) {
    if (this.options.auto_track_url) { eventData.url ||= window.location.href; }
    if (eventData.url) {
      this.setUrl(eventData, eventData.url);
      delete eventData.url;
    }

    if (this.options.auto_track_user_id === 'cookie') {
      eventData.user_id ||= this.samhubCookieUserId();
    }

    if (this.options.auto_track_user_id === 'localstorage') {
      eventData.user_id ||= this.samhubLocalstorageUserId();
    }

    if (this.options.auto_track_referrer && !eventData.referrer && document.referrer) {
      eventData.referrer = document.referrer.split('?')[0]
    }

    eventData.timestamp ||= Date.now();
    eventData.event_id ||= uuid();
  }

  private samhubCookieUserId() {
    const user_id = Cookies.get('samhub') || uuid();
    Cookies.set('samhub', user_id, { expires: 365 });
    return user_id;
  }

  private samhubLocalstorageUserId() {
    const user_id = localStorage.getItem('samhub') || uuid();
    localStorage.setItem('samhub', user_id);
    return user_id;
  }

  private setUrl(eventData: EventData, url: string) {
    const parsedUrl = new URL(url);
    eventData.path ||= parsedUrl.pathname;
    eventData.host ||= parsedUrl.host;

    this.setUtm(eventData, parsedUrl, 'utm_source');
    this.setUtm(eventData, parsedUrl, 'utm_medium');
    this.setUtm(eventData, parsedUrl, 'utm_campaign');
  }

  private setUtm(eventData: EventData, parsedUrl: URL, utm_param: 'utm_source' | 'utm_medium' | 'utm_campaign') {
    const value = parsedUrl.searchParams.get(utm_param);
    if (!value) return;
    eventData[utm_param] ||= value;
  }
}