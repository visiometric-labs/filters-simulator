/**
 * Controlador de Cámara en Primera Persona (Giro de Cabeza Ultrarfluido)
 * Proporciona rotación cinemática mediante interpolación (lerp) independiente de FPS:
 * - Respuesta inmediata sin lag de fricción esponjosa
 * - Movimiento suave y continuo sin tirones de puntero
 * - Límites de cuello humano fisiológicos y manejo consistente de entradas
 */
export class CameraController {
  constructor() {
    // Ángulos actuales en radianes
    this.yaw = 0;
    this.pitch = 0;

    // Ángulos objetivo para interpolación suave
    this.targetYaw = 0;
    this.targetPitch = 0;

    // Velocidades del joystick virtual
    this.joystickYawVel = 0;
    this.joystickPitchVel = 0;

    // Inercia cinemática de arrastre táctil / mouse (Momentum Fling)
    this.dragMomentumYaw = 0;
    this.dragMomentumPitch = 0;

    // Configuración ergonómica y de sensibilidad
    this.sensitivity = 1.35;
    this.maxYaw = Math.PI * 0.25;   // ~45° izquierda / derecha
    this.minYaw = -Math.PI * 0.25;
    this.maxPitch = Math.PI * 0.18; // ~32° arriba
    this.minPitch = -Math.PI * 0.20; // ~36° abajo

    this.fov = 75 * (Math.PI / 180);
  }

  /**
   * Recibe vector del joystick (-1 a 1)
   * dx > 0 (derecha) -> gira a la derecha (+yaw)
   * dy < 0 (arriba) -> mira hacia arriba (+pitch)
   */
  setJoystickInput(dx, dy) {
    this.joystickYawVel = dx * this.sensitivity * 0.038;
    this.joystickPitchVel = -dy * this.sensitivity * 0.032;
  }

  stopDragMomentum() {
    this.dragMomentumYaw = 0;
    this.dragMomentumPitch = 0;
  }

  /**
   * Recibe deltas de arrastre directo táctil o mouse
   * Calibrado ergonómicamente al ancho y alto del viewport
   */
  applyDelta(deltaX, deltaY, viewportWidth = 1000, viewportHeight = 600) {
    const yawRange = this.maxYaw - this.minYaw; // ~1.57 rad
    const pitchRange = this.maxPitch - this.minPitch; // ~1.19 rad

    // Escala natural: recorrer ~70% de la pantalla cubre el campo de visión completo
    const scaleX = (yawRange / Math.max(viewportWidth, 320)) * 1.15;
    const scaleY = (pitchRange / Math.max(viewportHeight, 320)) * 1.15;

    const dYaw = deltaX * scaleX;
    const dPitch = deltaY * scaleY;

    this.targetYaw += dYaw;
    this.targetPitch += dPitch;

    // Acumular inercia suave al soltar el dedo
    this.dragMomentumYaw = dYaw * 0.45;
    this.dragMomentumPitch = dPitch * 0.45;

    this.clampTargetYaw();
    this.clampTargetPitch();
  }

  stepYaw(direction) {
    const step = 0.08;
    this.targetYaw += direction * step;
    this.clampTargetYaw();
  }

  stepPitch(direction) {
    const step = 0.06;
    this.targetPitch += direction * step;
    this.clampTargetPitch();
  }

  clampTargetYaw() {
    if (this.targetYaw > this.maxYaw) this.targetYaw = this.maxYaw;
    if (this.targetYaw < this.minYaw) this.targetYaw = this.minYaw;
  }

  clampTargetPitch() {
    if (this.targetPitch > this.maxPitch) this.targetPitch = this.maxPitch;
    if (this.targetPitch < this.minPitch) this.targetPitch = this.minPitch;
  }

  clampYaw() {
    if (this.yaw > this.maxYaw) this.yaw = this.maxYaw;
    if (this.yaw < this.minYaw) this.yaw = this.minYaw;
  }

  clampPitch() {
    if (this.pitch > this.maxPitch) this.pitch = this.maxPitch;
    if (this.pitch < this.minPitch) this.pitch = this.minPitch;
  }

  /**
   * Actualización cinemática por frame (60-120 FPS independientes y fluidos)
   */
  update(deltaTime = 16) {
    const dtSeconds = Math.min(deltaTime, 64) / 1000;

    // Aplicar entrada del joystick al objetivo
    if (Math.abs(this.joystickYawVel) > 0.0001 || Math.abs(this.joystickPitchVel) > 0.0001) {
      this.targetYaw += this.joystickYawVel;
      this.targetPitch += this.joystickPitchVel;
      this.clampTargetYaw();
      this.clampTargetPitch();
    } else if (Math.abs(this.dragMomentumYaw) > 0.00005 || Math.abs(this.dragMomentumPitch) > 0.00005) {
      // Aplicar deslizamiento cinemático al soltar el dedo (inercia táctil)
      this.targetYaw += this.dragMomentumYaw;
      this.targetPitch += this.dragMomentumPitch;
      this.clampTargetYaw();
      this.clampTargetPitch();

      // Fricción suave
      this.dragMomentumYaw *= 0.88;
      this.dragMomentumPitch *= 0.88;
    }

    // Interpolación exponencial independiente del framerate
    // Tau = ~38ms -> Respuesta inmediata y sedosa a 60Hz o 144Hz
    const lerpFactor = 1.0 - Math.exp(-26 * dtSeconds);
    this.yaw += (this.targetYaw - this.yaw) * lerpFactor;
    this.pitch += (this.targetPitch - this.pitch) * lerpFactor;

    this.clampYaw();
    this.clampPitch();
  }

  reset() {
    this.yaw = 0;
    this.pitch = 0;
    this.targetYaw = 0;
    this.targetPitch = 0;
    this.joystickYawVel = 0;
    this.joystickPitchVel = 0;
    this.dragMomentumYaw = 0;
    this.dragMomentumPitch = 0;
  }
}
