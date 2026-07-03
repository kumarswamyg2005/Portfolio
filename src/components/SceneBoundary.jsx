import { Component } from 'react'

/**
 * Catches any error thrown by the 3D scene (e.g. WebGL context creation
 * failing on GPU-blocklisted or hardware-acceleration-off browsers) so a
 * canvas failure degrades to the plain dark background instead of
 * white-screening the entire site.
 */
export default class SceneBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    // Non-fatal: the site is fully usable without the background scene.
    console.info('[Scene3D] disabled — falling back to static background.', error?.message || error)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
