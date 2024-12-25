export class MiscUtils {

  /**
   * Returns the current width of the viewport
   */
  static getScreenWidth(): number {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
}
