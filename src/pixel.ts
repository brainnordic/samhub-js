import qs from 'qs';

export default class Pixel {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  send(data: Record<string, string | number>, callback?: () => void): void {
    const pixel = new Image();
    if (callback) {
      pixel.onload = callback;
    }
    pixel.src = this.apiUrl + "?" + qs.stringify(data);
  }
}