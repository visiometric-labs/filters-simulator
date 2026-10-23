/**
 * Controlador de Cámara en Primera Persona (Giro de Cabeza)
 * Proporciona rotación suave en Pitch (arriba/abajo) y Yaw (izquierda/derecha) con inercia física
 */
export class CameraController {
  constructor() {
    // Ángulos actuales en radianes
    this.yaw = 0;   // Rotación horizontal (360° continuo)
    this.pitch = 0; // Rotación vertical (restringida a campo visual humano)

    // Velocidades angulares
    this.targetYawVel = 0;
    this.targetPitchVel = 0;
    this.yawVel = 0;
    this.pitchVel = 0;

    // Configuración de sensibilidad y límites
    this.sensitivity = 1.8;
    this.friction = 0.88; // Amortiguación suave para sensación natural de cabeza
    this.maxPitch = Math.PI * 0.22; // ~40 grados arriba
    this.minPitch = -Math.PI * 0.25; // ~45 grados abajo

    // Field of view
    this.fov = 75 * (Math.PI / 180);
  }

  /**
   * Recibe vector normalizado del joystick (-1 a 1)
   */
  setJoystickInput(dx, dy) {
    this.targetYawVel = -dx * this.sensitivity * 0.04;
    this.targetPitchVel = dy * this.sensitivity * 0.035;
  }

  /**
   * Recibe deltas directos de arrastre táctil o mouse
   */
  applyDelta(deltaX, deltaY) {
    this.yaw += deltaX * 0.0035;
    this.pitch += deltaY * 0.0035;
    this.clampPitch();
  }

  clampPitch() {
    if (this.pitch > this.maxPitch) this.pitch = this.maxPitch;
    if (this.pitch < this.minPitch) this.pitch = this.minPitch;
  }

  /**
   * Actualización física por frame
   */
  update(deltaTime = 16) {
    // Interpolar velocidad actual hacia la deseada
    this.yawVel = this.yawVel * this.friction + this.targetYawVel * (1 - this.friction);
    this.pitchVel = this.pitchVel * this.friction + this.targetPitchVel * (1 - this.friction);

    this.yaw += this.yawVel;
    this.pitch += this.pitchVel;

    this.clampPitch();

    // Normalizar Yaw en el rango [-PI, PI] para evitar overflow numérico
    if (this.yaw > Math.PI) this.yaw -= Math.PI * 2;
    if (this.yaw < -Math.PI) this.yaw += Math.PI * 2;
  }

  reset() {
    this.yaw = 0;
    this.pitch = 0;
    this.yawVel = 0;
    this.pitchVel = 0;
    this.targetYawVel = 0;
    this.targetPitchVel = 0;
  }
}
