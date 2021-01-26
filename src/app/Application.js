import config from '../config';
import EventEmitter from 'eventemitter3';

const EVENTS = {
  APP_READY: 'app_ready',
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.
    const url = 'https://swapi.dev/api/planets/';
    const planetsResponse = await fetch(url);
    const planetsData = await planetsResponse.json();
    const count = planetsData.count;

    const planets = [];

    for (let i = 1; i <= count; i++) {
      const planetResponse = await fetch(url + i);
      const planetData = await planetResponse.json();

      planets.push(planetData);
    }

    // Not sure if I should use this.data.count/planets or Application.data.count/planets
    this.data.count = count;
    this.data.planets = planets;

    Application.data.count = count;
    Application.data.planets = planets;

    this.emit(Application.events.APP_READY);
  }
}

