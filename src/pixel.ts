import qs from 'qs';
import { type EventData } from './tracker';

export type PixelData = {
  n: string; // container_id
  u: string; // user_id
  p?: string; // path
  h?: string; // host
  us?: string; // utm_source
  um?: string; // utm_medium
  uc?: string;  // utm_campaign
  r?: string; // referrer
  t?: number; // timestamp
  e?: string; // event_name
  z?: string; // zipcode
  i?: string; // ip_address
  ced?: string; // custom event data (JSON encoded), WARNING: Do not include any PII.
};

export default class Pixel {
  public apiUrl: string;
  public containerId: string;
  private debugAdapter: ((...args: any) => void) | undefined;

  constructor(apiUrl: string, containerId: string, debug?: (...args: any) => void) {
    this.containerId = containerId;
    this.apiUrl = apiUrl;
    this.debugAdapter = debug;

    this.debug("init", this.apiUrl, this.containerId);
  }

  public send(data: EventData, callback?: () => void): void {
    const pixel = new Image();
    if (callback) {
      pixel.onload = callback;
    }
    const pixel_data = this.preparePixelData(data);

    this.debug("send", pixel_data);
    pixel.src = this.apiUrl + "?" + qs.stringify(pixel_data);
  }

  private preparePixelData(eventData: EventData): PixelData {
    if (!eventData.user_id) {
      throw new Error('user_id is required');
    }

    const pixel: PixelData = {
      n: this.containerId,
      u: eventData.user_id,
    };

    if (eventData.path) { pixel.p = eventData.path; }
    if (eventData.host) { pixel.h = eventData.host; }
    if (eventData.utm_source) { pixel.us = eventData.utm_source; }
    if (eventData.utm_medium) { pixel.um = eventData.utm_medium; }
    if (eventData.utm_campaign) { pixel.uc = eventData.utm_campaign; }
    if (eventData.referrer) { pixel.r = eventData.referrer; }
    if (eventData.timestamp) { pixel.t = eventData.timestamp; }
    if (eventData.event_id) { pixel.e = eventData.event_id; }
    if (eventData.zipcode) { pixel.z = eventData.zipcode; }
    if (eventData.ip) { pixel.i = eventData.ip; }
    if (eventData.ced) { pixel.ced = JSON.stringify(eventData.ced); }

    return pixel;
  }

  private debug(message: string, ...args: any) {
    if (this.debugAdapter) {
      this.debugAdapter("[Samhub.js->Pixel] " + message, ...args);
    }
  }
}