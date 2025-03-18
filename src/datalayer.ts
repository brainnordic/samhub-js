type EventName = string;
type EventParams = Record<string, any>;
type EventListener = (params: EventParams) => void;

export default class DataLayer {
  private listeners: Map<EventName, EventListener[]> = new Map();
  private dataLayer: any[];

  constructor(dataLayer: any[]) {
    this.dataLayer = dataLayer;
    this.initialize();
  }

  private initialize() {
    // Override the push method to intercept events
    const originalPush = this.dataLayer.push;
    this.dataLayer.push = (...args: any[]) => {
      const result = originalPush.apply(this.dataLayer, args);

      // Process the event
      if (Array.isArray(args[0]) && args[0].length === 2) {
        const [eventName, eventParams] = args[0];
        this.triggerListeners(eventName, eventParams);
      }

      return result;
    };

    // Process any existing events in the array
    this.dataLayer.forEach((event: any) => {
      if (Array.isArray(event) && event.length === 2) {
        const [eventName, eventParams] = event;
        this.triggerListeners(eventName, eventParams);
      }
    });
  }

  private triggerListeners(eventName: EventName, params: EventParams) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(params));
    }
  }

  public on(eventName: EventName, listener: EventListener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName)!.push(listener);
  }

  public off(eventName: EventName, listener: EventListener) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}
