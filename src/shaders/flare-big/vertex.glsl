varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = 8. * uResolution.y ;
    gl_PointSize *= (1.0 / - viewPosition.z);
    vUv = uv;
}