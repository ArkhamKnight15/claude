import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

/** Quatro cores em hexadecimal: base + três camadas que fluem por cima. */
export type GradientPalette = readonly [string, string, string, string]

interface AnimatedGradientProps {
  palette: GradientPalette
  className?: string
  /** Multiplicador de velocidade do movimento. */
  speed?: number
}

/** Resolução interna relativa ao tamanho em CSS: gradientes suaves não precisam de mais que isso. */
const RENDER_SCALE = 0.5
const FRAME_INTERVAL_MS = 1000 / 30

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

// Simplex noise 2D (Ian McEwan, Ashima Arts — licença MIT)
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = vec2(uv.x * uResolution.x / uResolution.y, uv.y);
  float t = uTime * 0.045;

  // Domain warping suave: o ruído desloca o próprio ruído, gerando manchas amplas que fluem.
  vec2 q = vec2(snoise(p * 0.45 + vec2(t, -0.6 * t)), snoise(p * 0.45 + vec2(5.2 - 0.4 * t, 1.3 + 0.7 * t)));
  vec2 r = vec2(
    snoise(p * 0.6 + 0.55 * q + vec2(1.7 + 0.3 * t, 9.2)),
    snoise(p * 0.6 + 0.55 * q + vec2(8.3, 2.8 - 0.25 * t))
  );
  float f = snoise(p * 0.5 + 0.6 * r + vec2(-0.2 * t, 0.15 * t));

  vec3 color = uColor0;
  color = mix(color, uColor1, smoothstep(-0.6, 0.7, q.x));
  color = mix(color, uColor2, smoothstep(-0.3, 0.8, r.y) * 0.8);
  color = mix(color, uColor3, smoothstep(0.0, 0.9, f) * 0.65);
  gl_FragColor = vec4(color, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.replace('#', ''), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

/**
 * Gradiente fluido animado em WebGL, usado como fundo.
 * Só anima enquanto está visível; sem WebGL, o fundo CSS do container permanece.
 */
export function AnimatedGradient({ palette, className, speed = 1 }: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [color0, color1, color2, color3] = palette

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!canvas || !gl) return

    const program = createProgram(gl)
    if (!program) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    ;[color0, color1, color2, color3].forEach((color, index) => {
      gl.uniform3fv(gl.getUniformLocation(program, `uColor${index}`), hexToRgb(color))
    })
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Começa em um ponto "maduro" do fluxo, evitando um primeiro quadro uniforme.
    const timeOffset = 40 + Math.random() * 60
    const startedAt = performance.now()
    let frame = 0
    let lastDraw = 0
    let visible = false

    const draw = (now: number) => {
      const elapsed = reducedMotion ? 0 : ((now - startedAt) / 1000) * speed
      gl.uniform1f(timeLocation, timeOffset + elapsed)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - lastDraw < FRAME_INTERVAL_MS) return
      lastDraw = now
      draw(now)
    }

    const resize = () => {
      const width = Math.max(1, Math.round(canvas.clientWidth * RENDER_SCALE))
      const height = Math.max(1, Math.round(canvas.clientHeight * RENDER_SCALE))
      if (canvas.width === width && canvas.height === height) return
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform2f(resolutionLocation, width, height)
      draw(performance.now())
    }

    const start = () => {
      if (visible) return
      visible = true
      if (!reducedMotion) frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      visible = false
      cancelAnimationFrame(frame)
    }

    resize()
    requestAnimationFrame(() => setReady(true))

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const visibilityObserver = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    visibilityObserver.observe(canvas)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [color0, color1, color2, color3, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('block size-full transition-opacity duration-[1600ms] ease-out', ready ? 'opacity-100' : 'opacity-0', className)}
    />
  )
}
